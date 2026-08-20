import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { EmailNotVerifiedError, InvalidCredentialsError } from '@/lib/auth-errors'
import { verifyPassword } from '@/lib/password'
import prisma from '@/lib/prisma'
import { loginFormSchema } from './app/(auth)/login/schema'

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt'
  },

  pages: {
    signIn: '/login'
  },

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },

      async authorize(credentials) {
        const parsedCredentials = loginFormSchema.safeParse(credentials)

        if (!parsedCredentials.success) {
          throw new InvalidCredentialsError()
        }

        const { email, password } = parsedCredentials.data

        const user = await prisma.user.findUnique({
          where: { email }
        })

        if (!user || !user.passwordHash || user.isDeleted) {
          throw new InvalidCredentialsError()
        }

        const isValidPassword = await verifyPassword(password, user.passwordHash)

        if (!isValidPassword) {
          throw new InvalidCredentialsError()
        }

        if (!user.emailVerifiedAt) {
          throw new EmailNotVerifiedError()
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role
        }
      }
    })
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.role = user.role
      }

      return token
    },

    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.role = token.role as string
      }

      return session
    }
  }
})
