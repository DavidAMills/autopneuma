import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Plus, Clock, Users, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Prayer Requests | Auto Pneuma',
  description:
    'Share prayer requests and intercede for fellow believers in the Auto Pneuma community.',
}

// Placeholder data - will come from Supabase
const PRAYER_REQUESTS = [
  {
    id: '1',
    title: 'Guidance on AI Ethics Project',
    content:
      "I'm working on an AI project for healthcare and facing ethical dilemmas about data privacy. Praying for wisdom and discernment to honor God in these decisions.",
    author: {
      name: 'Sarah Chen',
      username: 'sarah_c',
      is_anonymous: false,
    },
    category: 'project',
    status: 'open',
    prayer_count: 12,
    created_at: new Date(Date.now() - 3600000).toISOString(),
    updated_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '2',
    title: 'Strength During Job Search',
    content:
      "Been searching for a software engineering role for 3 months. Trusting God's timing but would appreciate prayers for peace and provision.",
    author: {
      name: 'Anonymous',
      username: 'user_anon',
      is_anonymous: true,
    },
    category: 'personal',
    status: 'ongoing',
    prayer_count: 28,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 43200000).toISOString(),
  },
  {
    id: '3',
    title: 'Thanksgiving - Project Launched Successfully!',
    content:
      'Praising God! Our Christian education platform launched last week and we already have 500+ users. Thank you all who prayed for this project over the past year.',
    author: {
      name: 'David Martinez',
      username: 'dmart',
      is_anonymous: false,
    },
    category: 'project',
    status: 'answered',
    prayer_count: 45,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '4',
    title: 'Wisdom for Team Leadership',
    content:
      "Just promoted to lead an engineering team. Praying for wisdom to lead with humility and grace, and to be a light for Christ in the workplace.",
    author: {
      name: 'Rachel Kim',
      username: 'rachelk',
      is_anonymous: false,
    },
    category: 'personal',
    status: 'open',
    prayer_count: 19,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '5',
    title: 'Community Growth and Unity',
    content:
      'Praying for Auto Pneuma - that this community would be a place of genuine fellowship, where believers encourage one another and build technology for the Kingdom.',
    author: {
      name: 'Admin',
      username: 'admin',
      is_anonymous: false,
    },
    category: 'community',
    status: 'ongoing',
    prayer_count: 67,
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: '6',
    title: 'Peace in Uncertain Times',
    content:
      'With all the rapid changes in AI and technology, praying for believers to have peace and wisdom. That we would trust God's sovereignty over innovation.',
    author: {
      name: 'Michael Torres',
      username: 'mtorres',
      is_anonymous: false,
    },
    category: 'world',
    status: 'ongoing',
    prayer_count: 34,
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
]

const CATEGORY_INFO = {
  personal: {
    label: 'Personal',
    color: 'bg-blue-100 text-blue-800',
    description: 'Personal matters and daily walk',
  },
  community: {
    label: 'Community',
    color: 'bg-purple-100 text-purple-800',
    description: 'Auto Pneuma community needs',
  },
  project: {
    label: 'Project',
    color: 'bg-green-100 text-green-800',
    description: 'Technical projects and work',
  },
  world: {
    label: 'World',
    color: 'bg-orange-100 text-orange-800',
    description: 'Global church and world events',
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

function timeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`
  return date.toLocaleDateString()
}

export default function PrayerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <section className="py-12 bg-gradient-to-b from-beige/30 to-white border-b">
        <div className="container max-w-6xl">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">Prayer Requests</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                "The prayer of a righteous person is powerful and effective." —
                James 5:16
              </p>
            </div>
            <Link href="/prayer/new">
              <Button size="lg">
                <Plus className="mr-2 h-4 w-4" />
                Share Request
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 bg-white border-b sticky top-0 z-10">
        <div className="container max-w-6xl">
          <div className="flex items-center gap-2 overflow-x-auto">
            <Button variant="default" size="sm">
              All Requests
            </Button>
            <Button variant="outline" size="sm">
              Open
            </Button>
            <Button variant="outline" size="sm">
              Ongoing
            </Button>
            <Button variant="outline" size="sm">
              Answered
            </Button>
            <span className="mx-2 text-muted-foreground">|</span>
            {Object.entries(CATEGORY_INFO).map(([key, info]) => (
              <Button key={key} variant="outline" size="sm">
                {info.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Prayer Requests List */}
      <section className="py-8 bg-gradient-to-b from-white to-beige/10 flex-1">
        <div className="container max-w-6xl">
          <div className="space-y-4">
            {PRAYER_REQUESTS.map((request) => {
              const StatusIcon =
                STATUS_INFO[request.status as keyof typeof STATUS_INFO].icon
              const categoryInfo =
                CATEGORY_INFO[request.category as keyof typeof CATEGORY_INFO]

              return (
                <Link
                  key={request.id}
                  href={`/prayer/${request.id}`}
                  className="block"
                >
                  <article className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        {/* Title and Category */}
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <h2 className="text-xl font-semibold hover:text-navy transition-colors">
                            {request.title}
                          </h2>
                          <Badge
                            variant="secondary"
                            className={categoryInfo.color}
                          >
                            {categoryInfo.label}
                          </Badge>
                        </div>

                        {/* Content Preview */}
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {request.content}
                        </p>

                        {/* Metadata */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                          <div className="flex items-center gap-2">
                            <StatusIcon
                              className={`h-4 w-4 ${
                                STATUS_INFO[
                                  request.status as keyof typeof STATUS_INFO
                                ].color
                              }`}
                            />
                            <span>
                              {
                                STATUS_INFO[
                                  request.status as keyof typeof STATUS_INFO
                                ].label
                              }
                            </span>
                          </div>
                          <span>·</span>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>
                              {request.prayer_count}{' '}
                              {request.prayer_count === 1
                                ? 'person'
                                : 'people'}{' '}
                              prayed
                            </span>
                          </div>
                          <span>·</span>
                          <span>
                            by {request.author.name} · {timeAgo(request.created_at)}
                          </span>
                        </div>
                      </div>

                      {/* Prayer Count Badge */}
                      <div className="flex-shrink-0 text-center">
                        <div className="rounded-full bg-navy/5 p-4">
                          <Heart className="h-6 w-6 text-navy" />
                        </div>
                        <div className="text-sm font-medium mt-2 text-navy">
                          {request.prayer_count}
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>

          {/* Empty State would go here if no requests */}
          {PRAYER_REQUESTS.length === 0 && (
            <div className="text-center py-16">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h2 className="text-2xl font-semibold mb-2">
                No prayer requests yet
              </h2>
              <p className="text-muted-foreground mb-6">
                Be the first to share a prayer request with the community.
              </p>
              <Link href="/prayer/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Share Request
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-navy text-white">
        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">How It Works</h3>
              <p className="text-white/80 text-sm">
                Share your prayer needs with the community, and pray for others.
                Together we bear one another's burdens.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Privacy Options</h3>
              <p className="text-white/80 text-sm">
                Choose to post anonymously or keep requests private for the
                prayer team only.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Share Testimonies</h3>
              <p className="text-white/80 text-sm">
                When God answers, update your request to encourage the
                community and give Him glory.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
