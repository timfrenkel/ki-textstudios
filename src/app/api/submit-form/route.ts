import { NextRequest, NextResponse } from 'next/server'
import { generateOptimizedText } from '@/lib/openai'
import { sendOptimizedText } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    const { service, ...userData } = formData

    // Validierung
    if (!service || !userData.email) {
      return NextResponse.json(
        { error: 'Service und E-Mail sind erforderlich' },
        { status: 400 }
      )
    }

    // Debug logging
    console.log('Form submission:', { service, email: userData.email })

    // Text mit OpenAI generieren
    console.log('Generating optimized text...')
    const optimizedText = await generateOptimizedText(service, userData)

    // E-Mail versenden
    console.log('Sending email...')
    await sendOptimizedText(service, userData.email, optimizedText, userData)

    console.log('Success! Order completed.')

    return NextResponse.json({
      success: true,
      message: 'Ihr optimierter Text wurde erfolgreich generiert und per E-Mail versendet!'
    })

  } catch (error) {
    console.error('Form submission error:', error)
    
    // Fallback: Bei Fehler manuelle Benachrichtigung senden
    try {
      const { sendOptimizedText } = await import('@/lib/email')
      await sendOptimizedText('bewerbung', 'tim@loopnex.de', `
FEHLER BEI AUTOMATISCHER BEARBEITUNG

Service: ${request.url}
Daten: ${JSON.stringify(await request.json(), null, 2)}
Fehler: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}

Bitte manuell bearbeiten.
      `, {})
    } catch (fallbackError) {
      console.error('Fallback email failed:', fallbackError)
    }

    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten. Wir wurden benachrichtigt und bearbeiten Ihre Anfrage manuell.' },
      { status: 500 }
    )
  }
} 