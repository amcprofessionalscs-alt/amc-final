import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.amc-professionals.com'

  const { product } = await request.json()

  const PRODUCTS: Record<string, { name: string; amount: number; description: string }> = {
    audit: {
      name: 'The OS Audit',
      amount: 19700,
      description: 'A 30-minute deep dive into your operation delivered as a personal Loom video within 48 hours.',
    },
  }

  const item = PRODUCTS[product as string]
  if (!item) {
    return NextResponse.json({ error: 'Invalid product' }, { status: 400 })
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: item.name, description: item.description },
        unit_amount: item.amount,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${baseUrl}/audit?payment=success`,
    cancel_url: `${baseUrl}/audit#payment`,
  })

  return NextResponse.json({ url: session.url })
}
