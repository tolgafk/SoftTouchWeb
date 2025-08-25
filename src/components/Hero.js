import { Link } from "react-scroll";
import "./Hero.css";

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1>Soft Touch Oto Dizayn</h1>
        <p>
          İstanbul Beylikdüzü Autopia AVM’de aracınıza özel 
          <strong> oto döşeme</strong>, 
          <strong> direksiyon deri kaplama</strong>, 
          <strong> tuş & trim restorasyonu</strong> 
          ve <strong>Keyless Go</strong> çözümleri.
        </p>
        <Link to="contact" smooth duration={500}>
          <button>Teklif Al</button>
        </Link>
      </div>
    </section>
  );
}

export default Hero;
