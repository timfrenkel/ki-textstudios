'use client'

export default function ATSInfo() {
  return (
    <div className="service-page">
      {/* Hero Section */}
      <section className="service-hero">
        <div className="service-hero-bg">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=600&fit=crop" 
            alt="ATS-Systeme verstehen" 
            className="hero-bg"
          />
          <div className="hero-overlay">
            <div className="container">
              <div className="service-hero-content">
                <h1 className="service-hero-title">ATS-Systeme verstehen</h1>
                <p className="service-hero-subtitle">Warum 75% der Bewerbungen automatisch aussortiert werden</p>
                <div className="service-hero-teaser">💡 Erfahre, wie du zu den 25% gehörst, die durchkommen</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="service-form-section">
        <div className="container">
          <div className="service-form-wrapper">
            <div className="service-form-header">
              <h2>ATS-Systeme: Warum du UNSERE Dienstleistung brauchst</h2>
              <p>Die harte Realität: 75% der Bewerbungen werden automatisch aussortiert</p>
            </div>

            <div className="service-form" style={{ padding: 'var(--spacing-2xl)' }}>
              
              <div className="ats-content">
                
                <div className="ats-section">
                  <h3>⚠️ Das Problem: 75% werden automatisch aussortiert</h3>
                  <p>
                    <strong>ATS-Systeme</strong> sind Bewerbungsroboter, die deine Bewerbung <strong>SOFORT</strong> ablehnen, 
                    wenn sie nicht die richtigen Keywords enthält.
                  </p>
                </div>

                <div className="ats-section">
                  <h3>🎯 Realitätsbeispiel:</h3>
                  <div className="ats-example">
                    <div className="example-item">
                      <strong>Du schreibst:</strong> "Ich habe 5 Jahre Erfahrung in Marketing"
                    </div>
                    <div className="example-item">
                      <strong>Stellenausschreibung:</strong> "Digital Marketing Manager"
                    </div>
                    <div className="example-item">
                      <strong>ATS sucht nach:</strong> "Digital Marketing", "SEO", "Social Media"
                    </div>
                    <div className="example-result">
                      <strong>→ Ergebnis:</strong> Deine Bewerbung wird AUSSORTIERT
                    </div>
                  </div>
                </div>

                <div className="ats-section">
                  <h3>❌ Warum scheitern 75%?</h3>
                  <div className="ats-reasons">
                    <div className="reason-item">
                      <span className="reason-number">1</span>
                      <div>
                        <strong>Fehlende Keywords (40%)</strong> - ATS erkennt deine Qualifikation nicht
                      </div>
                    </div>
                    <div className="reason-item">
                      <span className="reason-number">2</span>
                      <div>
                        <strong>Falsche Formatierung (25%)</strong> - ATS kann deine Bewerbung nicht lesen
                      </div>
                    </div>
                    <div className="reason-item">
                      <span className="reason-number">3</span>
                      <div>
                        <strong>Keine ATS-Optimierung (10%)</strong> - Du kennst die ATS-Regeln nicht
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ats-section">
                  <h3>📊 Das bedeutet:</h3>
                  <ul className="ats-facts">
                    <li><strong>90% der Unternehmen</strong> nutzen ATS-Systeme</li>
                    <li><strong>Deine Konkurrenz</strong> nutzt kostenlose KI → wird aussortiert</li>
                    <li><strong>Du brauchst Experten-KI</strong> → kommst durch</li>
                  </ul>
                </div>

                <div className="ats-section">
                  <h3>✅ Warum unsere Experten-KI entscheidend ist:</h3>
                  <div className="ats-benefits">
                    <div className="benefit-item">
                      <span className="benefit-icon">🎯</span>
                      <div>
                        <strong>Automatische Keyword-Extraktion</strong> - Findet alle wichtigen Begriffe
                      </div>
                    </div>
                    <div className="benefit-item">
                      <span className="benefit-icon">📝</span>
                      <div>
                        <strong>ATS-optimierte Formatierung</strong> - Wird von Robotern erkannt
                      </div>
                    </div>
                    <div className="benefit-item">
                      <span className="benefit-icon">⚡</span>
                      <div>
                        <strong>1000+ Stunden Expertise</strong> - Versteht ATS-Logik
                      </div>
                    </div>
                    <div className="benefit-item">
                      <span className="benefit-icon">📈</span>
                      <div>
                        <strong>3x höhere Erfolgsrate</strong> - Du gehörst zu den 25% die durchkommen
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ats-section">
                  <h3>🎯 Die Wahl:</h3>
                  <div className="ats-choice">
                    <div className="choice-bad">
                      <strong>Ohne unsere Experten-KI:</strong> 75% Chance auf automatische Ablehnung
                    </div>
                    <div className="choice-good">
                      <strong>Mit unserer Experten-KI:</strong> 25% Chance auf Weiterleitung (3x besser!)
                    </div>
                  </div>
                </div>

                <div className="ats-conclusion">
                  <h3>🚨 Fazit:</h3>
                  <p>
                    <strong>Entweder du optimierst für ATS-Systeme oder dein Traumjob landet im digitalen Papierkorb</strong> - 
                    bevor je ein Mensch deine Bewerbung sieht.
                  </p>
                  <p>
                    <strong>Du brauchst diese Dienstleistung DRINGEND, sonst bekommst du deinen Traumjob nicht.</strong>
                  </p>
                </div>

                <div className="ats-cta">
                  <a href="/bewerbung" className="btn-payment" style={{ background: '#10b981', marginTop: 'var(--spacing-xl)' }}>
                    Jetzt ATS-optimierte Bewerbung erstellen - 50% Rabatt
                  </a>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 