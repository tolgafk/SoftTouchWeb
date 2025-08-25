using Microsoft.EntityFrameworkCore;
using SoftGalleryApi.Models;

namespace SoftGalleryApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<GalleryImage> GalleryImages { get; set; }
    }
}
