import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Calendar, ArrowLeft, ArrowRight } from 'lucide-react'
import { MarkdownContent } from '@/components/blog/markdown-content'

// This would come from Supabase in production
const BLOG_POSTS = [
  {
    id: '1',
    title: 'The Same Spirit in Innovation',
    slug: 'the-same-spirit-in-innovation',
    excerpt:
      'Exploring how the Holy Spirit guides our technological work and unifies diverse gifts in the Body of Christ.',
    content: `# The Same Spirit in Innovation

"There are different kinds of gifts, but the same Spirit distributes them." — 1 Corinthians 12:4

## Introduction

In the rapidly evolving world of artificial intelligence and technology, Christians often wonder: How does our faith intersect with innovation? Is our work in AI simply secular labor, or can it be an expression of spiritual calling?

The answer lies in understanding the work of the Holy Spirit — the same Spirit who empowers, guides, and unifies believers across all areas of life, including technology.

## The Unity of the Spirit

Paul's words in 1 Corinthians 12 reveal a profound truth: the Holy Spirit is the source of all spiritual gifts, and He distributes them for the common good. This applies not just to traditional "spiritual" activities like preaching or teaching, but to all forms of service in the Body of Christ.

When a Christian developer writes code, designs algorithms, or trains AI models, they are using gifts given by the same Spirit who empowers pastors, teachers, and evangelists. There is no sacred-secular divide when our work is done for God's glory.

## Many Gifts, One Purpose

The beauty of the Body of Christ is its diversity. Some believers have gifts of teaching, others of encouragement, still others of service or administration. In our technological age, gifts like:

- **Problem-solving and logical thinking**
- **Creativity in design and user experience**
- **Stewardship of data and information**
- **Building systems that serve human flourishing**

These are all expressions of God's grace working through His people.

## The Spirit as Guide

Jesus promised that the Holy Spirit would "guide you into all truth" (John 16:13). This guidance extends to our technical work. As we build AI systems, we can pray for:

- **Wisdom** in ethical decision-making
- **Discernment** to recognize harmful applications
- **Creativity** to solve problems in ways that honor human dignity
- **Integrity** to pursue truth and reject deception

The Spirit who inspired Scripture is the same Spirit who can guide our algorithms to serve justice, mercy, and truth.

## Building for the Kingdom

When we recognize that our technological gifts come from the same Spirit, our work takes on new meaning. We're not just building products or advancing careers — we're participating in God's work of redemption and restoration.

Every line of code written with integrity, every AI system designed to serve human flourishing, every ethical decision made in the face of pressure — these are acts of worship when done for God's glory.

## Practical Application

How can we cultivate awareness of the Spirit's work in our innovation?

1. **Start with prayer** — Invite the Holy Spirit into your work each day
2. **Study Scripture** — Let biblical principles guide your technical decisions
3. **Seek community** — Connect with other believers in tech who share your values
4. **Practice discernment** — Ask whether your work serves love, justice, and truth
5. **Give glory to God** — Recognize that your gifts and talents are from Him

## Conclusion

The same Spirit who hovered over the waters at creation, who inspired the prophets, who raised Christ from the dead, and who empowers the Church today — this Spirit is at work in Christian technologists, developers, and AI practitioners.

Our innovation is not separate from our faith. It is an expression of it. When we build technology guided by the Spirit and grounded in Scripture, we participate in God's ongoing work in the world.

Let us embrace our calling with humility, excellence, and joy — recognizing that we serve the same Lord, empowered by the same Spirit, for the same eternal purpose: the glory of God and the flourishing of His creation.

---

*"Now to each one the manifestation of the Spirit is given for the common good." — 1 Corinthians 12:7*`,
    author: {
      name: 'Admin',
      username: 'admin',
      bio: 'Servant leader of Auto Pneuma, passionate about faith and technology.',
      spiritual_gifts: ['Teaching', 'Leadership', 'Wisdom'],
      focus_areas: ['ai-ethics', 'theology', 'community-building'],
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
    content: `# AI and the Fruits of the Spirit

Content coming soon...`,
    author: {
      name: 'Admin',
      username: 'admin',
      bio: 'Servant leader of Auto Pneuma, passionate about faith and technology.',
      spiritual_gifts: ['Teaching', 'Leadership', 'Wisdom'],
      focus_areas: ['ai-ethics', 'theology', 'community-building'],
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
      "Our work in AI and software development can be an act of worship when done for God's glory and human flourishing.",
    content: `# Building Technology as Worship

Content coming soon...`,
    author: {
      name: 'Admin',
      username: 'admin',
      bio: 'Servant leader of Auto Pneuma, passionate about faith and technology.',
      spiritual_gifts: ['Teaching', 'Leadership', 'Wisdom'],
      focus_areas: ['ai-ethics', 'theology', 'community-building'],
    },
    featured_image_url: null,
    tags: ['worship', 'stewardship', 'calling'],
    is_featured: false,
    published_at: new Date(Date.now() - 172800000).toISOString(),
    read_time_minutes: 6,
  },
]

// Get other posts for related section
function getRelatedPosts(currentSlug: string, currentTags: string[]) {
  return BLOG_POSTS.filter((post) => post.slug !== currentSlug)
    .sort((a, b) => {
      // Sort by tag overlap
      const aOverlap = a.tags.filter((tag) => currentTags.includes(tag)).length
      const bOverlap = b.tags.filter((tag) => currentTags.includes(tag)).length
      return bOverlap - aOverlap
    })
    .slice(0, 2)
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      title: 'Post Not Found | Auto Pneuma',
    }
  }

  return {
    title: `${post.title} | Auto Pneuma Blog`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.slug, post.tags)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Back Navigation */}
      <section className="py-6 border-b bg-white">
        <div className="container max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-12 bg-gradient-to-b from-beige/30 to-white border-b">
        <div className="container max-w-4xl">
          {post.is_featured && (
            <div className="mb-4">
              <Badge>Featured</Badge>
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {post.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(post.published_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.read_time_minutes} min read</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 bg-white">
        <div className="container max-w-4xl">
          <MarkdownContent content={post.content} />
        </div>
      </article>

      {/* Author Section */}
      <section className="py-12 bg-beige/20 border-y">
        <div className="container max-w-4xl">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">About the Author</h3>
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-navy/20 to-navy/10 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">✍️</span>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-lg mb-1">
                  {post.author.name}
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  @{post.author.username}
                </div>
                <p className="text-sm mb-4">{post.author.bio}</p>

                {post.author.spiritual_gifts &&
                  post.author.spiritual_gifts.length > 0 && (
                    <div className="mb-3">
                      <div className="text-xs font-medium text-muted-foreground mb-2">
                        Spiritual Gifts
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {post.author.spiritual_gifts.map((gift) => (
                          <Badge key={gift} variant="secondary" className="text-xs">
                            {gift}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                {post.author.focus_areas &&
                  post.author.focus_areas.length > 0 && (
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-2">
                        Focus Areas
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {post.author.focus_areas.map((area) => (
                          <Badge key={area} variant="outline" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <article className="rounded-lg border bg-card hover:shadow-lg transition-shadow h-full flex flex-col">
                    <div className="aspect-video bg-gradient-to-br from-navy/10 to-navy/5 rounded-t-lg flex items-center justify-center">
                      <span className="text-3xl">📝</span>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-navy transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{relatedPost.read_time_minutes} min read</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-12 bg-gradient-to-b from-beige/30 to-beige/20">
        <div className="container max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4">Join the Conversation</h2>
          <p className="text-muted-foreground mb-6">
            Have thoughts on this article? Join our community to discuss faith,
            technology, and building for the Kingdom.
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
