'use client'

import { Eye, EyeOff } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useLoginForm } from './useLoginForm'

export const LoginForm = () => {
  const { form, submitLogin, isSubmitting } = useLoginForm()

  const [showPassword, setShowPassword] = useState(false)

  return (
    <form className="w-full max-w-150" onSubmit={submitLogin}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input aria-invalid={fieldState.invalid} id={field.name} {...field} type="email" placeholder="email" />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <div className="relative">
                <Input
                  aria-invalid={fieldState.invalid}
                  id={field.name}
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button
          className="cursor-pointer rounded-2xl bg-green-400 py-2 font-semibold text-black transition-colors hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>
      </FieldGroup>
    </form>
  )
}
