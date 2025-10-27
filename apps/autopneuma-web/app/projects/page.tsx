import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Github,
  ExternalLink,
  Star,
  Eye,
  Code,
  Sparkles,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Project Showcase | Auto Pneuma',
  description:
    'Discover AI and technology projects built by believers for Kingdom impact.',
}

// Placeholder data - will come from Supabase
const PROJECTS = [
  {
    id: '1',
    title: 'Scripture Memory AI',
    slug: 'scripture-memory-ai',
    description:
      'An AI-powered app that helps users memorize Bible verses through spaced repetition and personalized quizzes.',
    spiritual_application:
      'Helps believers hide God's Word in their hearts through effective memorization techniques powered by AI.',
    creator: {
      id: 'user1',
      name: 'Rachel Kim',
      username: 'rachelk',
      spiritual_gifts: ['Teaching', 'Encouragement'],
    },
    tech_stack: ['Python', 'FastAPI', 'OpenAI', 'React', 'PostgreSQL'],
    tags: ['education', 'bible-study', 'nlp', 'mobile'],
    status: 'active',
    license: 'MIT',
    github_url: 'https://github.com/example/scripture-memory-ai',
    demo_url: 'https://scripture-memory.app',
    documentation_url: null,
    thumbnail_url: null,
    star_count: 42,
    view_count: 328,
    created_at: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
  {
    id: '2',
    title: 'Ethical AI Framework',
    slug: 'ethical-ai-framework',
    description:
      'Open-source framework for evaluating AI systems against biblical principles of justice, truth, and human dignity.',
    spiritual_application:
      'Provides practical tools for developers to ensure their AI systems honor God and serve human flourishing.',
    creator: {
      id: 'user2',
      name: 'David Martinez',
      username: 'dmart',
      spiritual_gifts: ['Wisdom', 'Discernment', 'Teaching'],
    },
    tech_stack: ['Python', 'Scikit-learn', 'Pandas', 'Jupyter'],
    tags: ['ethics', 'fairness', 'bias-detection', 'research'],
    status: 'active',
    license: 'Apache-2.0',
    github_url: 'https://github.com/example/ethical-ai-framework',
    demo_url: null,
    documentation_url: 'https://docs.ethical-ai-framework.org',
    thumbnail_url: null,
    star_count: 87,
    view_count: 1243,
    created_at: new Date(Date.now() - 86400000 * 60).toISOString(),
  },
  {
    id: '3',
    title: 'Prayer Journal Assistant',
    slug: 'prayer-journal-assistant',
    description:
      'AI assistant that helps organize prayer requests, track answered prayers, and provide Scripture encouragement.',
    spiritual_application:
      'Strengthens believers' prayer lives by organizing requests and celebrating God's faithfulness over time.',
    creator: {
      id: 'user3',
      name: 'Sarah Chen',
      username: 'sarah_c',
      spiritual_gifts: ['Service', 'Faith', 'Encouragement'],
    },
    tech_stack: ['Next.js', 'TypeScript', 'Supabase', 'OpenAI', 'Tailwind'],
    tags: ['prayer', 'journaling', 'mobile', 'nlp'],
    status: 'prototype',
    license: 'GPL-3.0',
    github_url: 'https://github.com/example/prayer-journal',
    demo_url: 'https://prayer-journal-demo.vercel.app',
    documentation_url: null,
    thumbnail_url: null,
    star_count: 23,
    view_count: 156,
    created_at: new Date(Date.now() - 86400000 * 14).toISOString(),
  },
  {
    id: '4',
    title: 'Church Content Moderator',
    slug: 'church-content-moderator',
    description:
      'AI-powered moderation tool designed specifically for church and ministry online communities.',
    spiritual_application:
      'Helps ministry leaders maintain healthy, edifying online spaces that reflect Christian values.',
    creator: {
      id: 'user4',
      name: 'Michael Torres',
      username: 'mtorres',
      spiritual_gifts: ['Administration', 'Discernment', 'Leadership'],
    },
    tech_stack: ['Node.js', 'TensorFlow', 'Express', 'MongoDB', 'React'],
    tags: ['moderation', 'community', 'nlp', 'safety'],
    status: 'active',
    license: 'MIT',
    github_url: 'https://github.com/example/church-moderator',
    demo_url: null,
    documentation_url: 'https://church-moderator.docs.com',
    thumbnail_url: null,
    star_count: 34,
    view_count: 892,
    created_at: new Date(Date.now() - 86400000 * 45).toISOString(),
  },
  {
    id: '5',
    title: 'Biblical Language Tutor',
    slug: 'biblical-language-tutor',
    description:
      'Interactive AI tutor for learning Biblical Hebrew and Koine Greek with contextual examples from Scripture.',
    spiritual_application:
      'Equips believers to study Scripture in original languages, deepening understanding of God's Word.',
    creator: {
      id: 'user5',
      name: 'Anna Williams',
      username: 'awilliams',
      spiritual_gifts: ['Teaching', 'Knowledge', 'Wisdom'],
    },
    tech_stack: ['Python', 'Django', 'OpenAI', 'Vue.js', 'PostgreSQL'],
    tags: ['education', 'languages', 'bible-study', 'nlp'],
    status: 'active',
    license: 'MIT',
    github_url: 'https://github.com/example/biblical-language-tutor',
    demo_url: 'https://biblical-languages.app',
    documentation_url: null,
    thumbnail_url: null,
    star_count: 56,
    view_count: 634,
    created_at: new Date(Date.now() - 86400000 * 90).toISOString(),
  },
  {
    id: '6',
    title: 'Sermon Summarizer',
    slug: 'sermon-summarizer',
    description:
      'AI tool that generates study notes, key points, and discussion questions from sermon recordings.',
    spiritual_application:
      'Helps congregations engage more deeply with teaching by providing AI-generated study materials.',
    creator: {
      id: 'user6',
      name: 'James Park',
      username: 'jpark',
      spiritual_gifts: ['Service', 'Administration'],
    },
    tech_stack: ['Python', 'Whisper', 'GPT-4', 'FastAPI', 'React'],
    tags: ['education', 'audio-processing', 'nlp', 'ministry'],
    status: 'prototype',
    license: 'MIT',
    github_url: 'https://github.com/example/sermon-summarizer',
    demo_url: null,
    documentation_url: null,
    thumbnail_url: null,
    star_count: 19,
    view_count: 245,
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
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

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <section className="py-12 bg-gradient-to-b from-beige/30 to-white border-b">
        <div className="container max-w-7xl">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-8 w-8 text-navy" />
                <h1 className="text-4xl font-bold">Project Showcase</h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl">
                "Now to each one the manifestation of the Spirit is given for
                the common good." — 1 Corinthians 12:7
              </p>
              <p className="mt-2 text-muted-foreground max-w-3xl">
                Explore AI and technology projects built by believers for
                Kingdom impact. Share your work, discover inspiration, and
                collaborate for God's glory.
              </p>
            </div>
            <Link href="/projects/new">
              <Button size="lg">
                <Plus className="mr-2 h-4 w-4" />
                Share Project
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 bg-white border-b sticky top-0 z-10">
        <div className="container max-w-7xl">
          <div className="flex items-center gap-2 overflow-x-auto">
            <Button variant="default" size="sm">
              All Projects
            </Button>
            <Button variant="outline" size="sm">
              Active
            </Button>
            <Button variant="outline" size="sm">
              Prototype
            </Button>
            <span className="mx-2 text-muted-foreground">|</span>
            <Button variant="outline" size="sm">
              <Star className="mr-1 h-3 w-3" />
              Most Starred
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="mr-1 h-3 w-3" />
              Popular
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-8 bg-gradient-to-b from-white to-beige/10 flex-1">
        <div className="container max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group"
              >
                <article className="rounded-lg border bg-card hover:shadow-lg transition-all h-full flex flex-col">
                  {/* Thumbnail */}
                  <div className="aspect-video bg-gradient-to-br from-navy/10 to-navy/5 rounded-t-lg flex items-center justify-center border-b relative overflow-hidden">
                    <Code className="h-16 w-16 text-navy/20 group-hover:scale-110 transition-transform" />
                    <div className="absolute top-3 right-3">
                      <Badge
                        variant="secondary"
                        className={
                          STATUS_INFO[
                            project.status as keyof typeof STATUS_INFO
                          ].color
                        }
                      >
                        {
                          STATUS_INFO[
                            project.status as keyof typeof STATUS_INFO
                          ].label
                        }
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-navy transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Spiritual Application */}
                      <div className="rounded-md bg-beige/30 p-3 mb-4">
                        <div className="flex items-start gap-2">
                          <Sparkles className="h-4 w-4 text-navy flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-navy/80 line-clamp-2">
                            {project.spiritual_application}
                          </p>
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {project.tech_stack.slice(0, 4).map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.tech_stack.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.tech_stack.length - 4}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          <span>{project.star_count}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{project.view_count}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {project.github_url && (
                          <Github className="h-4 w-4 text-muted-foreground" />
                        )}
                        {project.demo_url && (
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {PROJECTS.length === 0 && (
            <div className="text-center py-16">
              <Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h2 className="text-2xl font-semibold mb-2">
                No projects yet
              </h2>
              <p className="text-muted-foreground mb-6">
                Be the first to showcase your Kingdom-focused project.
              </p>
              <Link href="/projects/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Share Project
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-navy text-white">
        <div className="container max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Share Your Work</h3>
              <p className="text-white/80 text-sm">
                Show how you're using your technical gifts for Kingdom purposes.
                Include links to GitHub, demos, and documentation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Find Inspiration</h3>
              <p className="text-white/80 text-sm">
                Discover what other believers are building. Get ideas for your
                own projects and see gifts in action.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Collaborate</h3>
              <p className="text-white/80 text-sm">
                Connect with creators, contribute to projects, and work together
                to build technology that glorifies God.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
