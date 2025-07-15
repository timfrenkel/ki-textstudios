'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Success() {
  const searchParams = useSearchParams()
  const [service, setService] = useState('')
  
  useEffect(() => {
    const serviceParam = searchParams.get('service')
    if (serviceParam) setService(serviceParam)
  }, [searchParams])

  const serviceNames: Record<string, string> = {
    bewerbung: 'Bewerbung',
    dating: 'Dating-Profil', 
    bio: 'Social Media Bio'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Zahlung erfolgreich!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Vielen Dank für deine Bestellung: <strong>{serviceNames[service]} optimieren</strong>
          </p>

          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-3">
              Wie geht es weiter?
            </h2>
            <ol className="text-left text-blue-800 space-y-2">
              <li>1. Du erhältst eine Bestätigungs-E-Mail</li>
              <li>2. Wir bearbeiten deine Anfrage innerhalb von 24h</li>
              <li>3. Du bekommst dein optimiertes {serviceNames[service]} per E-Mail</li>
            </ol>
          </div>

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