# Getting Started with Auto Pneuma

> **"There are different kinds of gifts, but the same Spirit."** — 1 Corinthians 12:4

Welcome to **Auto Pneuma** - a Christian AI Tech Community building ethical, spirit-led AI for Kingdom impact.

## Quick Start

### 1. Install Prerequisites
- Node.js 18+ and npm 9+
- Docker Desktop
- Git

### 2. Set Up Project
```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start database
docker-compose up -d

# Apply database schema (via Supabase SQL Editor)
# Copy contents of packages/database/schema.sql
```

### 3. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000

## What's Inside

### 📖 Documentation (`/docs`)
- **[Statement of Faith](docs/theology/statement-of-faith.md)** - Our theological foundation
- **[Community Guidelines](docs/governance/community-guidelines.md)** - Code of conduct (Fruits of the Spirit)
- **[AI Ethics Framework](docs/theology/ai-ethics.md)** - Biblical principles for AI
- **[Architecture](docs/technical/architecture.md)** - Technical system design
- **[Database Schema](docs/technical/database-schema.md)** - Data structure
- **[Setup Guide](docs/technical/setup-guide.md)** - Detailed installation
- **[MVP Plan](docs/roadmap/mvp-plan.md)** - Development roadmap

### 🎨 Design (`/design`)
- **[Brand Guidelines](design/brand-guidelines.md)** - Logo, colors, typography
- **Logos** - SVG, PNG, favicons in multiple sizes

### 📦 Project Structure

```
autopneuma/
├── apps/
│   ├── autopneuma-web/    # Main community platform (Next.js)
│   └── charismaton-web/   # Marketplace (Phase 2)
├── packages/
│   ├── api/               # FastAPI AI service
│   ├── database/          # PostgreSQL schemas
│   ├── ui/                # Shared components
│   ├── auth/              # Auth utilities
│   ├── ai-services/       # AI integration
│   └── types/             # TypeScript types
├── docs/                  # All documentation
└── design/                # Brand assets
```

## Current Status: Foundation Complete ✅

### What's Done
- ✅ Complete project structure (Turborepo monorepo)
- ✅ Comprehensive theological & governance documentation
- ✅ Technical architecture and database schema
- ✅ Brand guidelines and design system
- ✅ Development environment setup (Docker)

### What's Next
1. **Initialize Next.js app** with TypeScript and Tailwind CSS
2. **Integrate Supabase** for database and authentication
3. **Build core pages** (landing, community, blog, prayer, projects)
4. **Implement features** (discussion board, blog, project showcase)
5. **Add AI integration** (moderation, Scripture assistant)
6. **Deploy** to Vercel and launch

## The Vision

### Auto Pneuma (autopneuma.com)
**"The Same Spirit"** - Foundation and unity
- Community hub for Christian technologists
- Discussion forums on faith, AI ethics, and technology
- Prayer support and spiritual formation
- Resources for ethical AI development

### Charismaton (charismaton.com) - Phase 2
**"The Many Gifts"** - Innovation and diversity
- Marketplace for Christian-built AI tools
- Showcase for community projects
- Collaboration and open-source development

## Core Values

1. **Biblical Foundation** - Rooted in Scripture (1 Cor 12, John 16:13)
2. **Imago Dei** - Honoring that all humans bear God's image
3. **Stewardship** - Responsible AI development and deployment
4. **Fruits of the Spirit** - Love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control
5. **Grace and Truth** - Compassion balanced with biblical standards

## Technology Stack

- **Frontend**: Next.js 14+, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API + FastAPI (for AI features)
- **Database**: PostgreSQL (via Supabase)
- **Auth**: Supabase Auth
- **AI**: OpenAI, Anthropic Claude
- **Deployment**: Vercel (frontend), Fly.io (backend)

## Contributing

We welcome contributions from the Christian tech community!

1. Read our [Statement of Faith](docs/theology/statement-of-faith.md)
2. Review [Community Guidelines](docs/governance/community-guidelines.md)
3. Check the [MVP Plan](docs/roadmap/mvp-plan.md) for current priorities
4. Fork the repo and create a feature branch
5. Make your changes and submit a Pull Request

## Community

- **Mission**: Build ethical AI guided by Christian principles
- **Audience**: Christian developers, engineers, data scientists, entrepreneurs
- **Approach**: Same Spirit (unity) + Many Gifts (diversity)

## Resources

### Essential Reading
1. [Statement of Faith](docs/theology/statement-of-faith.md) - Start here
2. [AI Ethics Framework](docs/theology/ai-ethics.md) - Our ethical foundation
3. [Community Guidelines](docs/governance/community-guidelines.md) - How we interact
4. [Setup Guide](docs/technical/setup-guide.md) - Technical setup
5. [MVP Plan](docs/roadmap/mvp-plan.md) - Where we're going

### Technical Docs
- [Architecture Overview](docs/technical/architecture.md)
- [Database Schema](docs/technical/database-schema.md)
- [Brand Guidelines](design/brand-guidelines.md)

## Next Immediate Steps

1. **Set up Supabase**
   - Create account at supabase.com
   - Create new project
   - Apply schema from `packages/database/schema.sql`
   - Get API keys and update `.env`

2. **Initialize Next.js**
   ```bash
   cd apps/autopneuma-web
   npx create-next-app@latest . --typescript --tailwind --app
   ```

3. **Install dependencies**
   ```bash
   npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
   npm install lucide-react class-variance-authority clsx tailwind-merge
   ```

4. **Build landing page**
   - Hero section with mission
   - Features overview
   - Call-to-action (sign up)

5. **Implement auth**
   - Sign up flow
   - Login flow
   - Protected routes

## Questions or Help?

- **Email**: hello@autopneuma.com
- **GitHub Issues**: Report bugs or request features
- **Documentation**: Comprehensive docs in `/docs` folder

---

## Scripture Foundation

> *"There are different kinds of gifts, but the same Spirit distributes them. There are different kinds of service, but the same Lord. There are different kinds of working, but in all of them and in everyone it is the same God at work. Now to each one the manifestation of the Spirit is given for the common good."*
>
> — 1 Corinthians 12:4-7

> *"But when he, the Spirit of truth, comes, he will guide you into all the truth."*
>
> — John 16:13

---

**Built with the Same Spirit. Creating Many Gifts.**

*For the glory of God and the flourishing of humanity.*
