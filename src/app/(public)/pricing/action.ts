'use server'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

export async function createCheckout(planId: number) {
  const authSession = await auth()

  if (!authSession?.user.id) {
    throw new Error('User not authenticated')
  }

  const user = await prisma.user.findUnique({
    where: {
      id: authSession.user.id
    }
  })

  if (!user) {
    throw new Error('User not found')
  }

  const plan = await prisma.plan.findUnique({ where: { id: planId } })

  if (!plan) {
    throw new Error('Plan not found')
  }

  if (plan.priceCents === 0) {
    throw new Error('Free plans are not available for checkout')
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
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
    success_url: `${process.env.DOMAIN_URL}/dashboard?payment=success`,
    cancel_url: `${process.env.DOMAIN_URL}/pricing`
  })

  if (!session.url) {
    throw new Error('Stripe Checkout URL not found')
  }

  return session.url
}
