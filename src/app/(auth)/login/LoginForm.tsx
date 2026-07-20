'use client'

import { Button } from '@base-ui/react/button'
import { Controller } from 'react-hook-form'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useLoginForm } from './useLoginForm'

export const LoginForm = () => {
  const { form, submitLogin } = useLoginForm()

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
              <Input aria-invalid={fieldState.invalid} id={field.name} {...field} type="password" placeholder="password" />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button className="cursor-pointer rounded-2xl bg-green-400 py-2 font-semibold text-black transition-colors hover:bg-green-500" type="submit">
          Login
        </Button>
      </FieldGroup>
    </form>
  )
}
