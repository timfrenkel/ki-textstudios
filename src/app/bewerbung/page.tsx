'use client'

import { useState } from 'react'
import { getStripe } from '@/lib/stripe'

export default function Bewerbung() {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ service: 'bewerbung' }),
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Bewerbung optimieren
          </h1>
          <p className="text-gray-600 mb-8">
            Lade deine Bewerbungsunterlagen hoch und erhalte eine KI-optimierte Version.
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stellenausschreibung
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Füge hier die Stellenausschreibung ein..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dein aktuelles Anschreiben
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows={6}
                placeholder="Dein aktuelles Anschreiben..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lebenslauf (PDF)
              </label>
              <input
                type="file"
                accept=".pdf"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Branche/Bereich
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option>IT/Software</option>
                <option>Marketing</option>
                <option>Vertrieb</option>
                <option>Finance</option>
                <option>Andere</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
            >
              {loading ? 'Weiterleitung...' : 'Jetzt optimieren - 29€'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 