import "./Services.css";

function Services() {
  return (
    <section id="services" className="services">
      <h2>Hizmetlerimiz</h2>
      <div className="service-list">
        <div className="card">
          <h3>Oto Döşeme & İç Tasarım</h3>
          <p>
            Aracınızın içini baştan yaratıyoruz. Deri kaplama, kumaş döşeme ve kişiye özel tasarımlar
            ile hem konforu hem de estetiği artırıyoruz.
          </p>
        </div>

        <div className="card">
          <h3>Tuş & Trim Restorasyonu</h3>
          <p>
            Zamanla yıpranan araç tuşları ve trim parçaları, özel tekniklerle restore edilerek
            ilk günkü görünümüne kavuşur. Profesyonel işçilik garantisi ile uzun ömürlü çözümler.
          </p>
        </div>

        <div className="card">
          <h3>Direksiyon Deri Kaplama</h3>
          <p>
            Direksiyonlarınızda şıklığı ve dayanıklılığı bir araya getiriyoruz. El işçiliği ile
            uygulanan deri kaplamalar, sürüş keyfinizi artırırken aracınıza prestij katar.
          </p>
        </div>

        <div className="card">
          <h3>Keyless Go & Akıllı Anahtar</h3>
          <p>
            Aracınıza modern çözümler sunuyoruz. Anahtarsız giriş (Keyless Go) sistemleri ve akıllı
            anahtar uygulamaları ile güvenliği ve konforu üst seviyeye çıkarıyoruz.
          </p>
        </div>

        <div className="card">
          <h3>Tavan Kaplama & Onarım</h3>
          <p>
            Aracınızın tavanında meydana gelen deformasyonları özel kaplama ve yenileme hizmetimizle
            gideriyoruz. Yüksek kalite kumaş ve deri seçenekleri ile aracınızı yenileyin.
          </p>
        </div>

        <div className="card">
          <h3>Bagaj & İç Alan Çözümleri</h3>
          <p>
            Bagaj düzenleme, kaplama ve ek donanım çözümleriyle aracınızın iç alanını hem şık hem de
            işlevsel hale getiriyoruz.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Services;
