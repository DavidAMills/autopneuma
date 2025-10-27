'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Heart, Loader2, Check } from 'lucide-react'

interface PrayButtonProps {
  requestId: string
  initialPrayerCount: number
}

export function PrayButton({
  requestId,
  initialPrayerCount,
}: PrayButtonProps) {
  const [hasPrayed, setHasPrayed] = useState(false)
  const [prayerCount, setPrayerCount] = useState(initialPrayerCount)
  const [isLoading, setIsLoading] = useState(false)

  const handlePray = async () => {
    if (hasPrayed) return

    setIsLoading(true)

    try {
      // TODO: Replace with actual Supabase insert to prayer_interactions table
      // const { error } = await supabase
      //   .from('prayer_interactions')
      //   .insert({
      //     prayer_request_id: requestId,
      //     user_id: user.id,
      //   })
      //
      // Also update the prayer_count in prayer_requests table

      console.log('Prayed for request:', requestId)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update local state
      setHasPrayed(true)
      setPrayerCount((prev) => prev + 1)
    } catch (error) {
      console.error('Error recording prayer:', error)
      alert('Failed to record prayer. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold text-navy mb-1">{prayerCount}</div>
          <div className="text-sm text-muted-foreground">
            {prayerCount === 1 ? 'person has' : 'people have'} prayed
          </div>
        </div>
      </div>

      <Button
        onClick={handlePray}
        disabled={hasPrayed || isLoading}
        size="lg"
        className="w-full"
        variant={hasPrayed ? 'outline' : 'default'}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Recording...
          </>
        ) : hasPrayed ? (
          <>
            <Check className="mr-2 h-5 w-5" />
            You Prayed
          </>
        ) : (
          <>
            <Heart className="mr-2 h-5 w-5" />
            I Prayed
          </>
        )}
      </Button>

      {hasPrayed && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-3">
          <p className="text-sm text-green-800">
            Thank you for praying! Your intercession matters.
          </p>
        </div>
      )}

      {!hasPrayed && (
        <p className="text-xs text-muted-foreground">
          Take a moment to pray, then click the button to let them know you
          prayed.
        </p>
      )}
    </div>
  )
}
