import { ReactNode } from 'react'

type InfoItemProps = {
  icon: ReactNode
  label: string
  values: string[]
}

export const InfoItem = ({ icon, label, values }: InfoItemProps) => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">{icon}</div>

      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium tracking-wide text-white/40 uppercase">{label}</p>

        {values.length > 0 ? (
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            {values.map((value, index) => (
              <span key={value} className="flex items-center gap-2 text-sm text-white/80">
                {value}
                {index < values.length - 1 && <span className="text-white/20">•</span>}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-white/40">Not supported</p>
        )}
      </div>
    </div>
  )
}
