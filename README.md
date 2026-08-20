# FeeRadar

Full-stack web application built with **Next.js 16**, **React 19**, **TypeScript**, **PostgreSQL** and **Prisma**.

## Features

- Authentication & authorization
- User and admin dashboards
- Stripe payments
- PostgreSQL + Prisma
- Transactional emails with Resend + React Email
- Rate limiting with Upstash Redis
- Forms with React Hook Form + Zod
- Charts and statistics
- Dark / light theme
- Responsive UI
- Vercel Analytics & Speed Insights

## Tech Stack

**Frontend:** Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query

**Backend:** Next.js Server Actions / Route Handlers, Prisma, PostgreSQL, NextAuth

**Services:** Stripe, Resend, Upstash Redis, Vercel

## Demo

🌐 **Live:** `https://feeradar.xyz`

Demo admin account:

```text
Email: demo@feeradar.xyz
Password: your-demo-password
```

> Demo account has restricted permissions and is intended only for exploring the admin dashboard.

## Getting Started

```bash
git clone YOUR_REPOSITORY_URL
cd YOUR_REPOSITORY
pnpm install
pnpm prisma migrate dev
pnpm dev
```

Create a `.env` file and add the required database, authentication, Stripe, Resend and Upstash credentials.

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm email:dev
```

## About

This project demonstrates a production-style **full-stack Next.js application** with authentication, database management, payments, emails, admin functionality and analytics.
