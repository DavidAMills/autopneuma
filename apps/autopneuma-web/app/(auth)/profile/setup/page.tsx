import { Metadata } from 'next'
import { ProfileSetupForm } from '@/components/auth/profile-setup-form'
import { Cross, Wind } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Complete Your Profile | Auto Pneuma',
  description: 'Tell us about yourself and your gifts',
}

export default function ProfileSetupPage() {
  return (
    <div className="container flex min-h-screen w-screen flex-col items-center justify-center py-10">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[600px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mx-auto mb-4 relative">
            <Cross className="h-8 w-8 text-navy" />
            <Wind className="h-5 w-5 text-navy-light absolute -right-2 -top-1" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome to Auto Pneuma</h1>
          <p className="text-sm text-muted-foreground">
            Tell us about yourself and the gifts God has given you
          </p>
        </div>

        <ProfileSetupForm />

        <p className="text-xs text-center text-muted-foreground italic">
          "Now to each one the manifestation of the Spirit is given for the
          common good." — 1 Corinthians 12:7
        </p>
      </div>
    </div>
  )
}
