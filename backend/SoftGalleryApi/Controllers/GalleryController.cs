using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using SoftGalleryApi.Data;
using SoftGalleryApi.Models;

namespace SoftGalleryApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public partial class GalleryController : ControllerBase
{
    private const long MaxFileSize = 8 * 1024 * 1024;
    private static readonly HashSet<string> AllowedExtensions =
        new(StringComparer.OrdinalIgnoreCase) { ".jpg", ".jpeg", ".png", ".webp" };

    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _environment;
    private readonly IConfiguration _configuration;
    private readonly ILogger<GalleryController> _logger;

    public GalleryController(
        AppDbContext context,
        IWebHostEnvironment environment,
        IConfiguration configuration,
        ILogger<GalleryController> logger)
    {
        _context = context;
        _environment = environment;
        _configuration = configuration;
        _logger = logger;
    }

    [HttpGet("slider")]
    public async Task<ActionResult<List<GalleryImage>>> GetSlider()
    {
        var images = await _context.GalleryImages
            .AsNoTracking()
            .OrderBy(_ => Guid.NewGuid())
            .Take(10)
            .ToListAsync();

        return Ok(images);
    }

    [HttpGet("brands")]
    public async Task<ActionResult<List<string>>> GetBrands()
    {
        var brands = await _context.GalleryImages
            .AsNoTracking()
            .Select(image => image.Brand)
            .Distinct()
            .OrderBy(brand => brand)
            .ToListAsync();

        return Ok(brands);
    }

    [HttpGet("gallery/{brand}")]
    public async Task<ActionResult<List<GalleryImage>>> GetByBrand(string brand)
    {
        var normalizedBrand = brand.Trim();
        if (!IsValidBrand(normalizedBrand))
        {
            return BadRequest(new { message = "Geçersiz marka adı." });
        }

        var images = await _context.GalleryImages
            .AsNoTracking()
            .Where(image => image.Brand == normalizedBrand)
            .OrderByDescending(image => image.UploadDate)
            .ToListAsync();

        return Ok(images);
    }

    [HttpGet]
    [EnableRateLimiting("admin")]
    public async Task<ActionResult<List<GalleryImage>>> GetAll()
    {
        if (!HasValidAdminKey())
        {
            return Unauthorized();
        }

        var images = await _context.GalleryImages
            .AsNoTracking()
            .OrderByDescending(image => image.UploadDate)
            .ToListAsync();

        return Ok(images);
    }

    [HttpGet("admin/verify")]
    [EnableRateLimiting("admin")]
    public IActionResult VerifyAdmin()
    {
        return HasValidAdminKey() ? NoContent() : Unauthorized();
    }

    [HttpPost("upload")]
    [EnableRateLimiting("admin")]
    [RequestSizeLimit(MaxFileSize + 1024)]
    public async Task<IActionResult> Upload([FromForm] IFormFile? file, [FromForm] string? brand)
    {
        if (!HasValidAdminKey())
        {
            return Unauthorized();
        }

        var normalizedBrand = brand?.Trim() ?? string.Empty;
        if (file is null || file.Length == 0 || !IsValidBrand(normalizedBrand))
        {
            return BadRequest(new { message = "Dosya veya marka geçersiz." });
        }

        if (file.Length > MaxFileSize)
        {
            return BadRequest(new { message = "Dosya boyutu en fazla 8 MB olabilir." });
        }

        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!AllowedExtensions.Contains(extension) || !await HasValidImageSignature(file, extension))
        {
            return BadRequest(new { message = "Yalnızca geçerli JPG, PNG veya WebP görselleri yüklenebilir." });
        }

        var uploadRoot = Path.GetFullPath(Path.Combine(_environment.WebRootPath, "soft_gallery"));
        var brandDirectory = Path.GetFullPath(Path.Combine(uploadRoot, normalizedBrand));
        if (!IsPathInside(brandDirectory, uploadRoot))
        {
            return BadRequest(new { message = "Geçersiz yükleme yolu." });
        }

        Directory.CreateDirectory(brandDirectory);

        var fileName = $"{Guid.NewGuid():N}{extension}";
        var filePath = Path.Combine(brandDirectory, fileName);

        await using (var stream = new FileStream(
            filePath,
            FileMode.CreateNew,
            FileAccess.Write,
            FileShare.None,
            bufferSize: 81920,
            useAsync: true))
        {
            await file.CopyToAsync(stream, HttpContext.RequestAborted);
        }

        var image = new GalleryImage
        {
            Brand = normalizedBrand,
            FilePath = $"/soft_gallery/{Uri.EscapeDataString(normalizedBrand)}/{fileName}",
            UploadDate = DateTime.UtcNow
        };

        _context.GalleryImages.Add(image);
        await _context.SaveChangesAsync(HttpContext.RequestAborted);

        return CreatedAtAction(nameof(GetByBrand), new { brand = normalizedBrand }, image);
    }

    [HttpDelete("{id:int}")]
    [EnableRateLimiting("admin")]
    public async Task<IActionResult> Delete(int id)
    {
        if (!HasValidAdminKey())
        {
            return Unauthorized();
        }

        var image = await _context.GalleryImages.FindAsync([id], HttpContext.RequestAborted);
        if (image is null)
        {
            return NotFound();
        }

        var galleryRoot = Path.GetFullPath(Path.Combine(_environment.WebRootPath, "soft_gallery"));
        var relativePath = image.FilePath.TrimStart('/').Replace('/', Path.DirectorySeparatorChar);
        var fullPath = Path.GetFullPath(Path.Combine(_environment.WebRootPath, relativePath));

        if (!IsPathInside(fullPath, galleryRoot))
        {
            _logger.LogWarning("Blocked unsafe gallery delete path for image {ImageId}", id);
            return BadRequest(new { message = "Geçersiz dosya yolu." });
        }

        if (System.IO.File.Exists(fullPath))
        {
            System.IO.File.Delete(fullPath);
        }

        _context.GalleryImages.Remove(image);
        await _context.SaveChangesAsync(HttpContext.RequestAborted);

        return NoContent();
    }

    private bool HasValidAdminKey()
    {
        var expectedKey = _configuration["Admin:ApiKey"];
        var suppliedKey = Request.Headers["X-Admin-Key"].ToString();

        if (string.IsNullOrWhiteSpace(expectedKey)
            || expectedKey.Length < 24
            || string.IsNullOrWhiteSpace(suppliedKey))
        {
            return false;
        }

        var expectedBytes = Encoding.UTF8.GetBytes(expectedKey);
        var suppliedBytes = Encoding.UTF8.GetBytes(suppliedKey);

        return expectedBytes.Length == suppliedBytes.Length
            && CryptographicOperations.FixedTimeEquals(expectedBytes, suppliedBytes);
    }

    private static bool IsValidBrand(string brand) =>
        brand.Length <= 50 && BrandNamePattern().IsMatch(brand);

    private static bool IsPathInside(string candidatePath, string rootPath)
    {
        var normalizedRoot = rootPath.TrimEnd(Path.DirectorySeparatorChar) + Path.DirectorySeparatorChar;
        return candidatePath.StartsWith(normalizedRoot, StringComparison.OrdinalIgnoreCase);
    }

    private static async Task<bool> HasValidImageSignature(IFormFile file, string extension)
    {
        var header = new byte[12];
        await using var stream = file.OpenReadStream();
        var bytesRead = await stream.ReadAsync(header);
        return extension switch
        {
            ".jpg" or ".jpeg" => bytesRead >= 3
                && header[0] == 0xFF && header[1] == 0xD8 && header[2] == 0xFF,
            ".png" => bytesRead >= 8
                && header.Take(8).SequenceEqual(new byte[] { 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A }),
            ".webp" => bytesRead >= 12
                && header.Take(4).SequenceEqual(Encoding.ASCII.GetBytes("RIFF"))
                && header.Skip(8).Take(4).SequenceEqual(Encoding.ASCII.GetBytes("WEBP")),
            _ => false
        };
    }

    [GeneratedRegex(@"^[\p{L}\p{N} .&'-]+$", RegexOptions.CultureInvariant)]
    private static partial Regex BrandNamePattern();
}
