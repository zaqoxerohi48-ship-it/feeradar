import { Clock3 } from 'lucide-react'

type FeeItemProps = {
  label: string
  value: string
  wait: string
  active?: boolean
}

export const FeeItem = ({ label, value, wait, active = false }: FeeItemProps) => {
  return (
    <article className={`rounded-2xl border p-4 transition ${active ? 'border-violet-400/50 bg-violet-500/10' : 'border-white/10 bg-white/4'}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-zinc-400">{label}</p>

        {active && <span className="rounded-full bg-violet-400/15 px-2 py-1 text-[10px] font-medium text-violet-300">Best choice</span>}
      </div>

      <div className="mt-4 flex items-baseline gap-1.5">
        <span className="text-3xl font-bold tracking-tight">{value}</span>
        <span className="text-xs text-zinc-500">Gwei</span>
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-xs text-zinc-400">
        <Clock3 className="size-3.5" />
        {wait}
      </p>
    </article>
  )
}
