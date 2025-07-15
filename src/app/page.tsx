import Link from 'next/link'

export default function Home() {
  const services = [
    {
      id: 'bewerbung',
      title: 'Bewerbung',
      subtitle: 'Professionell optimiert',
      description: 'KI-optimierte Anschreiben und Lebensläufe für Ihren Traumjob',
      price: '29€',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop',
      badge: 'Beliebt',
      color: 'blue'
    },
    {
      id: 'dating',
      title: 'Dating-Profil', 
      subtitle: 'Mehr Matches garantiert',
      description: 'Unwiderstehliche Profile für Dating-Apps und Partnerbörsen',
      price: '19€',
      image: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=600&h=400&fit=crop',
      badge: 'Neu',
      color: 'pink'
    },
    {
      id: 'bio',
      title: 'Social Media Bio',
      subtitle: 'Überzeugende Präsenz',
      description: 'Professionelle Bios für LinkedIn, Instagram und Co.',
      price: '15€',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      badge: 'Schnell',
      color: 'green'
    }
  ]

  const features = [
    {
      title: 'KI-Powered Texte',
      description: 'Modernste Sprachmodelle für perfekt optimierte Texte',
      icon: '🚀'
    },
    {
      title: '24h Lieferung',
      description: 'Ihre optimierten Texte erhalten Sie innerhalb von 24 Stunden',
      icon: '⚡'
    },
    {
      title: 'Individuelle Anpassung',
      description: 'Jeder Text wird speziell für Sie und Ihre Ziele erstellt',
      icon: '🎯'
    }
  ]

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop" 
            alt="KI Text Studio" 
            className="hero-bg"
          />
          <div className="hero-overlay">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title">KI Text Studio</h1>
                <h2 className="hero-subtitle">Professionelle Texte. KI-optimiert.</h2>
                <p className="hero-description">
                  Perfekte Bewerbungen, unwiderstehliche Dating-Profile und überzeugende Social Media Bios.
                  Lassen Sie künstliche Intelligenz Ihre Texte auf das nächste Level bringen.
                </p>
                <div className="hero-buttons">
                  <Link href="#services" className="btn-hero-primary">
                    Services Entdecken
                  </Link>
                  <Link href="#wie-es-funktioniert" className="btn-hero-secondary">
                    Wie es funktioniert
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section section-padding">
        <div className="container">
          <div className="section-header">
            <h2>Unsere Services</h2>
            <p>Professionelle KI-optimierte Texte für jeden Bereich Ihres Lebens</p>
          </div>
          
          <div className="services-grid grid grid-3">
            {services.map((service) => (
              <Link 
                key={service.id}
                href={`/${service.id}`} 
                className="service-card card"
              >
                <div className={`service-badge badge-${service.color}`}>{service.badge}</div>
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="service-image"
                />
                <div className="service-info">
                  <p className="service-category">KI-Service</p>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-subtitle">{service.subtitle}</p>
                  <p className="service-description">{service.description}</p>
                  <div className="service-footer">
                    <span className="service-price">ab {service.price}</span>
                    <span className="service-cta">Jetzt starten →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section section-padding">
        <div className="container">
          <div className="section-header">
            <h2>Warum KI Text Studio?</h2>
            <p>Modernste Technologie für perfekte Texte</p>
          </div>
          
          <div className="features-grid grid grid-3">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="wie-es-funktioniert" className="how-it-works-section section-padding">
        <div className="container">
          <div className="section-header">
            <h2>So einfach geht's</h2>
            <p>In nur 3 Schritten zu perfekten Texten</p>
          </div>
          
          <div className="steps-grid grid grid-3">
            <div className="step-item">
              <div className="step-number">1</div>
              <h3>Service auswählen</h3>
              <p>Wählen Sie den gewünschten Service und geben Sie Ihre Anforderungen ein</p>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <h3>Bezahlen & Warten</h3>
              <p>Sichere Zahlung über Stripe. Wir bearbeiten Ihre Anfrage innerhalb von 24h</p>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <h3>Perfekte Texte erhalten</h3>
              <p>Sie erhalten Ihre KI-optimierten Texte per E-Mail - bereit zum Einsatz</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Bleiben Sie informiert</h2>
            <p>Erhalten Sie Tipps für bessere Texte und exklusive Angebote</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Ihre E-Mail-Adresse"
                className="newsletter-input"
              />
              <button type="submit" className="btn-primary">
                Anmelden
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
} 