'use client';

import React, { useState } from 'react';

interface FormData {
  jobDetails: string;
  background: string;
  specialRequests: string;
  resumeFile?: File;
  linkedinUrl: string;
  email: string;
  tone: string;
}

export default function BewerbungPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    jobDetails: '',
    background: '',
    specialRequests: '',
    linkedinUrl: '',
    email: '',
    tone: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    'Jobdetails',
    'Dein Hintergrund', 
    'Zusätzliche Infos',
    'Bezahlung'
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.jobDetails.trim()) {
        newErrors.jobDetails = 'Bitte füge die Stellenausschreibung ein';
      }
    }

    if (step === 2) {
      if (!formData.background.trim()) {
        newErrors.background = 'Bitte erzähl uns von dir';
      }
    }

    if (step === 3) {
      if (!formData.email.trim()) {
        newErrors.email = 'E-Mail-Adresse ist erforderlich';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Ungültige E-Mail-Adresse';
      }
      
      if (!formData.tone) {
        newErrors.tone = 'Bitte wähle einen Tonfall';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({ ...prev, resumeFile: file }));
    } else {
      alert('Bitte lade nur PDF-Dateien hoch');
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('service', 'bewerbung');
      formDataToSend.append('jobDetails', formData.jobDetails);
      formDataToSend.append('background', formData.background);
      formDataToSend.append('specialRequests', formData.specialRequests);
      formDataToSend.append('linkedinUrl', formData.linkedinUrl);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('tone', formData.tone);
      
      if (formData.resumeFile) {
        formDataToSend.append('resumeFile', formData.resumeFile);
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Fehler beim Erstellen der Zahlung');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Submission error:', error);
      alert('Es gab einen Fehler. Bitte versuche es erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label">
                📝 Stellenausschreibung *
              </label>
              <textarea
                value={formData.jobDetails}
                onChange={(e) => setFormData(prev => ({ ...prev, jobDetails: e.target.value }))}
                className={`form-textarea ${errors.jobDetails ? 'error' : ''}`}
                rows={12}
                placeholder="Kopiere hier die komplette Stellenausschreibung... GPT holt sich daraus alle wichtigen Informationen: Aufgaben, Anforderungen, Keywords und Tonalität."
                style={{ minHeight: '300px' }}
              />
              {errors.jobDetails && (
                <span className="form-help" style={{ color: 'red' }}>{errors.jobDetails}</span>
              )}
              <span className="form-help">
                ✅ Füge die komplette Stellenausschreibung ein - GPT analysiert automatisch alle relevanten Details
              </span>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label">
                👤 Deine Erfahrung und Hintergrund *
              </label>
              <textarea
                value={formData.background}
                onChange={(e) => setFormData(prev => ({ ...prev, background: e.target.value }))}
                className={`form-textarea ${errors.background ? 'error' : ''}`}
                rows={10}
                placeholder="Ich bin UX-Designer mit 3 Jahren Erfahrung, arbeite aktuell bei Firma XY. Ich habe vorher Medieninformatik studiert, bin stark in Figma, HTML und Kommunikation. Ich möchte in ein kreativeres Umfeld wechseln."
                style={{ minHeight: '250px' }}
              />
              {errors.background && (
                <span className="form-help" style={{ color: 'red' }}>{errors.background}</span>
              )}
              <span className="form-help">
                Teile mit: aktueller Job, 1-2 vorherige Stationen, Ausbildung, Stärken/Tools/Soft Skills
              </span>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label">
                📦 Besondere Wünsche (optional)
              </label>
              <textarea
                value={formData.specialRequests}
                onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                className="form-textarea"
                rows={4}
                placeholder="Ich will selbstbewusst wirken, bitte die Führungsstärke betonen. Ich war 6 Monate in Elternzeit – das elegant einbauen."
              />
              <span className="form-help">
                z.B. Stil, Fokus, Lücken im Lebenslauf, spezielle Betonungen
              </span>
            </div>

            <div className="form-group">
              <label className="form-label">
                📎 Lebenslauf (PDF, optional)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="form-file"
              />
              <span className="form-help">
                PDF-Format, max. 10MB - für bessere Personalisierung
              </span>
            </div>

            <div className="form-group">
              <label className="form-label">
                LinkedIn-Profil (optional)
              </label>
              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                className="form-input"
                placeholder="https://linkedin.com/in/dein-profil"
              />
              <span className="form-help">
                Alternative zum Lebenslauf-Upload
              </span>
            </div>

            <div className="form-group">
              <label className="form-label">
                📧 E-Mail-Adresse *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="deine@email.de"
              />
              {errors.email && (
                <span className="form-help" style={{ color: 'red' }}>{errors.email}</span>
              )}
              <span className="form-help">
                Wir senden dein optimiertes Anschreiben an diese Adresse
              </span>
            </div>

            <div className="form-group">
              <label className="form-label">
                🎙️ Wie soll dein Anschreiben klingen? *
              </label>
              <select
                value={formData.tone}
                onChange={(e) => setFormData(prev => ({ ...prev, tone: e.target.value }))}
                className={`form-select ${errors.tone ? 'error' : ''}`}
              >
                <option value="">Tonfall wählen</option>
                <option value="freundlich-engagiert">Freundlich & engagiert</option>
                <option value="klar-sachlich">Klar & sachlich</option>
                <option value="selbstbewusst-direkt">Selbstbewusst & direkt</option>
                <option value="kreativ-locker">Kreativ & locker</option>
              </select>
              {errors.tone && (
                <span className="form-help" style={{ color: 'red' }}>{errors.tone}</span>
              )}
              <span className="form-help">
                Wähle den passenden Stil für deine Branche
              </span>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="service-summary">
            <div className="summary-content">
              <h3>Was du erhältst:</h3>
              <ul className="summary-list">
                <li>✓ KI-optimiertes Anschreiben, perfekt auf die Stelle zugeschnitten</li>
                <li>✓ Professionelle Sprache und Struktur</li>
                <li>✓ Keyword-optimiert für ATS-Systeme</li>
                <li>✓ Passend zu deinem gewählten Tonfall</li>
                <li>✓ Zustellung in wenigen Minuten per E-Mail</li>
              </ul>
              <div className="summary-price">
                <span className="price-label">Gesamtpreis:</span>
                <span className="price-value">29€</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
                <p className="service-hero-subtitle">
                  Lass KI dein perfektes Anschreiben erstellen - maßgeschneidert für deine Traumstelle
                </p>
                <div className="service-hero-price">29€</div>
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
              <h2>Dein optimiertes Anschreiben</h2>
              <p>Folge den Schritten und erhalte in wenigen Minuten dein KI-optimiertes Bewerbungsschreiben</p>
            </div>

            <div className="service-form">
              {/* Progress Indicator */}
              <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <div className="form-label" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                  Schritt {currentStep} von {steps.length}: {steps[currentStep - 1]}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                  {steps.map((_, index) => (
                    <div 
                      key={index}
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: index + 1 <= currentStep ? 'var(--accent-gold)' : 'var(--light-gray)'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Form Content */}
              {renderFormContent()}

              {/* Navigation Buttons */}
              <div className="form-actions" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn-payment"
                    style={{ 
                      background: 'var(--light-gray)', 
                      color: 'var(--text-dark)',
                      minWidth: '150px',
                      fontSize: '1rem'
                    }}
                  >
                    ← Zurück
                  </button>
                )}
                
                <div style={{ marginLeft: 'auto' }}>
                  {currentStep === steps.length ? (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="btn-payment"
                    >
                      {isLoading ? (
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
                  ) : (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn-payment"
                      style={{ minWidth: '150px', fontSize: '1rem' }}
                    >
                      Weiter →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 