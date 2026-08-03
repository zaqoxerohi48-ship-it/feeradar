import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import prisma from '@/lib/prisma'

type GenerateMetadataProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateCompareSlugMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { slug } = await params

  const card = await prisma.cardCompany.findUnique({
    where: {
      slug,
      isActive: true
    },
    select: {
      name: true
    }
  })

  if (!card) {
    return buildMetadata({
      title: 'Crypto Card Comparison',
      description: 'Compare crypto card providers by supported countries, payment options and card availability.',
      path: `/compare/${slug}`
    })
  }

  return buildMetadata({
    title: `${card.name} Card Review`,
    description: `Compare ${card.name} Card features, supported countries, card networks, mobile payments and KYC requirements.`,
    path: `/compare/${slug}`
  })
}
