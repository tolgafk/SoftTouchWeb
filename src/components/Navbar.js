import { Link } from "react-scroll";
import "./Navbar.css";
import logo from "../assets/soft_logo3.png";


function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Oto İç Dizayn Logo" />
      </div>
      <div className="links">
        <Link to="hero" smooth duration={500}>Ana Sayfa</Link>
        <Link to="services" smooth duration={500}>Hizmetler</Link>
        <Link to="gallery" smooth duration={500}>Galeri</Link>
        <Link to="about" smooth duration={500}>Hakkımızda</Link>
        <Link to="contact" smooth duration={500}>İletişim</Link>
        <Link to="map" smooth duration={500}>Konum</Link>
      </div>
    </nav>
  );
}

export default Navbar;
