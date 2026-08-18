# FeeWatch

FeeWatch is a full-stack web application for comparing crypto card fees and tracking blockchain gas fees.

This is my first independent full-stack project. I mainly work with React and Vue on the frontend, so this project is also a way for me to practice backend development, databases, authentication, and server-side logic.

## Tech Stack

- Next.js
- TypeScript
- pnpm
- Prisma
- Neon PostgreSQL
- Auth.js
- TanStack Query
- Tailwind CSS
- shadcn/ui

## Features

- Crypto card fee comparison
- Gas fee tracking
- Network congestion information
- Authentication
- Database integration
- Responsive UI

## Getting Started

Install dependencies:

```bash
pnpm install
```

Create a `.env` file and add the required environment variables:

```env
DATABASE_URL="your-database-url"
AUTH_SECRET="your-auth-secret"
```

Generate Prisma Client:

```bash
pnpm prisma generate
```

Run database migrations:

```bash
pnpm prisma migrate dev
```

Start the development server:

```bash
pnpm dev
```

Open http://localhost:3000.

## Status

The project is currently under development.
