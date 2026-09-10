import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-4 w-64 max-w-full" />
        </div>
        <Skeleton className="h-9 w-20" />
      </div>
      <div className="bg-card rounded-xl border p-4">
        <Skeleton className="h-9 w-full max-w-xs" />
      </div>
      <div className="bg-card rounded-xl border">
        <div className="border-b p-4">
          <Skeleton className="h-4 w-full" />
        </div>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="grid grid-cols-5 gap-6 border-b p-5 last:border-0">
            {Array.from({ length: 5 }).map((_, itemIndex) => (
              <Skeleton key={itemIndex} className="h-8 w-full" />
            ))}
          </div>
        ))}
      </div>
      <Skeleton className="mx-auto h-9 w-56 max-w-full" />
    </div>
  )
}
