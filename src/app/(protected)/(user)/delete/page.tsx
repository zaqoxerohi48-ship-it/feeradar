import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import DeleteAccountForm from './DeleteAccountForm'

export const instant = false

export default function DeleteAccountPage() {
  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <div>
        <Link href="/dashboard" className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium">
          <ArrowLeft className="size-4" aria-hidden="true" /> Account settings
        </Link>
        <div className="mt-4 max-w-2xl">
          <p className="text-destructive text-sm font-medium">Account</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Delete account</h1>
          <p className="text-muted-foreground mt-2 text-sm leading-6">
            This action disables access to your FeeWatch account and cannot be undone from settings.
          </p>
        </div>
      </div>
      <DeleteAccountForm />
    </div>
  )
}
