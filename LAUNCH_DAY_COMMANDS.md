# Auto Pneuma - Launch Day Command Summary

**Quick reference for live deployment — follow in order**

---

## Phase 1: Database Setup (5 minutes)

### Step 1: Create Supabase Project
1. Go to: https://supabase.com/dashboard
2. Click "New Project"
3. Name: `autopneuma`, Set password, Choose region
4. Wait ~2 minutes for creation

### Step 2: Apply Database Schema
```sql
-- In Supabase SQL Editor, run these in order:

-- 1. Base schema
\i packages/database/schema.sql
-- (Or copy/paste entire file contents)

-- 2. AI integration schema
\i packages/database/ai-integration-schema.sql
-- (Or copy/paste entire file contents)

-- 3. Discussion categories (required)
INSERT INTO discussion_categories (name, slug, description, icon, sort_order) VALUES
('Faith & Tech', 'faith-tech', 'Exploring the intersection of Christian faith and technology.', 'message-square', 1),
('AI Ethics', 'ai-ethics', 'Biblical perspectives on AI ethics and responsible development.', 'scale', 2),
('Prayer & Projects', 'prayer-projects', 'Prayer requests and Kingdom-focused project updates.', 'heart', 3),
('Questions & Help', 'questions-help', 'Questions and community support.', 'help-circle', 4),
('Announcements', 'announcements', 'Official announcements and community news.', 'megaphone', 5);
```

### Step 3: Get Supabase Credentials
```bash
# In Supabase → Settings → API, copy:
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...  # anon public key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...  # service_role secret
```

### Step 4: Configure Auth
- Go to: Authentication → URL Configuration
- Site URL: `http://localhost:3000`
- Redirect URLs: `http://localhost:3000/auth/callback`
- Email provider: Enabled

---

## Phase 2: Backend Deployment (10 minutes)

### Step 1: Deploy to Railway
1. Go to: https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select: `autopneuma` repository
4. Railway auto-detects Python app

### Step 2: Configure Railway
- Settings → Root Directory: `apps/autopneuma-api`
- Save

### Step 3: Add Environment Variables
```bash
# Railway → Variables tab, add these:

SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

OPENAI_API_KEY=sk-your-openai-key
OPENAI_MODEL=gpt-4-turbo-preview
OPENAI_MODERATION_MODEL=gpt-4-turbo-preview

PROJECT_NAME=Auto Pneuma API
VERSION=1.0.0
API_V1_PREFIX=/api/v1

BACKEND_CORS_ORIGINS=["http://localhost:3000"]

ENABLE_SCRIPTURE_ASSISTANT=true
ENABLE_AI_MODERATION=true
ENABLE_COMMUNITY_AI_TOOLS=true

MODERATION_CONFIDENCE_THRESHOLD=0.7
MODERATION_ENABLED=true

DEFAULT_BIBLE_VERSION=ESV
MAX_CONTEXT_LENGTH=2000

RATE_LIMIT_PER_MINUTE=60
RATE_LIMIT_PER_HOUR=500
```

### Step 4: Deploy & Test
```bash
# Railway auto-deploys after variables set
# Wait ~2-3 minutes

# Test health check:
curl https://your-railway-url.railway.app/health

# Should return: {"status":"healthy","service":"autopneuma-api","version":"1.0.0"}

# Test API docs:
# Visit: https://your-railway-url.railway.app/docs
```

### Step 5: Get Railway URL
```bash
# Copy from Railway dashboard:
RAILWAY_URL=https://autopneuma-api-production.up.railway.app
```

---

## Phase 3: Frontend Deployment (10 minutes)

### Step 1: Deploy to Vercel
1. Go to: https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import: `autopneuma` repository
4. Framework: Next.js
5. Root Directory: `apps/autopneuma-web`

### Step 2: Add Environment Variables
```bash
# Vercel → Settings → Environment Variables

NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_API_URL=https://your-railway-url.railway.app
NEXT_PUBLIC_APP_URL=https://autopneuma.vercel.app
```

### Step 3: Deploy
- Click "Deploy"
- Wait ~2-3 minutes
- Vercel provides URL: `https://autopneuma.vercel.app`

### Step 4: Update CORS in Railway
```bash
# Railway → Variables, update:
BACKEND_CORS_ORIGINS=["http://localhost:3000","https://autopneuma.vercel.app"]
```

### Step 5: Update Supabase Redirects
```bash
# Supabase → Authentication → URL Configuration
# Add redirect: https://autopneuma.vercel.app/auth/callback
```

---

## Phase 4: Create Admin Account (5 minutes)

### Step 1: Sign Up
1. Visit: `https://autopneuma.vercel.app`
2. Click "Sign Up"
3. Email: `admin@autopneuma.com` (or your admin email)
4. Password: (strong password)
5. Complete profile setup

### Step 2: Verify Email
- Check inbox
- Click verification link

### Step 3: Promote to Admin
```sql
-- In Supabase SQL Editor:
UPDATE profiles
SET role = 'admin'
WHERE email = 'admin@autopneuma.com';

-- Verify:
SELECT id, email, username, role FROM profiles WHERE role = 'admin';
-- Copy the id (UUID) for next step
```

---

## Phase 5: Seed Initial Content (10 minutes)

### Step 1: Create Welcome Post
```sql
-- In Supabase SQL Editor, replace ADMIN_USER_ID with your UUID:

INSERT INTO posts (
  author_id,
  category_id,
  title,
  content,
  tags,
  moderation_status
)
SELECT
  'ADMIN_USER_ID',
  id,
  'Welcome to Auto Pneuma! 🙌',
  'Welcome message content here...',
  ARRAY['welcome', 'introduction', 'beta'],
  'approved'
FROM discussion_categories
WHERE slug = 'announcements';
```

### Step 2: Create Beta Feedback Thread
```sql
INSERT INTO posts (
  author_id,
  category_id,
  title,
  content,
  tags,
  moderation_status
)
SELECT
  'ADMIN_USER_ID',
  id,
  'Beta Feedback & Bug Reports 🐛',
  'Feedback thread content...',
  ARRAY['beta', 'feedback', 'bugs'],
  'approved'
FROM discussion_categories
WHERE slug = 'questions-help';
```

### Step 3: Publish Beta Announcement
- Copy content from: `content/beta-announcement.md`
- Create blog post via admin interface (or insert via SQL)

---

## Phase 6: Final Verification (5 minutes)

### Quick Test Checklist
```bash
# Backend health
✓ Visit: https://your-railway-url.railway.app/health
✓ Visit: https://your-railway-url.railway.app/docs

# Frontend pages
✓ Homepage: https://autopneuma.vercel.app
✓ Login: https://autopneuma.vercel.app/login
✓ Discussion: https://autopneuma.vercel.app/community
✓ Prayer: https://autopneuma.vercel.app/prayer
✓ Projects: https://autopneuma.vercel.app/projects
✓ Blog: https://autopneuma.vercel.app/blog

# Auth flow
✓ Sign up new test account
✓ Verify email works
✓ Complete profile
✓ Login/logout works

# Features
✓ Create discussion post
✓ AI moderation runs
✓ Create prayer request
✓ "I Prayed" button works
✓ Scripture Context button works
```

---

## Phase 7: Launch! (2 minutes)

### Step 1: Send Invitations
```bash
# Open: LAUNCH_COMMUNICATIONS.md
# Copy: "Beta Tester Invitation Email"
# Personalize for each recipient
# Send to 5-10 initial beta testers
```

### Step 2: Post Launch Announcement
```bash
# Log in as admin
# Go to: /community
# Create new post in Announcements
# Title: "Auto Pneuma Beta is Live! 🎉"
# Content: Use template from LAUNCH_COMMUNICATIONS.md
```

### Step 3: Monitor
```bash
# Open dashboards:
✓ Railway: https://railway.app → View logs
✓ Vercel: https://vercel.com → View analytics
✓ Supabase: https://supabase.com → Check connections
✓ OpenAI: https://platform.openai.com → Monitor usage

# Watch for:
- Sign-ups
- First posts
- Questions
- Bugs
```

---

## Quick Reference URLs

| Service | Dashboard | Docs |
|---------|-----------|------|
| **Supabase** | https://supabase.com/dashboard | https://supabase.com/docs |
| **Railway** | https://railway.app | https://docs.railway.app |
| **Vercel** | https://vercel.com/dashboard | https://vercel.com/docs |
| **OpenAI** | https://platform.openai.com | https://platform.openai.com/docs |

---

## Emergency Commands

### Rollback Frontend (Vercel)
```bash
# Vercel dashboard → Deployments → Select previous → Promote to Production
```

### Rollback Backend (Railway)
```bash
# Railway dashboard → Deployments → Select previous → Redeploy
```

### Check Logs
```bash
# Railway logs
railway logs --project autopneuma-api

# Vercel logs (in dashboard)
# Vercel → Project → Deployments → Select deployment → Logs

# Supabase logs
# Supabase → Logs → Query all tables
```

### Disable Features
```bash
# Railway → Variables, set to false:
ENABLE_AI_MODERATION=false
ENABLE_SCRIPTURE_ASSISTANT=false
```

---

## Support Contacts

**Technical Issues:**
- Railway Discord: https://discord.gg/railway
- Vercel Support: support@vercel.com
- Supabase Discord: https://discord.supabase.com

**OpenAI:**
- Status: https://status.openai.com
- Support: https://help.openai.com

---

## Post-Launch Actions (First Hour)

### Minute 0-15: Launch
- ✓ Send invitations
- ✓ Post announcement
- ✓ Monitor sign-ups

### Minute 15-30: Welcome
- ✓ Personally welcome each new member
- ✓ Respond to questions immediately
- ✓ Encourage first posts

### Minute 30-60: Monitor
- ✓ Check all service logs
- ✓ Watch for errors
- ✓ Address any bugs
- ✓ Celebrate first posts! 🎉

---

**"The Same Spirit. Many Gifts."**

**You've got this! Let's launch Auto Pneuma! 🚀**

*Final prayer before launch:*

*"Father, we dedicate this launch to You. Guide our hands, guard our hearts, and use this platform for Your glory. In Jesus' name, Amen."*
