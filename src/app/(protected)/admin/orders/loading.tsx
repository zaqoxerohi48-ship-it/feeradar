import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-4 w-64 max-w-full" />
      </div>

      <Skeleton className="h-10 w-full max-w-xs" />

      <div className="grid gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="rounded-xl border p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-36" />
              </div>

              <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, itemIndex) => (
                <div key={itemIndex} className="flex flex-col gap-2">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-5 w-28 max-w-full" />
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 border-t pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>

      <Skeleton className="mx-auto h-9 w-56 max-w-full" />
    </div>
  )
}
