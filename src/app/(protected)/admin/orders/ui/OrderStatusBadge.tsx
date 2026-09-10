import { CheckCircle2, Clock3, RotateCcw, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type OrderStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'

const statusConfig: Record<OrderStatus, { label: string; icon: typeof Clock3; className: string }> = {
  PENDING: {
    label: 'Pending',
    icon: Clock3,
    className: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300'
  },
  PAID: {
    label: 'Paid',
    icon: CheckCircle2,
    className: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300'
  },
  FAILED: {
    label: 'Failed',
    icon: XCircle,
    className: 'border-red-200 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300'
  },
  REFUNDED: {
    label: 'Refunded',
    icon: RotateCcw,
    className: 'border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
  }
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap', config.className)}>
      <Icon className="size-3" aria-hidden="true" />
      {config.label}
    </span>
  )
}
