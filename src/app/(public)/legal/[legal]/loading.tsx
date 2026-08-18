import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <section className="container pt-10">
      <div className="flex max-w-3xl flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-9 w-64 max-w-full" />
          <Skeleton className="h-4 w-48" />
        </div>

        {Array.from({ length: 4 }).map((_, sectionIndex) => (
          <div key={sectionIndex} className="flex flex-col gap-3">
            <Skeleton className="h-6 w-56 max-w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    </section>
  )
}
