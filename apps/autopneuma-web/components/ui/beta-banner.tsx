'use client'

import Link from 'next/link'
import { useState } from 'react'
import { X, MessageSquare } from 'lucide-react'

export function BetaBanner() {
  const [isVisible, setIsVisible] = useState(true)

  // Only show if NEXT_PUBLIC_BETA is true
  const isBeta = process.env.NEXT_PUBLIC_BETA === 'true'

  if (!isBeta || !isVisible) {
    return null
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-navy text-white py-2 px-4 relative">
      <div className="container max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 text-sm">
          <span className="font-semibold bg-white/20 px-2 py-0.5 rounded text-xs">
            BETA
          </span>
          <span className="hidden sm:inline">
            You're using the beta preview of Auto Pneuma.
          </span>
          <Link
            href="/community/beta-feedback"
            className="underline hover:no-underline font-medium inline-flex items-center gap-1"
          >
            <MessageSquare className="h-3 w-3" />
            Share feedback
          </Link>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-white/10 rounded transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
