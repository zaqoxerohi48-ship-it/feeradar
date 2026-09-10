import { cacheLife, cacheTag } from 'next/cache'
import { CACHE_TAGS } from '@/lib/cache-tags'
import { dayjs } from '@/lib/dayjs'
import prisma from '@/lib/prisma'

export const ACTIVITY_DAYS = 7

export async function getAdminDashboardAggregates() {
  'use cache'
  cacheLife({
    stale: 30,
    revalidate: 60,
    expire: 300
  })
  cacheTag(CACHE_TAGS.adminDashboard)

  const startDate = dayjs
    .utc()
    .subtract(ACTIVITY_DAYS - 1, 'day')
    .startOf('day')

  const [plans, users, orders, paidRevenueByCurrency, recentUsers, recentOrders] = await Promise.all([
    prisma.plan.count(),
    prisma.user.count(),
    prisma.order.count(),
    prisma.order.groupBy({
      where: { status: 'PAID' },
      by: ['currency'],
      _sum: { amountCents: true },
      _count: true
    }),
    prisma.user.findMany({
      where: {
        createdAt: {
          gte: startDate.toDate()
        }
      },
      select: {
        createdAt: true
      }
    }),
    prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate.toDate()
        }
      },
      select: {
        createdAt: true
      }
    })
  ])

  return {
    plans,
    users,
    orders,
    paidRevenueByCurrency,
    recentUsers,
    recentOrders,
    startDate: startDate.toISOString()
  }
}
