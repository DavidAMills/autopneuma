import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { BarChart3, Users, MessageSquare, Heart, Star, Zap, RefreshCw } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Admin Metrics | Auto Pneuma',
  description: 'Platform metrics and usage statistics',
}

// Revalidate every 5 minutes
export const revalidate = 300

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  trend?: string
}

function MetricCard({ title, value, subtitle, icon, trend }: MetricCardProps) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <p className="mt-2 text-xs text-green-600 font-medium">{trend}</p>
          )}
        </div>
        <div className="rounded-full bg-navy/10 p-3">{icon}</div>
      </div>
    </div>
  )
}

async function getMetrics() {
  const supabase = createServerClient()

  // Check if user is admin
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    redirect('/')
  }

  // Get current timestamp for calculations
  const now = new Date()
  const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  const last7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  try {
    // User signups
    const { count: totalUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })

    const { count: users24h } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', last24h.toISOString())

    const { count: users7d } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', last7d.toISOString())

    // Posts
    const { count: totalPosts } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })

    const { count: postsToday } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today.toISOString())

    // Comments
    const { count: totalComments } = await supabase
      .from('comments')
      .select('*', { count: 'exact', head: true })

    const { count: commentsToday } = await supabase
      .from('comments')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today.toISOString())

    // Prayer requests
    const { count: totalPrayers } = await supabase
      .from('prayer_requests')
      .select('*', { count: 'exact', head: true })

    const { count: prayersToday } = await supabase
      .from('prayer_requests')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today.toISOString())

    // Prayer interactions (I Prayed button clicks)
    const { count: totalPrayerInteractions } = await supabase
      .from('prayer_interactions')
      .select('*', { count: 'exact', head: true })

    const { count: prayerInteractionsToday } = await supabase
      .from('prayer_interactions')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today.toISOString())

    // Projects
    const { count: totalProjects } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })

    // Project stars (using project_members table with role='starred')
    const { count: totalStars } = await supabase
      .from('project_members')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'starred')

    // AI moderation calls (from moderation_log)
    const { count: totalModerationCalls } = await supabase
      .from('moderation_log')
      .select('*', { count: 'exact', head: true })

    const { count: moderationCallsToday } = await supabase
      .from('moderation_log')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today.toISOString())

    // Tool executions (scripture context and community tools)
    const { count: totalToolExecutions } = await supabase
      .from('tool_executions')
      .select('*', { count: 'exact', head: true })

    const { count: toolExecutionsToday } = await supabase
      .from('tool_executions')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today.toISOString())

    // Get average execution time for tool executions
    const { data: executionTimes } = await supabase
      .from('tool_executions')
      .select('execution_time_ms')
      .gte('created_at', last7d.toISOString())
      .not('execution_time_ms', 'is', null)

    const avgLatency = executionTimes && executionTimes.length > 0
      ? Math.round(
          executionTimes.reduce(
            (sum, item) => sum + (item.execution_time_ms || 0),
            0
          ) / executionTimes.length
        )
      : 0

    return {
      users: {
        total: totalUsers || 0,
        last24h: users24h || 0,
        last7d: users7d || 0,
      },
      content: {
        posts: { total: totalPosts || 0, today: postsToday || 0 },
        comments: { total: totalComments || 0, today: commentsToday || 0 },
        prayers: { total: totalPrayers || 0, today: prayersToday || 0 },
        prayerInteractions: {
          total: totalPrayerInteractions || 0,
          today: prayerInteractionsToday || 0,
        },
        projects: { total: totalProjects || 0 },
        stars: { total: totalStars || 0 },
      },
      ai: {
        moderationCalls: {
          total: totalModerationCalls || 0,
          today: moderationCallsToday || 0,
        },
        toolExecutions: {
          total: totalToolExecutions || 0,
          today: toolExecutionsToday || 0,
        },
        avgLatency,
      },
    }
  } catch (error) {
    console.error('Error fetching metrics:', error)
    // Return placeholder data if queries fail
    return {
      users: { total: 0, last24h: 0, last7d: 0 },
      content: {
        posts: { total: 0, today: 0 },
        comments: { total: 0, today: 0 },
        prayers: { total: 0, today: 0 },
        prayerInteractions: { total: 0, today: 0 },
        projects: { total: 0 },
        stars: { total: 0 },
      },
      ai: {
        moderationCalls: { total: 0, today: 0 },
        toolExecutions: { total: 0, today: 0 },
        avgLatency: 0,
      },
    }
  }
}

export default async function AdminMetricsPage() {
  const metrics = await getMetrics()
  const lastUpdated = new Date().toLocaleString()

  return (
    <div className="min-h-screen bg-gradient-to-b from-beige/20 to-white py-12">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Platform Metrics</h1>
            <p className="text-muted-foreground">
              Real-time statistics and usage insights
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <RefreshCw className="h-4 w-4" />
              <span>Auto-refreshes every 5 minutes</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>

        {/* User Signups Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Users className="h-6 w-6 text-navy" />
            User Signups
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              title="Last 24 Hours"
              value={metrics.users.last24h}
              icon={<Users className="h-6 w-6 text-navy" />}
            />
            <MetricCard
              title="Last 7 Days"
              value={metrics.users.last7d}
              icon={<Users className="h-6 w-6 text-navy" />}
            />
            <MetricCard
              title="Total Users"
              value={metrics.users.total}
              icon={<Users className="h-6 w-6 text-navy" />}
            />
          </div>
        </div>

        {/* Content Activity Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-navy" />
            Content Activity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MetricCard
              title="Discussion Posts"
              value={metrics.content.posts.total}
              subtitle={`${metrics.content.posts.today} today`}
              icon={<MessageSquare className="h-6 w-6 text-navy" />}
            />
            <MetricCard
              title="Comments"
              value={metrics.content.comments.total}
              subtitle={`${metrics.content.comments.today} today`}
              icon={<MessageSquare className="h-6 w-6 text-navy" />}
            />
            <MetricCard
              title="Prayer Requests"
              value={metrics.content.prayers.total}
              subtitle={`${metrics.content.prayers.today} today`}
              icon={<Heart className="h-6 w-6 text-navy" />}
            />
            <MetricCard
              title="Prayer Interactions"
              value={metrics.content.prayerInteractions.total}
              subtitle={`${metrics.content.prayerInteractions.today} today`}
              icon={<Heart className="h-6 w-6 text-navy" />}
            />
            <MetricCard
              title="Projects Showcased"
              value={metrics.content.projects.total}
              icon={<BarChart3 className="h-6 w-6 text-navy" />}
            />
            <MetricCard
              title="Project Stars"
              value={metrics.content.stars.total}
              icon={<Star className="h-6 w-6 text-navy" />}
            />
          </div>
        </div>

        {/* AI Services Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="h-6 w-6 text-navy" />
            AI Services Usage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              title="Moderation Calls"
              value={metrics.ai.moderationCalls.total}
              subtitle={`${metrics.ai.moderationCalls.today} today`}
              icon={<Zap className="h-6 w-6 text-navy" />}
            />
            <MetricCard
              title="Scripture Context & Tools"
              value={metrics.ai.toolExecutions.total}
              subtitle={`${metrics.ai.toolExecutions.today} today`}
              icon={<Zap className="h-6 w-6 text-navy" />}
            />
            <MetricCard
              title="Avg Response Time"
              value={`${metrics.ai.avgLatency}ms`}
              subtitle="Last 7 days"
              icon={<Zap className="h-6 w-6 text-navy" />}
            />
          </div>
        </div>

        {/* Summary Card */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-3">Quick Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Members:</span>
                <span className="font-medium">{metrics.users.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Posts:</span>
                <span className="font-medium">{metrics.content.posts.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Prayers:</span>
                <span className="font-medium">{metrics.content.prayers.total}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">AI Calls (Total):</span>
                <span className="font-medium">
                  {metrics.ai.moderationCalls.total + metrics.ai.toolExecutions.total}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">AI Calls (Today):</span>
                <span className="font-medium">
                  {metrics.ai.moderationCalls.today + metrics.ai.toolExecutions.today}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg Performance:</span>
                <span className="font-medium">{metrics.ai.avgLatency}ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Metrics are read-only and refresh automatically. For detailed logs,
            check Railway, Vercel, and Supabase dashboards.
          </p>
        </div>
      </div>
    </div>
  )
}
