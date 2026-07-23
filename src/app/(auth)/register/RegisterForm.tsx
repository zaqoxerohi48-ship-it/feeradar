'use client'

import { Eye, EyeOff } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useRegisterForm } from './useRegisterForm'

export const RegisterForm = () => {
  const { form, onSubmitRegister, isSubmitting } = useRegisterForm()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <form className="w-full max-w-150" onSubmit={onSubmitRegister}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input {...field} type="email" id="email" aria-invalid={fieldState.invalid} placeholder="email" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

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
                  placeholder="Password"
                  className="pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
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
                  placeholder="Confirm password"
                  className="pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                >
                  {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {form.formState.errors.root?.message && <p className="text-sm font-medium text-red-500">{form.formState.errors.root.message}</p>}

        <Button
          className="cursor-pointer rounded-2xl bg-green-400 py-2 font-semibold text-black transition-colors hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating account...' : 'Register'}
        </Button>
      </FieldGroup>
    </form>
  )
}
