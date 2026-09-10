import { cacheLife, cacheTag } from 'next/cache'
import { CACHE_TAGS } from '@/lib/cache-tags'
import prisma from '@/lib/prisma'

export async function getPlans() {
  'use cache'
  cacheLife('hours')
  cacheTag(CACHE_TAGS.plans)

  return prisma.plan.findMany({
    orderBy: { priceCents: 'asc' }
  })
}
