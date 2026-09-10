import { dayjs } from '@/lib/dayjs'
import prisma from '@/lib/prisma'
import { requireAdmin } from '@/lib/requireAuthRoles'
import { ACTIVITY_DAYS, getAdminDashboardAggregates } from './data'
import { ActivityChart } from './ui/ActivityChart'
import { RecentOrders } from './ui/RecentOrders'
import { RecentUsers } from './ui/RecentUsers'
import { StatCard } from './ui/StatCard'

export const instant = false

export default async function AdminDashboardPage() {
  await requireAdmin()

  const [aggregates, latestUsers, latestOrders] = await Promise.all([
    getAdminDashboardAggregates(),
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        email: true,
        createdAt: true
      }
    }),
    prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        amountCents: true,
        currency: true,
        status: true,
        createdAt: true,
        user: { select: { email: true } },
        plan: { select: { name: true } }
      }
    })
  ])

  const { plans, users, orders, paidRevenueByCurrency, recentUsers, recentOrders } = aggregates
  const startDate = dayjs.utc(aggregates.startDate)

  const activityData = Array.from({ length: ACTIVITY_DAYS }, (_, index) => {
    const date = startDate.add(index, 'day')
    const dateKey = date.format('YYYY-MM-DD')

    return {
      date: date.format('MMM D'),
      users: recentUsers.filter((user) => dayjs.utc(user.createdAt).format('YYYY-MM-DD') === dateKey).length,
      orders: recentOrders.filter((order) => dayjs.utc(order.createdAt).format('YYYY-MM-DD') === dateKey).length
    }
  })
  const paidOrdersCount = paidRevenueByCurrency.reduce((total, item) => total + item._count, 0)
  const paidRevenue = paidRevenueByCurrency.length === 1 ? paidRevenueByCurrency[0] : null

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <div className="flex flex-col gap-1">
        <p className="text-primary text-sm font-medium">Admin workspace</p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Overview</h1>
        <p className="text-muted-foreground text-sm">A focused view of your platform’s customers, payments, and plans.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total users" value={users} detail={`${recentUsers.length} joined in the last 7 days`} icon="users" />
        <StatCard label="Orders" value={orders} detail={`${recentOrders.length} created in the last 7 days`} icon="orders" />
        <StatCard
          label="Paid revenue"
          value={paidRevenue ? formatCurrency(paidRevenue._sum.amountCents ?? 0, paidRevenue.currency) : '—'}
          detail={
            paidRevenue ? `${paidOrdersCount} paid ${paidOrdersCount === 1 ? 'order' : 'orders'}` : `${paidOrdersCount} paid orders across currencies`
          }
          icon="revenue"
        />
        <StatCard label="Available plans" value={plans} detail="Configured in your catalogue" icon="plans" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)]">
        <ActivityChart data={activityData} />
        <RecentOrders orders={latestOrders} />
      </div>

      <RecentUsers users={latestUsers} />
    </div>
  )
}

function formatCurrency(amountCents: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    maximumFractionDigits: 2
  }).format(amountCents / 100)
}
