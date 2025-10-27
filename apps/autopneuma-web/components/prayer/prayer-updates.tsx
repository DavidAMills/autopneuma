'use client'

import { Badge } from '@/components/ui/badge'
import { MessageSquare, CheckCircle, Clock } from 'lucide-react'

interface PrayerUpdate {
  id: string
  prayer_request_id: string
  author: {
    name: string
    username: string
  }
  content: string
  created_at: string
}

interface PrayerUpdatesProps {
  updates: PrayerUpdate[]
  requestStatus: string
}

export function PrayerUpdates({ updates, requestStatus }: PrayerUpdatesProps) {
  if (updates.length === 0) return null

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'answered':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Answered Prayer
          </Badge>
        )
      case 'ongoing':
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Clock className="mr-1 h-3 w-3" />
            Ongoing Updates
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary">
            <MessageSquare className="mr-1 h-3 w-3" />
            Updates
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold">Prayer Updates</h2>
        {getStatusBadge(requestStatus)}
      </div>

      <div className="space-y-4">
        {updates.map((update) => (
          <div
            key={update.id}
            className="rounded-lg border bg-card p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-navy/20 to-navy/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">✍️</span>
                </div>
                <div>
                  <div className="font-medium text-sm">{update.author.name}</div>
                  <div className="text-xs text-muted-foreground">
                    @{update.author.username}
                  </div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {new Date(update.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>
            <p className="text-sm leading-relaxed whitespace-pre-line">
              {update.content}
            </p>
          </div>
        ))}
      </div>

      {/* Encourage adding updates */}
      {requestStatus !== 'closed' && (
        <div className="rounded-lg bg-beige/20 border border-beige p-4">
          <p className="text-sm text-muted-foreground">
            {requestStatus === 'answered'
              ? 'Have more to share about how God answered? Add another update to encourage the community!'
              : 'When God answers this prayer, come back to share a testimony!'}
          </p>
        </div>
      )}
    </div>
  )
}
