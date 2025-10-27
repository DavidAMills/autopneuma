import { Metadata } from 'next'
import { NewPostForm } from '@/components/community/new-post-form'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'New Discussion | Auto Pneuma',
  description: 'Start a new discussion in the community',
}

export default function NewPostPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8">
        <Link href="/community">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Community
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Start a Discussion</h1>
        <p className="text-muted-foreground">
          Share your thoughts, questions, or prayer requests with the community
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6 mb-6">
        <h3 className="font-semibold mb-2">Community Guidelines</h3>
        <p className="text-sm text-muted-foreground">
          Remember to be kind, respectful, and edifying in your posts. Our
          discussions are guided by the Fruits of the Spirit. See our{' '}
          <Link
            href="/community/guidelines"
            className="text-primary hover:underline"
          >
            full guidelines
          </Link>
          .
        </p>
      </div>

      <NewPostForm />
    </div>
  )
}
