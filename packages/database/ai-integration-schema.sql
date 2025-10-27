-- ============================================================================
-- AI INTEGRATION LAYER - ADDITIONAL SCHEMA
-- Auto Pneuma Database Extensions for AI Services
-- ============================================================================

-- This file extends the base schema with tables for AI services:
-- - Community AI Tools
-- - Tool Executions (logging and analytics)
-- - Moderation Log (AI-flagged content)

-- ============================================================================
-- COMMUNITY AI TOOLS
-- ============================================================================

CREATE TABLE community_tools (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  creator_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,

  -- Tool Details
  tool_name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) CHECK (category IN ('scripture-study', 'prayer', 'education', 'ethics', 'moderation', 'other')),

  -- API Configuration
  api_endpoint TEXT NOT NULL,
  authentication_method VARCHAR(20) DEFAULT 'api_key' CHECK (authentication_method IN ('api_key', 'oauth', 'none')),
  input_schema JSONB NOT NULL,  -- JSON Schema for inputs
  output_schema JSONB NOT NULL, -- JSON Schema for outputs

  -- Rate Limiting
  rate_limit INTEGER DEFAULT 100, -- Requests per hour per user

  -- Kingdom Purpose
  spiritual_application TEXT NOT NULL,

  -- Approval and Status
  requires_approval BOOLEAN DEFAULT TRUE,
  status VARCHAR(20) DEFAULT 'pending_approval' CHECK (status IN ('pending_approval', 'active', 'suspended', 'deprecated')),
  approved_by UUID REFERENCES profiles(id),
  approved_at TIMESTAMP WITH TIME ZONE,

  -- Performance Metrics
  total_executions INTEGER DEFAULT 0,
  success_rate FLOAT DEFAULT 1.0 CHECK (success_rate >= 0 AND success_rate <= 1),
  average_execution_time_ms FLOAT DEFAULT 0.0,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX idx_community_tools_status ON community_tools(status);
CREATE INDEX idx_community_tools_category ON community_tools(category);
CREATE INDEX idx_community_tools_creator ON community_tools(creator_id);
CREATE INDEX idx_community_tools_project ON community_tools(project_id);

-- ============================================================================
-- TOOL EXECUTIONS (Logging and Analytics)
-- ============================================================================

CREATE TABLE tool_executions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tool_id UUID REFERENCES community_tools(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,

  -- Execution Details
  input_data JSONB,
  output_data JSONB,
  execution_time_ms FLOAT NOT NULL,
  success BOOLEAN DEFAULT TRUE,
  error_message TEXT,

  -- Timestamp
  executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for rate limiting queries
CREATE INDEX idx_tool_executions_tool_user_time ON tool_executions(tool_id, user_id, executed_at DESC);
CREATE INDEX idx_tool_executions_tool_time ON tool_executions(tool_id, executed_at DESC);

-- ============================================================================
-- MODERATION LOG ENHANCEMENT
-- ============================================================================

-- Extend existing moderation_log table to include AI-flagged content
-- (Assuming moderation_log already exists from base schema)

-- Add AI-specific columns if not present
ALTER TABLE moderation_log ADD COLUMN IF NOT EXISTS flagged_by VARCHAR(50) DEFAULT 'user';
ALTER TABLE moderation_log ADD COLUMN IF NOT EXISTS ai_details JSONB;

-- The ai_details JSONB field stores:
-- {
--   "flags": [...],
--   "overall_score": 0.75,
--   "reasoning": "...",
--   "recommendation": "flag_for_review"
-- }

-- Index for AI-flagged content
CREATE INDEX IF NOT EXISTS idx_moderation_log_flagged_by ON moderation_log(flagged_by);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS
ALTER TABLE community_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_executions ENABLE ROW LEVEL SECURITY;

-- Community Tools Policies

-- Anyone can view active tools
CREATE POLICY "Anyone can view active community tools"
  ON community_tools FOR SELECT
  USING (status = 'active');

-- Creators can view their own tools regardless of status
CREATE POLICY "Creators can view their own tools"
  ON community_tools FOR SELECT
  USING (auth.uid() = creator_id);

-- Only creators can insert tools
CREATE POLICY "Creators can register tools"
  ON community_tools FOR INSERT
  WITH CHECK (auth.uid() = creator_id);

-- Only creators can update their own tools
CREATE POLICY "Creators can update their own tools"
  ON community_tools FOR UPDATE
  USING (auth.uid() = creator_id);

-- Admins can update any tool (for approval)
CREATE POLICY "Admins can update any tool"
  ON community_tools FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Tool Executions Policies

-- Users can view their own executions
CREATE POLICY "Users can view their own tool executions"
  ON tool_executions FOR SELECT
  USING (auth.uid() = user_id);

-- Tool creators can view executions of their tools
CREATE POLICY "Tool creators can view executions"
  ON tool_executions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM community_tools
      WHERE id = tool_id AND creator_id = auth.uid()
    )
  );

-- Anyone can insert tool executions (via API with proper auth)
CREATE POLICY "Anyone can execute tools"
  ON tool_executions FOR INSERT
  WITH CHECK (true);

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Function to update community_tools.updated_at
CREATE OR REPLACE FUNCTION update_community_tools_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for community_tools
CREATE TRIGGER update_community_tools_timestamp
  BEFORE UPDATE ON community_tools
  FOR EACH ROW
  EXECUTE FUNCTION update_community_tools_updated_at();

-- ============================================================================
-- SAMPLE DATA FOR DEVELOPMENT (Optional)
-- ============================================================================

-- Insert sample tool categories and initial data can be added here
-- This is useful for testing the Community Tools feature

-- Example:
-- INSERT INTO community_tools (
--   creator_id,
--   project_id,
--   tool_name,
--   description,
--   category,
--   api_endpoint,
--   input_schema,
--   output_schema,
--   spiritual_application,
--   status
-- ) VALUES (
--   'sample_user_id',
--   'sample_project_id',
--   'Scripture Cross-Reference Finder',
--   'Finds related passages for any Bible verse',
--   'scripture-study',
--   'https://api.example.com/cross-refs',
--   '{"type": "object", "properties": {"verse": {"type": "string"}}}',
--   '{"type": "object", "properties": {"references": {"type": "array"}}}',
--   'Helps believers study Scripture in context with related passages',
--   'active'
-- );

-- ============================================================================
-- NOTES
-- ============================================================================

-- 1. This schema extends the base Auto Pneuma schema
-- 2. Apply this AFTER applying the base schema.sql
-- 3. Moderation log extensions assume the table already exists
-- 4. RLS policies ensure proper access control
-- 5. Indexes optimize for common query patterns (rate limiting, analytics)
