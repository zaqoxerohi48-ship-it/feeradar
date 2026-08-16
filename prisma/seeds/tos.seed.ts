import 'dotenv/config'
import prisma from '@/lib/prisma'
import { privacyPolicy } from '../mocks/mocks'

async function tos() {
  await prisma.privacyPolicy.create({
    data: {
      content: privacyPolicy
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
