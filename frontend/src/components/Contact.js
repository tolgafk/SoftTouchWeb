import "./Contact.css";
import { FaEnvelope, FaInstagram, FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  return (
    <section id="contact" className="contact">
      <h2>İletişim</h2>
      <div className="contact-grid">
        <a href="mailto:info@otoicdizayn.com" target="_blank" rel="noreferrer" className="contact-card">
          <FaEnvelope className="icon" />
          <span>Email</span>
        </a>
        <a href="https://www.instagram.com/softtouchdizayn" target="_blank" rel="noreferrer" className="contact-card">
          <FaInstagram className="icon" />
          <span>Instagram</span>
        </a>
        <a href="tel:+905458643223" className="contact-card">
          <FaPhoneAlt className="icon" />
          <span>0545 864 3223</span>
        </a>
        <a href="https://wa.me/905458643223" target="_blank" rel="noreferrer" className="contact-card">
          <FaWhatsapp className="icon" />
          <span>WhatsApp</span>
        </a>
        <a href="https://maps.google.com/?q=Soft+Touch+Oto+Döşeme+ve+Tuş+Trim+Restorasyonu" target="_blank" rel="noreferrer" className="contact-card">
          <FaMapMarkerAlt className="icon" />
          <span>Google Haritalar</span>
        </a>
      </div>
    </section>
  );
}

export default Contact;
