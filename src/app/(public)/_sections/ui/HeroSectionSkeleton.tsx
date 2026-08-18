import { Skeleton } from '@/components/ui/skeleton'

export function HeroSectionSkeleton() {
  return (
    <section className="overflow-hidden pt-10">
      <div className="container">
        <div className="grid items-center gap-12 xl:grid-cols-2 xl:gap-16">
          <div className="flex flex-col items-start gap-6">
            <Skeleton className="h-10 w-64 rounded-full" />
            <Skeleton className="h-16 w-full max-w-2xl" />
            <div className="flex w-full max-w-xl flex-col gap-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Skeleton className="h-10 w-full sm:w-32" />
              <Skeleton className="h-10 w-full sm:w-32" />
            </div>

            <div>
              <Skeleton className="h-5 w-36" />

              <div className="mt-2 flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-8 w-24 rounded-full" />
                ))}
              </div>
            </div>
          </div>

          <Skeleton className="aspect-[8/7] w-full rounded-2xl" />
        </div>
      </div>
    </section>
  )
}
