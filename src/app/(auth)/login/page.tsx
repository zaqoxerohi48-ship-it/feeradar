import Link from 'next/link'
import { LoginForm } from './LoginForm'

export default function LoginPage() {
  return (
    <div className="container flex justify-center px-4 py-10 md:pt-30">
      <div className="w-full max-w-xl">
        <div className="mb-8 text-center">
          <p className="text-3xl font-bold tracking-tight">Welcome back</p>

          <p className="text-muted-foreground mt-2 text-sm">Sign in to manage cards, fees, and your FeeRadar account.</p>
        </div>

        <LoginForm />

        <p className="text-muted-foreground mt-6 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-primary font-medium hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
