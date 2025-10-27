'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Heart, Loader2 } from 'lucide-react'

const prayerRequestSchema = z.object({
  title: z
    .string()
    .min(10, 'Title must be at least 10 characters')
    .max(255, 'Title must be less than 255 characters'),
  content: z
    .string()
    .min(20, 'Please provide at least 20 characters of detail')
    .max(5000, 'Content must be less than 5000 characters'),
  category: z.enum(['personal', 'community', 'project', 'world'], {
    required_error: 'Please select a category',
  }),
  is_anonymous: z.boolean().default(false),
  is_private: z.boolean().default(false),
})

type PrayerRequestFormData = z.infer<typeof prayerRequestSchema>

const CATEGORIES = [
  {
    value: 'personal',
    label: 'Personal',
    description: 'Personal matters, health, family, career',
  },
  {
    value: 'community',
    label: 'Community',
    description: 'Auto Pneuma community needs and growth',
  },
  {
    value: 'project',
    label: 'Project',
    description: 'Technical projects, work challenges, ethical guidance',
  },
  {
    value: 'world',
    label: 'World',
    description: 'Global church, missions, world events',
  },
] as const

export function NewPrayerRequestForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<PrayerRequestFormData>({
    resolver: zodResolver(prayerRequestSchema),
    defaultValues: {
      is_anonymous: false,
      is_private: false,
    },
  })

  const selectedCategory = watch('category')
  const isAnonymous = watch('is_anonymous')
  const isPrivate = watch('is_private')

  const onSubmit = async (data: PrayerRequestFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // TODO: Replace with actual Supabase insert
      console.log('Prayer request data:', data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to prayer requests page
      router.push('/prayer')
    } catch (err) {
      setError('Failed to submit prayer request. Please try again.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">
          Prayer Request Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          type="text"
          placeholder="e.g., Wisdom for career decision, Healing for family member"
          {...register('title')}
          className={errors.title ? 'border-red-500' : ''}
        />
        {errors.title && (
          <p className="text-sm text-red-600">{errors.title.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          A clear, concise summary of your prayer need
        </p>
      </div>

      {/* Category */}
      <div className="space-y-3">
        <Label>
          Category <span className="text-red-500">*</span>
        </Label>
        <div className="grid sm:grid-cols-2 gap-3">
          {CATEGORIES.map((category) => (
            <label
              key={category.value}
              className={`relative flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedCategory === category.value
                  ? 'border-navy bg-navy/5'
                  : 'border-gray-200 hover:border-navy/50'
              }`}
            >
              <input
                type="radio"
                value={category.value}
                {...register('category')}
                className="sr-only"
              />
              <div className="flex items-center gap-2 mb-1">
                <div
                  className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    selectedCategory === category.value
                      ? 'border-navy'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedCategory === category.value && (
                    <div className="h-2 w-2 rounded-full bg-navy" />
                  )}
                </div>
                <span className="font-medium">{category.label}</span>
              </div>
              <p className="text-xs text-muted-foreground ml-6">
                {category.description}
              </p>
            </label>
          ))}
        </div>
        {errors.category && (
          <p className="text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label htmlFor="content">
          Prayer Request Details <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="content"
          placeholder="Share the details of your prayer request. The more specific you are, the better we can pray for you."
          rows={8}
          {...register('content')}
          className={errors.content ? 'border-red-500' : ''}
        />
        {errors.content && (
          <p className="text-sm text-red-600">{errors.content.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Be as specific as you're comfortable being. Your request will be
          visible to the community unless marked private.
        </p>
      </div>

      {/* Privacy Options */}
      <div className="space-y-4 p-4 rounded-lg bg-beige/20 border">
        <h3 className="font-medium text-sm">Privacy Options</h3>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="is_anonymous"
            checked={isAnonymous}
            onCheckedChange={(checked) =>
              setValue('is_anonymous', checked === true)
            }
          />
          <div className="space-y-1">
            <Label
              htmlFor="is_anonymous"
              className="font-normal cursor-pointer"
            >
              Post anonymously
            </Label>
            <p className="text-xs text-muted-foreground">
              Your name will not be shown with this request
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="is_private"
            checked={isPrivate}
            onCheckedChange={(checked) =>
              setValue('is_private', checked === true)
            }
          />
          <div className="space-y-1">
            <Label htmlFor="is_private" className="font-normal cursor-pointer">
              Private request (prayer team only)
            </Label>
            <p className="text-xs text-muted-foreground">
              Only visible to designated prayer team members, not the public
              community
            </p>
          </div>
        </div>
      </div>

      {/* Guidelines */}
      <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
        <h3 className="font-medium text-sm text-blue-900 mb-2">
          Prayer Request Guidelines
        </h3>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Be respectful and honor the privacy of others</li>
          <li>• Focus on your own needs rather than criticizing others</li>
          <li>
            • Avoid sharing sensitive personal information about others without
            permission
          </li>
          <li>
            • Remember that prayer requests are visible to the entire community
            (unless marked private)
          </li>
          <li>
            • You can update your request later to share testimonies of answered
            prayer
          </li>
        </ul>
      </div>

      {/* Submit Button */}
      <div className="flex items-center gap-4">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Heart className="mr-2 h-4 w-4" />
              Share Prayer Request
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
