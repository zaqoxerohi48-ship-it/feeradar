import 'dotenv/config'
import prisma from '@/lib/prisma'

async function plans() {
  await prisma.plan.upsert({
    where: {
      code: 'PRO'
    },
    update: {},
    create: {
      code: 'PRO',
      name: 'Pro',
      description: 'For staying ahead of fee changes.',
      priceCents: 500,
      features: [
        'Everything in Free',
        'Alerts when a tracked card’s fees, cashback or limits change',
        'Notified when a new card is added',
        'Save cards to a watchlist',
        'Export comparisons to CSV'
      ],
      mostPopular: false
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
