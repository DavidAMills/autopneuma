# Auto Pneuma

> **"There are different kinds of gifts, but the same Spirit."** — 1 Corinthians 12:4

**Auto Pneuma** (Greek: αὐτὸ πνεῦμα, "the same Spirit") is a Christian AI Tech Community platform dedicated to building ethical, spirit-led artificial intelligence for Kingdom impact.

![Auto Pneuma Logo](design/logos/svg/autopneuma-logo.svg)

## Vision

We believe that technology, when guided by the Holy Spirit and grounded in biblical truth, can be a powerful force for good in the world. Auto Pneuma serves as the foundation and gathering place for Christian developers, engineers, data scientists, and entrepreneurs who are passionate about:

- Building AI with **biblical ethics** and **Christian values**
- Fostering **spirit-led innovation** in technology
- Creating tools that serve the **Kingdom of God**
- Maintaining **unity in the Spirit** while celebrating **diversity in gifts**

## The Ecosystem

### 🕊️ Auto Pneuma (autopneuma.com)
**"The Same Spirit"** — The foundation and unity layer
- Community hub for Christian technologists
- Theological and ethical guidance for AI development
- Discussion forums on faith, ethics, and technology
- Prayer and spiritual support for projects
- Educational resources on responsible AI

### 🎁 Charismaton (charismaton.com)
**"The Many Gifts"** — The innovation and diversity layer *(Coming in Phase 2)*
- Marketplace for Christian-built AI tools and services
- Showcase for member-created "AI gifts"
- Collaborative development environment
- Open-source project repository

## Core Values

1. **Biblical Foundation** — Rooted in Scripture, especially 1 Corinthians 12 (unity in diversity) and John 16:13 (Spirit of Truth)
2. **Imago Dei** — Honoring that all humans are made in God's image
3. **Stewardship** — Responsible development and deployment of AI technology
4. **Fruits of the Spirit** — Community conduct based on love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control (Galatians 5:22-23)
5. **Grace and Truth** — Balancing compassion with honest, biblical standards

## Technology Stack

- **Frontend**: Next.js 14+, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes + FastAPI (for AI services)
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **AI Integration**: OpenAI, Anthropic Claude, with extensible service layer
- **Deployment**: Vercel (frontend), Fly.io/Railway (backend)
- **Monorepo**: Turborepo

## Project Structure

```
autopneuma/
├── apps/
│   ├── autopneuma-web/      # Main community platform
│   └── charismaton-web/     # Marketplace (Phase 2)
├── packages/
│   ├── api/                 # FastAPI service for AI features
│   ├── database/            # Database schemas and migrations
│   ├── ui/                  # Shared component library
│   ├── auth/                # Authentication utilities
│   ├── ai-services/         # AI integration layer
│   └── types/               # Shared TypeScript types
├── docs/                    # Documentation (theology, governance, technical)
├── design/                  # Brand assets and design system
└── scripts/                 # Development and deployment scripts
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Docker and Docker Compose (for local database)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/autopneuma.git
   cd autopneuma
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase and API keys
   ```

4. **Start the development environment**
   ```bash
   # Start PostgreSQL and Redis
   docker-compose up -d

   # Run the development server
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - API: http://localhost:8000
   - Supabase Studio: http://localhost:54323

### Database Setup

```bash
# Run migrations
npm run db:migrate

# Seed initial data
npm run db:seed
```

## Documentation

- [Statement of Faith](docs/theology/statement-of-faith.md) — Our theological foundation
- [Community Guidelines](docs/governance/community-guidelines.md) — Code of conduct based on Fruits of the Spirit
- [AI Ethics Framework](docs/theology/ai-ethics.md) — Christian principles for AI development
- [Technical Architecture](docs/technical/architecture.md) — System design and architecture decisions
- [MVP Roadmap](docs/roadmap/mvp-plan.md) — Development plan and milestones

## Contributing

We welcome contributions from the Christian tech community! Please read our [Community Guidelines](docs/governance/community-guidelines.md) and review our [Statement of Faith](docs/theology/statement-of-faith.md) before contributing.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-gift`)
3. Commit your changes (`git commit -m 'Add amazing gift'`)
4. Push to the branch (`git push origin feature/amazing-gift`)
5. Open a Pull Request

## Community

- **Website**: [autopneuma.com](https://autopneuma.com)
- **Discussions**: Join our community forums
- **Prayer Requests**: Share and pray for projects
- **Projects**: Showcase your AI gifts

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## Acknowledgments

> "Now to each one the manifestation of the Spirit is given for the common good."
> — 1 Corinthians 12:7

We give all glory to God, the source of all wisdom, creativity, and the Giver of every good and perfect gift.

---

**Built with the Same Spirit. Creating Many Gifts.**

*For support, questions, or to connect: [Contact Us](mailto:hello@autopneuma.com)*
