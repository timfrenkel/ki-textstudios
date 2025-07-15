'use client'

import { useState } from 'react'
import { getStripe } from '@/lib/stripe'

export default function Dating() {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ service: 'dating' }),
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
            src="https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=1920&h=600&fit=crop" 
            alt="Dating-Profil optimieren" 
            className="hero-bg"
          />
          <div className="hero-overlay">
            <div className="container">
              <div className="service-hero-content">
                <div className="service-badge badge-pink">Neu</div>
                <h1 className="service-hero-title">Dating-Profil optimieren</h1>
                <p className="service-hero-subtitle">Unwiderstehliche Profile für mehr Matches auf Dating-Apps</p>
                <div className="service-hero-price">ab 19€</div>
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
              <h2>Ihr unwiderstehliches Dating-Profil</h2>
              <p>Erstellen Sie ein Profil, das garantiert mehr Matches und bessere Gespräche bringt</p>
            </div>

            <form className="service-form">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label className="form-label">
                    Ihr aktueller Profiltext
                  </label>
                  <textarea
                    className="form-textarea"
                    rows={5}
                    placeholder="Beschreiben Sie sich kurz oder fügen Sie Ihren aktuellen Profiltext ein..."
                  />
                  <span className="form-help">Auch Stichpunkte zu Ihrer Persönlichkeit reichen aus</span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Alter
                  </label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="25"
                    min="18"
                    max="99"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Geschlecht
                  </label>
                  <select className="form-select">
                    <option>Männlich</option>
                    <option>Weiblich</option>
                    <option>Divers</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    Hobbys & Interessen
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="z.B. Reisen, Sport, Kochen, Musik, Fotografie..."
                  />
                  <span className="form-help">Nennen Sie 3-5 Ihrer Hauptinteressen</span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Was suchen Sie?
                  </label>
                  <select className="form-select">
                    <option>Feste Beziehung</option>
                    <option>Lockeres Dating</option>
                    <option>Neue Freunde</option>
                    <option>Bin offen für alles</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Beruf/Studium
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="z.B. Marketing Manager, Student der BWL..."
                  />
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
                  <span className="form-help">Wir senden Ihr optimiertes Profil an diese Adresse</span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Gewünschte Dating-App
                  </label>
                  <select className="form-select">
                    <option>Tinder</option>
                    <option>Bumble</option>
                    <option>Hinge</option>
                    <option>Lovoo</option>
                    <option>Badoo</option>
                    <option>Parship</option>
                    <option>ElitePartner</option>
                    <option>Andere/Mehrere</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    Besondere Wünsche (optional)
                  </label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    placeholder="Spezielle Tonalität, zu betonende Eigenschaften, etc..."
                  />
                </div>
              </div>

              <div className="service-summary">
                <div className="summary-content">
                  <h3>Was Sie erhalten:</h3>
                  <ul className="summary-list">
                    <li>✓ Optimierte Bio mit psychologisch wirksamen Formulierungen</li>
                    <li>✓ 3-5 unterschiedliche Versionen für verschiedene Apps</li>
                    <li>✓ Tipps für bessere Fotos und Profilgestaltung</li>
                    <li>✓ Gesprächsstarter und Eisbrecher-Vorschläge</li>
                    <li>✓ Lieferung innerhalb von 24 Stunden</li>
                  </ul>
                  <div className="summary-price">
                    <span className="price-label">Gesamtpreis:</span>
                    <span className="price-value">19€</span>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={loading}
                  className="btn-payment"
                  style={{ background: '#ec4899' }}
                >
                  {loading ? (
                    <>
                      <span className="payment-spinner"></span>
                      Weiterleitung zu Stripe...
                    </>
                  ) : (
                    <>
                      Profil optimieren - 19€
                      <span className="payment-secure">🔒 Sichere Zahlung über Stripe</span>
                    </>
                  )}
                </button>
                <p className="payment-note">
                  Nach der Zahlung erstellen wir Ihr perfektes Dating-Profil und senden es innerhalb von 24h.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
} 