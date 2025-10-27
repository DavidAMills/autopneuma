'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Star, Loader2 } from 'lucide-react'

interface StarButtonProps {
  projectId: string
  initialStarCount: number
}

export function StarButton({ projectId, initialStarCount }: StarButtonProps) {
  const [hasStarred, setHasStarred] = useState(false)
  const [starCount, setStarCount] = useState(initialStarCount)
  const [isLoading, setIsLoading] = useState(false)

  const handleStar = async () => {
    setIsLoading(true)

    try {
      if (hasStarred) {
        // Unstar
        // TODO: Replace with actual Supabase delete
        // await supabase
        //   .from('project_stars')
        //   .delete()
        //   .eq('project_id', projectId)
        //   .eq('user_id', user.id)

        console.log('Unstarred project:', projectId)
        setHasStarred(false)
        setStarCount((prev) => prev - 1)
      } else {
        // Star
        // TODO: Replace with actual Supabase insert
        // await supabase
        //   .from('project_stars')
        //   .insert({
        //     project_id: projectId,
        //     user_id: user.id,
        //   })

        console.log('Starred project:', projectId)
        setHasStarred(true)
        setStarCount((prev) => prev + 1)
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300))
    } catch (error) {
      console.error('Error toggling star:', error)
      alert('Failed to update star. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold text-navy mb-1">{starCount}</div>
          <div className="text-sm text-muted-foreground">
            {starCount === 1 ? 'star' : 'stars'}
          </div>
        </div>
      </div>

      <Button
        onClick={handleStar}
        disabled={isLoading}
        size="lg"
        className="w-full"
        variant={hasStarred ? 'outline' : 'default'}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Updating...
          </>
        ) : (
          <>
            <Star
              className={`mr-2 h-5 w-5 ${hasStarred ? 'fill-current' : ''}`}
            />
            {hasStarred ? 'Starred' : 'Star Project'}
          </>
        )}
      </Button>

      {hasStarred && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-3">
          <p className="text-sm text-green-800">
            Added to your favorites! You can find this in your starred projects.
          </p>
        </div>
      )}

      {!hasStarred && (
        <p className="text-xs text-muted-foreground">
          Star this project to show appreciation and bookmark it for later.
        </p>
      )}
    </div>
  )
}
