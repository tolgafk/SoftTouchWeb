import { useEffect, useState } from "react";
import "./Gallery.css";

function Gallery() {
  const [allImages, setAllImages] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brandImages, setBrandImages] = useState([]);
  const [sliderImages, setSliderImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadError, setLoadError] = useState(false);

  // 📌 Artık sadece Galeri klasöründeki JSON’dan okuyoruz
  useEffect(() => {
    fetch("/Galeri/gallery.json")
      .then((res) => {
        if (!res.ok) throw new Error(`Galeri yüklenemedi (${res.status})`);
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Geçersiz galeri verisi");
        setAllImages(data);
        setBrands([...new Set(data.map((item) => item.Brand).filter(Boolean))].sort((a, b) => a.localeCompare(b, "tr")));
        setSliderImages(data.slice(0, 10));
      })
      .catch((err) => {
        console.error("gallery.json okunamadı:", err);
        setLoadError(true);
      });
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      const filtered = allImages.filter(
        (item) => item.Brand.toLowerCase() === selectedBrand.toLowerCase() // ✅ Brand
      );
      setBrandImages(filtered);
    } else {
      setBrandImages([]);
    }
  }, [selectedBrand, allImages]);

  // Slider otomatik kayma
  useEffect(() => {
    if (sliderImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderImages]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? sliderImages.length - 1 : prev - 1
    );
  };

  return (
    <section id="gallery" className="gallery" aria-labelledby="gallery-title">
      <h2 id="gallery-title">Uygulama Galerisi</h2>
      {loadError && <p role="status">Galeri şu anda görüntülenemiyor.</p>}

      {/* SLIDER */}
      <div className="slider">
        {sliderImages.length > 0 && (
          <>
            <button type="button" className="prev" onClick={prevSlide} aria-label="Önceki galeri görseli">‹</button>
            <div
              className="slider-wrapper"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {sliderImages.map((img) => (
                <img
                  key={img.Id}                       // ✅ Id
                  src={img.FilePath}                 // ✅ FilePath
                  alt={`${img.Brand} oto döşeme ve iç dizayn uygulaması`}
                  className="slider-img"
                  loading={img.Id === sliderImages[0]?.Id ? "eager" : "lazy"}
                  decoding="async"
                />
              ))}
            </div>
            <button type="button" className="next" onClick={nextSlide} aria-label="Sonraki galeri görseli">›</button>
          </>
        )}
      </div>

      {/* MARKA BUTONLARI */}
      <div className="brand-buttons">
        {brands.map((brand) => (
          <button
            key={brand}
            type="button"
            className={brand === selectedBrand ? "active" : ""}
            onClick={() =>
              setSelectedBrand(brand === selectedBrand ? null : brand)
            }
          >
            {brand}
          </button>
        ))}
      </div>

      {/* SEÇİLİ MARKANIN FOTOĞRAFLARI */}
      {selectedBrand && (
        <div className="gallery-grid">
          {brandImages.map((img) => (
            <div className="gallery-item" key={img.Id}>
              <img src={img.FilePath} alt={`${img.Brand} araç iç döşeme uygulaması`} loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Gallery;
