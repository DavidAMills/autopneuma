-- ============================================================================
-- AUTO PNEUMA - INITIAL DATA SEEDING
-- Seeds minimal essential data for beta launch
-- ============================================================================

-- Run this script AFTER applying schema.sql and ai-integration-schema.sql
-- This creates the minimum data needed for a functioning community

-- ============================================================================
-- DISCUSSION CATEGORIES
-- ============================================================================

INSERT INTO discussion_categories (name, slug, description, icon, sort_order)
VALUES
  (
    'Faith & Tech',
    'faith-tech',
    'Exploring the intersection of Christian faith and technology. Discuss how we can faithfully steward our technical gifts for God''s glory.',
    'message-square',
    1
  ),
  (
    'AI Ethics',
    'ai-ethics',
    'Biblical perspectives on AI ethics, fairness, transparency, and responsible development. How do we build AI that honors God and serves human flourishing?',
    'scale',
    2
  ),
  (
    'Prayer & Projects',
    'prayer-projects',
    'Share prayer requests for your technical work, celebrate answered prayers, and update the community on Kingdom-focused projects.',
    'heart',
    3
  ),
  (
    'Questions & Help',
    'questions-help',
    'Ask technical questions, seek advice on career decisions, or request help with challenges you''re facing. No question is too basic!',
    'help-circle',
    4
  ),
  (
    'Announcements',
    'announcements',
    'Official announcements from the Auto Pneuma team, platform updates, and community news.',
    'megaphone',
    5
  )
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- SAMPLE BLOG POSTS (For Beta Launch)
-- ============================================================================

-- Note: These require an admin user to exist first
-- After creating admin account, run this section with the admin's user_id

-- Example (replace 'ADMIN_USER_ID' with actual UUID):
--
-- INSERT INTO blog_posts (
--   author_id,
--   title,
--   slug,
--   excerpt,
--   content,
--   tags,
--   is_featured,
--   published_at
-- ) VALUES
-- (
--   'ADMIN_USER_ID',
--   'Welcome to Auto Pneuma Beta',
--   'welcome-to-auto-pneuma-beta',
--   'Today we launch the beta preview of Auto Pneuma — a Christian community for technologists.',
--   '... full markdown content from beta-announcement.md ...',
--   ARRAY['announcement', 'community', 'beta'],
--   true,
--   NOW()
-- );

-- ============================================================================
-- WELCOME POST (Sample Discussion)
-- ============================================================================

-- This also requires an admin user_id
-- After creating admin, uncomment and run:

-- INSERT INTO posts (
--   author_id,
--   category_id,
--   title,
--   content,
--   tags,
--   moderation_status
-- )
-- SELECT
--   'ADMIN_USER_ID',
--   id,
--   'Welcome to Auto Pneuma! 🙌',
--   E'# Welcome, Founders! 👋\n\n"Now to each one the manifestation of the Spirit is given for the common good." — 1 Corinthians 12:7\n\nWelcome to the Auto Pneuma beta community! You are among the first believers to join this platform, and that makes you a **founding member** of what we pray will become a thriving community of Christ-centered technologists.\n\n## Who We Are\n\nAuto Pneuma (Greek for "the same Spirit") is a community where Christian developers, AI practitioners, and technology enthusiasts can:\n\n- 🗣️ **Discuss** faith and technology topics\n- 🙏 **Pray** for one another''s challenges and celebrate answered prayers\n- 💡 **Build** Kingdom-focused projects together\n- 📖 **Learn** from biblical perspectives on AI ethics and innovation\n- 🤝 **Support** each other in our callings\n\n## Getting Started\n\n1. **Complete your profile** — Share your spiritual gifts and technical focus areas\n2. **Read the community guidelines** at `/faith`\n3. **Introduce yourself** — Reply to this thread!\n4. **Explore the features** — Discussion board, prayer requests, project showcase\n5. **Share feedback** — Your input shapes this platform\n\n## What to Share in Your Introduction\n\n- Your name (or username)\n- Where you''re located (city/country)\n- What you do in tech/AI\n- How long you''ve been following Christ\n- What brings you to Auto Pneuma\n- What you hope to contribute\n\n## Beta Expectations\n\nThis is a **beta preview**, which means:\n\n- ✅ Core features work but are being refined\n- ⚡ Some features still in development\n- 🐛 You might encounter bugs (please report them!)\n- 💬 Your feedback directly shapes the platform\n- 🙏 We''re praying for wisdom in every decision\n\n## Our Commitment\n\nWe''re here to serve you and glorify God. This community is:\n\n- **Christ-centered** — Jesus is Lord, Scripture is our authority\n- **Gospel-focused** — Spreading the Good News through our gifts\n- **Grace-filled** — Treating each other with love and respect\n- **Excellence-driven** — Building with integrity and quality\n\n## Let''s Build Together\n\nThank you for being here. Thank you for trusting us with your time and presence in these early days. And thank you for saying "yes" to being part of what God is doing through this community.\n\n**Now — introduce yourself! 👇**\n\nWe can''t wait to get to know you and see how God has uniquely gifted you to contribute to the Body of Christ.\n\nBlessings,\nThe Auto Pneuma Team\n\n---\n\n*"The Same Spirit. Many Gifts."*',
--   ARRAY['welcome', 'introduction', 'beta'],
--   'approved'
-- FROM discussion_categories
-- WHERE slug = 'announcements';

-- ============================================================================
-- COMMUNITY GUIDELINES POST
-- ============================================================================

-- INSERT INTO posts (
--   author_id,
--   category_id,
--   title,
--   content,
--   tags,
--   moderation_status,
--   is_pinned
-- )
-- SELECT
--   'ADMIN_USER_ID',
--   id,
--   'Community Guidelines: Speaking Truth in Love',
--   E'# Community Guidelines\n\n## Our Foundation\n\n"But speaking the truth in love, we are to grow up in all aspects into Him who is the head, even Christ." — Ephesians 4:15\n\nThese guidelines are grounded in Scripture and the Fruits of the Spirit (Galatians 5:22-23). We expect all members to engage with love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control.\n\n## Expected Conduct\n\n### ✅ Do:\n\n- **Speak truth in love** — Be honest but kind\n- **Treat others with respect** — Every person bears God''s image\n- **Assume the best** — Give others the benefit of the doubt\n- **Focus on ideas, not people** — Critique arguments, not individuals\n- **Seek to understand** — Ask clarifying questions\n- **Encourage one another** — Build up, don''t tear down\n- **Admit when you''re wrong** — Humility glorifies God\n- **Pray for each other** — Bear one another''s burdens\n\n### ❌ Don''t:\n\n- **Personal attacks** — Never attack someone''s character\n- **Divisive behavior** — Don''t be unnecessarily contentious\n- **Spam or self-promotion** — This isn''t a marketing platform\n- **Profanity or vulgarity** — Keep language appropriate\n- **False teaching** — We affirm Bible-based Christian doctrine\n\n## Theological Scope\n\n**Unity in Essentials:**\nWe affirm core Christian doctrine (Trinity, Gospel, Scripture''s authority, etc.)\n\n**Freedom in Non-Essentials:**\nWe welcome diverse denominational perspectives on secondary matters\n\n**Love in All Things:**\nWe treat disagreements with grace, seeking understanding over "winning"\n\n## Content Moderation\n\nWe use **AI-assisted moderation** to help maintain community health. The AI flags content that may need review, but **human moderators make all final decisions**.\n\nContent may be flagged for:\n- Personal attacks or disrespect\n- Divisive behavior\n- Spam or off-topic promotion\n- Theological concerns requiring pastoral attention\n\nIf your content is flagged, a moderator will review it fairly and prayerfully.\n\n## Consequences\n\nMost issues are resolved through conversation. However, repeated violations may result in:\n1. **Warning** — Private message from moderator\n2. **Temporary suspension** — Time away to reflect\n3. **Permanent ban** — For severe or repeated violations\n\nWe pray this never happens, but we''re committed to protecting community health.\n\n## Questions?\n\nIf you''re unsure whether something is appropriate, ask yourself:\n- Does this glorify God?\n- Does this build others up?\n- Would I say this in person to a fellow believer?\n- Is this spoken in love?\n\nWhen in doubt, reach out to a moderator.\n\n---\n\n**Thank you for helping make Auto Pneuma a healthy, edifying community!**',
--   ARRAY['guidelines', 'community', 'moderation'],
--   'approved',
--   true
-- FROM discussion_categories
-- WHERE slug = 'announcements';

-- ============================================================================
-- BETA FEEDBACK THREAD
-- ============================================================================

-- INSERT INTO posts (
--   author_id,
--   category_id,
--   title,
--   content,
--   tags,
--   moderation_status
-- )
-- SELECT
--   'ADMIN_USER_ID',
--   id,
--   'Beta Feedback & Bug Reports 🐛',
--   E'# Share Your Feedback!\n\nAs a beta tester, your input is invaluable. This thread is for:\n\n## 🐛 Bug Reports\n\nIf something isn''t working:\n- Describe what you were trying to do\n- Explain what happened vs. what you expected\n- Include any error messages\n- Note your browser/device if relevant\n\n## 💡 Feature Suggestions\n\nIdeas for improvements:\n- What would make your experience better?\n- What features are missing?\n- How could existing features be enhanced?\n\n## ❤️ What''s Working Well\n\nPositive feedback helps too:\n- What features do you love?\n- What exceeded your expectations?\n- What should we prioritize keeping?\n\n## 🎯 General Thoughts\n\nAny other observations:\n- First impressions\n- User experience feedback\n- Community culture observations\n- Theological/content suggestions\n\n---\n\n**Thank you for helping us build Auto Pneuma!**\n\nYour feedback shapes this platform. We read every comment and take it to prayer as we make decisions.\n\nBlessings,\nThe Auto Pneuma Team',
--   ARRAY['beta', 'feedback', 'bugs'],
--   'approved'
-- FROM discussion_categories
-- WHERE slug = 'questions-help';

-- ============================================================================
-- SAMPLE PRAYER REQUEST (Optional)
-- ============================================================================

-- INSERT INTO prayer_requests (
--   author_id,
--   title,
--   content,
--   category,
--   status
-- ) VALUES (
--   'ADMIN_USER_ID',
--   'Wisdom for Auto Pneuma Development',
--   E'Praying for wisdom and guidance as we build Auto Pneuma. That God would:\n\n- Guide our technical decisions\n- Help us build a healthy, Christ-centered community\n- Protect us from pride and worldly ambition\n- Use this platform for His glory\n- Draw people to Himself through our work\n\nWould appreciate your prayers as we steward this opportunity.',
--   'community',
--   'ongoing'
-- );

-- ============================================================================
-- SAMPLE PROJECT (Optional)
-- ============================================================================

-- INSERT INTO projects (
--   creator_id,
--   title,
--   slug,
--   description,
--   long_description,
--   tech_stack,
--   spiritual_application,
--   tags,
--   status,
--   license,
--   github_url
-- ) VALUES (
--   'ADMIN_USER_ID',
--   'Auto Pneuma Platform',
--   'auto-pneuma-platform',
--   'A Christian community platform for technologists at the intersection of faith and AI',
--   E'# Auto Pneuma Platform\n\nAn open-source community platform designed specifically for Christian technologists...',
--   ARRAY['Next.js', 'TypeScript', 'FastAPI', 'Python', 'Supabase', 'PostgreSQL', 'OpenAI', 'Tailwind CSS'],
--   'Provides a space for believers to collaborate on Kingdom-focused technology, support one another in faith and technical growth, and use AI tools grounded in biblical principles.',
--   ARRAY['community', 'platform', 'ai', 'open-source'],
--   'active',
--   'MIT',
--   'https://github.com/your-org/autopneuma'
-- );

-- ============================================================================
-- HELPFUL QUERIES FOR SEEDING
-- ============================================================================

-- After creating admin account through the UI, get the user ID:
-- SELECT id, email, username FROM profiles WHERE role = 'admin';

-- Then replace 'ADMIN_USER_ID' in the INSERT statements above with the actual UUID

-- Verify categories were created:
-- SELECT * FROM discussion_categories ORDER BY sort_order;

-- ============================================================================
-- NOTES
-- ============================================================================

-- 1. Run this script AFTER creating your admin account through the frontend
-- 2. Replace 'ADMIN_USER_ID' with your actual admin user UUID in the commented sections
-- 3. Uncomment the sections you want to seed
-- 4. The minimal required seeding is just the discussion_categories
-- 5. Sample posts/prayers/projects are optional but recommended for beta
