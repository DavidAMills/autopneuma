# Auto Pneuma - Complete Deployment Guide

**The Same Spirit, Many Gifts**

This guide walks through deploying the complete Auto Pneuma platform - from database setup to production deployment.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup (Supabase)](#database-setup)
3. [Backend Deployment (Railway)](#backend-deployment)
4. [Frontend Deployment (Vercel)](#frontend-deployment)
5. [Configuration](#configuration)
6. [Testing](#testing)
7. [Monitoring](#monitoring)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

### Accounts Needed

- [ ] **Supabase** account (https://supabase.com) - Database & Auth
- [ ] **Railway** account (https://railway.app) - FastAPI backend
- [ ] **Vercel** account (https://vercel.com) - Next.js frontend
- [ ] **OpenAI** API key (https://platform.openai.com)
- [ ] **GitHub** account - Source code repository

### Local Development Tools

- [ ] Node.js 18+ and npm
- [ ] Python 3.11+
- [ ] Git
- [ ] Code editor (VS Code recommended)

## Database Setup (Supabase)

### 1. Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Enter project details:
   - Name: `autopneuma`
   - Database Password: (generate strong password)
   - Region: (choose closest to your users)
4. Wait for project to be created (~2 minutes)

### 2. Apply Database Schema

1. In Supabase dashboard, go to "SQL Editor"
2. Click "New Query"
3. Open `packages/database/schema.sql` from your repository
4. Copy entire contents and paste into SQL Editor
5. Click "Run" to execute
6. Verify tables were created (check "Table Editor" tab)

### 3. Apply AI Integration Schema

1. In SQL Editor, create another "New Query"
2. Open `packages/database/ai-integration-schema.sql`
3. Copy entire contents and paste
4. Click "Run" to execute
5. Verify new tables: `community_tools`, `tool_executions`

### 4. Configure Authentication

1. Go to "Authentication" → "Providers"
2. Enable "Email" provider
3. Configure email templates (optional but recommended):
   - Confirmation email
   - Password reset
   - Magic link
4. Go to "Authentication" → "URL Configuration"
5. Add site URL: `http://localhost:3000` (for development)
6. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://your-domain.com/auth/callback` (for production)

### 5. Get API Credentials

1. Go to "Settings" → "API"
2. Copy these values (you'll need them later):
   - **Project URL**: `https://xxxxx.supabase.co`
   - **`anon` public key**: `eyJhbGc...` (public key)
   - **`service_role` secret key**: `eyJhbGc...` (keep this SECRET!)

**Important:** Never commit the service role key to git!

### 6. Enable Row Level Security (RLS)

RLS is already configured in the schema, but verify:

1. Go to "Authentication" → "Policies"
2. Check that tables have policies enabled
3. Key tables with RLS:
   - `profiles`
   - `posts`
   - `comments`
   - `prayer_requests`
   - `projects`
   - `community_tools`

## Backend Deployment (Railway)

### 1. Prepare Repository

1. Push your code to GitHub (if not already)
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

2. Ensure these files exist in `apps/autopneuma-api/`:
   - `requirements.txt`
   - `Procfile`
   - `runtime.txt`
   - `railway.json`

### 2. Create Railway Project

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway to access your GitHub account
5. Select your `autopneuma` repository
6. Railway will detect the Python app

### 3. Configure Root Directory

Since API is in subdirectory:

1. Click on the deployed service
2. Go to "Settings" tab
3. Find "Root Directory"
4. Set to: `apps/autopneuma-api`
5. Click "Save"

### 4. Add Environment Variables

In Railway project, go to "Variables" tab and add:

```bash
# Supabase Configuration
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=your_anon_public_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_secret_key

# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-key-here
OPENAI_MODEL=gpt-4-turbo-preview
OPENAI_MODERATION_MODEL=gpt-4-turbo-preview

# API Configuration
PROJECT_NAME=Auto Pneuma API
VERSION=1.0.0
API_V1_PREFIX=/api/v1

# CORS Origins (JSON array format)
BACKEND_CORS_ORIGINS=["http://localhost:3000","https://autopneuma.vercel.app"]

# Feature Flags
ENABLE_SCRIPTURE_ASSISTANT=true
ENABLE_AI_MODERATION=true
ENABLE_COMMUNITY_AI_TOOLS=true

# Moderation Settings
MODERATION_CONFIDENCE_THRESHOLD=0.7
MODERATION_ENABLED=true

# Scripture Settings
DEFAULT_BIBLE_VERSION=ESV
MAX_CONTEXT_LENGTH=2000

# Rate Limiting
RATE_LIMIT_PER_MINUTE=60
RATE_LIMIT_PER_HOUR=500
```

### 5. Deploy

1. Railway will automatically deploy after environment variables are set
2. Monitor deployment in "Deployments" tab
3. Wait for build to complete (~2-3 minutes)
4. Once deployed, Railway provides a URL like:
   ```
   https://autopneuma-api-production.up.railway.app
   ```

### 6. Verify Backend Deployment

Test the deployed API:

```bash
# Health check
curl https://your-railway-url.railway.app/health

# Should return:
# {"status":"healthy","service":"autopneuma-api","version":"1.0.0"}

# Check API documentation
# Visit: https://your-railway-url.railway.app/docs
```

### 7. Configure Custom Domain (Optional)

1. In Railway, go to "Settings" → "Domains"
2. Click "Generate Domain" or add custom domain
3. For custom domain (e.g., `api.autopneuma.com`):
   - Add CNAME record in your DNS:
     - Name: `api`
     - Value: `your-project.up.railway.app`
   - Wait for DNS propagation (~5-60 minutes)

## Frontend Deployment (Vercel)

### 1. Prepare Frontend

1. Create `.env.local` in `apps/autopneuma-web/`:
```bash
# Copy from .env.local.example
cp apps/autopneuma-web/.env.local.example apps/autopneuma-web/.env.local
```

2. Update with your values:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key
NEXT_PUBLIC_API_URL=https://your-railway-url.railway.app
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

**Don't commit `.env.local`** - it's in `.gitignore`

### 2. Create Vercel Project

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `apps/autopneuma-web`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 3. Add Environment Variables in Vercel

In Vercel project settings → "Environment Variables":

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key
NEXT_PUBLIC_API_URL=https://your-railway-url.railway.app
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

**Add for all environments:** Production, Preview, Development

### 4. Deploy

1. Click "Deploy"
2. Wait for build to complete (~2-3 minutes)
3. Vercel will provide a URL like:
   ```
   https://autopneuma.vercel.app
   ```

### 5. Configure Custom Domain (Optional)

1. In Vercel project, go to "Settings" → "Domains"
2. Add your domain (e.g., `autopneuma.com`)
3. Follow Vercel's DNS instructions:
   - Add A record or CNAME as directed
   - Vercel automatically handles SSL/HTTPS

### 6. Update CORS in Railway

Now that you have the frontend URL:

1. Go back to Railway project
2. Update `BACKEND_CORS_ORIGINS` environment variable:
```bash
BACKEND_CORS_ORIGINS=["http://localhost:3000","https://autopneuma.vercel.app","https://autopneuma.com"]
```
3. Redeploy backend

### 7. Update Supabase Redirect URLs

1. Go to Supabase → "Authentication" → "URL Configuration"
2. Add redirect URLs:
   - `https://autopneuma.vercel.app/auth/callback`
   - `https://autopneuma.com/auth/callback` (if custom domain)

## Configuration

### Post-Deployment Configuration

#### 1. Seed Initial Data (Optional)

Create initial categories, sample content, etc.:

```sql
-- In Supabase SQL Editor

-- Create discussion categories
INSERT INTO discussion_categories (name, slug, description, icon) VALUES
('Faith & Tech', 'faith-tech', 'Intersection of faith and technology', 'message-square'),
('AI Ethics', 'ai-ethics', 'Ethical considerations in AI development', 'scale'),
('Prayer & Projects', 'prayer-projects', 'Prayer requests and project updates', 'heart'),
('Questions & Help', 'questions-help', 'Questions and community support', 'help-circle'),
('Announcements', 'announcements', 'Community announcements', 'megaphone');
```

#### 2. Create Admin User

1. Sign up for account via frontend
2. In Supabase SQL Editor, promote to admin:
```sql
UPDATE profiles
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

#### 3. Configure OpenAI Usage Limits

In OpenAI dashboard:
1. Go to "Usage limits"
2. Set monthly spending limit (recommended: $50-100)
3. Enable email notifications for 75% and 90% usage

## Testing

### End-to-End Testing Checklist

#### ✅ Authentication

- [ ] Sign up with email/password
- [ ] Verify email (check inbox)
- [ ] Log in
- [ ] Log out
- [ ] Password reset flow
- [ ] Profile setup (spiritual gifts selection)

#### ✅ Discussion Board

- [ ] View discussion categories
- [ ] Create new post
- [ ] **Test moderation:** Post should be checked by AI
- [ ] View post detail page
- [ ] Add comment
- [ ] Reply to comment
- [ ] Edit own post/comment

#### ✅ Prayer Requests

- [ ] View prayer requests list
- [ ] Create new prayer request
- [ ] **Test moderation:** Request should be checked
- [ ] Click "I Prayed" button
- [ ] View prayer request details
- [ ] Add update/testimony
- [ ] Filter by category and status

#### ✅ Project Showcase

- [ ] View project gallery
- [ ] Create new project
- [ ] Fill in all fields (tech stack, spiritual application)
- [ ] View project detail page
- [ ] Star/favorite project
- [ ] Filter projects by status/tags

#### ✅ Blog

- [ ] View blog listing
- [ ] Read featured post
- [ ] View individual blog post
- [ ] Navigate between posts
- [ ] View author profiles with spiritual gifts

#### ✅ Scripture Context Assistant

- [ ] Click "Scripture Context" button on discussion post
- [ ] Wait for AI response
- [ ] Verify scripture references appear
- [ ] Check theological insights
- [ ] Verify practical application section

#### ✅ AI Moderation

Test by creating posts with:
- [ ] Normal content → Should be auto-approved
- [ ] Divisive theological content → Should be flagged for review
- [ ] Personal attacks → Should be flagged (high priority)
- [ ] Spam/promotional content → Should be flagged

#### ✅ Community Tools (Advanced)

- [ ] Register a new community tool (requires project)
- [ ] View tool in community tools list
- [ ] Execute a community tool
- [ ] Check rate limiting (make multiple requests)

### Manual API Testing

Use the API documentation page:
```
https://your-railway-url.railway.app/docs
```

Test each endpoint:

1. **POST /api/v1/moderation/moderate**
   - Send sample content
   - Verify flagging works correctly

2. **POST /api/v1/scripture/context**
   - Query: "How should Christians approach AI ethics?"
   - Verify scripture references returned

3. **GET /api/v1/tools/list**
   - Verify empty list or populated tools

## Monitoring

### Railway Monitoring

1. Go to Railway project → "Metrics"
2. Monitor:
   - CPU usage
   - Memory usage
   - Request count
   - Error rate

### Vercel Monitoring

1. Go to Vercel project → "Analytics"
2. Monitor:
   - Page views
   - Load times
   - Error rates

### Supabase Monitoring

1. Go to Supabase → "Database" → "Query Performance"
2. Monitor:
   - Slow queries
   - Connection count
   - Storage usage

### OpenAI Usage

1. Go to OpenAI dashboard → "Usage"
2. Track:
   - API calls per day
   - Token usage
   - Costs

**Set budget alerts!** Recommended: $50-100/month limit

## Troubleshooting

### Backend Issues

#### API Returns 500 Errors

**Check Railway logs:**
1. Railway → Deployments → Click deployment → View logs

**Common issues:**
- Invalid Supabase credentials → Verify environment variables
- Invalid OpenAI key → Check API key is active
- Database connection failed → Check Supabase URL

#### Health Check Fails

**Verify:**
- PORT environment variable (Railway sets automatically)
- App binding to `0.0.0.0` (check Procfile)
- `/health` endpoint accessible

#### CORS Errors

**Fix:**
1. Check `BACKEND_CORS_ORIGINS` in Railway
2. Must be valid JSON array
3. Include all frontend URLs (http:// and https://)
4. Redeploy after changing

### Frontend Issues

#### "Failed to fetch" Errors

**Check:**
1. Is `NEXT_PUBLIC_API_URL` correct?
2. Is backend deployed and healthy?
3. CORS configured properly?
4. Network tab in browser DevTools

#### Authentication Not Working

**Check:**
1. Supabase redirect URLs configured?
2. `NEXT_PUBLIC_SUPABASE_URL` correct?
3. `NEXT_PUBLIC_SUPABASE_ANON_KEY` correct?
4. Browser console for errors

#### Moderation Not Working

**Check:**
1. Backend logs for errors
2. OpenAI API key valid?
3. `ENABLE_AI_MODERATION=true`?
4. Frontend API client configured correctly?

### Database Issues

#### Tables Not Created

**Re-run schema:**
1. Supabase SQL Editor
2. Copy schema.sql
3. Run entire script
4. Check for error messages

#### RLS Blocking Queries

**Check policies:**
1. Supabase → Authentication → Policies
2. Verify user is authenticated
3. Check auth.uid() matches user

## Cost Estimates

### Monthly Costs (Small-Medium Community)

| Service | Plan | Cost |
|---------|------|------|
| Supabase | Free → Pro | $0 → $25 |
| Railway | Hobby → Pro | $5 → $20 |
| Vercel | Hobby | $0 (free for hobby) |
| OpenAI API | Usage-based | $10-50 |
| **Total** | | **$15-95/month** |

### Scaling Considerations

- **Supabase Free Tier:** Up to 500MB database, 2GB bandwidth
- **Railway Hobby:** 500 execution hours/month
- **OpenAI:** Monitor usage closely, set limits

## Next Steps

### Phase 1: Soft Launch ✅
- [x] Deploy all services
- [x] Test core functionality
- [ ] Invite 5-10 beta testers
- [ ] Gather feedback

### Phase 2: Community Growth
- [ ] Onboard first 50 members
- [ ] Publish first blog posts
- [ ] Feature first community projects
- [ ] Establish moderation team

### Phase 3: Feature Expansion
- [ ] Add email notifications
- [ ] Implement search
- [ ] Add user profiles
- [ ] Community AI tools marketplace

### Phase 4: Scale
- [ ] Upgrade hosting plans
- [ ] Add caching (Redis)
- [ ] Implement rate limiting
- [ ] Performance optimization

## Support Resources

- **Auto Pneuma Community:** `/community/questions-help`
- **Supabase Docs:** https://supabase.com/docs
- **Railway Docs:** https://docs.railway.app
- **Vercel Docs:** https://vercel.com/docs
- **FastAPI Docs:** https://fastapi.tiangolo.com
- **Next.js Docs:** https://nextjs.org/docs

---

## Mission Statement

**We are here to build a Christian community that supports and spreads the Gospel for the glory of our Lord — creating and growing the community of Christ through our many gifts, which share the love and grace of the same eternal Spirit.**

May this platform serve believers faithfully and glorify God in all we do!

*"Now to each one the manifestation of the Spirit is given for the common good." — 1 Corinthians 12:7*
