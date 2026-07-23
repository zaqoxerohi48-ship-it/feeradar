import { CredentialsSignin } from 'next-auth'

export class InvalidCredentialsError extends CredentialsSignin {
  code = 'invalid-credentials'
}

export class EmailNotVerifiedError extends CredentialsSignin {
  code = 'email-not-verified'
}
