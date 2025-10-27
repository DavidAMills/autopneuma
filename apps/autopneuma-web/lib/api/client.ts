/**
 * API Client for Auto Pneuma FastAPI backend.
 *
 * Provides typed interfaces for all AI services:
 * - Content moderation
 * - Scripture context
 * - Community tools
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const API_V1_PREFIX = '/api/v1'

/**
 * Base fetch wrapper with error handling
 */
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${API_V1_PREFIX}${endpoint}`

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      detail: 'An error occurred',
    }))
    throw new Error(error.detail || `HTTP ${response.status}`)
  }

  return response.json()
}

/**
 * Moderation API Client
 */
export const moderationApi = {
  /**
   * Moderate content and get AI flags/recommendations
   */
  async moderateContent(params: {
    content: string
    content_type: 'post' | 'comment' | 'prayer_request' | 'project'
    content_id?: string
    author_id?: string
  }) {
    return apiFetch<ModerationResponse>('/moderation/moderate', {
      method: 'POST',
      body: JSON.stringify(params),
    })
  },

  /**
   * Health check for moderation service
   */
  async healthCheck() {
    return apiFetch<{ service: string; status: string }>('/moderation/health', {
      method: 'GET',
    })
  },
}

/**
 * Scripture Context API Client
 */
export const scriptureApi = {
  /**
   * Get biblical insights and context for a query
   */
  async getContext(params: {
    query: string
    context?: string
    content_type?: 'discussion' | 'prayer_request' | 'project' | 'general'
    bible_version?: string
  }) {
    return apiFetch<ScriptureContextResponse>('/scripture/context', {
      method: 'POST',
      body: JSON.stringify(params),
    })
  },

  /**
   * Health check for scripture service
   */
  async healthCheck() {
    return apiFetch<{ service: string; status: string }>('/scripture/health', {
      method: 'GET',
    })
  },
}

/**
 * Community Tools API Client
 */
export const communityToolsApi = {
  /**
   * List available community tools
   */
  async listTools(params?: {
    category?: string
    status?: string
    page?: number
    per_page?: number
  }) {
    const searchParams = new URLSearchParams()
    if (params?.category) searchParams.append('category', params.category)
    if (params?.status) searchParams.append('status', params.status)
    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.per_page) searchParams.append('per_page', params.per_page.toString())

    const query = searchParams.toString()
    const endpoint = query ? `/tools/list?${query}` : '/tools/list'

    return apiFetch<ToolListResponse>(endpoint, {
      method: 'GET',
    })
  },

  /**
   * Get details for a specific tool
   */
  async getTool(toolId: string) {
    return apiFetch<RegisteredTool>(`/tools/${toolId}`, {
      method: 'GET',
    })
  },

  /**
   * Register a new community tool
   */
  async registerTool(params: ToolRegistration & { creator_id: string }) {
    return apiFetch<RegisteredTool>('/tools/register', {
      method: 'POST',
      body: JSON.stringify(params),
    })
  },

  /**
   * Execute a community tool
   */
  async executeTool(params: {
    tool_id: string
    input_data: Record<string, any>
    user_id: string
  }) {
    return apiFetch<CommunityToolResponse>('/tools/execute', {
      method: 'POST',
      body: JSON.stringify(params),
    })
  },

  /**
   * Health check for community tools service
   */
  async healthCheck() {
    return apiFetch<{ service: string; status: string }>('/tools/health', {
      method: 'GET',
    })
  },
}

/**
 * Type Definitions
 */

export interface ModerationFlag {
  category: string
  confidence: number
  explanation: string
  severity: 'low' | 'medium' | 'high'
}

export interface ModerationResponse {
  flagged: boolean
  flags: ModerationFlag[]
  overall_score: number
  recommendation: 'approve' | 'flag_for_review' | 'flag_high_priority'
  reasoning: string
  timestamp: string
}

export interface ScriptureReference {
  book: string
  chapter: number
  verse_start: number
  verse_end: number | null
  text: string
  version: string
}

export interface ScriptureContextResponse {
  query: string
  summary: string
  biblical_principles: string[]
  scripture_references: ScriptureReference[]
  theological_insights: string
  practical_application: string
  further_study: string[]
  timestamp: string
}

export interface ToolRegistration {
  project_id: string
  tool_name: string
  description: string
  category: 'scripture-study' | 'prayer' | 'education' | 'ethics' | 'moderation' | 'other'
  api_endpoint: string
  authentication_method: 'api_key' | 'oauth' | 'none'
  input_schema: Record<string, any>
  output_schema: Record<string, any>
  rate_limit: number
  requires_approval: boolean
  spiritual_application: string
}

export interface RegisteredTool extends ToolRegistration {
  id: string
  creator_id: string
  status: 'pending_approval' | 'active' | 'suspended' | 'deprecated'
  total_executions: number
  success_rate: number
  average_execution_time_ms: number
  created_at: string
  updated_at: string
  approved_at: string | null
  approved_by: string | null
}

export interface CommunityToolResponse {
  tool_id: string
  success: boolean
  output_data: Record<string, any>
  execution_time_ms: number
  credits_used: number | null
  error_message: string | null
  timestamp: string
}

export interface ToolListResponse {
  tools: RegisteredTool[]
  total: number
  page: number
  per_page: number
}
