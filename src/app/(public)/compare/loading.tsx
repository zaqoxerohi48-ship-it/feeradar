import { Skeleton } from '@/components/ui/skeleton'
import { CompareCardSkeleton } from './ui/CompareCardSkeleton'

export default function Loading() {
  return (
    <div className="container flex flex-col gap-8 py-10">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-10" />
        <Skeleton className="size-1 rounded-full" />
        <Skeleton className="h-4 w-16" />
      </div>

      <section className="flex flex-col gap-3">
        <Skeleton className="h-7 w-28 rounded-full" />
        <Skeleton className="h-10 w-full max-w-md" />
        <Skeleton className="h-5 w-full max-w-2xl" />
        <Skeleton className="h-5 w-full max-w-xl" />
        <Skeleton className="mt-2 h-10 w-full max-w-xs" />
      </section>

      <div className="flex flex-col gap-4">
        <Skeleton className="h-7 w-28 rounded-full" />
        <CompareCardSkeleton />
      </div>
    </div>
  )
}
