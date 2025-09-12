import { useEffect, useState } from "react";
import "./Gallery.css";

function Gallery() {
  const [allImages, setAllImages] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brandImages, setBrandImages] = useState([]);
  const [sliderImages, setSliderImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // gallery.json'u frontend/public klasöründen oku
  useEffect(() => {
    fetch("/gallery.json")
      .then((res) => res.json())
      .then((data) => {
        setAllImages(data);
        setBrands([...new Set(data.map((item) => item.brand))]);
        setSliderImages(data.slice(0, 10)); // slider için ilk 10 resmi al
      })
      .catch((err) => console.error("gallery.json okunamadı:", err));
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      const filtered = allImages.filter(
        (item) => item.brand.toLowerCase() === selectedBrand.toLowerCase()
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
    <div className="gallery">
      <h2>Galeri</h2>

      {/* SLIDER */}
      <div className="slider">
        {sliderImages.length > 0 && (
          <>
            <button className="prev" onClick={prevSlide}>‹</button>
            <div
              className="slider-wrapper"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {sliderImages.map((img) => (
                <img
                  key={img.id}
                  src={img.filePath}
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
            <div className="gallery-item" key={img.id}>
              <img src={img.filePath} alt={img.brand} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;
