using Microsoft.AspNetCore.Mvc;
using SoftGalleryApi.Data;
using SoftGalleryApi.Models;

namespace SoftGalleryApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GalleryController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public GalleryController(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // 1) Slider için rasgele resimler
        [HttpGet("slider")]
        public IActionResult GetSlider()
        {
            var images = _context.GalleryImages.ToList();

            if (images == null || !images.Any())
                return Ok(new List<GalleryImage>()); // Boş JSON []

            var rnd = new Random();
            var randomImages = images
                .OrderBy(x => rnd.Next())
                .Take(10)
                .ToList();

            return Ok(randomImages);
        }

        // 2) Tüm markaları listele (Distinct)
        [HttpGet("brands")]
        public IActionResult GetBrands()
        {
            var brands = _context.GalleryImages
                .Select(g => g.Brand)
                .Distinct()
                .ToList();

            return Ok(brands ?? new List<string>());
        }

        // 3) Seçilen markanın resimleri
        [HttpGet("gallery/{brand}")]
        public IActionResult GetByBrand(string brand)
        {
            if (string.IsNullOrEmpty(brand))
                return Ok(new List<GalleryImage>());

            var images = _context.GalleryImages
                .Where(g => g.Brand.ToLower() == brand.ToLower())
                .ToList();

            return Ok(images ?? new List<GalleryImage>());
        }

        // 4) Admin → Tüm resimleri getir
        [HttpGet]
        public IActionResult GetAll()
        {
            var images = _context.GalleryImages.ToList();
            return Ok(images ?? new List<GalleryImage>());
        }

        // 5) Admin → Resim yükle
        [HttpPost("upload")]
        public async Task<IActionResult> Upload([FromForm] IFormFile file, [FromForm] string brand)
        {
            if (file == null || string.IsNullOrEmpty(brand))
                return BadRequest("Dosya veya marka eksik.");

            // Marka klasör yolu
            var uploadPath = Path.Combine(_env.WebRootPath, "soft_gallery", brand);
            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            // Dosya adı
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadPath, fileName);

            // Dosyayı kaydet
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // DB’ye kaydet
            var dbPath = $"/soft_gallery/{brand}/{fileName}";
            var image = new GalleryImage
            {
                Brand = brand,
                FilePath = dbPath,
                UploadDate = DateTime.Now
            };

            _context.GalleryImages.Add(image);
            await _context.SaveChangesAsync();

            return Ok(image);
        }

        // 6) Admin → Resim sil
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var image = _context.GalleryImages.FirstOrDefault(i => i.Id == id);
            if (image == null) return NotFound();

            // Fiziksel dosya yolu
            var fullPath = Path.Combine(
                _env.WebRootPath,
                image.FilePath.TrimStart('/').Replace("/", Path.DirectorySeparatorChar.ToString())
            );

            if (System.IO.File.Exists(fullPath))
            {
                System.IO.File.Delete(fullPath);
            }

            // DB’den sil
            _context.GalleryImages.Remove(image);
            _context.SaveChanges();

            return Ok(new { message = "Silindi" });
        }
    }
}
