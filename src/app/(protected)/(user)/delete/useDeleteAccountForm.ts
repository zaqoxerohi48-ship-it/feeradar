'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { deleteAccount } from './actions'
import { DeleteAccountFormValues, deleteAccountSchema } from './schema'

export function useDeleteAccountForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleting, startDeleteTransition] = useTransition()

  const form = useForm<DeleteAccountFormValues>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      confirmation: ''
    }
  })

  const openConfirmDialog = form.handleSubmit(() => {
    setIsDialogOpen(true)
  })

  const confirmDelete = () => {
    startDeleteTransition(async () => {
      const result = await deleteAccount(form.getValues())

      if (result?.success === false) {
        toast.error(result.message)
        setIsDialogOpen(false)
      }
    })
  }

  return {
    form,
    isDeleting,
    isDialogOpen,
    openConfirmDialog,
    confirmDelete,
    setIsDialogOpen
  }
}
