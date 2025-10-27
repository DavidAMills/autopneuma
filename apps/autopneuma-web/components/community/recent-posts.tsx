'use client'

import Link from 'next/link'
import { MessageSquare, ThumbsUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

// This will be replaced with actual data from Supabase
const PLACEHOLDER_POSTS = [
  {
    id: '1',
    title: 'Welcome to Auto Pneuma! Let's introduce ourselves',
    excerpt:
      'Share a bit about yourself, your journey with Christ, and your passion for technology...',
    author: {
      name: 'Admin',
      username: 'admin',
    },
    category: 'Announcements',
    commentCount: 0,
    createdAt: new Date().toISOString(),
    tags: ['welcome', 'introductions'],
  },
]

export function RecentPosts() {
  if (PLACEHOLDER_POSTS.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No discussions yet</h3>
        <p className="text-muted-foreground mb-4">
          Be the first to start a conversation in the community!
        </p>
        <Link
          href="/community/new"
          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          Start a Discussion →
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {PLACEHOLDER_POSTS.map((post) => (
        <Link
          key={post.id}
          href={`/community/post/${post.id}`}
          className="block rounded-lg border p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  {post.category}
                </Badge>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                {post.title}
              </h3>

              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <span className="font-medium">{post.author.name}</span>
                  <span>@{post.author.username}</span>
                </div>
                <span>·</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>{post.commentCount} comments</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}

      {/* Pagination placeholder */}
      <div className="flex justify-center pt-6">
        <p className="text-sm text-muted-foreground">
          Connect Supabase to load more discussions
        </p>
      </div>
    </div>
  )
}
