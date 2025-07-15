import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { service } = await request.json()
    
    // Stripe Price IDs
    const priceIds: Record<string, string> = {
      bewerbung: 'price_1Rl6CB1PblTbwG3OfkfSINf0',
      dating: 'price_1Rl6Ca1PblTbwG3OHE8DTBK4',
      bio: 'price_1Rl6DF1PblTbwG3OrwEJwYQZ'
    }

    const priceId = priceIds[service]
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid service' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&service=${service}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${service}`,
      metadata: {
        service: service,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 