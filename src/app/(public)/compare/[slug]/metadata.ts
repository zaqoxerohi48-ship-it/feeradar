import type { Metadata } from 'next'
import { getActiveCardCompany } from '@/features/card-companies/data/card-companies'
import { buildMetadata } from '@/lib/metadata'

type GenerateMetadataProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateCompareSlugMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { slug } = await params

  const card = await getActiveCardCompany(slug)

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
