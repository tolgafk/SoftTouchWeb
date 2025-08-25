using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SoftGalleryApi.Data;
using SoftGalleryApi.Models;

namespace SoftGalleryApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GalleryController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IWebHostEnvironment _env;

        public GalleryController(AppDbContext db, IWebHostEnvironment env)
        {
            _db = db;
            _env = env;
        }

        // GET: api/gallery
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var images = await _db.GalleryImages.ToListAsync();
            return Ok(images);
        }

        // POST: api/gallery/upload
        [HttpPost("upload")]
        public async Task<IActionResult> Upload([FromForm] IFormFile file, [FromForm] string brand)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Dosya seçilmedi.");

            var uploadPath = Path.Combine(_env.WebRootPath ?? "wwwroot", "soft_gallery", brand);
            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            var filePath = Path.Combine(uploadPath, file.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var dbPath = $"/soft_gallery/{brand}/{file.FileName}";
            var image = new GalleryImage { Brand = brand, FilePath = dbPath };

            _db.GalleryImages.Add(image);
            await _db.SaveChangesAsync();

            return Ok(image);
        }

        // DELETE: api/gallery/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var image = await _db.GalleryImages.FindAsync(id);
            if (image == null) return NotFound();

            var fullPath = Path.Combine(_env.WebRootPath ?? "wwwroot", image.FilePath.TrimStart('/'));
            if (System.IO.File.Exists(fullPath))
                System.IO.File.Delete(fullPath);

            _db.GalleryImages.Remove(image);
            await _db.SaveChangesAsync();
            return Ok();
        }
    }
}
