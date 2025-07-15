import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
})

export async function POST(request: NextRequest) {
  try {
    const { service } = await request.json()
    
    // Service pricing
    const pricing: Record<string, { amount: number; name: string }> = {
      bewerbung: { amount: 2900, name: 'Bewerbung optimieren' },
      dating: { amount: 1900, name: 'Dating-Profil optimieren' },
      bio: { amount: 1500, name: 'Social Media Bio optimieren' }
    }

    const serviceData = pricing[service]
    if (!serviceData) {
      return NextResponse.json({ error: 'Invalid service' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: serviceData.name,
              description: `KI-optimierte ${service} Erstellung`,
            },
            unit_amount: serviceData.amount,
          },
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