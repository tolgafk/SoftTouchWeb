import "./Services.css";

function Services() {
  return (
    <section id="services" className="services">
      <h2>Hizmetlerimiz</h2>
      <div className="service-list">

        <div className="card">
          <h3>Oto Döşeme & İç Tasarım</h3>
          <p>
            Aracınızın içini baştan yaratıyoruz. Deri kaplama, kumaş döşeme ve kişiye özel
            tasarımlar ile hem konforu hem de estetiği artırıyoruz. 
            BMW, Mercedes, Audi, Volkswagen, Toyota ve diğer araç markalarına özel çözümler sunmaktayız.
          </p>
        </div>

        <div className="card">
          <h3>Tuş & Trim Restorasyonu</h3>
          <p>
            Zamanla yıpranan araç tuşları ve trim parçaları, özel tekniklerle restore edilerek
            ilk günkü görünümüne kavuşur. Profesyonel işçilik garantisi ile uzun ömürlü çözümler.
            Özellikle Volkswagen, Renault ve Ford modellerinde sıkça tercih edilmektedir.
          </p>
        </div>

        <div className="card">
          <h3>Direksiyon Deri Kaplama</h3>
          <p>
            Direksiyonlarınızda şıklığı ve dayanıklılığı bir araya getiriyoruz. 
            El işçiliği ile uygulanan deri kaplamalar, sürüş keyfinizi artırırken aracınıza
            prestij katar. BMW, Mercedes, Audi ve Porsche gibi markalarda profesyonel kaplama
            hizmeti sunuyoruz.
          </p>
        </div>

        <div className="card">
          <h3>Tavan Kaplama & Onarım</h3>
          <p>
            Aracınızın tavanında meydana gelen deformasyonları özel kaplama ve yenileme
            hizmetimizle gideriyoruz. Yüksek kalite kumaş ve deri seçenekleri ile aracınızı
            yenileyin. Audi, Volkswagen ve Renault tavan kaplama projelerinde en çok tercih
            edilen markayız.
          </p>
        </div>

        
      </div>
    </section>
  );
}

export default Services;
