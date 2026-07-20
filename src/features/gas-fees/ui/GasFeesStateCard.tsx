type GasFeesStateCardProps = {
  message?: string
}

const skeletonItems = ['low', 'medium', 'high']

export const GasFeesStateCard = ({ message }: GasFeesStateCardProps) => {
  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-6 text-white shadow-2xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="h-5 w-48 animate-pulse rounded-full bg-white/10" />
          <div className="mt-3 h-4 w-36 animate-pulse rounded-full bg-white/7" />
        </div>

        <div className="h-9 w-36 animate-pulse rounded-full border border-white/10 bg-white/5" />
      </div>

      {message && <p className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-3 text-sm text-amber-100">{message}</p>}

      <div className="mt-7 grid gap-3 md:grid-cols-3">
        {skeletonItems.map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-white/4 p-4">
            <div className="h-4 w-16 animate-pulse rounded-full bg-white/10" />
            <div className="mt-5 h-8 w-24 animate-pulse rounded-full bg-white/10" />
            <div className="mt-4 h-3 w-28 animate-pulse rounded-full bg-white/7" />
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {skeletonItems.map((item) => (
          <div key={item} className="rounded-xl border border-white/10 bg-white/3 p-3">
            <div className="h-3 w-24 animate-pulse rounded-full bg-white/7" />
            <div className="mt-3 h-4 w-14 animate-pulse rounded-full bg-white/10" />
          </div>
        ))}
      </div>

      <div className="mt-5 h-2 animate-pulse rounded-full bg-white/10" />
    </section>
  )
}
