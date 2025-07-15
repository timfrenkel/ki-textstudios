'use client'

import { useState } from 'react'
import { getStripe } from '@/lib/stripe'

interface FormData {
  currentProfile: string
  age: string
  gender: string
  interests: string
  targetAudience: string
  profession: string
  email: string
  platform: string
  specialRequests: string
}

export default function Dating() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    currentProfile: '',
    age: '',
    gender: '',
    interests: '',
    targetAudience: '',
    profession: '',
    email: '',
    platform: '',
    specialRequests: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!formData.currentProfile.trim()) {
      alert('Bitte geben Sie Ihr aktuelles Profil ein.')
      return false
    }
    if (!formData.age.trim()) {
      alert('Bitte geben Sie Ihr Alter ein.')
      return false
    }
    if (!formData.email.trim()) {
      alert('Bitte geben Sie eine E-Mail-Adresse ein.')
      return false
    }
    if (!formData.platform) {
      alert('Bitte wählen Sie eine Dating-App aus.')
      return false
    }
    return true
  }

  const handlePayment = async () => {
    if (!validateForm()) return

    setLoading(true)
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          service: 'dating',
          formData: formData 
        }),
      })

      const { sessionId } = await response.json()
      const stripe = await getStripe()
      
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId })
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Fehler beim Weiterleiten zur Zahlung. Bitte versuchen Sie es erneut.')
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
                    name="currentProfile"
                    className="form-textarea"
                    rows={5}
                    placeholder="Beschreiben Sie sich kurz oder fügen Sie Ihren aktuellen Profiltext ein..."
                    value={formData.currentProfile}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="form-help">Auch Stichpunkte zu Ihrer Persönlichkeit reichen aus</span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Alter
                  </label>
                  <input
                    type="number"
                    name="age"
                    className="form-input"
                    placeholder="25"
                    min="18"
                    max="99"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Geschlecht
                  </label>
                  <select 
                    name="gender"
                    className="form-select"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="Männlich">Männlich</option>
                    <option value="Weiblich">Weiblich</option>
                    <option value="Divers">Divers</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    Hobbys & Interessen
                  </label>
                  <input
                    type="text"
                    name="interests"
                    className="form-input"
                    placeholder="z.B. Reisen, Sport, Kochen, Musik, Fotografie..."
                    value={formData.interests}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="form-help">Nennen Sie 3-5 Ihrer Hauptinteressen</span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Was suchen Sie?
                  </label>
                  <select 
                    name="targetAudience"
                    className="form-select"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="Feste Beziehung">Feste Beziehung</option>
                    <option value="Lockeres Dating">Lockeres Dating</option>
                    <option value="Neue Freunde">Neue Freunde</option>
                    <option value="Bin offen für alles">Bin offen für alles</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Beruf/Studium
                  </label>
                  <input
                    type="text"
                    name="profession"
                    className="form-input"
                    placeholder="z.B. Marketing Manager, Student der BWL..."
                    value={formData.profession}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    E-Mail für Zusendung
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="ihre@email.de"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="form-help">Wir senden Ihr optimiertes Profil an diese Adresse</span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Gewünschte Dating-App
                  </label>
                  <select 
                    name="platform"
                    className="form-select"
                    value={formData.platform}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="Tinder">Tinder</option>
                    <option value="Bumble">Bumble</option>
                    <option value="Hinge">Hinge</option>
                    <option value="Lovoo">Lovoo</option>
                    <option value="Badoo">Badoo</option>
                    <option value="Parship">Parship</option>
                    <option value="ElitePartner">ElitePartner</option>
                    <option value="Andere/Mehrere">Andere/Mehrere</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    Besondere Wünsche (optional)
                  </label>
                  <textarea
                    name="specialRequests"
                    className="form-textarea"
                    rows={3}
                    placeholder="Spezielle Tonalität, zu betonende Eigenschaften, etc..."
                    value={formData.specialRequests}
                    onChange={handleInputChange}
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