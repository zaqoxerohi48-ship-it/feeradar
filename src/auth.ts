import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { verifyPassword } from '@/lib/password'
import prisma from '@/lib/prisma'

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt'
  },

  pages: {
    signIn: '/sign-in'
  },

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },

      async authorize(credentials) {
        const parsedCredentials = signInSchema.safeParse(credentials)

        if (!parsedCredentials.success) {
          return null
        }

        const { email, password } = parsedCredentials.data

        const user = await prisma.user.findUnique({
          where: {
            email
          }
        })

        if (!user || !user.passwordHash) {
          return null
        }

        const isValidPassword = await verifyPassword(password, user.passwordHash)

        if (!isValidPassword) {
          return null
        }

        if (!user.emailVerifiedAt) {
          return null
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
        token.role = user.role
      }

      return token
    },

    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }

      return session
    }
  }
})
