import { cacheLife, cacheTag } from 'next/cache'
import { CACHE_TAGS, getCardCompanyCacheTag } from '@/lib/cache-tags'
import prisma from '@/lib/prisma'

export async function getActiveCardCompanies() {
  'use cache'
  cacheLife('hours')
  cacheTag(CACHE_TAGS.cardCompanies)

  return prisma.cardCompany.findMany({
    where: {
      isActive: true
    },
    orderBy: { name: 'asc' },
    include: {
      _count: { select: { countries: true } }
    }
  })
}

export async function getActiveCardCompanyLinks() {
  'use cache'
  cacheLife('hours')
  cacheTag(CACHE_TAGS.cardCompanies)

  return prisma.cardCompany.findMany({
    where: {
      isActive: true
    },
    orderBy: { name: 'asc' },
    select: {
      name: true,
      slug: true
    }
  })
}

export async function getActiveCardCompanySitemapEntries() {
  'use cache'
  cacheLife('hours')
  cacheTag(CACHE_TAGS.cardCompanies)

  return prisma.cardCompany.findMany({
    where: {
      isActive: true
    },
    select: {
      slug: true,
      updatedAt: true
    }
  })
}

export async function getActiveCardCompany(slug: string) {
  'use cache'
  cacheLife('hours')
  cacheTag(CACHE_TAGS.cardCompanies, getCardCompanyCacheTag(slug))

  return prisma.cardCompany.findUnique({
    where: {
      slug,
      isActive: true
    },
    include: {
      countries: {
        orderBy: {
          name: 'asc'
        }
      }
    }
  })
}
