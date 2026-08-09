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
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">{icon}</div>

      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</p>

        {isEmpty ? (
          <p className="text-sm text-muted-foreground">Not supported</p>
        ) : (
          <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-foreground">{children}</div>
        )}
      </div>
    </div>
  )
}
