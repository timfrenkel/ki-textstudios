import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  try {
    let service: string
    let formDataObj: any = {}
    
    // Check if request is FormData or JSON
    const contentType = request.headers.get('content-type')
    
    if (contentType?.includes('multipart/form-data')) {
      // Handle FormData (Bewerbung)
      const formData = await request.formData()
      service = formData.get('service') as string
      formDataObj = Object.fromEntries(formData)
    } else {
      // Handle JSON (Dating, Bio)
      const { service: jsonService, formData: jsonFormData } = await request.json()
      service = jsonService
      formDataObj = jsonFormData
    }
    
    // Debug logging
    console.log('Service:', service)
    console.log('FormData received:', !!formDataObj)
    console.log('STRIPE_SECRET_KEY exists:', !!process.env.STRIPE_SECRET_KEY)
    console.log('BASE_URL:', process.env.NEXT_PUBLIC_BASE_URL)
    
    // Stripe Price IDs
    const priceIds: Record<string, string> = {
      bewerbung: 'price_1Rl6CB1PblTbwG3OfkfSINf0',
      'bewerbung-bundle': 'price_1Rl6CB1PblTbwG3OfkfSINf0', // TODO: Create new price ID for bundle
      dating: 'price_1Rl6Ca1PblTbwG3OHE8DTBK4',
      bio: 'price_1Rl6DF1PblTbwG3OrwEJwYQZ'
    }

    const priceId = priceIds[service]
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid service' }, { status: 400 })
    }
    
    console.log('Using Price ID:', priceId)

    // Get base URL - fallback to request origin if env var not set
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${request.headers.get('host')}`
    console.log('Using base URL:', baseUrl)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&service=${service}`,
      cancel_url: `${baseUrl}/${service}`,
      metadata: {
        service: service,
        formData: JSON.stringify(formDataObj),
      },
    })

    console.log('Session created successfully:', session.id)
    
    // Return different response format based on request type
    if (contentType?.includes('multipart/form-data')) {
      // FormData request (Bewerbung) - return URL directly
      return NextResponse.json({ url: session.url })
    } else {
      // JSON request (Dating, Bio) - return sessionId for redirect
      return NextResponse.json({ sessionId: session.id })
    }
  } catch (error) {
    console.error('Stripe error details:', error)
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 