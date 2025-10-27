import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, MessageSquare, Users, Heart } from 'lucide-react'
import { DiscussionCategories } from '@/components/community/discussion-categories'
import { RecentPosts } from '@/components/community/recent-posts'

export const metadata: Metadata = {
  title: 'Community | Auto Pneuma',
  description: 'Join discussions on faith, AI ethics, and technology',
}

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-beige/30 to-white border-b">
        <div className="container max-w-6xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Community</h1>
              <p className="text-lg text-muted-foreground">
                Join discussions on faith, AI ethics, and building technology for
                the Kingdom
              </p>
            </div>
            <Link href="/community/new">
              <Button size="lg">
                <Plus className="mr-2 h-4 w-4" />
                New Discussion
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-2xl">
            <div className="text-center">
              <div className="text-2xl font-bold text-navy">0</div>
              <div className="text-sm text-muted-foreground">Discussions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-navy">0</div>
              <div className="text-sm text-muted-foreground">Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-navy">0</div>
              <div className="text-sm text-muted-foreground">Comments</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="container max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Column - Recent Posts */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Recent Discussions</h2>
                <RecentPosts />
              </div>
            </div>

            {/* Sidebar - Categories & Info */}
            <div className="space-y-6">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <DiscussionCategories />
              </div>

              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Community Guidelines
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our discussions are guided by the Fruits of the Spirit: love,
                  joy, peace, patience, kindness, goodness, faithfulness,
                  gentleness, and self-control.
                </p>
                <Link href="/community/guidelines">
                  <Button variant="outline" size="sm" className="w-full">
                    Read Guidelines
                  </Button>
                </Link>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <div className="space-y-2 text-sm">
                  <Link
                    href="/prayer"
                    className="flex items-center text-muted-foreground hover:text-foreground"
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Prayer Requests
                  </Link>
                  <Link
                    href="/projects"
                    className="flex items-center text-muted-foreground hover:text-foreground"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Project Showcase
                  </Link>
                  <Link
                    href="/blog"
                    className="flex items-center text-muted-foreground hover:text-foreground"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Blog
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Message for New Users */}
      <section className="py-12 bg-beige/20">
        <div className="container max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome to the Community!</h2>
          <p className="text-muted-foreground mb-6">
            We're here to build a Christian community that supports and spreads
            the Gospel for the glory of our Lord — creating and growing the
            community of Christ through our many gifts, which share the love and
            grace of the same eternal Spirit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about">
              <Button variant="outline">Learn More About Us</Button>
            </Link>
            <Link href="/faith">
              <Button variant="outline">Our Statement of Faith</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
