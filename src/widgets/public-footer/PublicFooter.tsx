import { Logo } from './Logo'

export const PublicFooter = () => {
  return (
    <footer className="bg-card/70 mt-16 border-t">
      <div className="text-muted-foreground container flex flex-col gap-2 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <p>Reliable fee and card comparison data.</p>
      </div>
    </footer>
  )
}
