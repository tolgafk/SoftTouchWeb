import "./Services.css";

function Services() {
  return (
    <section id="services" className="services">
      <h2>Hizmetlerimiz</h2>
      <div className="service-list">

        <div className="service-item">
          <div className="service-text">
            <h3>Oto Döşeme</h3>
            <p>
              BMW, Mercedes, Audi, Volkswagen, Toyota, Renault, Peugeot, Fiat, Honda, Volvo ve 
              Range Rover gibi tüm araç markalarına özel oto döşeme hizmetleri. 
              Deri, kumaş veya alcantara kaplama seçenekleriyle aracınızın içini tamamen yeniliyoruz.
            </p>
          </div>
          <div className="service-image">
            <img src="/soft_gallery/oto-doseme.png" alt="Beylikdüzü profesyonel oto döşeme uygulaması" loading="lazy" decoding="async" />
          </div>
        </div>

        <div className="service-item">
          <div className="service-text">
            <h3>Tuş & Trim Yenileme</h3>
            <p>
              Zamanla aşınan tuş takımları ve trim parçaları Volkswagen, Renault, Ford, Opel, 
              Citroën, Peugeot, Hyundai ve Audi modellerinde profesyonelce yenilenir. 
              Araç içindeki detayları fabrika çıkışı görünüme kavuşturuyoruz.
            </p>
          </div>
          <div className="service-image">
            <img src="/soft_gallery/tus.png" alt="Araç tuş ve trim yenileme uygulaması" loading="lazy" decoding="async" />
          </div>
        </div>

        <div className="service-item">
          <div className="service-text">
            <h3>Direksiyon Kaplama</h3>
            <p>
              BMW, Mercedes-Benz, Audi, Porsche, Mini Cooper, Volvo, Volkswagen ve Range Rover direksiyonlarında 
              deri kaplama ve özel dikiş seçenekleri. 
              El işçiliği ile hem şıklık hem de dayanıklılık sunuyoruz.
            </p>
          </div>
          <div className="service-image">
            <img src="/soft_gallery/direksiyon.png" alt="Deri direksiyon kaplama uygulaması" loading="lazy" decoding="async" />
          </div>
        </div>

        <div className="service-item">
          <div className="service-text">
            <h3>Koltuk Boyama</h3>
            <p>
              Deri veya kumaş koltuklarınızın rengini yeniliyoruz. 
              Özellikle BMW, Mercedes, Audi, Volvo, Lexus, Jaguar ve Land Rover modellerinde 
              profesyonel koltuk boyama hizmeti sunuyoruz.
            </p>
          </div>
          <div className="service-image">
            <img src="/soft_gallery/koltuk.png" alt="Deri araç koltuğu boyama uygulaması" loading="lazy" decoding="async" />
          </div>
        </div>

        <div className="service-item">
          <div className="service-text">
            <h3>Tavan & Kapı Döşeme Yenileme</h3>
            <p>
              Araç tavan ve kapı döşemelerinin sarkma ve deformasyon sorunlarını çözüyoruz. 
              Audi, Volkswagen, Renault, Peugeot, Opel ve Toyota tavan döşemelerinde en çok tercih edilen yenileme hizmeti.
            </p>
          </div>
          <div className="service-image">
            <img src="/soft_gallery/tavan.png" alt="Araç tavan ve kapı döşeme yenileme" loading="lazy" decoding="async" />
          </div>
        </div>

        <div className="service-item">
          <div className="service-text">
            <h3>Pasta Cila & İç Kuaför</h3>
            <p>
              BMW, Mercedes, Audi, Volkswagen, Porsche, Volvo ve Range Rover modellerinde 
              detaylı iç temizlik, pasta cila ve parlatma hizmetleri. 
              Aracınızı hem iç hem dış bakımlarıyla yeni gibi yapıyoruz.
            </p>
          </div>
          <div className="service-image">
            <img src="/soft_gallery/pasta.png" alt="Pasta cila ve detaylı araç iç temizliği" loading="lazy" decoding="async" />
          </div>
        </div>

      </div>
    </section>
  );
}

export default Services;
