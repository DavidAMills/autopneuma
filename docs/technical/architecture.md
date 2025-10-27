# Technical Architecture

## System Design for Auto Pneuma

This document outlines the technical architecture, technology choices, and system design decisions for the Auto Pneuma platform.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                            │
│  ┌──────────────────────┐   ┌──────────────────────────┐  │
│  │  Auto Pneuma Web     │   │  Charismaton Web         │  │
│  │  (Next.js 14+)       │   │  (Next.js 14+)           │  │
│  │  - Community         │   │  - Marketplace           │  │
│  │  - Blog              │   │  - Project Showcase      │  │
│  │  - Prayer            │   │  - Collaboration         │  │
│  └──────────────────────┘   └──────────────────────────┘  │
└────────────┬────────────────────────────┬──────────────────┘
             │                            │
             ▼                            ▼
┌────────────────────────────────────────────────────────────┐
│                      API Layer                              │
│  ┌──────────────────────┐   ┌──────────────────────────┐  │
│  │  Next.js API Routes  │   │  FastAPI Service         │  │
│  │  - Auth              │   │  - AI Moderation         │  │
│  │  - CRUD Operations   │   │  - Scripture Assistant   │  │
│  │  - User Management   │   │  - Content Analysis      │  │
│  └──────────────────────┘   └──────────────────────────┘  │
└────────────┬────────────────────────────┬──────────────────┘
             │                            │
             ▼                            ▼
┌────────────────────────────────────────────────────────────┐
│                     Data Layer                              │
│  ┌──────────────────────┐   ┌──────────────────────────┐  │
│  │  PostgreSQL          │   │  Redis Cache             │  │
│  │  (via Supabase)      │   │  - Session Storage       │  │
│  │  - Users             │   │  - Rate Limiting         │  │
│  │  - Posts             │   │  - Caching               │  │
│  │  - Projects          │   │                          │  │
│  └──────────────────────┘   └──────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────────────────────┐
│                  External Services                          │
│  - OpenAI API           - Anthropic API                    │
│  - Email Service        - Bible API                        │
└────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend

**Framework**: Next.js 14+ with App Router
- **Why**: Server components, excellent SEO, built-in optimization, great developer experience
- **Routing**: App Router (app directory) for modern React patterns
- **Rendering**: Mix of SSR, SSG, and CSR as appropriate

**Language**: TypeScript (Strict Mode)
- **Why**: Type safety, better developer experience, fewer runtime errors
- **Configuration**: Strict mode enabled for maximum safety

**Styling**: Tailwind CSS
- **Why**: Utility-first, highly customizable, excellent for rapid development
- **Configuration**: Custom theme matching brand guidelines

**Component Library**: shadcn/ui
- **Why**: Accessible, customizable, copy-paste components built on Radix UI
- **Approach**: Copy components into project for full control

**State Management**:
- **React Context**: For global state (auth, theme)
- **TanStack Query**: For server state management and caching
- **Zustand** (if needed): For complex client state

**Form Handling**:
- **React Hook Form**: For form state management
- **Zod**: For schema validation

### Backend

**API Layer 1: Next.js API Routes**
- CRUD operations for posts, comments, users
- Authentication endpoints
- Simple data fetching

**API Layer 2: FastAPI**
- AI-powered features (moderation, content analysis)
- Scripture context assistant
- Heavy computational tasks
- Microservice architecture for AI operations

**Why Two API Layers?**
- Next.js: Fast development, co-located with frontend, simple CRUD
- FastAPI: Python AI ecosystem, async performance, better for ML models

### Database

**Primary Database**: PostgreSQL (via Supabase)
- **Why**: Robust, ACID compliance, excellent for relational data
- **Hosting**: Supabase (includes auth, realtime, storage)
- **Schema**: See [Database Schema](database-schema.md)

**Caching Layer**: Redis
- Session storage
- Rate limiting
- API response caching
- Real-time features (if needed)

### Authentication

**Provider**: Supabase Auth
- Email/password authentication
- Social providers (Google, GitHub)
- Magic link authentication
- JWT-based auth tokens
- Row-level security (RLS) in PostgreSQL

**Authorization**:
- Role-based access control (RBAC)
- Roles: guest, member, moderator, admin
- Permissions managed via Supabase RLS policies

### AI Integration

**Providers**:
- **OpenAI** (GPT-4): Content moderation, general AI tasks
- **Anthropic Claude**: Nuanced theological discussions, complex reasoning
- **Abstraction Layer**: Service layer to switch between providers

**AI Features (MVP)**:
- Content moderation (flag, not auto-delete)
- Scripture context lookup
- Similarity search for related discussions

**Future AI Features**:
- Spiritual gift mapping
- AI mentoring assistant
- Advanced content classification

### Deployment

**Frontend**: Vercel
- **Why**: Built by Next.js team, excellent performance, automatic previews
- **Configuration**: Environment variables, custom domain

**Backend (FastAPI)**: Fly.io or Railway
- **Why**: Easy Docker deployment, global edge network, good pricing
- **Configuration**: Dockerfile, environment secrets

**Database**: Supabase Cloud (PostgreSQL)
- **Why**: Managed service, includes auth and realtime, good free tier

**CDN**: Vercel Edge Network / Cloudflare
- Static assets
- Image optimization

## Monorepo Structure

Using **Turborepo** for monorepo management:

```
autopneuma/
├── apps/
│   ├── autopneuma-web/       # Main community platform
│   └── charismaton-web/      # Marketplace (Phase 2)
├── packages/
│   ├── api/                  # FastAPI service
│   ├── database/             # DB schemas, migrations
│   ├── ui/                   # Shared React components
│   ├── auth/                 # Auth utilities
│   ├── ai-services/          # AI abstraction layer
│   └── types/                # Shared TypeScript types
```

**Benefits**:
- Shared code between multiple apps
- Consistent tooling and configuration
- Faster builds with caching
- Easy to scale to multiple frontends

## Data Flow

### User Authentication Flow

```
1. User visits /login
2. Enters credentials
3. Next.js API → Supabase Auth
4. Supabase returns JWT
5. JWT stored in httpOnly cookie
6. Subsequent requests include JWT
7. Middleware validates JWT
8. Protected routes accessible
```

### Content Creation Flow (Discussion Post)

```
1. User composes post in frontend
2. Form validates with Zod
3. POST request to Next.js API route
4. API validates auth + content
5. Optional: Flag to FastAPI for AI moderation
6. Store in PostgreSQL (via Supabase client)
7. Return success + new post data
8. UI updates optimistically
```

### AI Moderation Flow

```
1. User submits content
2. Next.js API → FastAPI service
3. FastAPI → OpenAI/Claude API
4. AI analyzes content for violations
5. Returns flagged concerns (if any)
6. Moderator reviews flagged content
7. Manual action taken (approve/remove)
```

## Security Considerations

### Authentication & Authorization
- JWT tokens in httpOnly cookies (prevents XSS)
- CSRF protection on state-changing operations
- Row-level security (RLS) in PostgreSQL
- API rate limiting via Redis

### Data Protection
- HTTPS only (enforced)
- Environment variables for secrets (never in code)
- Supabase RLS policies for data access
- Input validation on all endpoints

### AI Safety
- Content moderation before public display
- Rate limiting on AI endpoints
- User-facing AI always reviewed by humans for sensitive actions
- Prompt injection protection

## Performance Optimization

### Frontend
- **Next.js Image**: Automatic image optimization
- **Code Splitting**: Automatic with Next.js
- **Server Components**: Default to RSC, client components only when needed
- **Static Generation**: Pre-render blog posts and static pages

### Backend
- **Database Indexes**: On frequently queried columns
- **Redis Caching**: Cache expensive queries
- **Connection Pooling**: Supabase handles this
- **CDN**: Static assets served via edge network

### Monitoring
- **Vercel Analytics**: Frontend performance
- **Sentry**: Error tracking (optional)
- **Database Monitoring**: Supabase dashboard
- **Custom Logging**: Structured logs for debugging

## Scalability

### Current Architecture (MVP)
- Supports 1,000-10,000 users
- Vercel autoscaling for frontend
- Supabase managed PostgreSQL
- FastAPI on single instance

### Future Scaling (Phase 2+)
- **Database**: Read replicas, connection pooling
- **FastAPI**: Multiple instances behind load balancer
- **Caching**: More aggressive Redis caching
- **Search**: Elasticsearch or Algolia for advanced search
- **Background Jobs**: Bull/BullMQ for async processing

## Development Workflow

### Local Development

1. **Start services**: `docker-compose up -d` (PostgreSQL, Redis)
2. **Install dependencies**: `npm install`
3. **Run dev server**: `npm run dev`
4. **Access**:
   - Frontend: http://localhost:3000
   - FastAPI: http://localhost:8000

### CI/CD Pipeline

**GitHub Actions**:
1. **Lint**: ESLint, Prettier
2. **Type Check**: TypeScript compilation
3. **Test**: Jest, React Testing Library
4. **Build**: Turborepo build
5. **Deploy**: Automatic to Vercel (previews + production)

### Git Workflow

- **Main branch**: Production-ready code
- **Develop branch**: Integration branch
- **Feature branches**: Individual features
- **Pull Requests**: Required for all changes
- **Code Review**: At least one approval required

## Design Patterns

### Frontend Patterns

**Component Structure**:
```
app/
  (auth)/           # Auth-required pages
  (public)/         # Public pages
  api/              # API routes
  _components/      # Shared components
```

**Component Guidelines**:
- Server Components by default
- Client Components for interactivity
- Co-locate styles with components
- Extract reusable logic to hooks

### Backend Patterns

**API Structure**:
```
api/
  users/
    route.ts        # CRUD operations
  posts/
    route.ts
    [id]/
      route.ts      # Individual post operations
```

**Error Handling**:
- Consistent error response format
- HTTP status codes
- Detailed error messages in development
- Generic messages in production

### Data Patterns

**Supabase Queries**:
- Use Supabase client for queries
- Apply RLS policies for security
- Use TypeScript types generated from schema

**Caching Strategy**:
- Cache expensive queries in Redis
- Invalidate cache on updates
- TanStack Query for client-side caching

## API Contracts

### REST API Conventions

**Endpoints**:
- Nouns, not verbs: `/api/posts` not `/api/getPosts`
- Plural for collections: `/api/posts`
- Singular for items: `/api/posts/[id]`

**HTTP Methods**:
- GET: Retrieve data
- POST: Create new resource
- PUT/PATCH: Update resource
- DELETE: Remove resource

**Response Format**:
```json
{
  "success": true,
  "data": {...},
  "error": null
}
```

**Error Format**:
```json
{
  "success": false,
  "data": null,
  "error": {
    "message": "User-friendly error message",
    "code": "ERROR_CODE"
  }
}
```

## Environment Variables

### Required

**Supabase**:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

**AI Services**:
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`

**Database**:
- `DATABASE_URL`

### Optional

- `CONVERTKIT_API_KEY` (newsletter)
- `SENTRY_DSN` (error tracking)
- `REDIS_URL` (if not local)

## Future Considerations

### Phase 2 (Charismaton)
- Marketplace infrastructure
- Payment processing (Stripe)
- Project licensing management
- Collaboration tools

### Phase 3 (Advanced Features)
- Mobile app (React Native)
- Real-time collaboration
- Video content
- Advanced AI features

## Related Documents

- [Database Schema](database-schema.md)
- [Setup Guide](setup-guide.md)
- [MVP Plan](../roadmap/mvp-plan.md)
