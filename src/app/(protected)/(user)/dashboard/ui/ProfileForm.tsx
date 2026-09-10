'use client'

import { BadgeCheck, CalendarDays, UserRound } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useProfileForm } from '../model/useProfileForm'
import { ProfileFormValues } from '../schema/profile'

type ProfileFormProps = {
  profile: ProfileFormValues
  isEmailVerified: boolean
}

export default function ProfileForm({ profile, isEmailVerified }: ProfileFormProps) {
  const { form, onSubmit, isSubmitting, isDirty } = useProfileForm(profile)

  return (
    <form onSubmit={onSubmit}>
      <FieldGroup className="gap-6">
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Username</FieldLabel>
              <div className="relative">
                <UserRound className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" aria-hidden="true" />
                <Input aria-invalid={fieldState.invalid} id={field.name} {...field} type="text" placeholder="Enter your username" className="pl-9" />
              </div>
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
              <div className="relative">
                <CalendarDays
                  className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                  aria-hidden="true"
                />
                <IMaskInput
                  id={field.name}
                  name={field.name}
                  mask="00/00/0000"
                  value={field.value}
                  defaultValue={field.value}
                  onAccept={(value) => field.onChange(value)}
                  onBlur={field.onBlur}
                  inputRef={field.ref}
                  placeholder="DD/MM/YYYY"
                  aria-invalid={fieldState.invalid}
                  className="border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring bg-input-background flex w-full rounded-md border py-2.25 pr-3 pl-9 text-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center justify-between gap-3">
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                {isEmailVerified && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                    <BadgeCheck className="size-3.5" aria-hidden="true" /> Verified
                  </span>
                )}
              </div>
              <Input disabled aria-invalid={fieldState.invalid} id={field.name} {...field} type="email" placeholder="Enter your email address" />
              <p className="text-muted-foreground text-xs">Email changes are not available from account settings.</p>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground text-xs">Changes are saved only when you select Save changes.</p>
          <Button className="min-w-32 cursor-pointer" type="submit" disabled={isSubmitting || !isDirty}>
            {isSubmitting ? 'Saving...' : 'Save changes'}
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}
