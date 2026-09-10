'use client'

import { Camera, RefreshCw, Upload } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Field, FieldError } from '@/components/ui/field'
import { useAvatarForm } from '../model/useAvatarForm'

type Props = {
  avatarUrl: string | null
  displayName: string
  email: string
}

export default function AvatarForm({ avatarUrl, displayName, email }: Props) {
  const { form, hasSelectedAvatar, isSubmitting, isDirty, onSubmit, previewUrl, setAvatar } = useAvatarForm()

  return (
    <form onSubmit={onSubmit} className="flex h-full w-full flex-col items-center gap-5 text-center">
      <div className="space-y-1">
        <p className="text-lg font-semibold">{displayName}</p>
        <p className="text-muted-foreground truncate text-sm">{email}</p>
      </div>

      <Controller
        name="avatar"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="flex h-full w-full flex-col items-center justify-center gap-3">
            <label
              htmlFor={field.name}
              className="group focus-within:outline-primary relative block w-fit cursor-pointer rounded-full focus-within:outline-2 focus-within:outline-offset-4"
            >
              <Avatar className="mx-auto size-32 sm:size-36">
                <AvatarImage src={previewUrl || avatarUrl || ''} />
                <AvatarFallback className="bg-primary/10 text-primary text-3xl font-semibold">{displayName.slice(0, 1).toUpperCase()}</AvatarFallback>
                <span className="bg-primary text-primary-foreground ring-card absolute right-1 bottom-1 flex size-8 items-center justify-center rounded-full ring-4">
                  <Camera className="size-4" aria-hidden="true" />
                </span>
                {isSubmitting && (
                  <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/45 text-white">
                    <RefreshCw className="size-7 animate-spin" />
                  </span>
                )}
              </Avatar>
            </label>

            <input
              ref={field.ref}
              id={field.name}
              disabled={isSubmitting}
              name={field.name}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0]

                if (file) {
                  setAvatar(file)
                  event.target.value = ''
                }
              }}
            />

            <div className="flex flex-col items-center gap-1 text-center">
              <label htmlFor={field.name} className="text-primary inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium hover:underline">
                <Upload className="size-4" aria-hidden="true" /> Choose new photo
              </label>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </div>
          </Field>
        )}
      />

      <div className="w-full space-y-3 border-t pt-5">
        <p className="text-muted-foreground text-xs">
          {hasSelectedAvatar ? 'New photo selected. Save to apply it.' : 'JPG, PNG or WebP. Maximum size 5 MB.'}
        </p>
        <Button className="w-full cursor-pointer" disabled={isSubmitting || !hasSelectedAvatar || !isDirty} type="submit">
          {isSubmitting ? 'Saving photo...' : 'Save photo'}
        </Button>
      </div>
    </form>
  )
}
