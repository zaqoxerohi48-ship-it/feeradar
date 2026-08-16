'use server'

import { auth } from '@/auth'
import type { ActionResult } from '@/lib/action-result'
import prisma from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

export async function createCheckout(planId: number): Promise<ActionResult<{ url: string }>> {
  const authSession = await auth()

  if (!authSession?.user.id) {
    return { success: false, message: 'User not authorized' }
  }

  const [plan, user] = await Promise.all([
    prisma.plan.findUnique({ where: { id: planId } }),
    prisma.user.findUnique({
      where: { id: authSession.user.id },
      select: { planId: true }
    })
  ])

  if (!user) {
    return { success: false, message: 'User not found' }
  }

  if (!plan) {
    return { success: false, message: 'Plan not found' }
  }

  if (user.planId === plan.id) {
    return { success: false, message: 'You already have this plan' }
  }

  if (plan.priceCents === 0) {
    return { success: false, message: 'Free plans are not available for checkout' }
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',

    metadata: {
      userId: authSession.user.id,
      planId: String(plan.id)
    },

    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: plan.priceCents,
          product_data: {
            name: plan.name,
            description: plan.description
          }
        },
        quantity: 1
      }
    ],
    success_url: `${process.env.DOMAIN_URL}/dashboard`,
    cancel_url: `${process.env.DOMAIN_URL}/pricing`
  })

  if (!session.url) {
    return { success: false, message: 'Stripe Checkout URL not found' }
  }

  await prisma.order.create({
    data: {
      status: 'PENDING',
      amountCents: plan.priceCents,
      currency: session.currency ?? 'usd',
      userId: authSession.user.id,
      planId: plan.id,
      stripeCheckoutSessionId: session.id
    }
  })

  return { success: true, data: { url: session.url } }
}
