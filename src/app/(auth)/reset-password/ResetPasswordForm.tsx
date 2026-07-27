'use client'

import { Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useResetPassword } from './useResetPassword'

export const ResetPasswordForm = () => {
  const { form, onSubmit, isSubmiting } = useResetPassword()

  return (
    <form onSubmit={onSubmit}>
      <FieldGroup>
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input {...field} id="password" aria-invalid={fieldState.invalid} placeholder="Enter your password" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="confirm_password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirm_password">Confirm Password</FieldLabel>
              <Input {...field} id="confirm_password" aria-invalid={fieldState.invalid} placeholder="Confirm your password" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        type="submit"
        className="cursor-pointer rounded-2xl bg-green-400 py-2 font-semibold text-black transition-colors hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isSubmiting}
      >
        {isSubmiting ? 'Updating password...' : 'Update Password'}
      </Button>
    </form>
  )
}
