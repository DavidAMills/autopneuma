/**
 * React hooks for Auto Pneuma AI services.
 *
 * Provides convenient hooks for:
 * - Content moderation
 * - Scripture context
 * - Community tools
 */

import { useState } from 'react'
import {
  moderationApi,
  scriptureApi,
  communityToolsApi,
  ModerationResponse,
  ScriptureContextResponse,
  CommunityToolResponse,
} from './client'

/**
 * Hook for content moderation
 */
export function useModeration() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const moderate = async (params: {
    content: string
    content_type: 'post' | 'comment' | 'prayer_request' | 'project'
    content_id?: string
    author_id?: string
  }): Promise<ModerationResponse | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await moderationApi.moderateContent(params)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Moderation failed'
      setError(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    moderate,
    isLoading,
    error,
  }
}

/**
 * Hook for Scripture context
 */
export function useScripture() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getContext = async (params: {
    query: string
    context?: string
    content_type?: 'discussion' | 'prayer_request' | 'project' | 'general'
    bible_version?: string
  }): Promise<ScriptureContextResponse | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await scriptureApi.getContext(params)
      return result
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to get Scripture context'
      setError(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    getContext,
    isLoading,
    error,
  }
}

/**
 * Hook for executing community tools
 */
export function useCommunityTool() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const executeTool = async (params: {
    tool_id: string
    input_data: Record<string, any>
    user_id: string
  }): Promise<CommunityToolResponse | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await communityToolsApi.executeTool(params)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Tool execution failed'
      setError(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    executeTool,
    isLoading,
    error,
  }
}

/**
 * Example usage in a component:
 *
 * ```tsx
 * function MyComponent() {
 *   const { moderate, isLoading, error } = useModeration()
 *
 *   const handleSubmit = async (content: string) => {
 *     const result = await moderate({
 *       content,
 *       content_type: 'post',
 *     })
 *
 *     if (result?.flagged) {
 *       // Show warning to user
 *       console.log('Content flagged:', result.reasoning)
 *     }
 *   }
 *
 *   return (
 *     <button onClick={() => handleSubmit('test')} disabled={isLoading}>
 *       Submit
 *     </button>
 *   )
 * }
 * ```
 */
