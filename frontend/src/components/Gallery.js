import { useEffect, useState } from "react";
import "./Gallery.css";

function Gallery() {
  const [sliderImages, setSliderImages] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brandImages, setBrandImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5240";

  useEffect(() => {
    fetch(`${API_BASE}/api/gallery/slider`)
      .then(res => res.json())
      .then(data => setSliderImages(data))
      .catch(err => console.error("Slider Hatası:", err));
  }, [API_BASE]);

  useEffect(() => {
    fetch(`${API_BASE}/api/gallery/brands`)
      .then(res => res.json())
      .then(data => setBrands(data))
      .catch(err => console.error("Marka Hatası:", err));
  }, [API_BASE]);

  useEffect(() => {
    if (selectedBrand) {
      fetch(`${API_BASE}/api/gallery/gallery/${selectedBrand}`)
        .then(res => res.json())
        .then(data => setBrandImages(data))
        .catch(err => console.error("Galeri Hatası:", err));
    }
  }, [selectedBrand, API_BASE]);

  useEffect(() => {
    if (sliderImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % sliderImages.length);
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
    <div className="gallery">
      <h2>Galeri</h2>

      {/* SLIDER */}
      <div className="slider">
        {sliderImages.length > 0 && (
          <>
            <button className="prev" onClick={prevSlide}>‹</button>
            <div className="slider-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {sliderImages.map((img) => (
                <img
                  key={img.id}
                  src={`${API_BASE}${img.filePath}`}
                  alt={img.brand}
                  className="slider-img"
                />
              ))}
            </div>
            <button className="next" onClick={nextSlide}>›</button>
          </>
        )}
      </div>

      {/* MARKA BUTONLARI */}
      <div className="brand-buttons">
        {brands.map((brand) => (
          <button
            key={brand}
            className={brand === selectedBrand ? "active" : ""}
            onClick={() => setSelectedBrand(brand)}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* SEÇİLİ MARKANIN FOTOĞRAFLARI */}
      <div className="gallery-grid">
        {brandImages.map((img) => (
          <div className="gallery-item" key={img.id}>
            <img src={`${API_BASE}${img.filePath}`} alt={img.brand} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
