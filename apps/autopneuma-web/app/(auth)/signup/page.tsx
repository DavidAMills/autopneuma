import { Metadata } from 'next'
import Link from 'next/link'
import { SignupForm } from '@/components/auth/signup-form'
import { Cross, Wind } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sign Up | Auto Pneuma',
  description: 'Join the Auto Pneuma community',
}

export default function SignupPage() {
  return (
    <div className="container flex min-h-screen w-screen flex-col items-center justify-center py-10">
      <Link
        href="/"
        className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center space-x-2"
      >
        <div className="relative">
          <Cross className="h-5 w-5 text-navy" />
          <Wind className="h-3 w-3 text-navy-light absolute -right-1 -top-1" />
        </div>
        <span className="font-serif text-lg font-bold text-navy">
          Auto Pneuma
        </span>
      </Link>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Join Us</h1>
          <p className="text-sm text-muted-foreground">
            Create an account to join the Christian AI community
          </p>
        </div>

        <SignupForm />

        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            href="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
