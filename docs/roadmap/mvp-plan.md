# Auto Pneuma MVP Plan

## Project Status: Foundation Phase Complete ✅

**Last Updated**: October 27, 2025

## Vision Summary

**Auto Pneuma** (Greek: "the same Spirit") is a Christian AI Tech Community platform dedicated to ethical, spirit-led AI development. We unite Christian developers, engineers, data scientists, and entrepreneurs around:

1. **The Same Spirit** (Auto Pneuma / autopneuma.com) - Community foundation and guidance
2. **The Many Gifts** (Charismaton / charismaton.com) - Innovation and marketplace (Phase 2)

## What's Been Completed

### ✅ Phase 1: Foundation & Documentation

#### Project Structure
- [x] Turborepo monorepo configuration
- [x] Root-level configuration files (package.json, turbo.json, docker-compose.yml)
- [x] Development environment setup (Docker for PostgreSQL + Redis)
- [x] ESLint, Prettier, and TypeScript configuration
- [x] Comprehensive .gitignore and .env.example
- [x] Complete folder structure for apps, packages, docs, and design

#### Documentation
- [x] **Main README** - Project overview, setup instructions, vision
- [x] **Theological Framework**:
  - Statement of Faith (1 Cor 12, John 16:13, Imago Dei)
  - AI Ethics Framework (biblical principles for AI development)
  - Biblical Foundation (scripture references and rationale)
- [x] **Governance**:
  - Community Guidelines ("Fruits of the Spirit" code of conduct)
  - Leadership Structure (Advisory Board, moderators, accountability)
  - Moderation Policy (grace + truth approach)
- [x] **Technical Documentation**:
  - Architecture Overview (system design, tech stack, deployment)
  - Database Schema (complete PostgreSQL schema with RLS)
  - Database Schema Documentation (entity relationships, design decisions)

#### Brand Assets
- [x] Brand Guidelines (logo usage, colors, typography, voice & tone)
- [x] Logo directory structure (original, SVG, favicon, variations)
- [x] Design tokens and style guide

#### Database
- [x] Complete PostgreSQL schema with:
  - User profiles with spiritual gifts and focus areas
  - Discussion board (posts, comments, categories)
  - Blog system with markdown support
  - Project showcase ("Gift Gallery")
  - Prayer request system
  - Moderation tools (reports, logs, user moderation)
  - Newsletter subscriptions
- [x] Row-Level Security (RLS) policies for all tables
- [x] Indexes for performance optimization
- [x] Triggers for auto-timestamps and count maintenance

## Phase 2: Implementation (Next Steps)

### 🔨 Sprint 1: Next.js Foundation (Week 1-2)

#### Tasks
1. **Initialize Next.js App**
   - Create apps/autopneuma-web with Next.js 14+ (App Router)
   - Install and configure TypeScript
   - Set up Tailwind CSS with custom theme (brand colors)
   - Install shadcn/ui components
   - Create base layout (navigation, footer)

2. **Supabase Integration**
   - Create Supabase project
   - Apply database schema from `packages/database/schema.sql`
   - Configure Supabase client in Next.js
   - Set up environment variables

3. **Authentication System**
   - Implement Supabase Auth
   - Create login/signup pages
   - Protected route middleware
   - User session management

4. **Core Pages (Shell)**
   - Landing page (/)
   - About (/about)
   - Statement of Faith (/faith)
   - Community hub (/community)
   - Blog listing (/blog)
   - Projects showcase (/projects)
   - Prayer requests (/prayer)

#### Deliverables
- Functional Next.js app with authentication
- Users can register, log in, and create profiles
- All core pages accessible with basic layouts

### 🔨 Sprint 2: Discussion Board & Blog (Week 3-4)

#### Tasks
1. **Discussion Board**
   - Post creation with markdown editor
   - Post listing by category
   - Individual post view with comments
   - Comment threading
   - Tags and search functionality

2. **Blog System**
   - Blog post creation (admin/authors only)
   - Markdown rendering
   - Blog post listing and pagination
   - Individual blog post view
   - Featured posts on homepage

3. **User Profiles**
   - Profile view page
   - Profile editing
   - Spiritual gifts and focus areas selector
   - User's posts, comments, and projects

#### Deliverables
- Fully functional discussion board
- Blog with published content
- Complete user profile system

### 🔨 Sprint 3: Prayer & Projects (Week 5-6)

#### Tasks
1. **Prayer Request System**
   - Create prayer request form
   - Prayer request listing (by status/category)
   - "I prayed for this" interaction
   - Prayer updates (testimonies)
   - Anonymous and private request options

2. **Project Showcase**
   - Project submission form
   - Project cards (gallery view)
   - Individual project pages
   - GitHub/demo link integration
   - Tech stack and spiritual application display

3. **Content Seeding**
   - Create 2-3 sample blog posts
   - Create 2-3 discussion threads
   - Create 1-2 sample projects
   - Seed prayer requests

#### Deliverables
- Prayer request system fully functional
- Project showcase with sample projects
- Platform populated with placeholder content

### 🔨 Sprint 4: AI Integration & Polish (Week 7-8)

#### Tasks
1. **FastAPI Service**
   - Create packages/api with FastAPI structure
   - Dockerfile for containerization
   - AI service abstraction layer (OpenAI, Anthropic)
   - Content moderation endpoint
   - Scripture context assistant endpoint

2. **AI Features**
   - AI-assisted content moderation (flag for review)
   - Scripture lookup and context
   - Integration with discussion board and blog

3. **Polish & Testing**
   - Responsive design testing
   - Accessibility audit (WCAG AA)
   - Performance optimization
   - Bug fixes
   - User testing with beta community

4. **Deployment**
   - Deploy Next.js to Vercel
   - Deploy FastAPI to Fly.io or Railway
   - Configure custom domains (autopneuma.com)
   - Set up environment variables in production

#### Deliverables
- AI-powered features live
- Production-ready platform deployed
- Beta community onboarded

## Phase 3: Launch & Iterate (Month 3)

### Launch Preparation
- [ ] Finalize content (about page, statement of faith)
- [ ] Invite founding members and early adopters
- [ ] Set up newsletter integration (ConvertKit)
- [ ] Prepare launch announcement
- [ ] Social media accounts and branding

### Public Launch
- [ ] Soft launch to Christian tech communities
- [ ] Blog post announcement
- [ ] Social media campaign
- [ ] Email to interested subscribers

### Post-Launch Iteration
- [ ] Gather user feedback
- [ ] Fix bugs and usability issues
- [ ] Expand content (blog posts, discussion topics)
- [ ] Onboard moderators and Advisory Board

## Phase 4: Charismaton Expansion (Month 4-6)

### Charismaton (charismaton.com) - "The Many Gifts"

1. **Marketplace Infrastructure**
   - Project submission and approval workflow
   - Rating and review system
   - Collaboration tools
   - Advanced search and filtering

2. **Community Growth**
   - Events and webinars
   - Certification programs
   - Partner integrations (churches, Christian tech orgs)

3. **Advanced AI Features**
   - Spiritual gift mapping (AI-assisted personality analysis)
   - AI mentoring system
   - Collaborative dev environments
   - Advanced content understanding

## Success Metrics

### MVP Success (End of Phase 2)
- [ ] 50+ registered users
- [ ] 20+ discussion threads
- [ ] 10+ blog posts published
- [ ] 5+ projects in showcase
- [ ] 15+ prayer requests
- [ ] Active moderation and community engagement
- [ ] Zero critical bugs

### 3-Month Success (End of Phase 3)
- [ ] 250+ registered users
- [ ] 100+ discussion threads
- [ ] 25+ blog posts
- [ ] 15+ projects
- [ ] 50+ prayer requests
- [ ] Advisory Board established
- [ ] Regular community activity

### 6-Month Success (End of Phase 4)
- [ ] 1,000+ users
- [ ] Charismaton marketplace launched
- [ ] 50+ projects in showcase
- [ ] Monthly community events
- [ ] Established reputation in Christian tech community

## Budget Considerations

### MVP (Minimal Costs)
- **Supabase**: Free tier (up to 500MB database, 2GB file storage)
- **Vercel**: Free tier (unlimited deployments)
- **Fly.io/Railway**: ~$10-20/month (FastAPI service)
- **Domain**: ~$20/year (autopneuma.com already owned)
- **AI APIs**: Pay-as-you-go (estimate $50-100/month for MVP)

**Total MVP Cost**: ~$100-150/month

### Scaling (Post-Launch)
- Supabase Pro: ~$25/month
- Vercel Pro: ~$20/month (if needed)
- Fly.io/Railway: ~$50/month (scaling)
- AI APIs: ~$200-500/month
- **Total**: ~$300-600/month

## Technical Dependencies

### Required Accounts
- [ ] Supabase account (database + auth)
- [ ] Vercel account (deployment)
- [ ] Fly.io or Railway account (FastAPI)
- [ ] OpenAI API key
- [ ] Anthropic API key (optional for MVP)
- [ ] ConvertKit or Mailchimp (newsletter)
- [ ] GitHub organization (code hosting)

### Optional Services
- [ ] Sentry (error tracking)
- [ ] Plausible or PostHog (analytics)
- [ ] Cloudflare (CDN, DDoS protection)
- [ ] Algolia (advanced search)

## Risk Mitigation

### Technical Risks
- **Risk**: AI API costs spiral
  - **Mitigation**: Implement aggressive caching, rate limiting, and usage monitoring
- **Risk**: Database performance issues at scale
  - **Mitigation**: Proper indexing, query optimization, read replicas if needed
- **Risk**: Security vulnerabilities
  - **Mitigation**: RLS policies, regular security audits, dependency updates

### Community Risks
- **Risk**: Lack of early adoption
  - **Mitigation**: Personal outreach to Christian tech networks, offer value from day one
- **Risk**: Theological controversy or division
  - **Mitigation**: Clear Statement of Faith, strong moderation, focus on essentials
- **Risk**: Burnout of founding team
  - **Mitigation**: Sustainable pace, recruit moderators early, delegate responsibilities

## Next Immediate Steps

1. **Set up Supabase project**
   - Create account
   - Apply database schema
   - Configure authentication providers

2. **Initialize Next.js app**
   - Run `npx create-next-app@latest` in apps/autopneuma-web
   - Install dependencies (Tailwind, shadcn/ui, Supabase client)
   - Create base layout and navigation

3. **Create environment variables**
   - Copy .env.example to .env
   - Fill in Supabase credentials
   - Add AI API keys (when ready)

4. **Build landing page**
   - Hero section with mission statement
   - Call-to-action for sign-up
   - Brief overview of features
   - Link to Statement of Faith

5. **Implement authentication**
   - Sign up flow
   - Log in flow
   - Session management
   - Protected routes

## Questions for Decision

1. **Content Strategy**: Who will write initial blog content?
2. **Moderation**: Who will serve as initial moderators?
3. **Advisory Board**: Who are potential candidates for theological/ethical oversight?
4. **Launch Date**: Target date for public launch?
5. **Community Seeding**: How to recruit founding members?

## Resources

- [Architecture Documentation](../technical/architecture.md)
- [Database Schema](../technical/database-schema.md)
- [Community Guidelines](../governance/community-guidelines.md)
- [Statement of Faith](../theology/statement-of-faith.md)

---

*"For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do."* — Ephesians 2:10

**Let's build with the same Spirit, creating many gifts for the Kingdom.**
