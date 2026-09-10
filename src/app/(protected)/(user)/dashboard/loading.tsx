import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      <div className="grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
        <div className="bg-card flex flex-col items-center rounded-xl border p-6">
          <Skeleton className="size-32 rounded-full" />
          <Skeleton className="mt-5 h-5 w-32" />
          <Skeleton className="mt-2 h-4 w-44" />
          <Skeleton className="mt-8 h-9 w-full" />
        </div>
        <div className="bg-card rounded-xl border">
          <div className="border-b p-6">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="mt-2 h-6 w-44" />
          </div>
          <div className="grid gap-5 p-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="bg-card rounded-xl border p-6">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="mt-4 h-5 w-32" />
            <Skeleton className="mt-2 h-4 w-full max-w-sm" />
          </div>
        ))}
      </div>
      <div className="bg-card rounded-xl border p-6">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="mt-4 h-5 w-44" />
        <Skeleton className="mt-2 h-4 w-full max-w-lg" />
      </div>
    </div>
  )
}
