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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Dating-Profil optimieren
          </h1>
          <p className="text-gray-600 mb-8">
            Erstelle ein unwiderstehliches Dating-Profil für mehr Matches.
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dein aktueller Profiltext
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Dein aktueller Profiltext..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alter
                </label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="25"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Geschlecht
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option>Männlich</option>
                  <option>Weiblich</option>
                  <option>Divers</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hobbys & Interessen
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Reisen, Sport, Kochen..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Was suchst du?
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option>Feste Beziehung</option>
                <option>Lockeres Dating</option>
                <option>Neue Freunde</option>
                <option>Weiß noch nicht</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-pink-600 text-white py-3 px-6 rounded-md hover:bg-pink-700 transition-colors font-medium disabled:opacity-50"
            >
              {loading ? 'Weiterleitung...' : 'Profil optimieren - 19€'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 