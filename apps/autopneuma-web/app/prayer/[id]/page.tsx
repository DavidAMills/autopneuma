import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Clock, Users, CheckCircle, Heart } from 'lucide-react'
import { PrayButton } from '@/components/prayer/pray-button'
import { PrayerUpdates } from '@/components/prayer/prayer-updates'

// This would come from Supabase in production
const PRAYER_REQUESTS = [
  {
    id: '1',
    title: 'Guidance on AI Ethics Project',
    content:
      "I'm working on an AI project for healthcare and facing ethical dilemmas about data privacy. Praying for wisdom and discernment to honor God in these decisions.\n\nThe project involves patient data and predictive algorithms, and I want to ensure we're stewarding this information responsibly. There are pressures from stakeholders to prioritize speed over thoroughness in our ethical reviews.\n\nSpecifically praying for:\n- Wisdom to navigate complex ethical questions\n- Courage to speak up when needed\n- Peace in the midst of pressure\n- God's guidance on the right path forward",
    author: {
      id: 'user1',
      name: 'Sarah Chen',
      username: 'sarah_c',
      bio: 'Healthcare AI engineer passionate about ethical technology',
      spiritual_gifts: ['Wisdom', 'Discernment'],
      focus_areas: ['ai-ethics', 'healthcare-tech'],
      is_anonymous: false,
    },
    category: 'project',
    status: 'open',
    prayer_count: 12,
    is_private: false,
    created_at: new Date(Date.now() - 3600000).toISOString(),
    updated_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '2',
    title: 'Strength During Job Search',
    content:
      'Been searching for a software engineering role for 3 months. Trusting God's timing but would appreciate prayers for peace and provision.',
    author: {
      id: 'user_anon',
      name: 'Anonymous',
      username: 'user_anon',
      is_anonymous: true,
    },
    category: 'personal',
    status: 'ongoing',
    prayer_count: 28,
    is_private: false,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 43200000).toISOString(),
  },
  {
    id: '3',
    title: 'Thanksgiving - Project Launched Successfully!',
    content:
      'Praising God! Our Christian education platform launched last week and we already have 500+ users. Thank you all who prayed for this project over the past year.',
    author: {
      id: 'user3',
      name: 'David Martinez',
      username: 'dmart',
      bio: 'Full-stack developer building for the Kingdom',
      spiritual_gifts: ['Service', 'Administration'],
      focus_areas: ['web-development', 'education-tech'],
      is_anonymous: false,
    },
    category: 'project',
    status: 'answered',
    prayer_count: 45,
    is_private: false,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
]

const PRAYER_UPDATES_DATA = [
  {
    id: '1',
    prayer_request_id: '3',
    author: {
      name: 'David Martinez',
      username: 'dmart',
    },
    content:
      'Update: We hit 1,000 users today! Even more exciting - received messages from 3 families saying the platform helped their kids understand Scripture better. To God be the glory!',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '2',
    prayer_request_id: '3',
    author: {
      name: 'David Martinez',
      username: 'dmart',
    },
    content:
      'Launch day was yesterday! Everything went smoothly despite some last-minute technical challenges. Grateful for all your prayers over this journey.',
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
]

const CATEGORY_INFO = {
  personal: {
    label: 'Personal',
    color: 'bg-blue-100 text-blue-800',
  },
  community: {
    label: 'Community',
    color: 'bg-purple-100 text-purple-800',
  },
  project: {
    label: 'Project',
    color: 'bg-green-100 text-green-800',
  },
  world: {
    label: 'World',
    color: 'bg-orange-100 text-orange-800',
  },
}

const STATUS_INFO = {
  open: {
    label: 'Open',
    icon: Heart,
    color: 'text-navy',
  },
  ongoing: {
    label: 'Ongoing',
    icon: Clock,
    color: 'text-blue-600',
  },
  answered: {
    label: 'Answered',
    icon: CheckCircle,
    color: 'text-green-600',
  },
  closed: {
    label: 'Closed',
    icon: CheckCircle,
    color: 'text-muted-foreground',
  },
}

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const request = PRAYER_REQUESTS.find((r) => r.id === params.id)

  if (!request) {
    return {
      title: 'Prayer Request Not Found | Auto Pneuma',
    }
  }

  return {
    title: `${request.title} | Prayer Requests`,
    description: request.content.slice(0, 160),
  }
}

export default function PrayerRequestDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const request = PRAYER_REQUESTS.find((r) => r.id === params.id)

  if (!request) {
    notFound()
  }

  const StatusIcon =
    STATUS_INFO[request.status as keyof typeof STATUS_INFO].icon
  const categoryInfo =
    CATEGORY_INFO[request.category as keyof typeof CATEGORY_INFO]

  // Get updates for this request
  const updates = PRAYER_UPDATES_DATA.filter(
    (u) => u.prayer_request_id === request.id
  )

  return (
    <div className="flex min-h-screen flex-col">
      {/* Back Navigation */}
      <section className="py-6 border-b bg-white">
        <div className="container max-w-4xl">
          <Link
            href="/prayer"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Prayer Requests
          </Link>
        </div>
      </section>

      {/* Prayer Request Header */}
      <section className="py-8 bg-gradient-to-b from-beige/30 to-white border-b">
        <div className="container max-w-4xl">
          <div className="flex items-start gap-3 mb-4 flex-wrap">
            <Badge variant="secondary" className={categoryInfo.color}>
              {categoryInfo.label}
            </Badge>
            <div
              className={`flex items-center gap-2 ${
                STATUS_INFO[request.status as keyof typeof STATUS_INFO].color
              }`}
            >
              <StatusIcon className="h-4 w-4" />
              <span className="text-sm font-medium">
                {STATUS_INFO[request.status as keyof typeof STATUS_INFO].label}
              </span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {request.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>
              by {request.author.name} ·{' '}
              {new Date(request.created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span>·</span>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>
                {request.prayer_count}{' '}
                {request.prayer_count === 1 ? 'person has' : 'people have'}{' '}
                prayed
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Request Content */}
      <section className="py-8 bg-white">
        <div className="container max-w-4xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Content */}
              <div className="prose prose-lg max-w-none">
                {request.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="mb-4 whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Prayer Updates */}
              {updates.length > 0 && (
                <PrayerUpdates updates={updates} requestStatus={request.status} />
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pray Button */}
              <div className="rounded-lg border bg-card p-6">
                <PrayButton
                  requestId={request.id}
                  initialPrayerCount={request.prayer_count}
                />
              </div>

              {/* Author Card - Only show if not anonymous */}
              {!request.author.is_anonymous && request.author.bio && (
                <div className="rounded-lg border bg-card p-6">
                  <h3 className="font-semibold mb-4">About the Author</h3>
                  <div className="space-y-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-navy/20 to-navy/10 flex items-center justify-center">
                      <span className="text-xl">👤</span>
                    </div>
                    <div>
                      <div className="font-semibold">{request.author.name}</div>
                      <div className="text-sm text-muted-foreground">
                        @{request.author.username}
                      </div>
                    </div>
                    <p className="text-sm">{request.author.bio}</p>

                    {request.author.spiritual_gifts &&
                      request.author.spiritual_gifts.length > 0 && (
                        <div>
                          <div className="text-xs font-medium text-muted-foreground mb-2">
                            Spiritual Gifts
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {request.author.spiritual_gifts.map((gift) => (
                              <Badge
                                key={gift}
                                variant="secondary"
                                className="text-xs"
                              >
                                {gift}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                    {request.author.focus_areas &&
                      request.author.focus_areas.length > 0 && (
                        <div>
                          <div className="text-xs font-medium text-muted-foreground mb-2">
                            Focus Areas
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {request.author.focus_areas.map((area) => (
                              <Badge
                                key={area}
                                variant="outline"
                                className="text-xs"
                              >
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              )}

              {/* Prayer Tips */}
              <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                <h3 className="font-medium text-sm text-blue-900 mb-2">
                  How to Pray
                </h3>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Read the request carefully</li>
                  <li>• Take a moment to pray right now</li>
                  <li>• Click "I Prayed" to encourage the author</li>
                  <li>• Consider setting a reminder to pray again</li>
                  <li>• Share words of encouragement if led</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
