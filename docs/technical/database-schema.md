# Database Schema

## PostgreSQL Schema for Auto Pneuma

This document explains the database structure, relationships, and design decisions for the Auto Pneuma platform.

## Overview

The database is built on **PostgreSQL** (hosted via Supabase) and uses:
- **UUID** primary keys for security and scalability
- **Row-Level Security (RLS)** for fine-grained access control
- **Indexes** on frequently queried columns for performance
- **Triggers** for automatic timestamp updates and count maintenance

## Core Tables

### 1. Profiles

Extends Supabase `auth.users` with community-specific data.

```sql
profiles
  - id (UUID, PK, FK to auth.users)
  - username (VARCHAR, UNIQUE)
  - full_name (VARCHAR)
  - bio (TEXT)
  - avatar_url (TEXT)
  - spiritual_gifts (TEXT[])  -- e.g., ['teaching', 'encouragement']
  - focus_areas (TEXT[])      -- e.g., ['machine-learning', 'ethics']
  - role (VARCHAR)            -- 'member', 'moderator', 'admin'
  - created_at (TIMESTAMP)
  - updated_at (TIMESTAMP)
  - last_active_at (TIMESTAMP)
  - email_notifications (BOOLEAN)
  - is_public (BOOLEAN)
```

**Purpose**: Store user profile information and spiritual/technical focus areas.

**Relationships**:
- One-to-many with `posts`, `comments`, `projects`, `prayer_requests`

### 2. Discussion Categories

Categories for organizing discussions.

```sql
discussion_categories
  - id (UUID, PK)
  - name (VARCHAR)
  - slug (VARCHAR, UNIQUE)
  - description (TEXT)
  - icon (VARCHAR)          -- Icon name for UI
  - sort_order (INTEGER)
  - created_at (TIMESTAMP)
```

**Seed Data**:
- Faith & Tech
- AI Ethics
- Prayer & Projects
- Questions & Help
- Announcements

### 3. Posts

Discussion board posts.

```sql
posts
  - id (UUID, PK)
  - author_id (UUID, FK to profiles)
  - category_id (UUID, FK to discussion_categories)
  - title (VARCHAR)
  - content (TEXT)          -- Markdown
  - content_html (TEXT)     -- Rendered HTML
  - tags (TEXT[])
  - is_pinned (BOOLEAN)
  - is_locked (BOOLEAN)
  - view_count (INTEGER)
  - comment_count (INTEGER)
  - moderation_status (VARCHAR)  -- 'pending', 'approved', 'flagged', 'removed'
  - moderation_notes (TEXT)
  - moderated_by (UUID, FK to profiles)
  - moderated_at (TIMESTAMP)
  - created_at (TIMESTAMP)
  - updated_at (TIMESTAMP)
  - last_activity_at (TIMESTAMP)
```

**Purpose**: Discussion threads in the community forum.

**Moderation**: Content goes through moderation workflow (optional AI-assisted flagging).

### 4. Comments

Threaded comments on posts.

```sql
comments
  - id (UUID, PK)
  - post_id (UUID, FK to posts)
  - author_id (UUID, FK to profiles)
  - parent_comment_id (UUID, FK to comments, nullable)  -- For threading
  - content (TEXT)
  - content_html (TEXT)
  - upvote_count (INTEGER)
  - moderation_status (VARCHAR)
  - created_at (TIMESTAMP)
  - updated_at (TIMESTAMP)
```

**Purpose**: Allow threaded discussions on posts.

**Threading**: `parent_comment_id` allows nested replies.

### 5. Blog Posts

Articles and thought leadership content.

```sql
blog_posts
  - id (UUID, PK)
  - author_id (UUID, FK to profiles)
  - title (VARCHAR)
  - slug (VARCHAR, UNIQUE)
  - excerpt (TEXT)
  - content (TEXT)          -- Markdown
  - content_html (TEXT)     -- Rendered HTML
  - featured_image_url (TEXT)
  - tags (TEXT[])
  - is_featured (BOOLEAN)
  - is_published (BOOLEAN)
  - meta_description (TEXT)
  - view_count (INTEGER)
  - read_time_minutes (INTEGER)
  - published_at (TIMESTAMP)
  - created_at (TIMESTAMP)
  - updated_at (TIMESTAMP)
```

**Purpose**: Blog content for thought leadership, tutorials, and announcements.

**SEO**: `slug`, `meta_description`, and `featured_image_url` for search optimization.

### 6. Projects

"Gift Showcase" for member-created AI projects.

```sql
projects
  - id (UUID, PK)
  - creator_id (UUID, FK to profiles)
  - title (VARCHAR)
  - slug (VARCHAR, UNIQUE)
  - description (TEXT)
  - long_description (TEXT)  -- Markdown
  - github_url (TEXT)
  - demo_url (TEXT)
  - documentation_url (TEXT)
  - tech_stack (TEXT[])
  - spiritual_application (TEXT)
  - thumbnail_url (TEXT)
  - screenshots (TEXT[])
  - tags (TEXT[])
  - license (VARCHAR)
  - status (VARCHAR)  -- 'prototype', 'active', 'archived', 'deprecated'
  - view_count (INTEGER)
  - star_count (INTEGER)  -- User favorites
  - is_approved (BOOLEAN)
  - created_at (TIMESTAMP)
  - updated_at (TIMESTAMP)
```

**Purpose**: Showcase AI projects built by the community.

**Spiritual Application**: Field for explaining how the project serves Kingdom purposes.

### 7. Project Collaborators

Many-to-many relationship for project teams.

```sql
project_collaborators
  - project_id (UUID, FK to projects)
  - user_id (UUID, FK to profiles)
  - role (VARCHAR)  -- 'maintainer', 'contributor'
  - joined_at (TIMESTAMP)
  - PRIMARY KEY (project_id, user_id)
```

**Purpose**: Track teams working on projects together.

### 8. Prayer Requests

Community prayer requests.

```sql
prayer_requests
  - id (UUID, PK)
  - author_id (UUID, FK to profiles)
  - title (VARCHAR)
  - content (TEXT)
  - category (VARCHAR)  -- 'personal', 'community', 'project', 'world'
  - is_anonymous (BOOLEAN)
  - is_private (BOOLEAN)  -- Visible only to prayer team if true
  - status (VARCHAR)  -- 'open', 'answered', 'ongoing', 'closed'
  - prayer_count (INTEGER)
  - created_at (TIMESTAMP)
  - updated_at (TIMESTAMP)
```

**Purpose**: Share prayer requests and track community intercession.

**Privacy**: Support for anonymous and private requests.

### 9. Prayer Interactions

Track who has prayed for each request.

```sql
prayer_interactions
  - prayer_request_id (UUID, FK to prayer_requests)
  - user_id (UUID, FK to profiles)
  - prayed_at (TIMESTAMP)
  - PRIMARY KEY (prayer_request_id, user_id)
```

**Purpose**: Count prayers and show community support.

### 10. Prayer Updates

Updates on prayer requests (e.g., "God answered!").

```sql
prayer_updates
  - id (UUID, PK)
  - prayer_request_id (UUID, FK to prayer_requests)
  - author_id (UUID, FK to profiles)
  - content (TEXT)
  - created_at (TIMESTAMP)
```

**Purpose**: Share testimonies and updates on prayers.

## Moderation Tables

### 11. Content Reports

User-submitted reports of guideline violations.

```sql
content_reports
  - id (UUID, PK)
  - reporter_id (UUID, FK to profiles)
  - content_type (VARCHAR)  -- 'post', 'comment', 'project', 'profile'
  - content_id (UUID)       -- Polymorphic reference
  - reason (VARCHAR)
  - description (TEXT)
  - status (VARCHAR)  -- 'pending', 'reviewing', 'resolved', 'dismissed'
  - resolved_by (UUID, FK to profiles)
  - resolution_notes (TEXT)
  - resolved_at (TIMESTAMP)
  - created_at (TIMESTAMP)
```

**Purpose**: Allow community to report violations.

**Polymorphic**: `content_type` + `content_id` reference different content types.

### 12. Moderation Log

Audit trail of all moderation actions.

```sql
moderation_log
  - id (UUID, PK)
  - moderator_id (UUID, FK to profiles)
  - action (VARCHAR)      -- 'warn', 'suspend', 'ban', 'approve', 'remove'
  - target_type (VARCHAR) -- 'user', 'post', 'comment', etc.
  - target_id (UUID)
  - reason (TEXT)
  - notes (TEXT)
  - created_at (TIMESTAMP)
```

**Purpose**: Accountability and transparency for moderation.

### 13. User Moderation

Warnings, suspensions, and bans.

```sql
user_moderation
  - id (UUID, PK)
  - user_id (UUID, FK to profiles)
  - moderator_id (UUID, FK to profiles)
  - action (VARCHAR)  -- 'warning', 'suspension', 'ban'
  - reason (TEXT)
  - notes (TEXT)
  - suspended_until (TIMESTAMP, nullable)
  - created_at (TIMESTAMP)
```

**Purpose**: Track user-level moderation actions.

## Supporting Tables

### 14. Newsletter Subscribers

Email list for newsletter.

```sql
newsletter_subscribers
  - id (UUID, PK)
  - email (VARCHAR, UNIQUE)
  - is_subscribed (BOOLEAN)
  - subscribed_at (TIMESTAMP)
  - unsubscribed_at (TIMESTAMP)
```

**Purpose**: Manage newsletter subscriptions (integrate with ConvertKit or similar).

## Entity Relationship Diagram

```
profiles
  ├─< posts (author_id)
  │   └─< comments (post_id)
  ├─< blog_posts (author_id)
  ├─< projects (creator_id)
  │   └─< project_collaborators (project_id, user_id)
  ├─< prayer_requests (author_id)
  │   ├─< prayer_interactions (prayer_request_id, user_id)
  │   └─< prayer_updates (prayer_request_id, author_id)
  ├─< content_reports (reporter_id, resolved_by)
  ├─< moderation_log (moderator_id)
  └─< user_moderation (user_id, moderator_id)

discussion_categories
  └─< posts (category_id)
```

## Row-Level Security (RLS)

Supabase RLS policies enforce access control at the database level.

### Profiles
- **SELECT**: Public profiles visible to all; private profiles only to owner
- **UPDATE**: Users can only update their own profile

### Posts
- **SELECT**: Only approved posts visible publicly
- **INSERT/UPDATE/DELETE**: Users can manage their own posts

### Comments
- **SELECT**: Only approved comments visible
- **INSERT/UPDATE/DELETE**: Users can manage their own comments

### Blog Posts
- **SELECT**: Only published posts visible publicly
- **INSERT/UPDATE**: Authors can create/edit their own posts

### Projects
- **SELECT**: Only approved projects visible
- **INSERT/UPDATE**: Creators can manage their own projects

### Prayer Requests
- **SELECT**: Public requests visible to all; private requests only to author and moderators
- **INSERT/UPDATE**: Users can manage their own requests

**Admin/Moderator Override**: Policies include checks for admin/moderator roles to bypass restrictions.

## Indexes

Performance indexes on frequently queried columns:

- **profiles**: `username`, `role`
- **posts**: `author_id`, `category_id`, `moderation_status`, `created_at`, `tags` (GIN)
- **comments**: `post_id`, `author_id`, `parent_comment_id`
- **blog_posts**: `slug`, `author_id`, `is_published + published_at`, `tags` (GIN)
- **projects**: `creator_id`, `slug`, `status`, `tags` (GIN)
- **prayer_requests**: `author_id`, `status`, `created_at`

**GIN Indexes**: Used for array columns (`tags`, `spiritual_gifts`, etc.) for fast containment queries.

## Triggers

### 1. Auto-Update `updated_at`

Trigger on all tables to automatically update `updated_at` timestamp on row modification.

### 2. Increment/Decrement Comment Count

Automatically maintain `comment_count` on posts table when comments are added or removed.

## Design Decisions

### Why UUIDs?

- **Security**: Non-sequential IDs prevent enumeration attacks
- **Scalability**: Can generate IDs client-side or in distributed systems
- **Merge-Friendly**: No ID conflicts when merging data from different sources

### Why TEXT[] Arrays?

- **Simplicity**: Avoid join tables for simple lists (tags, skills)
- **Performance**: Fast queries with GIN indexes
- **Flexibility**: Easy to add/remove items

### Why Separate `content` and `content_html`?

- Store original markdown for editing
- Pre-render HTML for fast display
- Allows format changes without re-parsing content

### Why Polymorphic `content_reports`?

- Single table for reports across different content types
- Simpler moderation workflow
- Could be normalized if needed for complex queries

## Migrations

Future schema changes will be managed via migration files in `packages/database/migrations/`.

**Migration Tool**: Supabase CLI or custom migration scripts.

## Backup and Recovery

- **Supabase**: Automatic daily backups (retained for 7-30 days depending on plan)
- **Manual Exports**: Regular exports for long-term archival

## Future Enhancements (Phase 2+)

- **Full-Text Search**: Add `tsvector` columns for advanced search
- **Notifications**: Table for in-app notifications
- **Marketplace**: Tables for Charismaton marketplace (products, orders, reviews)
- **Events**: Table for community events and webinars
- **Messages**: Direct messaging between users

## Related Documents

- [Architecture Overview](architecture.md)
- [Setup Guide](setup-guide.md)
- [Schema SQL](../../packages/database/schema.sql)
