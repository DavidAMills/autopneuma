'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Reply, ThumbsUp } from 'lucide-react'
import Link from 'next/link'

interface CommentSectionProps {
  postId: string
}

// Placeholder comments - will be replaced with Supabase data
const PLACEHOLDER_COMMENTS: any[] = []

export function CommentSection({ postId }: CommentSectionProps) {
  const [isReplying, setIsReplying] = useState(false)
  const [replyContent, setReplyContent] = useState('')

  if (PLACEHOLDER_COMMENTS.length === 0) {
    return (
      <div>
        {/* Comment Form */}
        <div className="mb-8 rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-4">Add a Comment</h3>
          <Textarea
            placeholder="Share your thoughts..."
            rows={4}
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <div className="flex items-center justify-between mt-4">
            <p className="text-xs text-muted-foreground">
              Remember to be kind, respectful, and edifying
            </p>
            <Button>Post Comment</Button>
          </div>
        </div>

        {/* Empty State */}
        <div className="text-center py-12 border rounded-lg">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No comments yet</h3>
          <p className="text-muted-foreground mb-4">
            Be the first to share your thoughts!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Comment Form */}
      <div className="mb-8 rounded-lg border bg-card p-6">
        <h3 className="font-semibold mb-4">Add a Comment</h3>
        <Textarea
          placeholder="Share your thoughts..."
          rows={4}
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
        />
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-muted-foreground">
            Remember to be kind, respectful, and edifying
          </p>
          <Button>Post Comment</Button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {PLACEHOLDER_COMMENTS.map((comment) => (
          <Comment key={comment.id} comment={comment} postId={postId} />
        ))}
      </div>
    </div>
  )
}

function Comment({ comment, postId }: { comment: any; postId: string }) {
  const [isReplying, setIsReplying] = useState(false)
  const [replyContent, setReplyContent] = useState('')

  return (
    <div className="border-l-2 border-muted pl-6">
      <div className="flex items-start gap-4">
        <div className="h-8 w-8 rounded-full bg-navy text-white flex items-center justify-center text-xs font-medium shrink-0">
          {comment.author.name[0]}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium">{comment.author.name}</span>
            <span className="text-sm text-muted-foreground">
              @{comment.author.username}
            </span>
            <span className="text-sm text-muted-foreground">·</span>
            <span className="text-sm text-muted-foreground">
              {new Date(comment.created_at).toLocaleDateString()}
            </span>
          </div>

          <div className="text-sm mb-3 whitespace-pre-wrap">
            {comment.content}
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs"
              onClick={() => setIsReplying(!isReplying)}
            >
              <Reply className="mr-1 h-3 w-3" />
              Reply
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              <ThumbsUp className="mr-1 h-3 w-3" />
              {comment.upvote_count || 0}
            </Button>
          </div>

          {isReplying && (
            <div className="mt-4">
              <Textarea
                placeholder="Write a reply..."
                rows={3}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <div className="flex gap-2 mt-2">
                <Button size="sm">Reply</Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setIsReplying(false)
                    setReplyContent('')
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Nested Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-6 space-y-6">
              {comment.replies.map((reply: any) => (
                <Comment key={reply.id} comment={reply} postId={postId} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
