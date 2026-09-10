import { CircleDollarSign, Layers3, type LucideIcon, ShoppingCart, Users } from 'lucide-react'

type StatCardProps = {
  label: string
  value: number | string
  detail: string
  icon: 'users' | 'orders' | 'revenue' | 'plans'
}

const icons: Record<StatCardProps['icon'], LucideIcon> = {
  users: Users,
  orders: ShoppingCart,
  revenue: CircleDollarSign,
  plans: Layers3
}

export function StatCard({ label, value, detail, icon }: StatCardProps) {
  const Icon = icons[icon]

  return (
    <section className="bg-card rounded-xl border p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-muted-foreground text-sm font-medium">{label}</p>
        <span className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-lg">
          <Icon className="size-4" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-5 text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
      <p className="text-muted-foreground mt-1 text-xs leading-5">{detail}</p>
    </section>
  )
}
