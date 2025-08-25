import { useEffect, useState } from "react";

function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5240/api/gallery")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error("API Hatası:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Galeri</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "15px",
        }}
      >
        {images.map((img) => (
          <div
            key={img.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <img
              src={`http://localhost:5240${img.filePath}`}
              alt={img.brand}
              style={{ width: "100%", borderRadius: "6px" }}
            />
            <p>{img.brand}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
