import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { NewProjectForm } from '@/components/projects/new-project-form'

export const metadata: Metadata = {
  title: 'Share Project | Auto Pneuma',
  description: 'Share your AI or technology project with the Auto Pneuma community.',
}

export default function NewProjectPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Back Navigation */}
      <section className="py-6 border-b bg-white">
        <div className="container max-w-4xl">
          <Link
            href="/projects"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </div>
      </section>

      {/* Header */}
      <section className="py-8 bg-gradient-to-b from-beige/30 to-white border-b">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-bold mb-2">Share Your Project</h1>
          <p className="text-muted-foreground">
            Showcase how you're using technology and AI for Kingdom purposes.
            Share your work, inspire others, and invite collaboration.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-8 bg-white flex-1">
        <div className="container max-w-4xl">
          <NewProjectForm />
        </div>
      </section>
    </div>
  )
}
