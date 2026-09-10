import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-card rounded-xl border p-5">
            <Skeleton className="h-9 w-9 rounded-lg" />
            <Skeleton className="mt-5 h-8 w-20" />
            <Skeleton className="mt-2 h-4 w-36" />
          </div>
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)]">
        <div className="bg-card rounded-xl border p-5">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="mt-2 h-4 w-72 max-w-full" />
          <Skeleton className="mt-6 h-64 w-full" />
        </div>
        <div className="bg-card rounded-xl border p-5">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="mt-6 h-48 w-full" />
        </div>
      </div>
      <div className="bg-card rounded-xl border p-5">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="mt-6 h-28 w-full" />
      </div>
    </div>
  )
}
