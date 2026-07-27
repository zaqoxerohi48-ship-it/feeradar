'use client'

import { Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useForgotPassword } from './useForgotPassword'

export const ForgotPasswordForm = () => {
  const { form, onSubmit, isSubmiting } = useForgotPassword()

  return (
    <form className="flex w-full flex-col items-center justify-center gap-6" onSubmit={onSubmit}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="forgot-password">Reset Password</FieldLabel>
              <Input type="email" {...field} id="forgot-password" aria-invalid={fieldState.invalid} placeholder="Enter your email address" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        className="w-full cursor-pointer rounded-2xl bg-green-400 py-2 font-semibold text-black transition-colors hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-70"
        type="submit"
        disabled={isSubmiting}
      >
        {isSubmiting ? 'Resetting password...' : 'Reset Password'}
      </Button>
    </form>
  )
}
