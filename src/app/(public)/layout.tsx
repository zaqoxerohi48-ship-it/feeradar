import { Footer } from './_ui/Footer/Footer'
import { Header } from './_ui/Header/Header'

export default function PublicLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
