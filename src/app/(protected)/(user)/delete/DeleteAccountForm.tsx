'use client'

import { AlertTriangle, RefreshCw } from 'lucide-react'
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
      <form onSubmit={openConfirmDialog} className="max-w-xl rounded-lg border bg-white p-6">
        <FieldGroup className="gap-5">
          <div className="flex gap-3">
            <div className="bg-destructive/10 text-destructive flex size-10 shrink-0 items-center justify-center rounded-md">
              <AlertTriangle className="size-5" />
            </div>

            <div className="space-y-1">
              <p className="text-xl font-semibold">Delete account</p>
              <p className="text-muted-foreground text-sm leading-6">
                This will disable your account and you will no longer be able to sign in or create a new account with the same email.
              </p>
            </div>
          </div>

          <Controller
            name="confirmation"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Type confirm to continue</FieldLabel>
                <Input id={field.name} {...field} aria-invalid={fieldState.invalid} placeholder="confirm" autoComplete="off" />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Button type="submit" variant="destructive" disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete account'}
          </Button>
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
