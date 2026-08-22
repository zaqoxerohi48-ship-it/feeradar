import { NavLink } from '@/widgets/public-header/NavLink'
import { Logo } from './Logo'

export const PublicFooter = () => {
  return (
    <footer className="bg-card/70 mt-16 border-t">
      <div className="text-muted-foreground container flex flex-col gap-2 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <nav aria-label="Legal links" className="flex gap-4">
          <NavLink href="/legal/terms" text="Terms of Service" />
          <NavLink href="/legal/policy" text="Privacy Policy" />
        </nav>
      </div>
    </footer>
  )
}
