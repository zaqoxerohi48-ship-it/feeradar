'use client'

import { Eye, EyeOff } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useResetPassword } from './useResetPassword'

type ResetPasswordFormProps = {
  token: string
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const { form, onSubmit, isSubmiting } = useResetPassword(token)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <form className="flex w-full flex-col items-center justify-center gap-6" onSubmit={onSubmit}>
      <FieldGroup>
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Password</FieldLabel>

              <div className="relative">
                <Input
                  {...field}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                  className="pr-10"
                />

                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((previous) => !previous)}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>

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

              <div className="relative">
                <Input
                  {...field}
                  id="confirm_password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  aria-invalid={fieldState.invalid}
                  placeholder="Confirm your password"
                  className="pr-10"
                />

                <button
                  type="button"
                  aria-label={showConfirmPassword ? 'Hide confirmation password' : 'Show confirmation password'}
                  aria-pressed={showConfirmPassword}
                  onClick={() => setShowConfirmPassword((previous) => !previous)}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit" className="w-full cursor-pointer" disabled={isSubmiting}>
        {isSubmiting ? 'Updating password...' : 'Update Password'}
      </Button>
    </form>
  )
}
