namespace SoftGalleryApi.Models
{
    public class GalleryImage
    {
        public int Id { get; set; }
        public string Brand { get; set; } = string.Empty;
        public string FilePath { get; set; } = string.Empty;
        public DateTime UploadDate { get; set; } = DateTime.Now;
    }
}
