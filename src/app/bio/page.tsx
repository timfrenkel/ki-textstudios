'use client'

import { useState } from 'react'
import { getStripe } from '@/lib/stripe'

export default function Bio() {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ service: 'bio' }),
      })

      const { sessionId } = await response.json()
      const stripe = await getStripe()
      
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId })
      }
    } catch (error) {
      console.error('Payment error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="service-page">
      {/* Hero Section */}
      <section className="service-hero">
        <div className="service-hero-bg">
          <img 
            src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1920&h=600&fit=crop" 
            alt="Social Media Bio optimieren" 
            className="hero-bg"
          />
          <div className="hero-overlay">
            <div className="container">
              <div className="service-hero-content">
                <h1 className="service-hero-title">Social Media Bio optimieren</h1>
                <p className="service-hero-subtitle">Überzeugende Bios für LinkedIn, Instagram und Co.</p>
                <div className="service-hero-price">ab 15€</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="service-form-section section-padding">
        <div className="container">
          <div className="service-form-wrapper">
            <div className="service-form-header">
              <h2>Ihre perfekte Social Media Bio</h2>
              <p>Hinterlassen Sie einen unvergesslichen ersten Eindruck auf allen Plattformen</p>
            </div>

            <form className="service-form">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    Platform
                  </label>
                  <select className="form-select">
                    <option>LinkedIn</option>
                    <option>Instagram</option>
                    <option>Twitter/X</option>
                    <option>TikTok</option>
                    <option>Facebook</option>
                    <option>Xing</option>
                    <option>YouTube</option>
                    <option>Mehrere Plattformen</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Ziel der Bio
                  </label>
                  <select className="form-select">
                    <option>Berufliche Kontakte knüpfen</option>
                    <option>Personal Branding aufbauen</option>
                    <option>Mehr Follower gewinnen</option>
                    <option>Kunden/Geschäftspartner gewinnen</option>
                    <option>Als Experte wahrgenommen werden</option>
                    <option>Kreative Präsenz zeigen</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    Ihre aktuelle Bio
                  </label>
                  <textarea
                    className="form-textarea"
                    rows={4}
                    placeholder="Fügen Sie Ihre aktuelle Bio ein oder beschreiben Sie sich kurz..."
                  />
                  <span className="form-help">Auch unvollständige Texte oder Stichpunkte sind ausreichend</span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Beruf/Tätigkeit
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="z.B. Digital Marketing Manager, Freelance Designer..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Branche/Bereich
                  </label>
                  <select className="form-select">
                    <option>Marketing & Kommunikation</option>
                    <option>IT & Software</option>
                    <option>Design & Kreatives</option>
                    <option>Consulting & Beratung</option>
                    <option>Vertrieb & Sales</option>
                    <option>Finance & Controlling</option>
                    <option>HR & Personalwesen</option>
                    <option>Gesundheitswesen</option>
                    <option>Bildung & Training</option>
                    <option>E-Commerce & Retail</option>
                    <option>Andere</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    Expertise & Schwerpunkte
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="z.B. SEO, Content Marketing, UI/UX Design, Data Analytics..."
                  />
                  <span className="form-help">Nennen Sie 3-5 Ihrer Hauptkompetenzen</span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Persönlichkeit/Stil
                  </label>
                  <select className="form-select">
                    <option>Professionell & seriös</option>
                    <option>Kreativ & innovativ</option>
                    <option>Humorvoll & locker</option>
                    <option>Inspirierend & motivierend</option>
                    <option>Authentisch & persönlich</option>
                    <option>Sachlich & kompetent</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    E-Mail für Zusendung
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="ihre@email.de"
                    required
                  />
                  <span className="form-help">Wir senden Ihre optimierte Bio an diese Adresse</span>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    Besondere Wünsche (optional)
                  </label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    placeholder="Spezielle Keywords, Tonalität, Links die erwähnt werden sollen..."
                  />
                </div>
              </div>

              <div className="service-summary">
                <div className="summary-content">
                  <h3>Was Sie erhalten:</h3>
                  <ul className="summary-list">
                    <li>✓ 3-5 verschiedene Bio-Versionen für optimale Auswahl</li>
                    <li>✓ Plattform-spezifische Anpassungen und Optimierung</li>
                    <li>✓ SEO-optimierte Keywords für bessere Auffindbarkeit</li>
                    <li>✓ Call-to-Action Empfehlungen für mehr Interaktion</li>
                    <li>✓ Lieferung innerhalb von 24 Stunden</li>
                  </ul>
                  <div className="summary-price">
                    <span className="price-label">Gesamtpreis:</span>
                    <span className="price-value">15€</span>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={loading}
                  className="btn-payment"
                  style={{ background: '#10b981' }}
                >
                  {loading ? (
                    <>
                      <span className="payment-spinner"></span>
                      Weiterleitung zu Stripe...
                    </>
                  ) : (
                    <>
                      Bio optimieren - 15€
                      <span className="payment-secure">🔒 Sichere Zahlung über Stripe</span>
                    </>
                  )}
                </button>
                <p className="payment-note">
                  Nach der Zahlung erstellen wir Ihre perfekte Social Media Bio und senden sie innerhalb von 24h.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
} 