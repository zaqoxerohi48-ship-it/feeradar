import Stripe from 'stripe'
import prisma from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return new Response('Stripe signature is missing', {
      status: 400
    })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (error) {
    console.error('Stripe webhook signature error:', error)

    return new Response('Invalid webhook signature', {
      status: 400
    })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    if (session.payment_status !== 'paid') {
      return new Response('OK', {
        status: 200
      })
    }

    const userId = session.metadata?.userId
    const planId = Number(session.metadata?.planId)

    if (!userId || !planId) {
      return new Response('Missing checkout metadata', {
        status: 400
      })
    }

    await prisma.$transaction([
      prisma.order.update({
        where: {
          stripeCheckoutSessionId: session.id
        },
        data: {
          status: 'PAID',
          paidAt: new Date(),
          stripePaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id
        }
      }),
      prisma.user.update({
        where: {
          id: userId
        },
        data: {
          plan: {
            connect: {
              id: planId
            }
          }
        }
      })
    ])
  }

  return new Response('OK', {
    status: 200
  })
}
