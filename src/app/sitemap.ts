import type { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

const DOMAIN_URL = process.env.DOMAIN_URL

if (!DOMAIN_URL) {
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
  const cards = await prisma.cardCompany.findMany({
    where: {
      isActive: true
    },
    select: {
      slug: true,
      updatedAt: true
    }
  })

  const staticRoutes = routes.map(({ path, changeFrequency, priority }) => ({
    url: new URL(path, DOMAIN_URL).toString(),
    changeFrequency,
    priority
  }))

  const cardRoutes = cards.map((card) => ({
    url: new URL(`/compare/${card.slug}`, DOMAIN_URL).toString(),
    lastModified: card.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  return [...staticRoutes, ...cardRoutes]
}
