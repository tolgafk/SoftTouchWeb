import "./Map.css";

function Map() {
  return (
    <section id="map" className="map-section">
      <h2>Konumumuz</h2>
      <div className="map-container">
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.2307110835977!2d28.6321534216404!3d41.02020820477167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b55fe9eea5ffcb%3A0x4e904b91c0a4e39c!2sSoft%20Touch%20Oto%20D%C3%B6%C5%9Feme%20ve%20Tu%C5%9F%20%26%20Trim%20Restorasyonu!5e0!3m2!1str!2str!4v1756121094733!5m2!1str!2str"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}

export default Map;
