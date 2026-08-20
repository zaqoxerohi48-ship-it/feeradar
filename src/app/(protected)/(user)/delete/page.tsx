import DeleteAccountForm from './DeleteAccountForm'

export default function DeleteAccountPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-2xl space-y-2">
        <p className="text-3xl font-semibold tracking-normal">Account deletion</p>
        <p className="text-muted-foreground text-sm leading-6">Delete access to your FeeWatch account. This action is intentionally hard to trigger.</p>
      </div>

      <DeleteAccountForm />
    </div>
  )
}
