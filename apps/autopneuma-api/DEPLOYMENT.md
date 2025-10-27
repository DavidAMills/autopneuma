# Deploying Auto Pneuma API to Railway

This guide walks through deploying the FastAPI backend to Railway.

## Prerequisites

- Railway account (https://railway.app)
- GitHub repository with this code
- Supabase project
- OpenAI API key

## Step 1: Create Railway Project

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your `autopneuma` repository
5. Railway will detect the Python app automatically

## Step 2: Configure Root Directory

Since the API is in a subdirectory:

1. In Railway project settings, go to "Settings"
2. Set "Root Directory" to: `apps/autopneuma-api`
3. Save changes

## Step 3: Configure Environment Variables

Add these environment variables in Railway:

### Required Variables

```bash
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI
OPENAI_API_KEY=sk-your-key-here

# API Settings
PROJECT_NAME="Auto Pneuma API"
VERSION="1.0.0"
API_V1_PREFIX="/api/v1"

# CORS (add your frontend domain when deployed)
BACKEND_CORS_ORIGINS=["http://localhost:3000","https://your-domain.com"]

# OpenAI Models
OPENAI_MODEL=gpt-4-turbo-preview
OPENAI_MODERATION_MODEL=gpt-4-turbo-preview

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

### Finding Supabase Credentials

1. Go to your Supabase project dashboard
2. Click "Settings" → "API"
3. Copy:
   - Project URL → `SUPABASE_URL`
   - `anon` `public` key → `SUPABASE_KEY`
   - `service_role` `secret` key → `SUPABASE_SERVICE_ROLE_KEY`

**Important:** Keep service role key secure! It bypasses RLS.

### Getting OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Create new secret key
3. Copy the key (you won't see it again)
4. Add as `OPENAI_API_KEY`

## Step 4: Deploy

1. Railway will automatically deploy after environment variables are set
2. Monitor deployment in the "Deployments" tab
3. Once deployed, Railway will provide a public URL like:
   ```
   https://autopneuma-api-production.up.railway.app
   ```

## Step 5: Verify Deployment

Test the deployed API:

### Health Check
```bash
curl https://your-railway-url.railway.app/health
```

Should return:
```json
{
  "status": "healthy",
  "service": "autopneuma-api",
  "version": "1.0.0"
}
```

### API Documentation
Visit: `https://your-railway-url.railway.app/docs`

Should show Swagger UI with all endpoints.

### Test Moderation Endpoint
```bash
curl -X POST https://your-railway-url.railway.app/api/v1/moderation/health
```

### Test Scripture Endpoint
```bash
curl https://your-railway-url.railway.app/api/v1/scripture/health
```

### Test Community Tools Endpoint
```bash
curl https://your-railway-url.railway.app/api/v1/tools/health
```

## Step 6: Configure Custom Domain (Optional)

1. In Railway project settings, go to "Settings"
2. Click "Generate Domain" or add your custom domain
3. If using custom domain:
   - Add CNAME record pointing to Railway
   - Example: `api.autopneuma.com` → `your-project.up.railway.app`

## Step 7: Update Next.js Frontend

In your Next.js app (`apps/autopneuma-web`):

1. Create/update `.env.local`:
```bash
NEXT_PUBLIC_API_URL=https://your-railway-url.railway.app
```

2. Update CORS in Railway environment variables to include your frontend domain:
```bash
BACKEND_CORS_ORIGINS=["http://localhost:3000","https://autopneuma.vercel.app"]
```

## Troubleshooting

### Deployment Fails

**Check build logs:**
1. Go to "Deployments" tab
2. Click on failed deployment
3. Check logs for errors

**Common issues:**
- Missing environment variables
- Python version mismatch
- Dependency conflicts

### API Returns 500 Errors

**Check runtime logs:**
1. Go to "Deployments" tab
2. Click on deployment
3. View runtime logs

**Common issues:**
- Invalid Supabase credentials
- Invalid OpenAI API key
- CORS configuration issues

### Health Check Fails

**Check:**
1. Is PORT environment variable set? (Railway sets this automatically)
2. Is the app binding to `0.0.0.0`? (Check Procfile)
3. Is `/health` endpoint accessible?

### CORS Errors

**Update CORS origins:**
1. Add your frontend domain to `BACKEND_CORS_ORIGINS`
2. Format: JSON array of strings
3. Include both `http://` and `https://` if needed
4. Redeploy after changing

## Monitoring

Railway provides:
- Real-time logs
- Resource usage metrics
- Deployment history
- Custom metrics

Access in the Railway dashboard.

## Scaling

Railway automatically scales based on usage. For more control:

1. Go to "Settings" → "Resources"
2. Adjust memory and CPU limits
3. Configure auto-scaling rules

## Database Schema

Don't forget to apply the database schema to Supabase:

```bash
# Connect to Supabase via SQL Editor or psql
psql "your-supabase-connection-string"

# Apply base schema
\i packages/database/schema.sql

# Apply AI integration schema
\i packages/database/ai-integration-schema.sql
```

Or use Supabase SQL Editor:
1. Go to Supabase dashboard
2. Click "SQL Editor"
3. Copy contents of `schema.sql`
4. Run query
5. Repeat for `ai-integration-schema.sql`

## Cost Estimates

**Railway:**
- Hobby plan: $5/month (includes 500 hours)
- Pro plan: $20/month (includes more resources)

**OpenAI:**
- GPT-4 Turbo: ~$0.01/1K tokens (input), ~$0.03/1K tokens (output)
- Estimated: $10-50/month for moderate usage

**Supabase:**
- Free tier: Good for development and small communities
- Pro tier: $25/month (for production)

**Total estimated: $40-100/month** for a small to medium community.

## Security Checklist

- ✅ Service role key secured as environment variable
- ✅ CORS configured for only approved domains
- ✅ Rate limiting enabled
- ✅ HTTPS enforced (Railway does this automatically)
- ✅ API keys not in source code
- ✅ Environment variables not committed to git

## Next Steps

1. Deploy Next.js frontend to Vercel
2. Update API_URL in frontend environment
3. Test end-to-end integration
4. Set up monitoring alerts
5. Configure backup strategy

## Support

- Railway docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Auto Pneuma community: [Your community link]

---

**May this technology serve the Kingdom and glorify God!**

*"Now to each one the manifestation of the Spirit is given for the common good." — 1 Corinthians 12:7*
