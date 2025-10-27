'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Loader2, X } from 'lucide-react'

const profileSetupSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be less than 50 characters')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Username can only contain letters, numbers, underscores, and hyphens'
    ),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  spiritualGifts: z.array(z.string()).min(1, 'Select at least one spiritual gift'),
  focusAreas: z.array(z.string()).min(1, 'Select at least one focus area'),
})

type ProfileSetupFormValues = z.infer<typeof profileSetupSchema>

const SPIRITUAL_GIFTS = [
  'Teaching',
  'Encouragement',
  'Wisdom',
  'Knowledge',
  'Faith',
  'Service',
  'Administration',
  'Leadership',
  'Mercy',
  'Giving',
  'Hospitality',
  'Prophecy',
  'Discernment',
]

const FOCUS_AREAS = [
  'Machine Learning',
  'Natural Language Processing',
  'Computer Vision',
  'Web Development',
  'Mobile Development',
  'Data Science',
  'AI Ethics',
  'Robotics',
  'Cloud Computing',
  'DevOps',
  'Cybersecurity',
  'UI/UX Design',
  'Product Management',
  'Research',
]

export function ProfileSetupForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedGifts, setSelectedGifts] = useState<string[]>([])
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileSetupFormValues>({
    resolver: zodResolver(profileSetupSchema),
    defaultValues: {
      spiritualGifts: [],
      focusAreas: [],
    },
  })

  const toggleGift = (gift: string) => {
    const newGifts = selectedGifts.includes(gift)
      ? selectedGifts.filter((g) => g !== gift)
      : [...selectedGifts, gift]
    setSelectedGifts(newGifts)
    setValue('spiritualGifts', newGifts, { shouldValidate: true })
  }

  const toggleArea = (area: string) => {
    const newAreas = selectedAreas.includes(area)
      ? selectedAreas.filter((a) => a !== area)
      : [...selectedAreas, area]
    setSelectedAreas(newAreas)
    setValue('focusAreas', newAreas, { shouldValidate: true })
  }

  const onSubmit = async (data: ProfileSetupFormValues) => {
    try {
      setIsLoading(true)
      setError(null)

      const supabase = createClient()

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError('Not authenticated')
        return
      }

      // Create or update profile
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: user.id,
        username: data.username,
        bio: data.bio || null,
        spiritual_gifts: data.spiritualGifts,
        focus_areas: data.focusAreas,
        updated_at: new Date().toISOString(),
      })

      if (profileError) {
        if (profileError.code === '23505') {
          setError('Username already taken. Please choose another.')
        } else {
          setError(profileError.message)
        }
        return
      }

      // Redirect to community
      router.push('/community')
      router.refresh()
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="username">Username *</Label>
        <Input
          id="username"
          type="text"
          placeholder="johndoe"
          disabled={isLoading}
          {...register('username')}
        />
        {errors.username && (
          <p className="text-sm text-destructive">{errors.username.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          This will be your public display name in the community
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell us about yourself, your journey with Christ, and your passion for technology..."
          rows={4}
          disabled={isLoading}
          {...register('bio')}
        />
        {errors.bio && (
          <p className="text-sm text-destructive">{errors.bio.message}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label>Spiritual Gifts *</Label>
        <p className="text-sm text-muted-foreground">
          Select the spiritual gifts God has given you (based on Romans 12, 1
          Corinthians 12, Ephesians 4)
        </p>
        <div className="flex flex-wrap gap-2">
          {SPIRITUAL_GIFTS.map((gift) => (
            <Badge
              key={gift}
              variant={selectedGifts.includes(gift) ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-primary/80"
              onClick={() => toggleGift(gift)}
            >
              {gift}
              {selectedGifts.includes(gift) && (
                <X className="ml-1 h-3 w-3" />
              )}
            </Badge>
          ))}
        </div>
        {errors.spiritualGifts && (
          <p className="text-sm text-destructive">
            {errors.spiritualGifts.message}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <Label>Focus Areas *</Label>
        <p className="text-sm text-muted-foreground">
          Select your technical interests and areas of expertise
        </p>
        <div className="flex flex-wrap gap-2">
          {FOCUS_AREAS.map((area) => (
            <Badge
              key={area}
              variant={selectedAreas.includes(area) ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-primary/80"
              onClick={() => toggleArea(area)}
            >
              {area}
              {selectedAreas.includes(area) && <X className="ml-1 h-3 w-3" />}
            </Badge>
          ))}
        </div>
        {errors.focusAreas && (
          <p className="text-sm text-destructive">
            {errors.focusAreas.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Complete Profile
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        You can update these details anytime in your profile settings
      </p>
    </form>
  )
}
