import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <section className="container flex flex-col gap-10 py-10 sm:py-16">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 text-center">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-12 w-full max-w-xl" />
        <Skeleton className="h-6 w-full max-w-2xl" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="bg-card flex flex-col gap-6 rounded-2xl border p-8 shadow-sm">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-full max-w-xs" />
            </div>

            <Skeleton className="h-11 w-24" />

            <div className="flex flex-1 flex-col gap-3">
              {Array.from({ length: 4 }).map((_, itemIndex) => (
                <div key={itemIndex} className="flex items-start gap-2">
                  <Skeleton className="mt-0.5 size-4 rounded-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>

            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <Skeleton className="mx-auto h-7 w-48" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-card flex flex-col gap-3 rounded-2xl border p-5 shadow-sm">
              <Skeleton className="size-9 rounded-lg" />
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
