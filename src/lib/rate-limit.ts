'use server'

import { Ratelimit } from '@upstash/ratelimit'
import { headers } from 'next/headers'
import { redis } from '@/lib/redis'

const loginRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
  prefix: 'feewatch:login',
  analytics: false
})

const registerRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
  prefix: 'feewatch:register',
  analytics: false
})

const forgotPasswordRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
  prefix: 'feewatch:forgot-password',
  analytics: false
})

const resetPasswordRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
  prefix: 'feewatch:reset-password',
  analytics: false
})

async function getClientIp(): Promise<string | null> {
  const headersList = await headers()

  const forwardedFor = headersList.get('x-forwarded-for')

  return headersList.get('cf-connecting-ip') ?? forwardedFor?.split(',')[0]?.trim() ?? headersList.get('x-real-ip') ?? null
}

async function limitByIp(rateLimit: Ratelimit) {
  const ip = (await getClientIp()) ?? 'unknown'

  const result = await rateLimit.limit(`ip:${ip}`)

  return {
    ...result,
    identifier: ip
  }
}

export async function limitLoginByIp() {
  return limitByIp(loginRateLimit)
}

export async function limitRegisterByIp() {
  return limitByIp(registerRateLimit)
}

export async function limitForgotPasswordByIp() {
  return limitByIp(forgotPasswordRateLimit)
}

export async function limitResetPasswordByIp() {
  return limitByIp(resetPasswordRateLimit)
}
