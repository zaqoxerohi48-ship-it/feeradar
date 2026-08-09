import 'dotenv/config'
import prisma from '@/lib/prisma'

async function plans() {
  const freePlan = await prisma.plan.upsert({
    where: {
      code: 'FREE'
    },
    update: {},
    create: {
      code: 'FREE',
      name: 'Free',
      description: 'For casually checking your options.',
      priceCents: 0,
      features: ['Access to all card comparisons', 'Current fees, limits and KYC info', 'Search and filters'],
      mostPopular: false
    }
  })
  await prisma.user.updateMany({
    where: {
      planId: null
    },
    data: {
      planId: freePlan.id
    }
  })
}

plans()
  .catch((error: unknown) => {
    console.error('Failed to seed plans:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
