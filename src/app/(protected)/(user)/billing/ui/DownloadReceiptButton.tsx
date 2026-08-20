'use client'

import { Download, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

type DownloadReceiptButtonProps = {
  orderId: number
  disabled: boolean
}

export default function DownloadReceiptButton({ orderId, disabled }: DownloadReceiptButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadReceipt = async () => {
    setIsDownloading(true)

    try {
      const response = await fetch(`/api/billing/orders/${orderId}`)

      if (!response.ok) {
        toast.error('Could not download receipt.')
        return
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')

      link.href = url
      link.download = `receipt-${orderId}.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
    } catch {
      toast.error('Could not download receipt.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Button type="button" variant="outline" size="sm" disabled={disabled || isDownloading} onClick={downloadReceipt}>
      {isDownloading ? <RefreshCw className="size-4 animate-spin" /> : <Download className="size-4" />}
      {isDownloading ? 'Downloading...' : 'Download'}
    </Button>
  )
}
