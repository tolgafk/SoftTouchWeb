import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      navigate("/admin");
    }
    const stored = localStorage.getItem("gallery");
    if (stored) setImages(JSON.parse(stored));
  }, [navigate]);

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newImages = [...images, reader.result];
      setImages(newImages);
      localStorage.setItem("gallery", JSON.stringify(newImages));
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    localStorage.setItem("gallery", JSON.stringify(newImages));
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Paneli</h2>
      <button onClick={handleLogout}>Çıkış Yap</button>
      <br /><br />
      <input type="file" accept="image/*" onChange={handleAddImage} />
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
        {images.map((img, i) => (
          <div key={i} style={{ margin: "10px" }}>
            <img src={img} alt="gallery" style={{ width: "150px", height: "100px", objectFit: "cover" }} />
            <br />
            <button onClick={() => handleDelete(i)}>Sil</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
