'use client'

import { useState } from 'react'
import { getStripe } from '@/lib/stripe'

interface FormData {
  platform: string
  targetAudience: string
  currentBio: string
  profession: string
  industry: string
  expertise: string
  style: string
  email: string
  specialRequests: string
}

export default function Bio() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    platform: '',
    targetAudience: '',
    currentBio: '',
    profession: '',
    industry: '',
    expertise: '',
    style: '',
    email: '',
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
    if (!formData.currentBio.trim()) {
      alert('Bitte geben Sie Ihre aktuelle Bio ein.')
      return false
    }
    if (!formData.profession.trim()) {
      alert('Bitte geben Sie Ihren Beruf ein.')
      return false
    }
    if (!formData.email.trim()) {
      alert('Bitte geben Sie eine E-Mail-Adresse ein.')
      return false
    }
    if (!formData.platform) {
      alert('Bitte wählen Sie eine Plattform aus.')
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
          service: 'bio',
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
                  <select 
                    name="platform"
                    className="form-select"
                    value={formData.platform}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Twitter/X">Twitter/X</option>
                    <option value="TikTok">TikTok</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Xing">Xing</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Mehrere Plattformen">Mehrere Plattformen</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Ziel der Bio
                  </label>
                  <select 
                    name="targetAudience"
                    className="form-select"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="Berufliche Kontakte knüpfen">Berufliche Kontakte knüpfen</option>
                    <option value="Personal Branding aufbauen">Personal Branding aufbauen</option>
                    <option value="Mehr Follower gewinnen">Mehr Follower gewinnen</option>
                    <option value="Kunden/Geschäftspartner gewinnen">Kunden/Geschäftspartner gewinnen</option>
                    <option value="Als Experte wahrgenommen werden">Als Experte wahrgenommen werden</option>
                    <option value="Kreative Präsenz zeigen">Kreative Präsenz zeigen</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    Ihre aktuelle Bio
                  </label>
                  <textarea
                    name="currentBio"
                    className="form-textarea"
                    rows={4}
                    placeholder="Fügen Sie Ihre aktuelle Bio ein oder beschreiben Sie sich kurz..."
                    value={formData.currentBio}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="form-help">Auch unvollständige Texte oder Stichpunkte sind ausreichend</span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Beruf/Tätigkeit
                  </label>
                  <input
                    type="text"
                    name="profession"
                    className="form-input"
                    placeholder="z.B. Digital Marketing Manager, Freelance Designer..."
                    value={formData.profession}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Branche/Bereich
                  </label>
                  <select 
                    name="industry"
                    className="form-select"
                    value={formData.industry}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="Marketing & Kommunikation">Marketing & Kommunikation</option>
                    <option value="IT & Software">IT & Software</option>
                    <option value="Design & Kreatives">Design & Kreatives</option>
                    <option value="Consulting & Beratung">Consulting & Beratung</option>
                    <option value="Vertrieb & Sales">Vertrieb & Sales</option>
                    <option value="Finance & Controlling">Finance & Controlling</option>
                    <option value="HR & Personalwesen">HR & Personalwesen</option>
                    <option value="Gesundheitswesen">Gesundheitswesen</option>
                    <option value="Bildung & Training">Bildung & Training</option>
                    <option value="E-Commerce & Retail">E-Commerce & Retail</option>
                    <option value="Andere">Andere</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    Expertise & Schwerpunkte
                  </label>
                  <input
                    type="text"
                    name="expertise"
                    className="form-input"
                    placeholder="z.B. SEO, Content Marketing, UI/UX Design, Data Analytics..."
                    value={formData.expertise}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="form-help">Nennen Sie 3-5 Ihrer Hauptkompetenzen</span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Persönlichkeit/Stil
                  </label>
                  <select 
                    name="style"
                    className="form-select"
                    value={formData.style}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="Professionell & seriös">Professionell & seriös</option>
                    <option value="Kreativ & innovativ">Kreativ & innovativ</option>
                    <option value="Humorvoll & locker">Humorvoll & locker</option>
                    <option value="Inspirierend & motivierend">Inspirierend & motivierend</option>
                    <option value="Authentisch & persönlich">Authentisch & persönlich</option>
                    <option value="Sachlich & kompetent">Sachlich & kompetent</option>
                  </select>
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
                  <span className="form-help">Wir senden Ihre optimierte Bio an diese Adresse</span>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    Besondere Wünsche (optional)
                  </label>
                  <textarea
                    name="specialRequests"
                    className="form-textarea"
                    rows={3}
                    placeholder="Spezielle Keywords, Tonalität, Links die erwähnt werden sollen..."
                    value={formData.specialRequests}
                    onChange={handleInputChange}
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