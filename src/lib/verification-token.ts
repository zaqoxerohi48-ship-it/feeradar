import { createHash, randomBytes } from 'node:crypto'

const VERIFICATION_TOKEN_LIFETIME = 1000 * 60 * 60

export const hashVerificationToken = (token: string) => {
  return createHash('sha256').update(token).digest('hex')
}

export const createVerificationToken = () => {
  const token = randomBytes(32).toString('base64url')

  const tokenHash = hashVerificationToken(token)

  const expiresAt = new Date(Date.now() + VERIFICATION_TOKEN_LIFETIME)

  return {
    token,
    tokenHash,
    expiresAt
  }
}
