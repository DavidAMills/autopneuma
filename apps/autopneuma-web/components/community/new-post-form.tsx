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
import { Badge } from '@/components/ui/badge'
import { Loader2, X, AlertTriangle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useModeration } from '@/lib/api/hooks'

const newPostSchema = z.object({
  title: z
    .string()
    .min(10, 'Title must be at least 10 characters')
    .max(255, 'Title must be less than 255 characters'),
  content: z
    .string()
    .min(20, 'Content must be at least 20 characters')
    .max(10000, 'Content must be less than 10,000 characters'),
  categoryId: z.string().min(1, 'Please select a category'),
  tags: z.array(z.string()).max(5, 'Maximum 5 tags'),
})

type NewPostFormValues = z.infer<typeof newPostSchema>

const CATEGORIES = [
  { id: 'faith-tech', name: 'Faith & Tech' },
  { id: 'ai-ethics', name: 'AI Ethics' },
  { id: 'prayer-projects', name: 'Prayer & Projects' },
  { id: 'questions-help', name: 'Questions & Help' },
  { id: 'announcements', name: 'Announcements' },
]

const SUGGESTED_TAGS = [
  'ai-ethics',
  'machine-learning',
  'prayer',
  'project',
  'question',
  'discussion',
  'bible',
  'theology',
  'technology',
  'coding',
]

export function NewPostForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [customTag, setCustomTag] = useState('')
  const [moderationWarning, setModerationWarning] = useState<string | null>(null)
  const { moderate } = useModeration()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<NewPostFormValues>({
    resolver: zodResolver(newPostSchema),
    defaultValues: {
      tags: [],
      categoryId: '',
    },
  })

  const categoryId = watch('categoryId')

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag].slice(0, 5)
    setSelectedTags(newTags)
    setValue('tags', newTags, { shouldValidate: true })
  }

  const addCustomTag = () => {
    if (customTag && !selectedTags.includes(customTag) && selectedTags.length < 5) {
      const newTags = [...selectedTags, customTag]
      setSelectedTags(newTags)
      setValue('tags', newTags, { shouldValidate: true })
      setCustomTag('')
    }
  }

  const onSubmit = async (data: NewPostFormValues) => {
    try {
      setIsLoading(true)
      setError(null)
      setModerationWarning(null)

      const supabase = createClient()

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError('You must be logged in to create a post')
        return
      }

      // Run AI moderation check
      const moderationResult = await moderate({
        content: `${data.title}\n\n${data.content}`,
        content_type: 'post',
        author_id: user.id,
      })

      // Determine moderation status
      let moderationStatus = 'approved'
      if (moderationResult?.flagged) {
        if (moderationResult.recommendation === 'flag_high_priority') {
          moderationStatus = 'flagged'
          setModerationWarning(
            'Your post has been flagged for moderator review due to potential concerns. It will be visible once reviewed.'
          )
        } else if (moderationResult.recommendation === 'flag_for_review') {
          moderationStatus = 'pending'
          setModerationWarning(
            'Your post has been submitted and will be reviewed by moderators shortly.'
          )
        }
      }

      // Create post
      const { data: post, error: postError } = await supabase
        .from('posts')
        .insert({
          title: data.title,
          content: data.content,
          author_id: user.id,
          category_id: data.categoryId,
          tags: data.tags,
          moderation_status: moderationStatus,
        })
        .select()
        .single()

      if (postError) {
        setError(postError.message)
        return
      }

      // If flagged, show warning but still redirect
      if (moderationStatus !== 'approved') {
        // Wait a moment to show the warning
        await new Promise((resolve) => setTimeout(resolve, 2000))
      }

      // Redirect to the new post (or community page if flagged)
      if (moderationStatus === 'approved') {
        router.push(`/community/post/${post.id}`)
      } else {
        router.push('/community')
      }
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

      {moderationWarning && (
        <div className="rounded-md bg-yellow-50 border border-yellow-200 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-900 mb-1">
                Content Flagged for Review
              </h4>
              <p className="text-sm text-yellow-800">{moderationWarning}</p>
              <p className="text-xs text-yellow-700 mt-2">
                This is an AI-assisted check to help maintain a healthy community.
                Human moderators will make the final decision.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          type="text"
          placeholder="What's your discussion about?"
          disabled={isLoading}
          {...register('title')}
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="categoryId">Category *</Label>
        <select
          id="categoryId"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isLoading}
          {...register('categoryId')}
        >
          <option value="">Select a category...</option>
          {CATEGORIES.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="text-sm text-destructive">{errors.categoryId.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content *</Label>
        <Textarea
          id="content"
          placeholder="Share your thoughts, questions, or prayer requests..."
          rows={12}
          disabled={isLoading}
          {...register('content')}
        />
        {errors.content && (
          <p className="text-sm text-destructive">{errors.content.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Markdown formatting supported
        </p>
      </div>

      <div className="space-y-3">
        <Label>Tags (optional, max 5)</Label>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_TAGS.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-primary/80"
              onClick={() => toggleTag(tag)}
            >
              {tag}
              {selectedTags.includes(tag) && <X className="ml-1 h-3 w-3" />}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Add custom tag..."
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addCustomTag()
              }
            }}
            disabled={isLoading || selectedTags.length >= 5}
          />
          <Button
            type="button"
            variant="outline"
            onClick={addCustomTag}
            disabled={isLoading || selectedTags.length >= 5 || !customTag}
          >
            Add
          </Button>
        </div>
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Selected:</span>
            {selectedTags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => toggleTag(tag)}
                />
              </Badge>
            ))}
          </div>
        )}
        {errors.tags && (
          <p className="text-sm text-destructive">{errors.tags.message}</p>
        )}
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Post Discussion
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        By posting, you agree to our Community Guidelines and Statement of Faith
      </p>
    </form>
  )
}
