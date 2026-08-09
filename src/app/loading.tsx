export default function Loading() {
  return (
    <section className="container flex min-h-[60vh] items-center justify-center py-16">
      <div className="flex max-w-sm flex-col items-center gap-5 text-center">
        <div className="size-10 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold tracking-tight text-foreground">Loading</p>
          <p className="text-sm leading-6 text-muted-foreground">Preparing the latest FeeRadar data.</p>
        </div>
      </div>
    </section>
  )
}
