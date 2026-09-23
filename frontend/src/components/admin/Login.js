import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const API_BASE = (
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "development" ? "http://localhost:5240" : "")
).replace(/\/$/, "");

function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Yönetim Girişi | Soft Touch Oto Dizayn";
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!API_BASE) {
      setError("Yönetim API adresi yapılandırılmamış.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE}/api/gallery/admin/verify`, {
        headers: { "X-Admin-Key": password },
      });

      if (!response.ok) {
        setError(response.status === 429 ? "Çok fazla deneme yapıldı. Lütfen biraz bekleyin." : "Şifre hatalı.");
        return;
      }

      sessionStorage.setItem("softtouch_admin_key", password);
      navigate("/admin/dashboard", { replace: true });
    } catch {
      setError("Sunucuya ulaşılamadı. API ayarını kontrol edin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-container">
      <h1>Yönetim Girişi</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="admin-password">Yönetim şifresi</label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {error && <p role="alert">{error}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Kontrol ediliyor…" : "Giriş Yap"}
        </button>
      </form>
    </main>
  );
}

export default Login;
