import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 Soft Touch Oto Dizayn - Tüm Hakları Saklıdır</p>
      <p>Adres: Autopia AVM, Beylikdüzü, 34522 Esenyurt / İstanbul</p>
      <p>Telefon: <a href="tel:+905458643223">0545 864 32 23</a></p>
      <p>Çalışma Saatleri: Pazartesi–Cuma 09:00–18:30, Cumartesi 09:00–18:00, Pazar Kapalı</p>
      
      <div className="social-links">
        <a href="https://www.instagram.com/softtouchdizayn" target="_blank" rel="noreferrer">
          Instagram
        </a>
        
        <a href="https://wa.me/905458643223" target="_blank" rel="noreferrer">
          WhatsApp
        </a>
      </div>
    </footer>
  );
}

export default Footer;
