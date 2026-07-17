import { Logo } from './Logo'

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b py-5 backdrop-blur-sm">
      <div className="container">
        <Logo />
      </div>
    </header>
  )
}
