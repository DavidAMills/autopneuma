-- Auto Pneuma Database Schema
-- PostgreSQL with Supabase Extensions

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- USERS AND PROFILES
-- ============================================================================

-- Users table extends Supabase auth.users
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  bio TEXT,
  avatar_url TEXT,

  -- Spiritual and technical focus
  spiritual_gifts TEXT[], -- e.g., ['teaching', 'encouragement', 'wisdom']
  focus_areas TEXT[], -- e.g., ['machine-learning', 'web-development', 'ethics']

  -- Community role
  role VARCHAR(20) DEFAULT 'member' CHECK (role IN ('member', 'moderator', 'admin')),

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Settings
  email_notifications BOOLEAN DEFAULT TRUE,
  is_public BOOLEAN DEFAULT TRUE
);

-- ============================================================================
-- DISCUSSION BOARD
-- ============================================================================

-- Categories for discussions
CREATE TABLE discussion_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(50), -- Icon name for UI
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Discussion posts
CREATE TABLE posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES discussion_categories(id) ON DELETE SET NULL,

  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  content_html TEXT, -- Rendered markdown

  -- Metadata
  tags TEXT[], -- e.g., ['ai-ethics', 'gpt-4', 'theology']
  is_pinned BOOLEAN DEFAULT FALSE,
  is_locked BOOLEAN DEFAULT FALSE,

  -- Engagement metrics
  view_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,

  -- Moderation
  moderation_status VARCHAR(20) DEFAULT 'approved' CHECK (moderation_status IN ('pending', 'approved', 'flagged', 'removed')),
  moderation_notes TEXT,
  moderated_by UUID REFERENCES profiles(id),
  moderated_at TIMESTAMP WITH TIME ZONE,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Comments on posts (threaded)
CREATE TABLE comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE, -- For threading

  content TEXT NOT NULL,
  content_html TEXT,

  -- Engagement
  upvote_count INTEGER DEFAULT 0,

  -- Moderation
  moderation_status VARCHAR(20) DEFAULT 'approved' CHECK (moderation_status IN ('pending', 'approved', 'flagged', 'removed')),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- BLOG
-- ============================================================================

CREATE TABLE blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL, -- Markdown
  content_html TEXT, -- Rendered HTML

  -- Media
  featured_image_url TEXT,

  -- Metadata
  tags TEXT[],
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,

  -- SEO
  meta_description TEXT,

  -- Engagement
  view_count INTEGER DEFAULT 0,
  read_time_minutes INTEGER, -- Estimated reading time

  -- Timestamps
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- PROJECTS / GIFT SHOWCASE
-- ============================================================================

CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  creator_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT, -- Markdown format

  -- Links
  github_url TEXT,
  demo_url TEXT,
  documentation_url TEXT,

  -- Technical details
  tech_stack TEXT[], -- e.g., ['python', 'fastapi', 'openai']
  spiritual_application TEXT, -- How this serves Kingdom purposes

  -- Media
  thumbnail_url TEXT,
  screenshots TEXT[], -- Array of image URLs

  -- Metadata
  tags TEXT[],
  license VARCHAR(50), -- e.g., 'MIT', 'GPL-3.0', 'Apache-2.0'
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('prototype', 'active', 'archived', 'deprecated')),

  -- Engagement
  view_count INTEGER DEFAULT 0,
  star_count INTEGER DEFAULT 0, -- User favorites

  -- Moderation
  is_approved BOOLEAN DEFAULT TRUE,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project collaborators (many-to-many)
CREATE TABLE project_collaborators (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role VARCHAR(50), -- e.g., 'maintainer', 'contributor'
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (project_id, user_id)
);

-- ============================================================================
-- PRAYER REQUESTS
-- ============================================================================

CREATE TABLE prayer_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,

  -- Category
  category VARCHAR(50) CHECK (category IN ('personal', 'community', 'project', 'world')),

  -- Privacy
  is_anonymous BOOLEAN DEFAULT FALSE,
  is_private BOOLEAN DEFAULT FALSE, -- If true, only visible to prayer team

  -- Status
  status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'answered', 'ongoing', 'closed')),

  -- Engagement
  prayer_count INTEGER DEFAULT 0, -- Number of people who prayed

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Track who has prayed
CREATE TABLE prayer_interactions (
  prayer_request_id UUID REFERENCES prayer_requests(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  prayed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (prayer_request_id, user_id)
);

-- Prayer updates (e.g., "God answered this prayer!")
CREATE TABLE prayer_updates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  prayer_request_id UUID REFERENCES prayer_requests(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- MODERATION
-- ============================================================================

-- Reports for content violations
CREATE TABLE content_reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  reporter_id UUID REFERENCES profiles(id) ON DELETE SET NULL,

  -- Content being reported (polymorphic)
  content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('post', 'comment', 'project', 'profile')),
  content_id UUID NOT NULL,

  reason VARCHAR(100) NOT NULL, -- e.g., 'spam', 'harassment', 'inappropriate'
  description TEXT,

  -- Resolution
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'resolved', 'dismissed')),
  resolved_by UUID REFERENCES profiles(id),
  resolution_notes TEXT,
  resolved_at TIMESTAMP WITH TIME ZONE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Moderation log
CREATE TABLE moderation_log (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  moderator_id UUID REFERENCES profiles(id) NOT NULL,

  action VARCHAR(50) NOT NULL, -- e.g., 'warn', 'suspend', 'ban', 'approve', 'remove'
  target_type VARCHAR(50) NOT NULL, -- 'user', 'post', 'comment', etc.
  target_id UUID NOT NULL,

  reason TEXT,
  notes TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User warnings and suspensions
CREATE TABLE user_moderation (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  moderator_id UUID REFERENCES profiles(id) NOT NULL,

  action VARCHAR(20) NOT NULL CHECK (action IN ('warning', 'suspension', 'ban')),
  reason TEXT NOT NULL,
  notes TEXT,

  -- For suspensions
  suspended_until TIMESTAMP WITH TIME ZONE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- NEWSLETTER
-- ============================================================================

CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  is_subscribed BOOLEAN DEFAULT TRUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Profiles
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_profiles_role ON profiles(role);

-- Posts
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_category ON posts(category_id);
CREATE INDEX idx_posts_status ON posts(moderation_status);
CREATE INDEX idx_posts_created ON posts(created_at DESC);
CREATE INDEX idx_posts_tags ON posts USING GIN(tags);

-- Comments
CREATE INDEX idx_comments_post ON comments(post_id);
CREATE INDEX idx_comments_author ON comments(author_id);
CREATE INDEX idx_comments_parent ON comments(parent_comment_id);

-- Blog
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published, published_at DESC);
CREATE INDEX idx_blog_posts_tags ON blog_posts USING GIN(tags);

-- Projects
CREATE INDEX idx_projects_creator ON projects(creator_id);
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_tags ON projects USING GIN(tags);

-- Prayer Requests
CREATE INDEX idx_prayer_requests_author ON prayer_requests(author_id);
CREATE INDEX idx_prayer_requests_status ON prayer_requests(status);
CREATE INDEX idx_prayer_requests_created ON prayer_requests(created_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;

-- Profiles: Public read, owner write
CREATE POLICY "Profiles are viewable by everyone" ON profiles
  FOR SELECT USING (is_public = TRUE OR auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Posts: Public read (if approved), author can CRUD own posts
CREATE POLICY "Approved posts are viewable by everyone" ON posts
  FOR SELECT USING (moderation_status = 'approved');

CREATE POLICY "Users can create posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own posts" ON posts
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Users can delete own posts" ON posts
  FOR DELETE USING (auth.uid() = author_id);

-- Comments: Similar to posts
CREATE POLICY "Approved comments are viewable by everyone" ON comments
  FOR SELECT USING (moderation_status = 'approved');

CREATE POLICY "Users can create comments" ON comments
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own comments" ON comments
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Users can delete own comments" ON comments
  FOR DELETE USING (auth.uid() = author_id);

-- Blog: Public read (if published), author write
CREATE POLICY "Published blog posts are viewable by everyone" ON blog_posts
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Authors can create blog posts" ON blog_posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update own blog posts" ON blog_posts
  FOR UPDATE USING (auth.uid() = author_id);

-- Projects: Public read (if approved), creator write
CREATE POLICY "Approved projects are viewable by everyone" ON projects
  FOR SELECT USING (is_approved = TRUE);

CREATE POLICY "Users can create projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can update own projects" ON projects
  FOR UPDATE USING (auth.uid() = creator_id);

-- Prayer Requests: Visible based on privacy settings
CREATE POLICY "Public prayer requests are viewable by everyone" ON prayer_requests
  FOR SELECT USING (
    is_private = FALSE
    OR auth.uid() = author_id
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('moderator', 'admin'))
  );

CREATE POLICY "Users can create prayer requests" ON prayer_requests
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own prayer requests" ON prayer_requests
  FOR UPDATE USING (auth.uid() = author_id);

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to relevant tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prayer_requests_updated_at BEFORE UPDATE ON prayer_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Increment comment count on posts
CREATE OR REPLACE FUNCTION increment_post_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE posts SET comment_count = comment_count + 1 WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_comment_count AFTER INSERT ON comments
  FOR EACH ROW EXECUTE FUNCTION increment_post_comment_count();

-- Decrement comment count when comment deleted
CREATE OR REPLACE FUNCTION decrement_post_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE posts SET comment_count = comment_count - 1 WHERE id = OLD.post_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER decrement_comment_count AFTER DELETE ON comments
  FOR EACH ROW EXECUTE FUNCTION decrement_post_comment_count();

-- ============================================================================
-- SEED DATA (Categories)
-- ============================================================================

INSERT INTO discussion_categories (name, slug, description, icon, sort_order) VALUES
  ('Faith & Tech', 'faith-tech', 'Discussions on how faith intersects with technology and AI development', 'cross', 1),
  ('AI Ethics', 'ai-ethics', 'Ethical considerations and biblical principles for AI development', 'scale', 2),
  ('Prayer & Projects', 'prayer-projects', 'Share your projects and request prayer for your work', 'heart', 3),
  ('Questions & Help', 'questions-help', 'Ask questions and get help from the community', 'help-circle', 4),
  ('Announcements', 'announcements', 'Official updates and community announcements', 'megaphone', 5);
