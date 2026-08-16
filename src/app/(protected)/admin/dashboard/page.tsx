import prisma from '@/lib/prisma'

export default async function AdminDashboardPage() {
  // const plans = await prisma.plan.findMany({
  //   where: {
  //     isActive: true
  //   }
  // })

  return (
    <section className="container py-10">
      <div>
        <p className="text-2xl font-semibold">Admin dashboard</p>
        <p className="text-muted-foreground text-sm">Overview of platform activity and admin tools.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <p className="text-muted-foreground text-sm">Orders</p>
          <p className="mt-2 text-2xl font-semibold">0</p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-muted-foreground text-sm">Users</p>
          <p className="mt-2 text-2xl font-semibold">0</p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-muted-foreground text-sm">Active plans</p>
          <p className="mt-2 text-2xl font-semibold">0</p>
        </div>
      </div>
    </section>
  )
}
