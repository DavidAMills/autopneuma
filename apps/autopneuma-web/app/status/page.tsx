import { Metadata } from 'next'
import { CheckCircle, XCircle, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'System Status | Auto Pneuma',
  description: 'Auto Pneuma platform status and health checks',
}

// Get build info from environment or defaults
const BUILD_SHA = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 'local'
const BUILD_TIME = process.env.NEXT_PUBLIC_BUILD_TIME || new Date().toISOString()

async function checkAPIHealth() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!apiUrl) return { status: 'unknown', message: 'API URL not configured' }

    const response = await fetch(`${apiUrl}/health`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    })

    if (response.ok) {
      const data = await response.json()
      return {
        status: 'healthy',
        message: data.service || 'API is healthy',
        version: data.version,
      }
    }

    return { status: 'degraded', message: `HTTP ${response.status}` }
  } catch (error) {
    return {
      status: 'down',
      message: error instanceof Error ? error.message : 'Failed to connect',
    }
  }
}

async function checkSupabase() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!supabaseUrl) return { status: 'unknown', message: 'Supabase URL not configured' }

    // Simple ping to Supabase REST endpoint
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      },
      next: { revalidate: 60 },
    })

    if (response.ok || response.status === 400) {
      // 400 is expected for base endpoint
      return { status: 'healthy', message: 'Database is accessible' }
    }

    return { status: 'degraded', message: `HTTP ${response.status}` }
  } catch (error) {
    return {
      status: 'down',
      message: error instanceof Error ? error.message : 'Failed to connect',
    }
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'healthy':
      return <CheckCircle className="h-6 w-6 text-green-600" />
    case 'degraded':
      return <Clock className="h-6 w-6 text-yellow-600" />
    case 'down':
      return <XCircle className="h-6 w-6 text-red-600" />
    default:
      return <Clock className="h-6 w-6 text-gray-400" />
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'healthy':
      return 'bg-green-50 border-green-200 text-green-900'
    case 'degraded':
      return 'bg-yellow-50 border-yellow-200 text-yellow-900'
    case 'down':
      return 'bg-red-50 border-red-200 text-red-900'
    default:
      return 'bg-gray-50 border-gray-200 text-gray-900'
  }
}

export default async function StatusPage() {
  const [apiHealth, supabaseHealth] = await Promise.all([
    checkAPIHealth(),
    checkSupabase(),
  ])

  // Determine overall status
  const allHealthy =
    apiHealth.status === 'healthy' && supabaseHealth.status === 'healthy'
  const anyDown = apiHealth.status === 'down' || supabaseHealth.status === 'down'

  const overallStatus = anyDown ? 'degraded' : allHealthy ? 'healthy' : 'degraded'

  return (
    <div className="min-h-screen bg-gradient-to-b from-beige/20 to-white py-12">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">System Status</h1>
          <p className="text-muted-foreground">
            Real-time status of Auto Pneuma services
          </p>
        </div>

        {/* Overall Status */}
        <div
          className={`rounded-lg border-2 p-6 mb-8 ${getStatusColor(overallStatus)}`}
        >
          <div className="flex items-center gap-4">
            {getStatusIcon(overallStatus)}
            <div>
              <h2 className="text-2xl font-semibold">
                {overallStatus === 'healthy'
                  ? 'All Systems Operational'
                  : overallStatus === 'degraded'
                  ? 'Some Services Degraded'
                  : 'System Issues Detected'}
              </h2>
              <p className="text-sm opacity-80 mt-1">
                Last checked: {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Service Status Cards */}
        <div className="space-y-4 mb-8">
          {/* Frontend */}
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold">Frontend (Next.js)</h3>
                  <p className="text-sm text-muted-foreground">
                    You're viewing this page, so the frontend is operational
                  </p>
                  <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                    <div>Build: {BUILD_SHA}</div>
                    <div>Deployed: {new Date(BUILD_TIME).toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                Healthy
              </span>
            </div>
          </div>

          {/* API */}
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                {getStatusIcon(apiHealth.status)}
                <div>
                  <h3 className="text-lg font-semibold">
                    API (FastAPI Backend)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {apiHealth.message}
                  </p>
                  {apiHealth.version && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      Version: {apiHealth.version}
                    </div>
                  )}
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  apiHealth.status === 'healthy'
                    ? 'bg-green-100 text-green-800'
                    : apiHealth.status === 'degraded'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {apiHealth.status.charAt(0).toUpperCase() +
                  apiHealth.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Database */}
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                {getStatusIcon(supabaseHealth.status)}
                <div>
                  <h3 className="text-lg font-semibold">
                    Database (Supabase)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {supabaseHealth.message}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  supabaseHealth.status === 'healthy'
                    ? 'bg-green-100 text-green-800'
                    : supabaseHealth.status === 'degraded'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {supabaseHealth.status.charAt(0).toUpperCase() +
                  supabaseHealth.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-3">Service Information</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Environment:</span>
              <span className="font-medium">
                {process.env.NODE_ENV === 'production' ? 'Production' : 'Development'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Region:</span>
              <span className="font-medium">Auto-detected</span>
            </div>
            <div className="flex justify-between">
              <span>Status Updates:</span>
              <span className="font-medium">Every 60 seconds</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            If you're experiencing issues,{' '}
            <a href="/community/beta-feedback" className="text-navy underline">
              report them here
            </a>
          </p>
          <p className="mt-2">
            Page will auto-refresh status checks every 60 seconds
          </p>
        </div>
      </div>
    </div>
  )
}
