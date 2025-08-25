import { useState, useEffect } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [brand, setBrand] = useState("");
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  const brands = ["BMW", "Mercedes", "Audi", "Toyota", "Volkswagen"];

  // İlk açılışta API'den resimleri al
  useEffect(() => {
    fetch("http://localhost:5240/api/gallery")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error("API Hatası:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!brand || !file) {
      alert("Marka ve dosya seçmelisiniz.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("brand", brand);

    await fetch("http://localhost:5240/api/gallery/upload", {
      method: "POST",
      body: formData,
    });

    // Yükledikten sonra listeyi yenile
    const res = await fetch("http://localhost:5240/api/gallery");
    const data = await res.json();
    setImages(data);

    setFile(null);
    setBrand("");
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5240/api/gallery/${id}`, {
      method: "DELETE",
    });
    setImages(images.filter((img) => img.id !== id));
  };

  return (
  <div className="dashboard-container">
    <h2>Admin Paneli</h2>

    <form onSubmit={handleSubmit}>
      <select value={brand} onChange={(e) => setBrand(e.target.value)}>
        <option value="">Marka Seç</option>
        {brands.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button type="submit">Yükle</button>
    </form>

    <h3>Yüklenen Resimler</h3>
    <div className="image-list">
      {images.map((img) => (
        <div key={img.id} className="image-card">
          <img
            src={`http://localhost:5240${img.filePath}`}
            alt={img.brand}
          />
          <p>{img.brand}</p>
          <button onClick={() => handleDelete(img.id)}>Sil</button>
        </div>
      ))}
    </div>
  </div>
);

}

export default Dashboard;
