import { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Blog | Auto Pneuma',
  description:
    'Insights on faith, AI ethics, and building technology for the Kingdom',
}

// Placeholder blog posts - will be replaced with Supabase data
const BLOG_POSTS = [
  {
    id: '1',
    title: 'The Same Spirit in Innovation',
    slug: 'the-same-spirit-in-innovation',
    excerpt:
      'Exploring how the Holy Spirit guides our technological work and unifies diverse gifts in the Body of Christ.',
    content: '',
    author: {
      name: 'Admin',
      username: 'admin',
    },
    featured_image_url: null,
    tags: ['theology', 'holy-spirit', 'community'],
    is_featured: true,
    published_at: new Date().toISOString(),
    read_time_minutes: 8,
  },
  {
    id: '2',
    title: 'AI and the Fruits of the Spirit',
    slug: 'ai-and-the-fruits-of-the-spirit',
    excerpt:
      'How can we build AI systems that reflect love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control?',
    content: '',
    author: {
      name: 'Admin',
      username: 'admin',
    },
    featured_image_url: null,
    tags: ['ai-ethics', 'galatians', 'character'],
    is_featured: false,
    published_at: new Date(Date.now() - 86400000).toISOString(),
    read_time_minutes: 10,
  },
  {
    id: '3',
    title: 'Building Technology as Worship',
    slug: 'building-technology-as-worship',
    excerpt:
      'Our work in AI and software development can be an act of worship when done for God\'s glory and human flourishing.',
    content: '',
    author: {
      name: 'Admin',
      username: 'admin',
    },
    featured_image_url: null,
    tags: ['worship', 'stewardship', 'calling'],
    is_featured: false,
    published_at: new Date(Date.now() - 172800000).toISOString(),
    read_time_minutes: 6,
  },
]

export default function BlogPage() {
  const featuredPost = BLOG_POSTS.find((post) => post.is_featured)
  const otherPosts = BLOG_POSTS.filter((post) => !post.is_featured)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <section className="py-12 bg-gradient-to-b from-beige/30 to-white border-b">
        <div className="container max-w-6xl">
          <h1 className="text-4xl font-bold mb-2">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Insights on faith, AI ethics, and building technology for the Kingdom
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 bg-white border-b">
          <div className="container max-w-6xl">
            <div className="mb-4">
              <Badge>Featured</Badge>
            </div>
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="aspect-video bg-gradient-to-br from-navy/10 to-navy/5 rounded-lg flex items-center justify-center">
                  <span className="text-4xl">📝</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-4 group-hover:text-navy transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-4">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span>By {featuredPost.author.name}</span>
                    <span>·</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{featuredPost.read_time_minutes} min read</span>
                    </div>
                    <span>·</span>
                    <span>
                      {new Date(featuredPost.published_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {featuredPost.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-12 bg-white">
        <div className="container max-w-6xl">
          <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>

          {otherPosts.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <p className="text-muted-foreground mb-4">
                No blog posts yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <article className="rounded-lg border bg-card hover:shadow-lg transition-shadow h-full flex flex-col">
                    <div className="aspect-video bg-gradient-to-br from-navy/10 to-navy/5 rounded-t-lg flex items-center justify-center">
                      <span className="text-3xl">📝</span>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-navy transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                          <span>{post.author.name}</span>
                          <span>·</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{post.read_time_minutes} min</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-beige/20">
        <div className="container max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4">Join the Conversation</h2>
          <p className="text-muted-foreground mb-6">
            Have thoughts on faith and technology? Join our community to discuss
            these topics and more.
          </p>
          <Link href="/community">
            <Button size="lg">
              Visit Community
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
