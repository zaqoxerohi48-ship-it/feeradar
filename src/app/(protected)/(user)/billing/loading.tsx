import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-64 max-w-full" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border p-5">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-full max-w-sm" />
          </div>

          <div className="mt-6 flex gap-3">
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        <div className="rounded-xl border p-5">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-full max-w-xs" />
            <Skeleton className="h-4 w-48" />
          </div>

          <div className="mt-6 grid gap-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
