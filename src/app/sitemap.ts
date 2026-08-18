import type { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

const SITE_URL = process.env.DOMAIN_URL

if (!SITE_URL) {
  throw new Error('DOMAIN_URL is not defined')
}

const routes = [
  {
    path: '/',
    changeFrequency: 'daily',
    priority: 1
  },
  {
    path: '/compare',
    changeFrequency: 'daily',
    priority: 0.9
  },
  {
    path: '/pricing',
    changeFrequency: 'weekly',
    priority: 0.8
  },
  {
    path: '/how-it-works',
    changeFrequency: 'monthly',
    priority: 0.7
  }
] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [cards, termsPolicy, privacyPolicy] = await Promise.all([
    prisma.cardCompany.findMany({
      where: {
        isActive: true
      },
      select: {
        slug: true,
        updatedAt: true
      }
    }),
    prisma.termsPolicy.findFirst({
      orderBy: {
        updatedAt: 'desc'
      },
      select: {
        updatedAt: true
      }
    }),
    prisma.privacyPolicy.findFirst({
      orderBy: {
        updatedAt: 'desc'
      },
      select: {
        updatedAt: true
      }
    })
  ])

  const staticRoutes = routes.map(({ path, changeFrequency, priority }) => ({
    url: new URL(path, SITE_URL).toString(),
    changeFrequency,
    priority
  }))

  const cardRoutes = cards.map((card) => ({
    url: new URL(`/compare/${card.slug}`, SITE_URL).toString(),
    lastModified: card.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  const legalRoutes = [
    {
      url: new URL('/legal/terms', SITE_URL).toString(),
      lastModified: termsPolicy?.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.4
    },
    {
      url: new URL('/legal/policy', SITE_URL).toString(),
      lastModified: privacyPolicy?.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.4
    }
  ]

  return [...staticRoutes, ...cardRoutes, ...legalRoutes]
}
