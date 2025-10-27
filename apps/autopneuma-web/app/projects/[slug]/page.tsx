import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Github,
  ExternalLink,
  BookOpen,
  Star,
  Eye,
  Users,
  Sparkles,
} from 'lucide-react'
import { MarkdownContent } from '@/components/blog/markdown-content'
import { StarButton } from '@/components/projects/star-button'

// This would come from Supabase in production
const PROJECTS = [
  {
    id: '1',
    title: 'Scripture Memory AI',
    slug: 'scripture-memory-ai',
    description:
      'An AI-powered app that helps users memorize Bible verses through spaced repetition and personalized quizzes.',
    long_description: `# Scripture Memory AI

An intelligent Bible memorization assistant that uses AI and spaced repetition to help believers hide God's Word in their hearts.

## Overview

Scripture Memory AI combines proven memory techniques with modern AI to create personalized learning paths for Bible memorization. The app adapts to each user's learning style and schedule, making Scripture memorization more effective and sustainable.

## Key Features

- **Spaced Repetition Algorithm**: Optimizes review timing based on memory science
- **AI-Powered Quizzes**: Generates contextual questions to test comprehension
- **Progress Tracking**: Visual dashboards show memorization progress
- **Verse Collections**: Curated collections by theme, book, or topic
- **Audio Integration**: Listen to verses in multiple translations
- **Reminder System**: Customizable notifications for daily practice

## How It Works

1. **Select Verses**: Choose from popular passages or create custom collections
2. **Learn**: Interactive learning mode with hints and context
3. **Review**: AI schedules optimal review times based on your performance
4. **Test**: Quiz yourself with AI-generated questions
5. **Celebrate**: Track milestones and share achievements

## Technical Implementation

The app uses a custom spaced repetition algorithm combined with GPT-4 for generating contextual quiz questions. User progress is stored securely and synced across devices.

## Future Roadmap

- Group challenges and accountability features
- Integration with popular Bible study apps
- Offline mode for uninterrupted study
- Support for original languages (Hebrew/Greek)

## Getting Started

Visit the GitHub repository for setup instructions and documentation.`,
    spiritual_application:
      'Helps believers hide God's Word in their hearts through effective memorization techniques powered by AI. Psalm 119:11 - "I have hidden your word in my heart that I might not sin against you."',
    creator: {
      id: 'user1',
      name: 'Rachel Kim',
      username: 'rachelk',
      bio: 'Software engineer passionate about Christian education technology',
      spiritual_gifts: ['Teaching', 'Encouragement', 'Knowledge'],
      focus_areas: ['ai-education', 'mobile-development', 'nlp'],
    },
    collaborators: [
      {
        user_id: 'user2',
        name: 'Michael Chen',
        username: 'mchen',
        role: 'contributor',
      },
    ],
    tech_stack: ['Python', 'FastAPI', 'OpenAI', 'React Native', 'PostgreSQL', 'Redis'],
    tags: ['education', 'bible-study', 'nlp', 'mobile', 'spaced-repetition'],
    status: 'active',
    license: 'MIT',
    github_url: 'https://github.com/example/scripture-memory-ai',
    demo_url: 'https://scripture-memory.app',
    documentation_url: null,
    thumbnail_url: null,
    star_count: 42,
    view_count: 328,
    is_approved: true,
    created_at: new Date(Date.now() - 86400000 * 30).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: '2',
    title: 'Ethical AI Framework',
    slug: 'ethical-ai-framework',
    description:
      'Open-source framework for evaluating AI systems against biblical principles of justice, truth, and human dignity.',
    long_description: `# Ethical AI Framework

A comprehensive toolkit for evaluating and building AI systems that honor biblical principles of justice, truth, and human dignity.

## Purpose

This framework helps developers assess their AI systems against clear ethical standards rooted in Scripture and Christian values.

## Core Principles

The framework evaluates AI systems across five dimensions:

1. **Truth & Accuracy**: Does the system pursue truth faithfully?
2. **Justice & Fairness**: Does it treat all people with equal dignity?
3. **Transparency**: Are decisions explainable and accountable?
4. **Privacy & Stewardship**: Does it respect data as a sacred trust?
5. **Human Flourishing**: Does it serve genuine human good?

## Getting Started

Install via pip and run ethical audits on your models.`,
    spiritual_application:
      'Provides practical tools for developers to ensure their AI systems honor God and serve human flourishing, grounded in biblical principles of justice and truth.',
    creator: {
      id: 'user2',
      name: 'David Martinez',
      username: 'dmart',
      bio: 'AI ethics researcher and full-stack developer',
      spiritual_gifts: ['Wisdom', 'Discernment', 'Teaching'],
      focus_areas: ['ai-ethics', 'machine-learning', 'research'],
    },
    collaborators: [],
    tech_stack: ['Python', 'Scikit-learn', 'Pandas', 'Jupyter', 'NumPy'],
    tags: ['ethics', 'fairness', 'bias-detection', 'research', 'open-source'],
    status: 'active',
    license: 'Apache-2.0',
    github_url: 'https://github.com/example/ethical-ai-framework',
    demo_url: null,
    documentation_url: 'https://docs.ethical-ai-framework.org',
    thumbnail_url: null,
    star_count: 87,
    view_count: 1243,
    is_approved: true,
    created_at: new Date(Date.now() - 86400000 * 60).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
]

const STATUS_INFO = {
  prototype: {
    label: 'Prototype',
    color: 'bg-yellow-100 text-yellow-800',
  },
  active: {
    label: 'Active',
    color: 'bg-green-100 text-green-800',
  },
  archived: {
    label: 'Archived',
    color: 'bg-gray-100 text-gray-800',
  },
  deprecated: {
    label: 'Deprecated',
    color: 'bg-red-100 text-red-800',
  },
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const project = PROJECTS.find((p) => p.slug === params.slug)

  if (!project) {
    return {
      title: 'Project Not Found | Auto Pneuma',
    }
  }

  return {
    title: `${project.title} | Project Showcase`,
    description: project.description,
  }
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const project = PROJECTS.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Back Navigation */}
      <section className="py-6 border-b bg-white">
        <div className="container max-w-6xl">
          <Link
            href="/projects"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </div>
      </section>

      {/* Project Header */}
      <section className="py-8 bg-gradient-to-b from-beige/30 to-white border-b">
        <div className="container max-w-6xl">
          <div className="flex items-start gap-3 mb-4 flex-wrap">
            <Badge
              variant="secondary"
              className={
                STATUS_INFO[project.status as keyof typeof STATUS_INFO].color
              }
            >
              {STATUS_INFO[project.status as keyof typeof STATUS_INFO].label}
            </Badge>
            {project.license && (
              <Badge variant="outline">{project.license}</Badge>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {project.description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </Button>
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </Button>
              </a>
            )}
            {project.documentation_url && (
              <a
                href={project.documentation_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Documentation
                </Button>
              </a>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>{project.star_count} stars</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>{project.view_count} views</span>
            </div>
            {project.collaborators && project.collaborators.length > 0 && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{project.collaborators.length + 1} contributors</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 bg-white">
        <div className="container max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Kingdom Purpose */}
              <div className="rounded-lg bg-gradient-to-br from-beige/40 to-beige/20 p-6 border-2 border-beige">
                <div className="flex items-start gap-3 mb-3">
                  <Sparkles className="h-6 w-6 text-navy flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-lg font-semibold text-navy mb-2">
                      Kingdom Purpose
                    </h2>
                    <p className="text-navy/80 leading-relaxed">
                      {project.spiritual_application}
                    </p>
                  </div>
                </div>
              </div>

              {/* Project Description */}
              <div>
                <MarkdownContent content={project.long_description} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Star/Favorite */}
              <div className="rounded-lg border bg-card p-6">
                <StarButton
                  projectId={project.id}
                  initialStarCount={project.star_count}
                />
              </div>

              {/* Tech Stack */}
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="rounded-lg border bg-card p-6">
                  <h3 className="font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Creator */}
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold mb-4">Created By</h3>
                <div className="space-y-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-navy/20 to-navy/10 flex items-center justify-center">
                    <span className="text-xl">👤</span>
                  </div>
                  <div>
                    <div className="font-semibold">{project.creator.name}</div>
                    <div className="text-sm text-muted-foreground">
                      @{project.creator.username}
                    </div>
                  </div>
                  {project.creator.bio && (
                    <p className="text-sm">{project.creator.bio}</p>
                  )}

                  {project.creator.spiritual_gifts &&
                    project.creator.spiritual_gifts.length > 0 && (
                      <div>
                        <div className="text-xs font-medium text-muted-foreground mb-2">
                          Spiritual Gifts
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.creator.spiritual_gifts.map((gift) => (
                            <Badge
                              key={gift}
                              variant="secondary"
                              className="text-xs"
                            >
                              {gift}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                  {project.creator.focus_areas &&
                    project.creator.focus_areas.length > 0 && (
                      <div>
                        <div className="text-xs font-medium text-muted-foreground mb-2">
                          Focus Areas
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.creator.focus_areas.map((area) => (
                            <Badge
                              key={area}
                              variant="outline"
                              className="text-xs"
                            >
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>

              {/* Collaborators */}
              {project.collaborators && project.collaborators.length > 0 && (
                <div className="rounded-lg border bg-card p-6">
                  <h3 className="font-semibold mb-4">Collaborators</h3>
                  <div className="space-y-3">
                    {project.collaborators.map((collab) => (
                      <div key={collab.user_id} className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-navy/20 to-navy/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm">👤</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">
                            {collab.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {collab.role}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Info */}
              <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                <h3 className="font-medium text-sm text-blue-900 mb-2">
                  Get Involved
                </h3>
                <p className="text-xs text-blue-800 mb-3">
                  Interested in contributing or collaborating? Check out the
                  GitHub repository or reach out to the creator.
                </p>
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" variant="outline" className="w-full">
                      <Github className="mr-2 h-3 w-3" />
                      View Repository
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
