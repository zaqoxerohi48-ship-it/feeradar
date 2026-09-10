'use client'

import { RefreshCw } from 'lucide-react'
import { Controller } from 'react-hook-form'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useDeleteAccountForm } from './useDeleteAccountForm'

export default function DeleteAccountForm() {
  const { form, isDeleting, isDialogOpen, openConfirmDialog, confirmDelete, setIsDialogOpen } = useDeleteAccountForm()

  return (
    <>
      <form onSubmit={openConfirmDialog} className="border-destructive/30 bg-card w-full overflow-hidden rounded-2xl border shadow-sm">
        <FieldGroup className="gap-5">
          <div className="bg-destructive/[0.04] border-b p-5 sm:p-6">
            <div className="space-y-1.5">
              <p className="text-lg font-semibold tracking-tight">Permanently disable your account</p>
              <p className="text-muted-foreground text-sm leading-6">
                This will disable your account and you will no longer be able to sign in or create a new account with the same email.
              </p>
            </div>
          </div>

          <div className="space-y-3 px-5 sm:px-6">
            <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">What happens next</p>
            <div className="grid gap-2 sm:grid-cols-3">
              <div className="bg-muted/45 space-y-1 rounded-lg border p-3">
                <p className="text-sm font-medium">Access disabled</p>
                <p className="text-muted-foreground text-xs leading-5">You will be signed out of your account.</p>
              </div>
              <div className="bg-muted/45 space-y-1 rounded-lg border p-3">
                <p className="text-sm font-medium">Email blocked</p>
                <p className="text-muted-foreground text-xs leading-5">This email cannot be registered again.</p>
              </div>
              <div className="bg-muted/45 space-y-1 rounded-lg border p-3">
                <p className="text-sm font-medium">No undo</p>
                <p className="text-muted-foreground text-xs leading-5">The action cannot be reversed from settings.</p>
              </div>
            </div>
          </div>

          <div className="px-5 sm:px-6">
            <Controller
              name="confirmation"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Type <span className="font-mono">confirm</span> to continue
                  </FieldLabel>
                  <Input id={field.name} {...field} aria-invalid={fieldState.invalid} placeholder="confirm" autoComplete="off" />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>

          <div className="flex flex-col-reverse gap-3 border-t px-5 pt-5 pb-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:pb-6">
            <p className="text-muted-foreground text-xs">You’ll be asked to confirm once more before this happens.</p>
            <Button type="submit" variant="destructive" disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete account'}
            </Button>
          </div>
        </FieldGroup>
      </form>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete your account?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will mark your account as deleted, sign you out, and block future login or registration with this account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" disabled={isDeleting} onClick={confirmDelete}>
              {isDeleting && <RefreshCw className="size-4 animate-spin" />}
              Yes, delete account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
