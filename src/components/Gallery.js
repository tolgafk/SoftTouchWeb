import { useState, useEffect } from "react";
import "./Gallery.css";

function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("gallery");
    if (stored) setImages(JSON.parse(stored));
  }, []);

  return (
    <section id="gallery" className="gallery">
      <h2>Galeri</h2>
      <div className="gallery-grid">
        {images.length === 0 && <p>Henüz resim eklenmedi.</p>}
        {images.map((img, i) => (
          <img key={i} src={img} alt="gallery" />
        ))}
      </div>
    </section>
  );
}

export default Gallery;
