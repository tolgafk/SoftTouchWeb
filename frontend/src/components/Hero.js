import { Link } from "react-scroll";
import "./Hero.css";

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1>Soft Touch Oto Dizayn</h1>
        <p>
          İstanbul Beylikdüzü Autopia AVM’de BMW, Mercedes, Audi, Volkswagen, Renault, Peugeot, 
          Toyota, Ford, Volvo ve daha birçok marka için 
          <strong> oto döşeme</strong>, 
          <strong> tuş & trim yenileme</strong>, 
          <strong> direksiyon kaplama</strong>, 
          <strong> koltuk boyama</strong>, 
          <strong> tavan & kapı döşeme yenileme</strong> ve 
          <strong> pasta cila & iç kuaför</strong> hizmetleri.
        </p>
        <Link to="contact" smooth duration={500}>
          <button>Teklif Al</button>
        </Link>
      </div>
    </section>
  );
}

export default Hero;
