import { Clock3 } from 'lucide-react'

type FeeItemProps = {
  label: string
  value: string
  wait: string
  active?: boolean
}

export const FeeItem = ({ label, value, wait, active = false }: FeeItemProps) => {
  return (
    <article className={`rounded-xl border p-4 transition ${active ? 'border-primary/30 bg-secondary' : 'bg-background/60 hover:bg-muted/60'}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>

        {active && <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">Best choice</span>}
      </div>

      <div className="mt-4 flex items-baseline gap-1.5">
        <span className="text-3xl font-semibold tracking-tight">{value}</span>
        <span className="text-xs text-muted-foreground">Gwei</span>
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock3 className="size-3.5" />
        {wait}
      </p>
    </article>
  )
}
