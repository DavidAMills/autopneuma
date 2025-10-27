import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, MessageSquare, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CommentSection } from '@/components/community/comment-section'

export const metadata: Metadata = {
  title: 'Discussion | Auto Pneuma',
}

// This is a placeholder - will be replaced with actual data fetching
async function getPost(id: string) {
  return {
    id,
    title: "Welcome to Auto Pneuma! Let's introduce ourselves",
    content: `Welcome to the Auto Pneuma community!

We're here to build a Christian community that supports and spreads the Gospel for the glory of our Lord — creating and growing the community of Christ through our many gifts, which share the love and grace of the same eternal Spirit.

## About This Community

Auto Pneuma (Greek: "the same Spirit") is a place for Christian developers, engineers, data scientists, and entrepreneurs who are passionate about building AI technology that honors God and serves humanity.

## Get Started

1. **Complete your profile** - Share your spiritual gifts and technical expertise
2. **Read our Statement of Faith** - Understand our biblical foundation
3. **Review Community Guidelines** - Learn how we interact with grace and truth
4. **Start participating** - Ask questions, share insights, and pray for one another

## Introduce Yourself

We'd love to get to know you! Please share:
- Your name and location
- Your journey with Christ
- Your work in technology
- What brings you to Auto Pneuma

Looking forward to building together!

*"There are different kinds of gifts, but the same Spirit distributes them." - 1 Corinthians 12:4*`,
    author: {
      id: '1',
      name: 'Admin',
      username: 'admin',
      spiritual_gifts: ['Leadership', 'Teaching'],
      focus_areas: ['Web Development', 'AI Ethics'],
    },
    category: {
      id: 'announcements',
      name: 'Announcements',
    },
    tags: ['welcome', 'introductions'],
    comment_count: 0,
    view_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)

  return (
    <div className="container max-w-5xl py-12">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/community">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Community
          </Button>
        </Link>
      </div>

      {/* Post Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge>{post.category.name}</Badge>
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-navy text-white flex items-center justify-center text-xs font-medium">
              {post.author.name[0]}
            </div>
            <div>
              <div className="font-medium text-foreground">
                {post.author.name}
              </div>
              <div>@{post.author.username}</div>
            </div>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>{post.comment_count} comments</span>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <div className="rounded-lg border bg-card p-8">
          {/* This will be replaced with markdown rendering */}
          <div className="whitespace-pre-wrap">{post.content}</div>
        </div>
      </div>

      {/* Author Info Sidebar (Optional) */}
      <div className="mb-12 rounded-lg border bg-card p-6">
        <h3 className="font-semibold mb-3">About the Author</h3>
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-navy text-white flex items-center justify-center text-lg font-medium">
            {post.author.name[0]}
          </div>
          <div className="flex-1">
            <div className="font-medium">{post.author.name}</div>
            <div className="text-sm text-muted-foreground mb-2">
              @{post.author.username}
            </div>
            {post.author.spiritual_gifts && (
              <div className="mb-2">
                <div className="text-xs font-medium text-muted-foreground mb-1">
                  Spiritual Gifts:
                </div>
                <div className="flex flex-wrap gap-1">
                  {post.author.spiritual_gifts.map((gift) => (
                    <Badge key={gift} variant="outline" className="text-xs">
                      {gift}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {post.author.focus_areas && (
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1">
                  Focus Areas:
                </div>
                <div className="flex flex-wrap gap-1">
                  {post.author.focus_areas.map((area) => (
                    <Badge key={area} variant="secondary" className="text-xs">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          Comments ({post.comment_count})
        </h2>
        <CommentSection postId={post.id} />
      </div>
    </div>
  )
}
