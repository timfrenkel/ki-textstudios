'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Success() {
  const searchParams = useSearchParams()
  const [service, setService] = useState('')
  const [processing, setProcessing] = useState(true)
  const [processingComplete, setProcessingComplete] = useState(false)
  const [error, setError] = useState('')
  
  useEffect(() => {
    const serviceParam = searchParams.get('service')
    const sessionId = searchParams.get('session_id')
    
    if (serviceParam) setService(serviceParam)
    
    // Automatische Verarbeitung starten
    if (sessionId && serviceParam) {
      processOrder(sessionId, serviceParam)
    }
  }, [searchParams])

  const processOrder = async (sessionId: string, service: string) => {
    try {
      console.log('Processing order...', { sessionId, service })
      
      // Session-Daten abrufen und Formular verarbeiten
      const response = await fetch('/api/process-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, service }),
      })

      const result = await response.json()
      
      if (result.success) {
        setProcessingComplete(true)
      } else {
        setError(result.error || 'Verarbeitung fehlgeschlagen')
      }
    } catch (error) {
      console.error('Processing error:', error)
      setError('Ein Fehler ist aufgetreten. Wir wurden benachrichtigt und bearbeiten Ihre Anfrage manuell.')
    } finally {
      setProcessing(false)
    }
  }

  const serviceNames: Record<string, string> = {
    bewerbung: 'Bewerbung',
    dating: 'Dating-Profil', 
    bio: 'Social Media Bio'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          
          {processing && (
            <>
              <div className="mb-6">
                <div className="mx-auto h-16 w-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Zahlung erfolgreich!
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                Ihre {serviceNames[service]} wird gerade von unserer KI optimiert...
              </p>

              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-blue-900 mb-3">
                  ⚡ Automatische Verarbeitung läuft
                </h2>
                <p className="text-blue-800">
                  Bitte warten Sie einen Moment. Ihre optimierten Texte werden automatisch generiert und per E-Mail versendet.
                </p>
              </div>
            </>
          )}

          {processingComplete && (
            <>
              <div className="mb-6">
                <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                🎉 Verarbeitung abgeschlossen!
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                Ihre optimierte <strong>{serviceNames[service]}</strong> wurde erfolgreich generiert und per E-Mail versendet!
              </p>

              <div className="bg-green-50 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-green-900 mb-3">
                  ✅ Automatisch abgeschlossen
                </h2>
                <ol className="text-left text-green-800 space-y-2">
                  <li>✓ KI-Optimierung durchgeführt</li>
                  <li>✓ E-Mail mit optimierten Texten versendet</li>
                  <li>✓ Professionelle Tipps inkludiert</li>
                </ol>
              </div>
            </>
          )}

          {error && (
            <>
              <div className="mb-6">
                <svg className="mx-auto h-16 w-16 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Zahlung erfolgreich!
              </h1>
              
              <div className="bg-orange-50 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-orange-900 mb-3">
                  ⚠️ Manuelle Bearbeitung
                </h2>
                <p className="text-orange-800 mb-3">
                  {error}
                </p>
                <p className="text-orange-800">
                  Wir bearbeiten Ihre {serviceNames[service]} manuell und senden sie innerhalb von 24h per E-Mail.
                </p>
              </div>
            </>
          )}

          <div className="space-y-4">
            <a 
              href={`/${service}`}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Weitere {serviceNames[service]} bestellen
            </a>
            <br />
            <a 
              href="/"
              className="inline-block text-gray-600 hover:text-gray-900"
            >
              Zurück zur Startseite
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 