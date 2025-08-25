import { useState } from "react";
import { Link } from "react-scroll";
import "./Navbar.css";
import logo from "../assets/soft_logo3.png"; 

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Oto İç Dizayn Logo" className="logo-img" />
      </div>

      <div className="menu-icon" onClick={toggleMenu}>
        {isOpen ? "✖" : "☰"}
      </div>

      <div className={`links ${isOpen ? "active" : ""}`}>
        <Link to="hero" smooth duration={500} onClick={closeMenu}>Ana Sayfa</Link>
        <Link to="services" smooth duration={500} onClick={closeMenu}>Hizmetler</Link>
        <Link to="gallery" smooth duration={500} onClick={closeMenu}>Galeri</Link>
        <Link to="about" smooth duration={500} onClick={closeMenu}>Hakkımızda</Link>
        <Link to="contact" smooth duration={500} onClick={closeMenu}>İletişim</Link>
        <Link to="map" smooth duration={500} onClick={closeMenu}>Konum</Link>
      </div>
    </nav>
  );
}

export default Navbar;
