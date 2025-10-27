'use client'

import Link from 'next/link'
import { MessageSquare, Scale, Heart, HelpCircle, Megaphone } from 'lucide-react'

const CATEGORIES = [
  {
    name: 'Faith & Tech',
    slug: 'faith-tech',
    description: 'How faith intersects with technology and AI development',
    icon: MessageSquare,
    color: 'text-blue-600',
    postCount: 0,
  },
  {
    name: 'AI Ethics',
    slug: 'ai-ethics',
    description: 'Ethical considerations and biblical principles for AI',
    icon: Scale,
    color: 'text-purple-600',
    postCount: 0,
  },
  {
    name: 'Prayer & Projects',
    slug: 'prayer-projects',
    description: 'Share projects and request prayer for your work',
    icon: Heart,
    color: 'text-red-600',
    postCount: 0,
  },
  {
    name: 'Questions & Help',
    slug: 'questions-help',
    description: 'Ask questions and get help from the community',
    icon: HelpCircle,
    color: 'text-green-600',
    postCount: 0,
  },
  {
    name: 'Announcements',
    slug: 'announcements',
    description: 'Official updates and community announcements',
    icon: Megaphone,
    color: 'text-orange-600',
    postCount: 0,
  },
]

export function DiscussionCategories() {
  return (
    <div className="space-y-3">
      {CATEGORIES.map((category) => {
        const Icon = category.icon
        return (
          <Link
            key={category.slug}
            href={`/community/${category.slug}`}
            className="block rounded-lg border p-3 hover:bg-accent transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <Icon className={`h-5 w-5 ${category.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-medium text-sm">{category.name}</h4>
                  <span className="text-xs text-muted-foreground">
                    {category.postCount}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {category.description}
                </p>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
