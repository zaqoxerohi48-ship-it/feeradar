'use client'

import { QueryClient, QueryClientProvider, environmentManager } from '@tanstack/react-query'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import type { ReactNode } from 'react'

function makeQueryClient() {
  return new QueryClient()
}

let browserQueryClient: QueryClient | undefined

function getQueryClient() {
  if (environmentManager.isServer()) {
    return makeQueryClient()
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient()
  }

  return browserQueryClient
}

type ProvidersProps = {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const queryClient = getQueryClient()

  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </NuqsAdapter>
  )
}
