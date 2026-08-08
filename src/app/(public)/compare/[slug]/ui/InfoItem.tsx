import { ReactNode } from 'react'

type InfoItemProps = {
  icon: ReactNode
  label: string
  children: ReactNode
  isEmpty?: boolean
}

export const InfoItem = ({ icon, label, children, isEmpty = false }: InfoItemProps) => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">{icon}</div>

      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium tracking-wide text-white/40 uppercase">{label}</p>

        {isEmpty ? (
          <p className="text-sm text-white/40">Not supported</p>
        ) : (
          <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-white/80">{children}</div>
        )}
      </div>
    </div>
  )
}
