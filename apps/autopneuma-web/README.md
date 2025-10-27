# Auto Pneuma Web App

The main community platform for Auto Pneuma - a Christian AI Tech Community.

## Setup

### 1. Install Dependencies

From the **autopneuma-web** directory:

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
autopneuma-web/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth-protected routes
│   ├── (public)/          # Public routes
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── providers.tsx      # Client providers
├── components/
│   └── ui/                # Reusable UI components
├── lib/
│   ├── supabase/          # Supabase client utilities
│   └── utils.ts           # Utility functions
├── middleware.ts          # Next.js middleware for auth
└── public/                # Static assets
```

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui + Radix UI
- **Database & Auth**: Supabase
- **State Management**: TanStack Query + React Context
- **Forms**: React Hook Form + Zod

## Development

### Running Locally

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Style

- Use TypeScript strict mode
- Follow ESLint rules
- Use Prettier for formatting
- Component naming: PascalCase
- File naming: kebab-case for pages, PascalCase for components

## Supabase Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for initialization (~2 minutes)

### 2. Apply Database Schema

1. Go to SQL Editor in Supabase dashboard
2. Copy contents of `../../packages/database/schema.sql`
3. Run the SQL to create all tables

### 3. Get API Keys

1. Go to Settings > API
2. Copy your Project URL and keys
3. Add to `.env.local`

### 4. Enable Email Authentication

1. Go to Authentication > Providers
2. Enable Email provider
3. Configure email templates (optional)

## Features

### Implemented
- ✅ Landing page with hero and features
- ✅ Responsive navigation
- ✅ Brand styling (navy + beige theme)
- ✅ Supabase client setup
- ✅ Theme provider (light/dark mode)
- ✅ TanStack Query for data fetching

### In Progress
- 🔨 Authentication (login, signup)
- 🔨 User profiles
- 🔨 Discussion board
- 🔨 Blog system

### Planned
- 📋 Prayer requests
- 📋 Project showcase
- 📋 AI integration
- 📋 Real-time features

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Auto Pneuma Documentation](../../docs/)

## Related

- [Main README](../../README.md)
- [Statement of Faith](../../docs/theology/statement-of-faith.md)
- [Database Schema](../../docs/technical/database-schema.md)
