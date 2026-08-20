'use client'

import { RefreshCw, Upload, UserRoundPen } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Field, FieldError } from '@/components/ui/field'
import { useAvatarForm } from '../model/useAvatarForm'

type Props = {
  avatarUrl: string | null
}

export default function AvatarForm({ avatarUrl }: Props) {
  const { form, hasSelectedAvatar, isSubmitting, isDirty, onSubmit, previewUrl, setAvatar } = useAvatarForm()

  return (
    <form onSubmit={onSubmit} className="flex h-full w-full flex-col items-center gap-5 text-center">
      <div className="space-y-1">
        <p className="text-lg font-medium">Profile photo</p>
        <p className="text-muted-foreground text-sm">Upload a clear image for your account.</p>
      </div>

      <Controller
        name="avatar"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="flex h-full items-center justify-between gap-3">
            <label htmlFor={field.name} className="group relative mx-auto block w-fit cursor-pointer">
              <Avatar className="mx-auto size-40">
                <AvatarImage src={previewUrl || avatarUrl || ''} />

                <AvatarFallback className="bg-muted">
                  <UserRoundPen className="size-9" />
                </AvatarFallback>

                <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 text-white opacity-0 transition group-hover:bg-black/35 group-hover:opacity-100">
                  <Upload className="size-7" />
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

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="w-full space-y-3">
        <p className="text-muted-foreground text-xs">JPG, PNG or WebP. Maximum size 5 MB.</p>

        <Button className="w-full cursor-pointer" disabled={isSubmitting || !hasSelectedAvatar || !isDirty} type="submit">
          {isSubmitting ? 'Uploading...' : hasSelectedAvatar ? 'Upload photo' : 'Choose a photo'}
        </Button>
      </div>
    </form>
  )
}
