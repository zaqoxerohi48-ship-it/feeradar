import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-4 w-44" />
      </div>

      <Skeleton className="h-10 w-full max-w-xs" />

      <div className="flex flex-col gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex w-full flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 flex-col gap-2">
              <Skeleton className="h-5 w-56 max-w-full" />
              <Skeleton className="h-4 w-24" />
            </div>

            <div className="flex items-center justify-between gap-4 sm:justify-start sm:gap-6">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>

      <Skeleton className="mx-auto h-9 w-56 max-w-full" />
    </div>
  )
}
