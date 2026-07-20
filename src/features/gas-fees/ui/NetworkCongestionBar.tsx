type NetworkCongestionBarProps = {
  congestionPercent: number
}

export const NetworkCongestionBar = ({ congestionPercent }: NetworkCongestionBarProps) => {
  return (
    <div className="mt-5">
      <div className="mb-2 flex items-center justify-between text-xs text-zinc-400">
        <span>Network congestion</span>
        <span>{congestionPercent}%</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-linear-to-r from-emerald-400 via-amber-400 to-rose-500 transition-all duration-500"
          style={{
            width: `${Math.min(congestionPercent, 100)}%`
          }}
        />
      </div>
    </div>
  )
}
