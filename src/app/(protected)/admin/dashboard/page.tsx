import { dayjs } from '@/lib/dayjs'
import prisma from '@/lib/prisma'
import { requireAdmin } from '@/lib/requireAuthRoles'
import { ActivityChart } from './ui/ActivityChart'

const ACTIVITY_DAYS = 7

export default async function AdminDashboardPage() {
  await requireAdmin()

  const startDate = dayjs
    .utc()
    .subtract(ACTIVITY_DAYS - 1, 'day')
    .startOf('day')

  const [plans, users, orders, recentUsers, recentOrders] = await Promise.all([
    prisma.plan.count(),
    prisma.user.count(),
    prisma.order.count(),
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

  const activityData = Array.from({ length: ACTIVITY_DAYS }, (_, index) => {
    const date = startDate.add(index, 'day')
    const dateKey = date.format('YYYY-MM-DD')

    return {
      date: date.format('MMM D'),
      users: recentUsers.filter((user) => dayjs.utc(user.createdAt).format('YYYY-MM-DD') === dateKey).length,
      orders: recentOrders.filter((order) => dayjs.utc(order.createdAt).format('YYYY-MM-DD') === dateKey).length
    }
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-semibold">Admin dashboard</p>
        <p className="text-muted-foreground text-sm">Overview of platform activity and admin tools.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <p className="text-muted-foreground text-sm">Orders</p>
          <p className="mt-2 text-2xl font-semibold">{orders}</p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-muted-foreground text-sm">Users</p>
          <p className="mt-2 text-2xl font-semibold">{users}</p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-muted-foreground text-sm">Active plans</p>
          <p className="mt-2 text-2xl font-semibold">{plans}</p>
        </div>
      </div>

      <ActivityChart data={activityData} />
    </div>
  )
}
