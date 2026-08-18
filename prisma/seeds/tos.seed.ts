import 'dotenv/config'
import prisma from '@/lib/prisma'
import { termsUsage } from '../mocks/mocks'

async function tos() {
  await prisma.termsPolicy.create({
    data: {
      content: termsUsage
    }
  })
}

tos()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
