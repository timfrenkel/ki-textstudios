import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { generateOptimizedText } from '@/lib/openai'
import { sendOptimizedText } from '@/lib/email'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { sessionId, service } = await request.json()

    console.log('Processing order:', { sessionId, service })

    // Stripe Session abrufen
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Zahlung noch nicht abgeschlossen' },
        { status: 400 }
      )
    }

    // Formular-Daten aus Metadata extrahieren
    let formData
    try {
      formData = session.metadata?.formData ? JSON.parse(session.metadata.formData) : null
    } catch (parseError) {
      console.error('Error parsing form data:', parseError)
      formData = null
    }

    if (!formData || !formData.email) {
      console.error('No form data found in session metadata')
      
      // Fallback: Manuelle Benachrichtigung senden
      try {
        await sendOptimizedText('bewerbung', 'tim@loopnex.de', `
FEHLER: Keine Formulardaten gefunden

Session ID: ${sessionId}
Service: ${service}
Customer Email: ${session.customer_details?.email || 'Unbekannt'}
Payment Status: ${session.payment_status}

Metadata: ${JSON.stringify(session.metadata, null, 2)}

Bitte manuell bearbeiten.
        `, {})
      } catch (emailError) {
        console.error('Fallback email failed:', emailError)
      }

      return NextResponse.json(
        { error: 'Formular-Daten nicht gefunden. Manuelle Bearbeitung wurde eingeleitet.' },
        { status: 400 }
      )
    }

    console.log('Form data found:', { email: formData.email, service })

    // Text mit OpenAI generieren
    console.log('Generating optimized text...')
    const optimizedText = await generateOptimizedText(service, formData)

    // E-Mail versenden
    console.log('Sending email to:', formData.email)
    await sendOptimizedText(service, formData.email, optimizedText, formData)

    console.log('Order processing completed successfully')

    return NextResponse.json({
      success: true,
      message: 'Bestellung erfolgreich verarbeitet und E-Mail versendet!'
    })

  } catch (error) {
    console.error('Order processing error:', error)
    
    // Fallback: Fehler-Benachrichtigung senden
    try {
      await sendOptimizedText('bewerbung', 'tim@loopnex.de', `
FEHLER BEI ORDER PROCESSING

Error: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}
Stack: ${error instanceof Error ? error.stack : 'N/A'}

Request Body: ${JSON.stringify(await request.json(), null, 2)}

Bitte manuell bearbeiten.
      `, {})
    } catch (fallbackError) {
      console.error('Fallback email failed:', fallbackError)
    }

    return NextResponse.json(
      { error: 'Verarbeitung fehlgeschlagen. Manuelle Bearbeitung wurde eingeleitet.' },
      { status: 500 }
    )
  }
} 