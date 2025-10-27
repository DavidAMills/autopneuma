# Auto Pneuma - Launch Readiness Checklist

**"The Same Spirit. Many Gifts."**

This comprehensive checklist ensures everything is configured and tested before inviting beta testers to the platform.

## Pre-Launch Phase

### ☐ 1. Database Setup (Supabase)

#### Database Schema
- [ ] Base schema applied (`packages/database/schema.sql`)
- [ ] AI integration schema applied (`packages/database/ai-integration-schema.sql`)
- [ ] All tables created successfully (verify in Table Editor)
- [ ] Row-level security (RLS) enabled on all tables
- [ ] No schema errors in logs

#### Authentication Configuration
- [ ] Email provider enabled
- [ ] Email templates customized (optional but recommended)
- [ ] Site URL configured: `https://your-domain.com`
- [ ] Redirect URLs added:
  - `https://your-domain.com/auth/callback`
  - `http://localhost:3000/auth/callback` (for local testing)
- [ ] Email confirmation required (recommended: enabled)
- [ ] Password requirements set (min 8 characters recommended)

#### API Credentials Secured
- [ ] Project URL copied
- [ ] `anon` public key copied
- [ ] `service_role` secret key copied (kept secure, not committed)
- [ ] Keys stored in password manager

### ☐ 2. Backend Deployment (Railway)

#### Environment Variables
- [ ] `SUPABASE_URL` - Verified correct
- [ ] `SUPABASE_KEY` - anon public key verified
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - secret key verified
- [ ] `OPENAI_API_KEY` - Valid key with billing enabled
- [ ] `OPENAI_MODEL` - Set to `gpt-4-turbo-preview`
- [ ] `OPENAI_MODERATION_MODEL` - Set to `gpt-4-turbo-preview`
- [ ] `BACKEND_CORS_ORIGINS` - Includes frontend domains (JSON array format)
- [ ] `ENABLE_SCRIPTURE_ASSISTANT` - Set to `true`
- [ ] `ENABLE_AI_MODERATION` - Set to `true`
- [ ] `ENABLE_COMMUNITY_AI_TOOLS` - Set to `true`
- [ ] `MODERATION_CONFIDENCE_THRESHOLD` - Set to `0.7`
- [ ] `DEFAULT_BIBLE_VERSION` - Set to `ESV`

#### Deployment Status
- [ ] Railway project created and connected to GitHub
- [ ] Root directory set to `apps/autopneuma-api`
- [ ] Latest commit deployed successfully
- [ ] No build errors in Railway logs
- [ ] Application started successfully (check runtime logs)
- [ ] Health check endpoint responds: `/health`
- [ ] API documentation accessible: `/docs`

#### API Endpoint Tests
- [ ] `GET /health` returns 200 OK
- [ ] `POST /api/v1/moderation/moderate` accepts requests
- [ ] `POST /api/v1/scripture/context` returns scripture insights
- [ ] `GET /api/v1/tools/list` returns tools (empty list OK)
- [ ] All services show "healthy" status
- [ ] No 500 errors in logs

#### OpenAI Integration
- [ ] OpenAI API key is active
- [ ] Billing enabled and payment method added
- [ ] Usage limits set (recommended: $50-100/month)
- [ ] Email alerts configured for 75% and 90% usage
- [ ] Test moderation call successful
- [ ] Test scripture context call successful

### ☐ 3. Frontend Deployment (Vercel)

#### Environment Variables
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Matches Supabase project URL
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Matches anon key
- [ ] `NEXT_PUBLIC_API_URL` - Points to Railway URL
- [ ] `NEXT_PUBLIC_APP_URL` - Points to Vercel deployment URL
- [ ] Variables set for all environments (Production, Preview, Development)

#### Deployment Status
- [ ] Vercel project created and connected to GitHub
- [ ] Root directory set to `apps/autopneuma-web`
- [ ] Latest commit deployed successfully
- [ ] No build errors in Vercel logs
- [ ] No runtime errors in browser console
- [ ] All pages load without errors

#### Frontend Tests
- [ ] Homepage loads and displays correctly
- [ ] Navigation works across all sections
- [ ] About page displays mission statement
- [ ] Statement of Faith page loads
- [ ] Login/signup pages accessible
- [ ] Discussion board visible
- [ ] Prayer requests page loads
- [ ] Project showcase displays
- [ ] Blog listing shows sample posts

#### CORS Verification
- [ ] Frontend can call backend API
- [ ] No CORS errors in browser console
- [ ] Moderation API calls work from frontend
- [ ] Scripture assistant calls work from frontend

### ☐ 4. Initial Data Seeding

#### Discussion Categories
- [ ] "Faith & Tech" category created
- [ ] "AI Ethics" category created
- [ ] "Prayer & Projects" category created
- [ ] "Questions & Help" category created
- [ ] "Announcements" category created
- [ ] All categories have descriptions and icons

#### Sample Content (Optional but Recommended)
- [ ] Welcome post in Announcements category
- [ ] Sample discussion post in Faith & Tech
- [ ] Community guidelines pinned post
- [ ] Beta testing feedback thread

#### Admin Account
- [ ] Admin email account created (e.g., admin@autopneuma.com)
- [ ] Signed up through frontend
- [ ] Email verified
- [ ] Profile completed with spiritual gifts
- [ ] Promoted to admin role in database:
  ```sql
  UPDATE profiles
  SET role = 'admin'
  WHERE email = 'admin@autopneuma.com';
  ```
- [ ] Admin capabilities verified (can view moderation queue)

### ☐ 5. Beta Announcement Content

#### Blog Post
- [ ] Beta announcement post written
- [ ] Mission and vision clearly communicated
- [ ] "The Same Spirit. Many Gifts." theme prominent
- [ ] How to join beta explained
- [ ] What to expect during beta outlined
- [ ] Feedback channels identified
- [ ] Published and accessible at `/blog/beta-announcement`

#### Welcome Content
- [ ] Welcome email template drafted (if using)
- [ ] Community guidelines easily accessible
- [ ] FAQ section prepared (optional)
- [ ] Support/help resources identified

### ☐ 6. Email Notifications (Supabase)

#### Email Templates Configured
- [ ] Welcome/confirmation email customized with Auto Pneuma branding
- [ ] Password reset email customized
- [ ] Magic link email customized (if using)
- [ ] Test emails sent and received successfully
- [ ] Email deliverability verified (not in spam)

#### SMTP Settings (Optional Advanced)
- [ ] Custom SMTP configured (if desired)
- [ ] Domain verified
- [ ] SPF/DKIM records added (if custom domain email)

### ☐ 7. Security & Privacy

#### Security Checklist
- [ ] Service role key not committed to git
- [ ] `.env` files in `.gitignore`
- [ ] No API keys exposed in frontend code
- [ ] HTTPS enforced (automatic with Vercel/Railway)
- [ ] RLS policies tested and working
- [ ] Password requirements enforced
- [ ] Rate limiting configured

#### Privacy & Legal
- [ ] Privacy policy drafted (optional for beta)
- [ ] Terms of service drafted (optional for beta)
- [ ] Cookie policy (if needed)
- [ ] Beta disclaimer clear to testers

### ☐ 8. Monitoring & Alerting

#### Railway Monitoring
- [ ] Railway project metrics accessible
- [ ] Email notifications enabled for:
  - Deployment failures
  - High memory usage
  - Error rate spikes
- [ ] Log retention configured

#### Vercel Monitoring
- [ ] Vercel analytics enabled
- [ ] Email notifications enabled for:
  - Build failures
  - Deployment issues
- [ ] Error tracking configured (Sentry optional)

#### OpenAI Monitoring
- [ ] Usage dashboard accessible
- [ ] Spending limits configured
- [ ] Email alerts enabled
- [ ] Daily usage review scheduled

#### Supabase Monitoring
- [ ] Database metrics accessible
- [ ] Query performance monitored
- [ ] Storage usage tracked
- [ ] Email alerts for issues enabled

### ☐ 9. Functionality Testing

#### Authentication Flow
- [ ] **Sign Up:**
  - Email/password registration works
  - Confirmation email received
  - Email verification link works
  - Redirects to profile setup
- [ ] **Profile Setup:**
  - Spiritual gifts selector works
  - Focus areas selector works
  - Profile saved to database
  - User redirected to dashboard
- [ ] **Login:**
  - Existing user can log in
  - Incorrect credentials show error
  - Password reset flow works
- [ ] **Session Management:**
  - User stays logged in on refresh
  - Logout works correctly
  - Protected routes redirect to login

#### Discussion Board
- [ ] **View Posts:**
  - Categories display correctly
  - Posts list loads
  - Individual posts open
  - Comments display
- [ ] **Create Post:**
  - Form validation works
  - Tags can be added
  - Post submits successfully
  - **AI moderation runs automatically**
  - Appropriate post shows "approved"
  - Flagged post shows warning message
- [ ] **Interact:**
  - Comments can be added
  - Replies work (threaded comments)
  - Author profiles display spiritual gifts

#### Prayer Requests
- [ ] **View Requests:**
  - List loads with filters
  - Categories work
  - Status filters work
  - Individual requests open
- [ ] **Create Request:**
  - Form validation works
  - Privacy options work (anonymous, private)
  - **AI moderation runs**
  - Request submits successfully
- [ ] **Pray Button:**
  - "I Prayed" button works
  - Count increments
  - User can't pray twice
  - Success message shows
- [ ] **Updates:**
  - Updates display on request page
  - Answered prayers marked correctly

#### Project Showcase
- [ ] **View Projects:**
  - Gallery layout displays
  - Project cards show correctly
  - Filters work (status, tags)
  - Individual projects open
- [ ] **Create Project:**
  - Form validation works
  - Tech stack selector works
  - Tags selector works
  - Spiritual application required
  - Project submits successfully
- [ ] **Interact:**
  - Star button works
  - Star count updates
  - Creator profile displays
  - External links open correctly

#### Blog
- [ ] Featured post displays prominently
- [ ] Post grid layout works
- [ ] Individual posts open
- [ ] Author profiles show spiritual gifts
- [ ] Navigation between posts works
- [ ] Markdown content renders correctly

#### Scripture Context Assistant
- [ ] **Button Display:**
  - Button shows on relevant pages
  - Icon and text clear
- [ ] **Functionality:**
  - Clicking button triggers API call
  - Loading state shows
  - Modal opens with results
  - Scripture references formatted correctly
  - Theological insights display
  - Practical application shows
  - Further study suggestions visible
  - Modal closes properly
- [ ] **Error Handling:**
  - Network errors show user-friendly message
  - API errors handled gracefully

#### AI Moderation
- [ ] **Normal Content:**
  - Clean post approved automatically
  - No warning shown to user
  - Status: "approved" in database
- [ ] **Questionable Content:**
  - Post with divisive language flagged
  - Warning shown to user
  - Status: "pending" in database
  - Visible to moderators in queue
- [ ] **Problematic Content:**
  - Personal attack flagged high priority
  - Clear warning shown
  - Status: "flagged" in database
  - High priority in mod queue

### ☐ 10. Performance Testing

#### Load Times
- [ ] Homepage loads in < 2 seconds
- [ ] Discussion board loads in < 3 seconds
- [ ] Individual posts load in < 2 seconds
- [ ] Images load efficiently
- [ ] No blocking JavaScript

#### API Response Times
- [ ] Moderation API responds in < 3 seconds
- [ ] Scripture API responds in < 5 seconds
- [ ] Database queries fast (< 100ms average)

#### Mobile Responsiveness
- [ ] All pages mobile-friendly
- [ ] Navigation works on mobile
- [ ] Forms usable on mobile
- [ ] Modals display correctly on mobile

### ☐ 11. Beta Tester Preparation

#### Invitation Process
- [ ] Beta tester list identified (5-10 people)
- [ ] Invitation email/message drafted
- [ ] Beta announcement post published
- [ ] Sign-up instructions clear
- [ ] Welcome sequence prepared

#### Feedback Channels
- [ ] Feedback discussion thread created
- [ ] Bug report process defined
- [ ] Email for support identified (e.g., support@autopneuma.com)
- [ ] Response time expectations set (24-48 hours for beta)

#### Documentation for Testers
- [ ] Quick start guide prepared
- [ ] Key features overview written
- [ ] Known issues documented
- [ ] How to report bugs explained

### ☐ 12. Launch Day Checklist

#### Final Verifications
- [ ] All environment variables verified one last time
- [ ] Latest code deployed to production
- [ ] All tests passing
- [ ] No critical errors in logs
- [ ] Monitoring dashboards open and ready

#### Communication Ready
- [ ] Beta announcement post published
- [ ] Invitation emails ready to send
- [ ] Social media posts prepared (if applicable)
- [ ] Community announcement ready

#### Support Ready
- [ ] Admin account logged in
- [ ] Moderation queue accessible
- [ ] Support email monitored
- [ ] Response templates prepared

#### Emergency Procedures
- [ ] Rollback plan documented
- [ ] Contact info for all services (Railway, Vercel, Supabase)
- [ ] Incident response plan outlined
- [ ] Backup admin access verified

---

## Post-Launch (First 24 Hours)

### ☐ Monitoring

- [ ] Check Railway logs every 2-4 hours
- [ ] Monitor Vercel deployment status
- [ ] Watch for Supabase connection issues
- [ ] Track OpenAI API usage
- [ ] Review error rates

### ☐ Support

- [ ] Respond to beta tester questions within 2 hours
- [ ] Monitor moderation queue regularly
- [ ] Address any reported bugs immediately
- [ ] Document common issues

### ☐ Engagement

- [ ] Welcome each new beta tester personally
- [ ] Encourage first posts/prayers/projects
- [ ] Share beta announcement in community
- [ ] Thank testers for feedback

---

## Success Criteria

The launch is successful when:

✅ All beta testers can sign up and complete profile
✅ At least 3 discussion posts created
✅ At least 2 prayer requests submitted
✅ At least 1 project showcased
✅ AI moderation running without errors
✅ Scripture assistant providing insights
✅ No critical bugs reported
✅ Positive feedback from testers
✅ All services stable and healthy

---

## Timeline

**Day -7:** Complete all Pre-Launch checklist items
**Day -3:** Seed initial data and create admin account
**Day -2:** Run full functionality testing
**Day -1:** Final verification and rehearsal
**Day 0:** Launch! Send invitations and monitor
**Day +1:** Review first 24 hours, address issues
**Day +7:** Gather feedback, plan improvements

---

## Emergency Contacts

**Railway Issues:**
- Dashboard: https://railway.app
- Docs: https://docs.railway.app
- Discord: https://discord.gg/railway

**Vercel Issues:**
- Dashboard: https://vercel.com/dashboard
- Support: support@vercel.com
- Docs: https://vercel.com/docs

**Supabase Issues:**
- Dashboard: https://supabase.com/dashboard
- Support: support@supabase.com
- Discord: https://discord.supabase.com

**OpenAI Issues:**
- Dashboard: https://platform.openai.com
- Support: https://help.openai.com
- Status: https://status.openai.com

---

## Notes

Use this space for launch-specific notes, observations, and decisions:

```
[Launch date: _________]
[Beta tester count: _________]
[Special considerations: _________]
```

---

**"Now to each one the manifestation of the Spirit is given for the common good."**
— 1 Corinthians 12:7

May this launch glorify God and serve His people faithfully!
