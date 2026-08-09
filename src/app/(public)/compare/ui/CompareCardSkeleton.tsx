export const CompareCardSkeleton = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="bg-card flex min-h-72 flex-col gap-5 rounded-2xl border p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-muted size-14 animate-pulse rounded-xl" />
              <div className="flex flex-col gap-2">
                <div className="bg-muted h-5 w-28 animate-pulse rounded-full" />
                <div className="bg-muted h-3 w-14 animate-pulse rounded-full" />
              </div>
            </div>
            <div className="bg-muted size-5 animate-pulse rounded-full" />
          </div>

          <div className="grid gap-4">
            {Array.from({ length: 4 }).map((_, itemIndex) => (
              <div key={itemIndex} className="flex items-center gap-3">
                <div className="bg-muted size-4 animate-pulse rounded-full" />
                <div className="bg-muted h-3 w-20 animate-pulse rounded-full" />
                <div className="bg-muted h-4 flex-1 animate-pulse rounded-full" />
              </div>
            ))}
          </div>

          <div className="mt-auto border-t pt-4">
            <div className="bg-muted h-4 w-40 animate-pulse rounded-full" />
          </div>
        </div>
      ))}
    </div>
  )
}
