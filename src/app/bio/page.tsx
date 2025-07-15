'use client'

import { useState } from 'react'
import { getStripe } from '@/lib/stripe'

export default function Bio() {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ service: 'bio' }),
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
            Social Media Bio optimieren
          </h1>
          <p className="text-gray-600 mb-8">
            Erstelle eine überzeugende Bio für LinkedIn, Instagram und Co.
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Platform
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option>LinkedIn</option>
                <option>Instagram</option>
                <option>Twitter/X</option>
                <option>TikTok</option>
                <option>Andere</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deine aktuelle Bio
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Deine aktuelle Bio..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beruf/Tätigkeit
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Software Entwickler, Marketer, Student..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ziel der Bio
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option>Berufliche Kontakte</option>
                <option>Personal Branding</option>
                <option>Mehr Follower</option>
                <option>Business/Kunden</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Persönlichkeit/Stil
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option>Professionell</option>
                <option>Kreativ</option>
                <option>Humorvoll</option>
                <option>Inspirierend</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
            >
              {loading ? 'Weiterleitung...' : 'Bio optimieren - 15€'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 