'use client'

import { useState, FormEvent } from 'react'
import { getStripe } from '@/lib/stripe'

interface FormData {
  jobDescription: string
  currentLetter: string
  resume?: File
  industry: string
  style: string
  email: string
  specialRequests: string
}

export default function Bewerbung() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    jobDescription: '',
    currentLetter: '',
    industry: '',
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        resume: file
      }))
    }
  }

  const validateForm = () => {
    if (!formData.jobDescription.trim()) {
      alert('Bitte geben Sie eine Stellenausschreibung ein.')
      return false
    }
    if (!formData.currentLetter.trim()) {
      alert('Bitte geben Sie Ihr aktuelles Anschreiben ein.')
      return false
    }
    if (!formData.email.trim()) {
      alert('Bitte geben Sie eine E-Mail-Adresse ein.')
      return false
    }
    if (!formData.style) {
      alert('Bitte wählen Sie eine gewünschte Wirkung aus.')
      return false
    }
    return true
  }

  const handlePayment = async () => {
    if (!validateForm()) return

    setLoading(true)
    
    try {
      // Formular-Daten zur Session hinzufügen
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          service: 'bewerbung',
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
            src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1920&h=600&fit=crop" 
            alt="Bewerbung optimieren" 
            className="hero-bg"
          />
          <div className="hero-overlay">
            <div className="container">
              <div className="service-hero-content">
                <h1 className="service-hero-title">Bewerbung optimieren</h1>
                <p className="service-hero-subtitle">KI-optimierte Anschreiben und Lebensläufe für Ihren Traumjob</p>
                <div className="service-hero-price">ab 29€</div>
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
              <h2>Ihre Bewerbung perfektionieren</h2>
              <p>Geben Sie Ihre Daten ein und erhalten Sie innerhalb von 24h eine KI-optimierte Bewerbung</p>
            </div>

            <form className="service-form">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label className="form-label">
                    Stellenausschreibung
                  </label>
                  <textarea
                    name="jobDescription"
                    className="form-textarea"
                    rows={4}
                    placeholder="Fügen Sie hier die komplette Stellenausschreibung ein..."
                    value={formData.jobDescription}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="form-help">Kopieren Sie die vollständige Stellenausschreibung für beste Ergebnisse</span>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    Ihr aktuelles Anschreiben
                  </label>
                  <textarea
                    name="currentLetter"
                    className="form-textarea"
                    rows={8}
                    placeholder="Ihr aktuelles Anschreiben oder Stichpunkte zu Ihren Qualifikationen..."
                    value={formData.currentLetter}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="form-help">Auch Stichpunkte oder unvollständige Texte sind ausreichend</span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Lebenslauf (PDF)
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    className="form-file"
                    onChange={handleFileChange}
                  />
                  <span className="form-help">Optional: Aktueller Lebenslauf für bessere Personalisierung</span>
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
                    <option value="IT/Software Entwicklung">IT/Software Entwicklung</option>
                    <option value="Marketing/Kommunikation">Marketing/Kommunikation</option>
                    <option value="Vertrieb/Sales">Vertrieb/Sales</option>
                    <option value="Finanzen/Controlling">Finanzen/Controlling</option>
                    <option value="HR/Personalwesen">HR/Personalwesen</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Gesundheitswesen">Gesundheitswesen</option>
                    <option value="Ingenieurswesen">Ingenieurswesen</option>
                    <option value="Andere">Andere</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Gewünschte Wirkung/Stil
                  </label>
                  <select 
                    name="style"
                    className="form-select"
                    value={formData.style}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="professionell">Professionell & Seriös</option>
                    <option value="dynamisch">Dynamisch & Innovativ</option>
                    <option value="sympathisch">Sympathisch & Nahbar</option>
                    <option value="fuehrungsstark">Führungsstark & Durchsetzungsfähig</option>
                  </select>
                  <span className="form-help">Wie möchten Sie auf potenzielle Arbeitgeber wirken?</span>
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
                  <span className="form-help">Wir senden Ihre optimierten Unterlagen an diese Adresse</span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Besondere Wünsche (optional)
                  </label>
                  <textarea
                    name="specialRequests"
                    className="form-textarea"
                    rows={3}
                    placeholder="Spezielle Anforderungen, Tonalität, Schwerpunkte..."
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="service-summary">
                <div className="summary-content">
                  <h3>Was Sie erhalten:</h3>
                  <ul className="summary-list">
                    <li>✓ KI-optimiertes Anschreiben, perfekt auf die Stelle zugeschnitten</li>
                    <li>✓ Überarbeiteter Lebenslauf mit professioneller Formatierung</li>
                    <li>✓ ATS-optimiert für automatische Bewerbungssysteme</li>
                    <li>✓ Persönliche Empfehlungen für Ihre Bewerbungsstrategie</li>
                    <li>✓ Lieferung innerhalb von 24 Stunden</li>
                  </ul>
                  <div className="summary-price">
                    <span className="price-label">Gesamtpreis:</span>
                    <span className="price-value">29€</span>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={loading}
                  className="btn-payment"
                >
                  {loading ? (
                    <>
                      <span className="payment-spinner"></span>
                      Weiterleitung zu Stripe...
                    </>
                  ) : (
                    <>
                      Jetzt optimieren - 29€
                      <span className="payment-secure">🔒 Sichere Zahlung über Stripe</span>
                    </>
                  )}
                </button>
                <p className="payment-note">
                  Nach der Zahlung bearbeiten wir Ihre Bewerbung und senden sie innerhalb von 24h an Ihre E-Mail-Adresse.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
} 