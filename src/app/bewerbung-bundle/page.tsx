'use client';

import React, { useState } from 'react';

interface JobApplication {
  jobDetails: string;
  companyName: string;
  position: string;
}

interface FormData {
  background: string;
  specialRequests: string;
  resumeFile?: File;
  linkedinUrl: string;
  email: string;
  tone: string;
  applications: JobApplication[];
}

export default function BewerbungBundlePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    background: '',
    specialRequests: '',
    linkedinUrl: '',
    email: '',
    tone: '',
    applications: [
      { jobDetails: '', companyName: '', position: '' },
      { jobDetails: '', companyName: '', position: '' },
      { jobDetails: '', companyName: '', position: '' }
    ]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    'Dein Hintergrund',
    'Job 1',
    'Job 2', 
    'Job 3',
    'Zusätzliche Infos',
    'Bezahlung'
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.background.trim()) {
        newErrors.background = 'Bitte erzähl uns von dir';
      }
    }

    if (step >= 2 && step <= 4) {
      const jobIndex = step - 2;
      const job = formData.applications[jobIndex];
      
      if (!job.jobDetails.trim()) {
        newErrors[`jobDetails_${jobIndex}`] = 'Bitte füge die Stellenausschreibung ein';
      }
      if (!job.companyName.trim()) {
        newErrors[`companyName_${jobIndex}`] = 'Bitte gib den Firmennamen ein';
      }
      if (!job.position.trim()) {
        newErrors[`position_${jobIndex}`] = 'Bitte gib die Position ein';
      }
    }

    if (step === 5) {
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

  const updateApplication = (index: number, field: keyof JobApplication, value: string) => {
    setFormData(prev => ({
      ...prev,
      applications: prev.applications.map((app, i) => 
        i === index ? { ...app, [field]: value } : app
      )
    }));
  };

  const handleSubmit = async () => {
    if (!validateStep(6)) return;

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('service', 'bewerbung-bundle');
      formDataToSend.append('background', formData.background);
      formDataToSend.append('specialRequests', formData.specialRequests);
      formDataToSend.append('linkedinUrl', formData.linkedinUrl);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('tone', formData.tone);
      formDataToSend.append('applications', JSON.stringify(formData.applications));
      
      if (formData.resumeFile) {
        formDataToSend.append('resumeFile', formData.resumeFile);
      }

      const response = await fetch('/api/create-checkout-session', {
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

      case 2:
      case 3:
      case 4:
        const jobIndex = currentStep - 2;
        const job = formData.applications[jobIndex];
        const jobNumber = jobIndex + 1;
        
        return (
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                🏢 Firmenname (Job {jobNumber}) *
              </label>
              <input
                type="text"
                value={job.companyName}
                onChange={(e) => updateApplication(jobIndex, 'companyName', e.target.value)}
                className={`form-input ${errors[`companyName_${jobIndex}`] ? 'error' : ''}`}
                placeholder="z.B. Google, Microsoft, Startup XY"
              />
              {errors[`companyName_${jobIndex}`] && (
                <span className="form-help" style={{ color: 'red' }}>{errors[`companyName_${jobIndex}`]}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                💼 Position (Job {jobNumber}) *
              </label>
              <input
                type="text"
                value={job.position}
                onChange={(e) => updateApplication(jobIndex, 'position', e.target.value)}
                className={`form-input ${errors[`position_${jobIndex}`] ? 'error' : ''}`}
                placeholder="z.B. Senior UX Designer, Product Manager"
              />
              {errors[`position_${jobIndex}`] && (
                <span className="form-help" style={{ color: 'red' }}>{errors[`position_${jobIndex}`]}</span>
              )}
            </div>

            <div className="form-group full-width">
              <label className="form-label">
                📝 Stellenausschreibung (Job {jobNumber}) *
              </label>
              <textarea
                value={job.jobDetails}
                onChange={(e) => updateApplication(jobIndex, 'jobDetails', e.target.value)}
                className={`form-textarea ${errors[`jobDetails_${jobIndex}`] ? 'error' : ''}`}
                rows={12}
                placeholder="Kopiere hier die komplette Stellenausschreibung... Unsere Enterprise-KI extrahiert automatisch alle wichtigen Informationen: Aufgaben, Anforderungen, Keywords und Tonalität."
                style={{ minHeight: '300px' }}
              />
              {errors[`jobDetails_${jobIndex}`] && (
                <span className="form-help" style={{ color: 'red' }}>{errors[`jobDetails_${jobIndex}`]}</span>
              )}
              <span className="form-help">
                ✅ Füge die komplette Stellenausschreibung ein - Unsere Enterprise-KI analysiert automatisch alle relevanten Details
              </span>
            </div>
          </div>
        );

      case 5:
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
                Wir senden deine 3 optimierten Anschreiben an diese Adresse
              </span>
            </div>

            <div className="form-group">
              <label className="form-label">
                🎙️ Wie sollen deine Anschreiben klingen? *
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

      case 6:
        return (
          <div className="service-summary">
            <div className="summary-content">
                              <h3>Warum ATS-Revolution Bündel?</h3>
                <div className="comparison-box">
                  <div><strong>Andere Anbieter:</strong> ChatGPT → Generische Texte → Landen im Papierkorb → Keine Antworten</div>
                  <div><strong className="highlight">ATS-Revolution:</strong> Enterprise AI → ATS-optimiert → Kommen durch Systeme → Mehr Interviews</div>
                </div>
              
              <h3>Was du erhältst:</h3>
              <ul className="summary-list">
                                  <li>✓ <strong>3 ATS-optimierte Bewerbungen</strong> - mit Enterprise AI</li>
                  <li>✓ <strong>Erste deutsche ATS-Revolution</strong> - als Vorreiter im Markt</li>
                  <li>✓ <strong>Enterprise AI</strong> - nicht ChatGPT, sondern spezialisierte KI</li>
                  <li>✓ <strong>Automatische Keyword-Extraktion</strong> - aus Stellenausschreibungen</li>
                  <li>✓ <strong>Deutsche Standards</strong> - perfekte Struktur & Formatierung</li>
                  <li>✓ <strong>Sofort einsatzbereit</strong> - keine Nachbearbeitung nötig</li>
                  <li>✓ <strong>44% Rabatt</strong> gegenüber Einzelkauf</li>
              </ul>
              <div className="summary-price">
                <span className="price-label">Investition in deine Zukunft:</span>
                <span className="price-value">49€</span>
                <span className="price-original">statt 87€</span>
              </div>
              <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>
                Spart dir 9-15 Stunden Arbeit und erhöht deine Chancen deutlich
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
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&h=600&fit=crop" 
            alt="Bewerbungs-Bündel" 
            className="hero-bg"
          />
          <div className="hero-overlay">
            <div className="container">
              <div className="service-hero-content">
                <h1 className="service-hero-title">ATS-Revolution Bündel</h1>
                <p className="service-hero-subtitle">
                  Als erster deutscher Anbieter: 3 Bewerbungen mit Enterprise AI
                </p>
                <div className="usp-box">
                  <div className="usp-title">
                    🚀 ATS-Revolution für aktive Jobsuche:
                  </div>
                  <div className="usp-grid">
                    <div>✅ 3 ATS-optimierte Bewerbungen</div>
                    <div>✅ Enterprise AI statt ChatGPT</div>
                    <div>✅ Erste deutsche KI-Bewerbungsoptimierung</div>
                    <div>✅ 44% Rabatt gegenüber Einzelkauf</div>
                  </div>
                </div>
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
              <h2>Deine 3 optimierten Anschreiben</h2>
              <p>Folge den Schritten und erhalte in wenigen Minuten 3 maßgeschneiderte Bewerbungsschreiben</p>
            </div>

            <div className="service-form">
              {/* Progress Indicator */}
              <div className="progress-indicator">
                <div className="progress-text">
                  Schritt {currentStep} von {steps.length}: {steps[currentStep - 1]}
                </div>
                <div className="progress-dots">
                  {steps.map((_, index) => (
                    <div 
                      key={index}
                      className={`progress-dot ${index + 1 <= currentStep ? 'active' : ''}`}
                    />
                  ))}
                </div>
              </div>

              {/* Form Content */}
              {renderFormContent()}

              {/* Navigation Buttons */}
              <div className="form-navigation">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn-payment btn-back"
                  >
                    ← Zurück
                  </button>
                )}
                
                <div className="nav-right">
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
                          Jetzt 3 Bewerbungen erstellen - 49€
                          <span className="payment-secure">🔒 Sichere Zahlung über Stripe</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn-payment btn-next"
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