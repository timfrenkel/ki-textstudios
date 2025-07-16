export default function KontaktPage() {
  return (
    <div className="service-page">
      <section className="service-hero">
        <div className="service-hero-bg">
          <img 
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&h=600&fit=crop" 
            alt="Kontakt" 
            className="hero-bg"
          />
          <div className="hero-overlay">
            <div className="container">
              <div className="service-hero-content">
                <h1 className="service-hero-title">Kontakt</h1>
                <p className="service-hero-subtitle">
                  Sprechen Sie mit uns über Ihre Bewerbungsoptimierung
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-form-section section-padding">
        <div className="container">
          <div className="service-form-wrapper">
            <div className="service-form-header">
              <h2>Kontaktieren Sie uns</h2>
              <p>Wir sind für Sie da und beantworten gerne Ihre Fragen zur ATS-Revolution</p>
            </div>

            <div className="service-form" style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ textAlign: 'left', lineHeight: '1.8' }}>
                
                <div className="contact-info" style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                  <h3 style={{ color: 'var(--primary-navy)', marginBottom: '1rem' }}>📞 Kontaktdaten</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <strong>Name:</strong><br />
                      Tim Frenkel<br />
                      Einzelunternehmen
                    </div>
                    <div>
                      <strong>Adresse:</strong><br />
                      Ringstraße 34<br />
                      24103 Kiel
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <strong>Telefon:</strong><br />
                      <a href="tel:017642747786" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>
                        0176 42747786
                      </a>
                    </div>
                    <div>
                      <strong>E-Mail:</strong><br />
                      <a href="mailto:info@loopnex.de" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>
                        info@loopnex.de
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <strong>Website:</strong><br />
                    <a href="https://ki-textstudio.vercel.app" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>
                      https://ki-textstudio.vercel.app
                    </a>
                  </div>
                </div>

                <div className="contact-services" style={{ marginBottom: '2rem' }}>
                  <h3 style={{ color: 'var(--primary-navy)', marginBottom: '1rem' }}>🚀 Unsere Services</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                      <h4 style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>ATS-Revolution: Einzelbewerbung</h4>
                      <p style={{ margin: '0', fontSize: '0.9rem' }}>
                        Bewerbungen, die nicht im Papierkorb landen
                      </p>
                      <p style={{ margin: '0.5rem 0 0 0', fontWeight: 'bold', color: 'var(--accent-gold)' }}>
                        29€ (statt 58€)
                      </p>
                    </div>
                    
                    <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                      <h4 style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>ATS-Revolution: Bündel</h4>
                      <p style={{ margin: '0', fontSize: '0.9rem' }}>
                        3 Bewerbungen für aktive Jobsuche
                      </p>
                      <p style={{ margin: '0.5rem 0 0 0', fontWeight: 'bold', color: 'var(--accent-gold)' }}>
                        49€ (statt 87€)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="contact-faq" style={{ marginBottom: '2rem' }}>
                  <h3 style={{ color: 'var(--primary-navy)', marginBottom: '1rem' }}>❓ Häufige Fragen</h3>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>Wie funktioniert die ATS-Revolution?</h4>
                    <p style={{ margin: '0', fontSize: '0.9rem' }}>
                      Unsere Enterprise AI extrahiert automatisch Keywords aus Stellenausschreibungen und erstellt ATS-optimierte Bewerbungen, die von Robotern erkannt werden.
                    </p>
                  </div>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>Wie schnell erhalte ich meine Bewerbung?</h4>
                    <p style={{ margin: '0', fontSize: '0.9rem' }}>
                      Innerhalb von 5-10 Minuten nach der Zahlung erhalten Sie Ihre optimierte Bewerbung per E-Mail.
                    </p>
                  </div>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>Was ist der Unterschied zu ChatGPT?</h4>
                    <p style={{ margin: '0', fontSize: '0.9rem' }}>
                      Wir nutzen Enterprise AI mit 1000+ Stunden Prompt-Engineering speziell für deutsche Bewerbungen und ATS-Optimierung.
                    </p>
                  </div>
                  
                  <div>
                    <h4 style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>Kann ich Änderungen anfordern?</h4>
                    <p style={{ margin: '0', fontSize: '0.9rem' }}>
                      Ja, bei Bedarf können Sie kostenlose Anpassungen anfordern. Kontaktieren Sie uns einfach per E-Mail.
                    </p>
                  </div>
                </div>

                <div className="contact-cta" style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'var(--accent-gold)', borderRadius: '8px', color: 'white' }}>
                  <h3 style={{ marginBottom: '1rem' }}>🚀 Bereit für die ATS-Revolution?</h3>
                  <p style={{ marginBottom: '1.5rem' }}>
                    Starten Sie jetzt mit Ihrer ersten ATS-optimierten Bewerbung
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a href="/bewerbung" className="btn-primary" style={{ 
                      backgroundColor: 'white', 
                      color: 'var(--accent-gold)', 
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '600'
                    }}>
                      Einzelbewerbung - 29€
                    </a>
                    <a href="/bewerbung-bundle" className="btn-primary" style={{ 
                      backgroundColor: 'white', 
                      color: 'var(--accent-gold)', 
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '600'
                    }}>
                      Bündel - 49€
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 