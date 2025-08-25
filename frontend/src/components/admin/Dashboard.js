import { useState, useEffect } from "react";
import Select from "react-select";
import "./Dashboard.css";

function Dashboard() {
  const [brand, setBrand] = useState("");
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  // Environment variable'dan API adresi
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5240";

  const brands = [
    "Abarth", "Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW",
    "Bugatti", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Citroën",
    "Cupra", "Dacia", "Daewoo", "Daihatsu", "Dodge", "DS Automobiles", "Ferrari",
    "Fiat", "Fisker", "Ford", "Genesis", "GMC", "Honda", "Hummer", "Hyundai",
    "Infiniti", "Isuzu", "Jaguar", "Jeep", "Kia", "Koenigsegg", "Lada", "Lamborghini",
    "Lancia", "Land Rover", "Lexus", "Lincoln", "Lotus", "Lucid Motors", "Maserati",
    "Maybach", "Mazda", "McLaren", "Mercedes-Benz", "MG", "Mini", "Mitsubishi",
    "Nio", "Nissan", "Opel", "Pagani", "Peugeot", "Polestar", "Pontiac",
    "Porsche", "Proton", "Ram", "Renault", "Rolls-Royce", "Rover", "Saab",
    "SEAT", "Skoda", "Smart", "SsangYong", "Subaru", "Suzuki", "Tata Motors",
    "Tesla", "Toyota", "Vauxhall", "Volkswagen", "Volvo"
  ];

  const brandOptions = brands.map((b) => ({ value: b, label: b }));

  // İlk yüklemede resimleri getir
  useEffect(() => {
    fetch(`${API_BASE}/api/gallery`)
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error("API Hatası:", err));
  }, [API_BASE]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!brand || !file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("brand", brand);

    await fetch(`${API_BASE}/api/gallery/upload`, {
      method: "POST",
      body: formData,
    });

    const res = await fetch(`${API_BASE}/api/gallery`);
    const data = await res.json();
    setImages(data);

    setFile(null);
    setBrand("");
  };

  const handleDelete = async (id) => {
    await fetch(`${API_BASE}/api/gallery/${id}`, {
      method: "DELETE",
    });
    setImages(images.filter((img) => img.id !== id));
  };

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>

      <form onSubmit={handleSubmit}>
        {/* react-select arama destekli combobox */}
        <div style={{ minWidth: "250px" }}>
          <Select
            options={brandOptions}
            value={brandOptions.find((o) => o.value === brand) || null}
            onChange={(selected) => setBrand(selected.value)}
            placeholder="Marka seç..."
            isSearchable={true}
          />
        </div>

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Yükle</button>
      </form>

      <div className="image-list">
        {images.map((img) => (
          <div key={img.id} className="image-card">
            <img
              src={`${API_BASE}${img.filePath}`}
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
