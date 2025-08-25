import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Hardcoded şifre
  const validPassword = "1234";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === validPassword) {
      navigate("/admin/dashboard");
    } else {
      alert("Hatalı şifre!");
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Girişi</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
}

export default Login;
