import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "./Dashboard.css";

const MAX_FILE_SIZE = 8 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const API_BASE = (
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "development" ? "http://localhost:5240" : "")
).replace(/\/$/, "");

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

const brandOptions = brands.map((brand) => ({ value: brand, label: brand }));

function Dashboard() {
  const [brand, setBrand] = useState("");
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const adminKey = sessionStorage.getItem("softtouch_admin_key");

  const signOut = useCallback(() => {
    sessionStorage.removeItem("softtouch_admin_key");
    navigate("/admin/login", { replace: true });
  }, [navigate]);

  const loadImages = useCallback(async () => {
    if (!adminKey || !API_BASE) {
      signOut();
      return;
    }

    const response = await fetch(`${API_BASE}/api/gallery`, {
      headers: { "X-Admin-Key": adminKey },
    });

    if (response.status === 401) {
      signOut();
      return;
    }

    if (!response.ok) {
      throw new Error("Galeri listesi alınamadı.");
    }

    setImages(await response.json());
  }, [adminKey, signOut]);

  useEffect(() => {
    document.title = "Galeri Yönetimi | Soft Touch Oto Dizayn";

    const robotsMeta = document.querySelector('meta[name="robots"]');
    const previousRobots = robotsMeta?.getAttribute("content");
    robotsMeta?.setAttribute("content", "noindex, nofollow, noarchive");

    loadImages().catch(() => setError("Galeri listesi alınamadı."));

    return () => {
      if (robotsMeta && previousRobots) {
        robotsMeta.setAttribute("content", previousRobots);
      }
    };
  }, [loadImages]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setError("");

    if (selectedFile && (!ALLOWED_FILE_TYPES.includes(selectedFile.type) || selectedFile.size > MAX_FILE_SIZE)) {
      setFile(null);
      event.target.value = "";
      setError("JPG, PNG veya WebP biçiminde ve en fazla 8 MB bir görsel seçin.");
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!brand || !file || !adminKey) return;
    const form = event.currentTarget;

    setError("");
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("brand", brand);

      const response = await fetch(`${API_BASE}/api/gallery/upload`, {
        method: "POST",
        headers: { "X-Admin-Key": adminKey },
        body: formData,
      });

      if (response.status === 401) {
        signOut();
        return;
      }

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.message || "Görsel yüklenemedi.");
      }

      await loadImages();
      setFile(null);
      setBrand("");
      form.reset();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    setError("");

    try {
      const response = await fetch(`${API_BASE}/api/gallery/${id}`, {
        method: "DELETE",
        headers: { "X-Admin-Key": adminKey },
      });

      if (response.status === 401) {
        signOut();
        return;
      }

      if (!response.ok) throw new Error("Görsel silinemedi.");
      setImages((currentImages) => currentImages.filter((image) => image.id !== id));
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <main className="dashboard-container">
      <div>
        <h1>Galeri Yönetimi</h1>
        <button type="button" onClick={signOut}>Çıkış Yap</button>
      </div>

      {error && <p role="alert">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ minWidth: "250px" }}>
          <Select
            options={brandOptions}
            value={brandOptions.find((option) => option.value === brand) || null}
            onChange={(selected) => setBrand(selected?.value || "")}
            placeholder="Marka seç..."
            isSearchable
            inputId="brand-select"
          />
        </div>

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          required
        />
        <button type="submit" disabled={isSubmitting || !brand || !file}>
          {isSubmitting ? "Yükleniyor…" : "Yükle"}
        </button>
      </form>

      <div className="image-list">
        {images.map((image) => (
          <div key={image.id} className="image-card">
            <img
              src={`${API_BASE}${image.filePath}`}
              alt={`${image.brand} galeri görseli`}
              loading="lazy"
            />
            <p>{image.brand}</p>
            <button type="button" onClick={() => handleDelete(image.id)}>Sil</button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Dashboard;
