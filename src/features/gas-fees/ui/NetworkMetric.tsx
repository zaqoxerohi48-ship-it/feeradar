import type { LucideIcon } from 'lucide-react'

type NetworkMetricProps = {
  icon: LucideIcon
  label: string
  value: string
}

export const NetworkMetric = ({ icon: Icon, label, value }: NetworkMetricProps) => {
  return (
    <div className="rounded-xl border bg-background/60 p-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </div>

      <p className="mt-2 text-sm font-medium capitalize">{value}</p>
    </div>
  )
}
