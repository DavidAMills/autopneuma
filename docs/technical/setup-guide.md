# Setup Guide

## Getting Auto Pneuma Running Locally

This guide will help you set up the Auto Pneuma development environment on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and npm 9+
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify: `node --version && npm --version`

- **Git**
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify: `git --version`

- **Docker Desktop** (for local database)
  - Download from [docker.com](https://www.docker.com/products/docker-desktop)
  - Verify: `docker --version && docker-compose --version`

- **Code Editor**
  - Recommended: [VS Code](https://code.visualstudio.com/) with extensions:
    - ESLint
    - Prettier
    - Tailwind CSS IntelliSense
    - GitHub Copilot (optional)

## Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/autopneuma.git
cd autopneuma
```

If you haven't set up Git yet:
```bash
git init
git add .
git commit -m "Initial commit: Auto Pneuma foundation"
```

## Step 2: Install Dependencies

Install all dependencies for the monorepo:

```bash
npm install
```

This will install dependencies for:
- Root workspace
- All apps (autopneuma-web, charismaton-web)
- All packages (api, database, ui, auth, ai-services, types)

**Expected time**: 2-5 minutes depending on your internet connection.

## Step 3: Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and fill in the required values:

```env
# Supabase (get these from https://app.supabase.com)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Database (for local development)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/autopneuma

# AI Services (optional for initial setup)
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key

# Email (optional for MVP)
CONVERTKIT_API_KEY=your_convertkit_api_key
CONVERTKIT_FORM_ID=your_form_id

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Getting Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project (name: "autopneuma")
3. Wait for the project to be created (~2 minutes)
4. Go to **Settings > API**
5. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

## Step 4: Set Up the Database

### Option A: Supabase Cloud (Recommended for MVP)

1. In your Supabase project dashboard, go to **SQL Editor**
2. Create a new query
3. Copy and paste the entire contents of `packages/database/schema.sql`
4. Click **Run** to execute the schema
5. Verify tables were created in **Table Editor**

### Option B: Local PostgreSQL (via Docker)

If you prefer local development:

```bash
# Start PostgreSQL and Redis containers
docker-compose up -d

# Wait for PostgreSQL to be ready (~10 seconds)
docker-compose ps

# Apply the schema
docker exec -i autopneuma-postgres psql -U postgres -d autopneuma < packages/database/schema.sql
```

Verify the database:
```bash
docker exec -it autopneuma-postgres psql -U postgres -d autopneuma
\dt  # List tables
\q   # Quit
```

## Step 5: Initialize the Next.js App

**Note**: This step will be completed in Phase 2 of development. For now, the structure is ready.

When ready, initialize the Next.js app:

```bash
cd apps/autopneuma-web
npx create-next-app@latest . --typescript --tailwind --app --src-dir=false
```

Configure with:
- ✅ TypeScript
- ✅ ESLint
- ✅ Tailwind CSS
- ✅ App Router
- ✅ Import alias (@/*)

## Step 6: Run the Development Server

Start all services:

```bash
# From the root directory
npm run dev
```

This will start:
- **Next.js app**: http://localhost:3000
- **FastAPI service** (when implemented): http://localhost:8000

You can also run services individually:
```bash
cd apps/autopneuma-web
npm run dev
```

## Step 7: Verify Everything Works

1. **Open your browser**: Navigate to http://localhost:3000
2. **Check the database**: Ensure Supabase tables are created
3. **Test authentication**: Try to sign up for an account
4. **Check logs**: Look for any errors in the terminal

## Common Issues and Solutions

### Issue: "Module not found" errors

**Solution**: Make sure you ran `npm install` in the root directory.

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Issue: Docker containers won't start

**Solution**: Make sure Docker Desktop is running and ports 5432 and 6379 are available.

```bash
# Check if ports are in use (Windows)
netstat -ano | findstr :5432
netstat -ano | findstr :6379

# Stop and restart containers
docker-compose down
docker-compose up -d
```

### Issue: Supabase connection errors

**Solution**: Double-check your environment variables and Supabase project status.

```bash
# Verify environment variables are loaded
echo $NEXT_PUBLIC_SUPABASE_URL

# Test Supabase connection
curl https://your-project-id.supabase.co/rest/v1/
```

### Issue: Database schema errors

**Solution**: Drop and recreate the database schema.

In Supabase SQL Editor:
```sql
-- Drop all tables (careful!)
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- Re-run schema.sql
```

### Issue: TypeScript errors

**Solution**: Ensure you're using TypeScript 5.3+

```bash
npx tsc --version
npm install -D typescript@latest
```

## Development Workflow

### Creating a New Feature

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Edit files in `apps/autopneuma-web` or `packages/*`
   - Follow code style (ESLint + Prettier)

3. **Test locally**
   ```bash
   npm run lint
   npm run build
   npm run test
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: your feature description"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   # Create Pull Request on GitHub
   ```

### Database Changes

1. **Create a migration file** in `packages/database/migrations/`
   ```sql
   -- 001_add_user_bio.sql
   ALTER TABLE profiles ADD COLUMN bio TEXT;
   ```

2. **Apply migration**
   ```bash
   # Supabase
   # Run in SQL Editor

   # Local
   docker exec -i autopneuma-postgres psql -U postgres -d autopneuma < packages/database/migrations/001_add_user_bio.sql
   ```

3. **Update TypeScript types** in `packages/types/`

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Linting and Formatting

```bash
# Lint all code
npm run lint

# Fix lint issues automatically
npm run lint:fix

# Format all code
npm run format
```

## Deployment

### Deploy to Vercel (Next.js)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd apps/autopneuma-web
   vercel
   ```

4. **Set environment variables** in Vercel dashboard

5. **Connect to GitHub** for automatic deployments

### Deploy FastAPI to Fly.io

1. **Install Fly CLI**
   ```bash
   # See https://fly.io/docs/hands-on/install-flyctl/
   ```

2. **Login to Fly.io**
   ```bash
   flyctl auth login
   ```

3. **Create app**
   ```bash
   cd packages/api
   flyctl launch
   ```

4. **Set secrets**
   ```bash
   flyctl secrets set OPENAI_API_KEY=your_key
   flyctl secrets set DATABASE_URL=your_supabase_url
   ```

5. **Deploy**
   ```bash
   flyctl deploy
   ```

## Useful Commands

### Monorepo Management

```bash
# Install dependencies
npm install

# Run all apps in dev mode
npm run dev

# Build all apps
npm run build

# Lint all code
npm run lint

# Clean all build artifacts
npm run clean
```

### Database

```bash
# Start database
docker-compose up -d postgres

# Stop database
docker-compose stop postgres

# View database logs
docker-compose logs -f postgres

# Connect to database
docker exec -it autopneuma-postgres psql -U postgres -d autopneuma
```

### Docker

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild containers
docker-compose up -d --build
```

## IDE Setup

### VS Code

Create `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

Recommended extensions (`.vscode/extensions.json`):

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-azuretools.vscode-docker",
    "github.copilot"
  ]
}
```

## Next Steps

Once your environment is set up:

1. **Read the architecture docs**: [Architecture Overview](architecture.md)
2. **Review the database schema**: [Database Schema](database-schema.md)
3. **Understand the roadmap**: [MVP Plan](../roadmap/mvp-plan.md)
4. **Start building**: Begin with the Next.js app setup
5. **Join the community**: Connect with other developers

## Getting Help

- **Documentation**: Check the [docs folder](../)
- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Ask questions in GitHub Discussions
- **Community**: Join the Auto Pneuma platform once it's live

## Related Documents

- [Architecture Overview](architecture.md)
- [Database Schema](database-schema.md)
- [MVP Plan](../roadmap/mvp-plan.md)
- [Community Guidelines](../governance/community-guidelines.md)

---

*"Whatever you do, work at it with all your heart, as working for the Lord."* — Colossians 3:23

**Happy coding! Let's build with the same Spirit.**
