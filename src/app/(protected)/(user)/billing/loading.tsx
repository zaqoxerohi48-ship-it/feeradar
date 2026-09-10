import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <div>
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-5 h-8 w-52" />
        <Skeleton className="mt-2 h-4 w-96 max-w-full" />
      </div>
      <div className="bg-card rounded-xl border p-6">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="mt-4 h-5 w-28" />
        <Skeleton className="mt-2 h-4 w-44" />
      </div>
      <div>
        <Skeleton className="h-6 w-40" />
        <Skeleton className="mt-2 h-4 w-72 max-w-full" />
        <div className="mt-4 grid gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-card flex items-center justify-between rounded-xl border p-5">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-9 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
