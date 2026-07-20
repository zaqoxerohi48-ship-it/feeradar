import { Resend } from 'resend'

const apiKey = process.env.RESEND_URL

if (!apiKey) {
  throw new Error('RESEND is not defined')
}

export const resend = new Resend(apiKey)
