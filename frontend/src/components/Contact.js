import "./Contact.css";
import { FaInstagram, FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  return (
    <section id="contact" className="contact">
      <h2>İletişim</h2>
      <div className="contact-grid">
        <a href="https://www.instagram.com/softtouchdizayn" target="_blank" rel="noopener noreferrer" className="contact-card" aria-label="Soft Touch Oto Dizayn Instagram hesabı">
          <FaInstagram className="icon" />
          <span>Instagram</span>
        </a>
        <a href="tel:+905458643223" className="contact-card">
          <FaPhoneAlt className="icon" />
          <span>0545 864 3223</span>
        </a>
        <a href="https://wa.me/905458643223" target="_blank" rel="noopener noreferrer" className="contact-card" aria-label="WhatsApp üzerinden iletişime geçin">
          <FaWhatsapp className="icon" />
          <span>WhatsApp</span>
        </a>
        <a href="https://maps.google.com/?q=Soft+Touch+Oto+Döşeme+ve+Tuş+Trim+Restorasyonu" target="_blank" rel="noopener noreferrer" className="contact-card" aria-label="Soft Touch Oto Dizayn Google Haritalar konumu">
          <FaMapMarkerAlt className="icon" />
          <span>Google Haritalar</span>
        </a>
      </div>
    </section>
  );
}

export default Contact;
