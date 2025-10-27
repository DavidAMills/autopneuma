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
import { Loader2, X, Plus, Sparkles } from 'lucide-react'

const projectSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(255, 'Title must be less than 255 characters'),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(500, 'Description must be less than 500 characters'),
  long_description: z
    .string()
    .min(50, 'Long description must be at least 50 characters')
    .max(10000, 'Long description must be less than 10,000 characters'),
  spiritual_application: z
    .string()
    .min(20, 'Please explain how this serves Kingdom purposes (at least 20 characters)')
    .max(1000, 'Spiritual application must be less than 1,000 characters'),
  tech_stack: z
    .array(z.string())
    .min(1, 'Please add at least one technology')
    .max(15, 'Maximum 15 technologies'),
  tags: z
    .array(z.string())
    .max(10, 'Maximum 10 tags'),
  github_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  demo_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  documentation_url: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
  license: z.string().optional(),
  status: z.enum(['prototype', 'active', 'archived', 'deprecated']),
})

type ProjectFormData = z.infer<typeof projectSchema>

const SUGGESTED_TECH = [
  'Python',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'FastAPI',
  'Django',
  'OpenAI',
  'TensorFlow',
  'PyTorch',
  'Hugging Face',
  'Langchain',
  'PostgreSQL',
  'MongoDB',
  'Supabase',
  'Firebase',
  'AWS',
  'Azure',
  'Docker',
]

const SUGGESTED_TAGS = [
  'nlp',
  'computer-vision',
  'machine-learning',
  'deep-learning',
  'bible-study',
  'education',
  'prayer',
  'ethics',
  'community',
  'ministry',
  'mobile',
  'web',
  'api',
  'open-source',
]

const LICENSES = [
  'MIT',
  'Apache-2.0',
  'GPL-3.0',
  'BSD-3-Clause',
  'ISC',
  'MPL-2.0',
  'AGPL-3.0',
  'Custom',
]

export function NewProjectForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [techInput, setTechInput] = useState('')
  const [tagInput, setTagInput] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      tech_stack: [],
      tags: [],
      status: 'active',
    },
  })

  const techStack = watch('tech_stack')
  const tags = watch('tags')
  const selectedStatus = watch('status')

  const addTech = (tech: string) => {
    if (tech && !techStack.includes(tech) && techStack.length < 15) {
      setValue('tech_stack', [...techStack, tech])
      setTechInput('')
    }
  }

  const removeTech = (tech: string) => {
    setValue(
      'tech_stack',
      techStack.filter((t) => t !== tech)
    )
  }

  const addTag = (tag: string) => {
    const normalizedTag = tag.toLowerCase().replace(/\s+/g, '-')
    if (normalizedTag && !tags.includes(normalizedTag) && tags.length < 10) {
      setValue('tags', [...tags, normalizedTag])
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setValue(
      'tags',
      tags.filter((t) => t !== tag)
    )
  }

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Generate slug from title
      const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')

      // TODO: Replace with actual Supabase insert
      console.log('Project data:', { ...data, slug })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to projects page
      router.push('/projects')
    } catch (err) {
      setError('Failed to submit project. Please try again.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Error Message */}
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Basic Information */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Basic Information</h2>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">
            Project Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="e.g., Scripture Memory AI, Prayer Journal Assistant"
            {...register('title')}
            className={errors.title ? 'border-red-500' : ''}
          />
          {errors.title && (
            <p className="text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Short Description */}
        <div className="space-y-2">
          <Label htmlFor="description">
            Short Description <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="description"
            placeholder="A brief one or two sentence summary of your project"
            rows={2}
            {...register('description')}
            className={errors.description ? 'border-red-500' : ''}
          />
          {errors.description && (
            <p className="text-sm text-red-600">{errors.description.message}</p>
          )}
          <p className="text-xs text-muted-foreground">
            This will appear in the project card preview
          </p>
        </div>

        {/* Status */}
        <div className="space-y-3">
          <Label>
            Project Status <span className="text-red-500">*</span>
          </Label>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              {
                value: 'prototype',
                label: 'Prototype',
                description: 'Early stage or proof of concept',
              },
              {
                value: 'active',
                label: 'Active',
                description: 'Production-ready and maintained',
              },
              {
                value: 'archived',
                label: 'Archived',
                description: 'No longer actively maintained',
              },
              {
                value: 'deprecated',
                label: 'Deprecated',
                description: 'Superseded by another project',
              },
            ].map((status) => (
              <label
                key={status.value}
                className={`relative flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedStatus === status.value
                    ? 'border-navy bg-navy/5'
                    : 'border-gray-200 hover:border-navy/50'
                }`}
              >
                <input
                  type="radio"
                  value={status.value}
                  {...register('status')}
                  className="sr-only"
                />
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                      selectedStatus === status.value
                        ? 'border-navy'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedStatus === status.value && (
                      <div className="h-2 w-2 rounded-full bg-navy" />
                    )}
                  </div>
                  <span className="font-medium text-sm">{status.label}</span>
                </div>
                <p className="text-xs text-muted-foreground ml-6">
                  {status.description}
                </p>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Description */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Project Details</h2>

        {/* Long Description */}
        <div className="space-y-2">
          <Label htmlFor="long_description">
            Detailed Description <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="long_description"
            placeholder="Provide a comprehensive description of your project. Include features, how it works, who it's for, and any relevant background. You can use markdown formatting."
            rows={10}
            {...register('long_description')}
            className={errors.long_description ? 'border-red-500' : ''}
          />
          {errors.long_description && (
            <p className="text-sm text-red-600">
              {errors.long_description.message}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Supports markdown formatting
          </p>
        </div>

        {/* Spiritual Application */}
        <div className="space-y-2">
          <Label htmlFor="spiritual_application">
            Kingdom Purpose <span className="text-red-500">*</span>
          </Label>
          <div className="rounded-lg bg-beige/20 p-4 mb-3">
            <div className="flex items-start gap-2">
              <Sparkles className="h-5 w-5 text-navy flex-shrink-0 mt-0.5" />
              <p className="text-sm text-navy/80">
                Explain how this project serves Kingdom purposes. How does it
                glorify God, serve believers, or advance the Gospel?
              </p>
            </div>
          </div>
          <Textarea
            id="spiritual_application"
            placeholder="e.g., This app helps believers hide God's Word in their hearts through AI-powered memorization techniques, strengthening faith and equipping them for spiritual growth."
            rows={4}
            {...register('spiritual_application')}
            className={errors.spiritual_application ? 'border-red-500' : ''}
          />
          {errors.spiritual_application && (
            <p className="text-sm text-red-600">
              {errors.spiritual_application.message}
            </p>
          )}
        </div>
      </div>

      {/* Technical Details */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Technical Details</h2>

        {/* Tech Stack */}
        <div className="space-y-3">
          <Label htmlFor="tech_input">
            Tech Stack <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-2">
            <Input
              id="tech_input"
              type="text"
              placeholder="Add technology (e.g., Python, React)"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addTech(techInput)
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => addTech(techInput)}
              disabled={!techInput || techStack.length >= 15}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {errors.tech_stack && (
            <p className="text-sm text-red-600">{errors.tech_stack.message}</p>
          )}

          {/* Selected Tech */}
          {techStack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="gap-1">
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTech(tech)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Suggested Tech */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">
              Suggested technologies:
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_TECH.filter((tech) => !techStack.includes(tech))
                .slice(0, 10)
                .map((tech) => (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => addTech(tech)}
                    className="text-xs px-2 py-1 rounded border border-navy/20 hover:bg-navy/5 transition-colors"
                    disabled={techStack.length >= 15}
                  >
                    + {tech}
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-3">
          <Label htmlFor="tag_input">Tags (Optional)</Label>
          <div className="flex gap-2">
            <Input
              id="tag_input"
              type="text"
              placeholder="Add tag (e.g., nlp, education)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addTag(tagInput)
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => addTag(tagInput)}
              disabled={!tagInput || tags.length >= 10}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {errors.tags && (
            <p className="text-sm text-red-600">{errors.tags.message}</p>
          )}

          {/* Selected Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Suggested Tags */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">
              Suggested tags:
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_TAGS.filter((tag) => !tags.includes(tag))
                .slice(0, 8)
                .map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addTag(tag)}
                    className="text-xs px-2 py-1 rounded border border-navy/20 hover:bg-navy/5 transition-colors"
                    disabled={tags.length >= 10}
                  >
                    + {tag}
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* License */}
        <div className="space-y-2">
          <Label htmlFor="license">License (Optional)</Label>
          <select
            id="license"
            {...register('license')}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Select a license</option>
            {LICENSES.map((license) => (
              <option key={license} value={license}>
                {license}
              </option>
            ))}
          </select>
          <p className="text-xs text-muted-foreground">
            Choose an open-source license for your project
          </p>
        </div>
      </div>

      {/* Links */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Project Links</h2>

        <div className="grid gap-6">
          {/* GitHub URL */}
          <div className="space-y-2">
            <Label htmlFor="github_url">GitHub Repository (Optional)</Label>
            <Input
              id="github_url"
              type="url"
              placeholder="https://github.com/username/project"
              {...register('github_url')}
              className={errors.github_url ? 'border-red-500' : ''}
            />
            {errors.github_url && (
              <p className="text-sm text-red-600">{errors.github_url.message}</p>
            )}
          </div>

          {/* Demo URL */}
          <div className="space-y-2">
            <Label htmlFor="demo_url">Live Demo (Optional)</Label>
            <Input
              id="demo_url"
              type="url"
              placeholder="https://your-project.com"
              {...register('demo_url')}
              className={errors.demo_url ? 'border-red-500' : ''}
            />
            {errors.demo_url && (
              <p className="text-sm text-red-600">{errors.demo_url.message}</p>
            )}
          </div>

          {/* Documentation URL */}
          <div className="space-y-2">
            <Label htmlFor="documentation_url">Documentation (Optional)</Label>
            <Input
              id="documentation_url"
              type="url"
              placeholder="https://docs.your-project.com"
              {...register('documentation_url')}
              className={errors.documentation_url ? 'border-red-500' : ''}
            />
            {errors.documentation_url && (
              <p className="text-sm text-red-600">
                {errors.documentation_url.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Guidelines */}
      <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
        <h3 className="font-medium text-sm text-blue-900 mb-2">
          Project Submission Guidelines
        </h3>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Ensure your project aligns with biblical values and Kingdom purposes</li>
          <li>• Provide clear documentation and setup instructions</li>
          <li>• Be responsive to questions and collaboration requests</li>
          <li>• Keep project information up to date</li>
          <li>• Give credit to collaborators and dependencies</li>
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
              <Sparkles className="mr-2 h-4 w-4" />
              Share Project
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
