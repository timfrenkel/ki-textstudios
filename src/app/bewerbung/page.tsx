'use client';

import React, { useState } from 'react';
import Stepper from '@/components/stepper';
import { Button } from '@/components/button';

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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                📝 Jobdetails
              </h2>
              <p className="text-gray-600">
                Füge hier die komplette Stellenausschreibung ein
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stellenausschreibung *
              </label>
              <textarea
                value={formData.jobDetails}
                onChange={(e) => setFormData(prev => ({ ...prev, jobDetails: e.target.value }))}
                className={`w-full p-4 border rounded-lg h-80 resize-none ${
                  errors.jobDetails ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Kopiere hier die komplette Stellenausschreibung..."
              />
              {errors.jobDetails && (
                <p className="text-red-500 text-sm mt-1">{errors.jobDetails}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                👤 Dein Hintergrund
              </h2>
              <p className="text-gray-600">
                Erzähl uns kurz von dir
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deine Erfahrung und Hintergrund *
              </label>
              <textarea
                value={formData.background}
                onChange={(e) => setFormData(prev => ({ ...prev, background: e.target.value }))}
                className={`w-full p-4 border rounded-lg h-64 resize-none ${
                  errors.background ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Ich bin UX-Designer mit 3 Jahren Erfahrung, arbeite aktuell bei Firma XY. Ich habe vorher Medieninformatik studiert, bin stark in Figma, HTML und Kommunikation. Ich möchte in ein kreativeres Umfeld wechseln."
              />
              {errors.background && (
                <p className="text-red-500 text-sm mt-1">{errors.background}</p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Teile mit: aktueller Job, vorherige Stationen, Ausbildung, Stärken/Tools/Soft Skills
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                📦 Zusätzliche Informationen
              </h2>
              <p className="text-gray-600">
                Vervollständige dein Profil
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Besondere Wünsche (optional)
              </label>
              <textarea
                value={formData.specialRequests}
                onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                className="w-full p-4 border border-gray-300 rounded-lg h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ich will selbstbewusst wirken, bitte die Führungsstärke betonen. Ich war 6 Monate in Elternzeit – das elegant einbauen."
              />
              <p className="text-sm text-gray-500 mt-1">
                z.B. Stil, Fokus, Lücken, Ton
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📎 Lebenslauf (optional)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                PDF-Format, max. 10MB
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn-Profil (optional)
              </label>
              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://linkedin.com/in/dein-profil"
              />
              <p className="text-sm text-gray-500 mt-1">
                Alternative zum Lebenslauf-Upload
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-Mail-Adresse *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full p-3 border rounded-lg ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="deine@email.de"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🎙️ Wie soll dein Anschreiben klingen? *
              </label>
              <select
                value={formData.tone}
                onChange={(e) => setFormData(prev => ({ ...prev, tone: e.target.value }))}
                className={`w-full p-3 border rounded-lg ${
                  errors.tone ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              >
                <option value="">Tonfall wählen</option>
                <option value="freundlich-engagiert">Freundlich & engagiert</option>
                <option value="klar-sachlich">Klar & sachlich</option>
                <option value="selbstbewusst-direkt">Selbstbewusst & direkt</option>
                <option value="kreativ-locker">Kreativ & locker</option>
              </select>
              {errors.tone && (
                <p className="text-red-500 text-sm mt-1">{errors.tone}</p>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                💳 Bezahlung
              </h2>
              <p className="text-gray-600">
                Sichere Bezahlung über Stripe
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">29€</div>
              <div className="text-gray-600 mb-4">
                Einmalige Zahlung für dein optimiertes Bewerbungsschreiben
              </div>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>✅ KI-optimiertes Anschreiben</li>
                <li>✅ Auf die Stelle zugeschnitten</li>
                <li>✅ Professionelle Sprache</li>
                <li>✅ Zustellung in wenigen Minuten</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
              📝 Bewerbungsschreiben optimieren
            </h1>
            <p className="text-center text-gray-600">
              Lass KI dein perfektes Anschreiben erstellen
            </p>
          </div>

          <Stepper currentStep={currentStep} steps={steps} />

          <div className="mt-8">
            {renderStep()}
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={currentStep === 1 ? 'invisible' : ''}
            >
              Zurück
            </Button>

            <Button
              onClick={handleNext}
              disabled={isLoading}
              className="min-w-32"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Laden...
                </div>
              ) : currentStep === steps.length ? (
                'Jetzt bezahlen'
              ) : (
                'Weiter'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 