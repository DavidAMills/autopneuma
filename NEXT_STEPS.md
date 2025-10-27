# Next Steps for Auto Pneuma Implementation

## Current Status: Phase 2 Started ✅

You now have:
- ✅ Complete documentation (theology, governance, technical)
- ✅ Database schema ready
- ✅ Next.js app initialized with TypeScript and Tailwind CSS
- ✅ Beautiful landing page with hero and features
- ✅ Supabase client utilities configured
- ✅ Brand styling applied (navy + beige theme)

## Immediate Next Steps

### 1. Install Dependencies (Do This First!)

Due to Windows file permissions, you may need to run as administrator or use a workaround:

**Option A: Run as Administrator**
```bash
# Right-click your terminal and "Run as Administrator"
cd f:\autopneuma\apps\autopneuma-web
npm install
```

**Option B: Use Yarn (if npm has issues)**
```bash
npm install -g yarn
cd f:\autopneuma\apps\autopneuma-web
yarn install
```

**Option C: Disable Windows Defender real-time protection temporarily**
- This sometimes interferes with npm symlinks
- Only do this temporarily during install

### 2. Set Up Supabase

#### Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Choose organization (or create one)
5. **Project Name**: `autopneuma`
6. **Database Password**: Create a strong password (save it!)
7. **Region**: Choose closest to you
8. Click "Create new project" (takes ~2 minutes)

#### Apply Database Schema
1. Once project is ready, go to **SQL Editor** in left sidebar
2. Click **+ New Query**
3. Open `f:\autopneuma\packages\database\schema.sql` in your code editor
4. Copy the entire contents
5. Paste into Supabase SQL Editor
6. Click **Run** (or press Ctrl+Enter)
7. You should see "Success" message
8. Go to **Table Editor** to verify tables were created

#### Get API Credentials
1. Go to **Settings** > **API** in Supabase dashboard
2. Find these values:
   - **Project URL** (e.g., `https://abc123.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`, keep this secret!)

### 3. Configure Environment Variables

```bash
cd f:\autopneuma\apps\autopneuma-web
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials from step 2:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=eyJ...your_service_role_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important**: Never commit `.env.local` to version control!

### 4. Run the Development Server

```bash
cd f:\autopneuma\apps\autopneuma-web
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - you should see the landing page!

### 5. Build Authentication Pages (Next Priority)

Create these files:

#### Login Page
Create `app/(auth)/login/page.tsx`:
- Email/password form
- Link to signup
- "Forgot password" link
- Use Supabase auth

#### Signup Page
Create `app/(auth)/signup/page.tsx`:
- Email/password/name form
- Link to login
- Terms of service checkbox
- Statement of Faith acknowledgment

#### Profile Setup Page
Create `app/(auth)/profile/setup/page.tsx`:
- After signup, redirect here
- Select spiritual gifts (multi-select)
- Select focus areas (tech skills)
- Bio textarea
- Upload avatar (optional)

### 6. Build Core Pages

Create these in order:

1. **About Page** (`app/about/page.tsx`)
   - Auto Pneuma story and vision
   - Team introduction (if applicable)
   - Link to Statement of Faith

2. **Statement of Faith Page** (`app/faith/page.tsx`)
   - Display content from `docs/theology/statement-of-faith.md`
   - Consider using markdown rendering

3. **Community Page** (`app/community/page.tsx`)
   - Overview of discussion categories
   - Recent discussions preview
   - Call-to-action to join discussions

4. **Blog Listing** (`app/blog/page.tsx`)
   - Grid of blog post cards
   - Pagination
   - Filter by tags

### 7. Build Discussion Board

Create these:

1. **Discussion Categories** (`app/community/page.tsx`)
   - List categories from database
   - Show post count per category

2. **Category View** (`app/community/[category]/page.tsx`)
   - List posts in category
   - Sort by recent/popular
   - "New Post" button (auth required)

3. **Post View** (`app/community/[category]/[post]/page.tsx`)
   - Display full post
   - Comments (threaded)
   - Reply functionality

4. **New Post** (`app/community/new/page.tsx`)
   - Title and content (markdown editor)
   - Category select
   - Tags input
   - Preview mode

## Development Tips

### Windows-Specific Issues

1. **Symlink Errors**: Run terminal as administrator
2. **File Path Length**: Keep project in a shorter path (like `C:\autopneuma`)
3. **Line Endings**: Use LF, not CRLF (configure in VS Code)

### Supabase Tips

1. **Test Auth**: Use Supabase dashboard to create a test user
2. **View Data**: Use Table Editor to see data
3. **Check Logs**: Use Logs Explorer for debugging
4. **RLS Policies**: Ensure Row Level Security policies are working

### Next.js Tips

1. **Server vs Client**: Use Server Components by default
2. **'use client'**: Only add when you need interactivity
3. **Type Safety**: Generate types from Supabase schema
4. **Caching**: Understand Next.js caching behavior

## Generating TypeScript Types from Supabase

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link your project
supabase link --project-ref your-project-id

# Generate types
supabase gen types typescript --linked > lib/database.types.ts
```

## Testing Your Setup

### 1. Test Landing Page
- Visit http://localhost:3000
- Check responsive design (resize browser)
- Verify all links work

### 2. Test Supabase Connection
Create `app/api/test/route.ts`:

```typescript
import { createServerClient } from '@/lib/supabase/client'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createServerClient()
  const { data, error } = await supabase.from('profiles').select('count')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, profileCount: data })
}
```

Visit http://localhost:3000/api/test to verify connection.

### 3. Test Authentication
Once auth pages are built:
- Sign up with test email
- Verify email (check Supabase Auth > Users)
- Log in
- Check session persistence

## Troubleshooting

### "Module not found" Errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Supabase Connection Errors
- Verify `.env.local` has correct values
- Check project is not paused in Supabase dashboard
- Ensure anon key matches project

### TypeScript Errors
- Run `npm run type-check`
- Check `tsconfig.json` is correct
- Restart TypeScript server in VS Code (Cmd/Ctrl+Shift+P > "TypeScript: Restart TS Server")

### Styling Not Working
- Verify `tailwind.config.ts` is correct
- Check `globals.css` is imported in `layout.tsx`
- Clear Next.js cache: `rm -rf .next`

## Resources

### Documentation
- [Auto Pneuma Docs](./docs/)
- [Setup Guide](./docs/technical/setup-guide.md)
- [Database Schema](./docs/technical/database-schema.md)
- [MVP Plan](./docs/roadmap/mvp-plan.md)

### External Docs
- [Next.js 14 Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

## Questions or Issues?

1. Check [Setup Guide](./docs/technical/setup-guide.md)
2. Review [Architecture](./docs/technical/architecture.md)
3. Search GitHub Issues (once public repo is created)
4. Contact: hello@autopneuma.com

---

**You're ready to build! The foundation is solid. Now it's time to bring the vision to life.**

*"Whatever you do, work at it with all your heart, as working for the Lord." — Colossians 3:23*
