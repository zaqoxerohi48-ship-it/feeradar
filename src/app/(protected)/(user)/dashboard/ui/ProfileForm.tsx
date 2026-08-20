'use client'

import { Controller } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useProfileForm } from '../model/useProfileForm'
import { ProfileFormValues } from '../schema/profile'

type ProfileFormProps = {
  profile: ProfileFormValues
}

export default function ProfileForm({ profile }: ProfileFormProps) {
  const { form, onSubmit, isSubmitting, isDirty } = useProfileForm(profile)

  return (
    <form onSubmit={onSubmit}>
      <FieldGroup className="gap-5">
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Username</FieldLabel>
              <Input aria-invalid={fieldState.invalid} id={field.name} {...field} type="text" placeholder="Enter your username" />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="date_of_birth"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Date of birth</FieldLabel>

              <IMaskInput
                id={field.name}
                name={field.name}
                mask="00/00/0000"
                value={field.value}
                defaultValue={field.value}
                onAccept={(value) => {
                  field.onChange(value)
                }}
                onBlur={field.onBlur}
                inputRef={field.ref}
                placeholder="DD/MM/YYYY"
                aria-invalid={fieldState.invalid}
                className="border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border bg-white px-3 py-2.25 text-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input disabled aria-invalid={fieldState.invalid} id={field.name} {...field} type="email" placeholder="Enter your email address" />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="flex justify-end pt-2">
          <Button className="min-w-32 cursor-pointer" type="submit" disabled={isSubmitting || !isDirty}>
            {isSubmitting ? 'Updating...' : 'Save'}
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}
