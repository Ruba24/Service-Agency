import Stripe from 'stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return new Response(JSON.stringify({ error: 'Stripe secret key missing' }), { status: 500 })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const { amount, metadata } = await req.json()

    if (!amount) {
      return new Response(JSON.stringify({ error: 'Missing amount' }), { status: 400 })
    }

    const origin = req.headers.get('origin') || ''

    // ✅ Safe cancel URL: course page if courseId exists, else /cancel
    const cancelUrl = metadata?.courseId && metadata.courseId !== 'unknown'
      ? `${origin}/courses/${metadata.courseId}`
      : `${origin}/cancel`

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: metadata?.courseTitle || 'Course' },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: metadata?.email,
      metadata: metadata || {},
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
    })

    return new Response(JSON.stringify({ url: session.url }), { status: 200 })
  } catch (error) {
    console.error('Stripe error:', error)
    return new Response(JSON.stringify({ error: error.message || 'Failed to create payment session' }), { status: 500 })
  }
}
