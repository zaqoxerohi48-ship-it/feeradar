import 'dotenv/config'
import * as isoCountries from 'i18n-iso-countries'
import prisma from '@/lib/prisma'

async function countries() {
  const countryNames = isoCountries.getNames('en', {
    select: 'official'
  })

  const countries = Object.entries(countryNames).map(([code, name]) => ({
    code,
    name
  }))

  const result = await prisma.country.createMany({
    data: countries,
    skipDuplicates: true
  })

  console.log(`Added ${result.count} countries`)
}

countries()
  .catch((error: unknown) => {
    console.error('Failed to seed countries:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
