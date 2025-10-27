import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { NewPrayerRequestForm } from '@/components/prayer/new-prayer-request-form'

export const metadata: Metadata = {
  title: 'Share Prayer Request | Auto Pneuma',
  description: 'Share a prayer request with the Auto Pneuma community.',
}

export default function NewPrayerRequestPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Back Navigation */}
      <section className="py-6 border-b bg-white">
        <div className="container max-w-3xl">
          <Link
            href="/prayer"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Prayer Requests
          </Link>
        </div>
      </section>

      {/* Header */}
      <section className="py-8 bg-gradient-to-b from-beige/30 to-white border-b">
        <div className="container max-w-3xl">
          <h1 className="text-3xl font-bold mb-2">Share a Prayer Request</h1>
          <p className="text-muted-foreground">
            "Do not be anxious about anything, but in every situation, by prayer
            and petition, with thanksgiving, present your requests to God." —
            Philippians 4:6
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-8 bg-white flex-1">
        <div className="container max-w-3xl">
          <NewPrayerRequestForm />
        </div>
      </section>
    </div>
  )
}
