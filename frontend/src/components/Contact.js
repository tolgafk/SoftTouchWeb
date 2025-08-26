import "./Contact.css";

function Contact() {
  return (
    <section id="contact" className="contact">
      <h2>İletişim</h2>

      <div className="contact-links">
        <a href="mailto:info@otoicdizayn.com" target="_blank" rel="noreferrer">
          Email
        </a>
        <a
          href="https://www.instagram.com/softtouchdizayn"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
        <a href="tel:+905458643223">Telefon: 0545 864 3223</a>
        <a
          href="https://wa.me/905458643223"
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>
        <a
          href="https://maps.google.com/?q=Soft+Touch+Oto+Döşeme+ve+Tuş+Trim+Restorasyonu"
          target="_blank"
          rel="noreferrer"
        >
          Google Haritalarda Aç
        </a>
      </div>
    </section>
  );
}

export default Contact;
