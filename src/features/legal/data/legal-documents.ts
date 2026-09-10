import { cacheLife, cacheTag } from 'next/cache'
import { CACHE_TAGS } from '@/lib/cache-tags'
import prisma from '@/lib/prisma'

export async function getLatestLegalDocument(type: 'terms' | 'policy') {
  'use cache'
  cacheLife('max')
  cacheTag(CACHE_TAGS.legalDocuments)

  return type === 'terms'
    ? prisma.termsPolicy.findFirst({
        orderBy: {
          updatedAt: 'desc'
        }
      })
    : prisma.privacyPolicy.findFirst({
        orderBy: {
          updatedAt: 'desc'
        }
      })
}
