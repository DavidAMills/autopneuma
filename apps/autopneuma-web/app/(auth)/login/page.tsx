import { Metadata } from 'next'
import Link from 'next/link'
import { LoginForm } from '@/components/auth/login-form'
import { Cross, Wind } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Log In | Auto Pneuma',
  description: 'Log in to your Auto Pneuma account',
}

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
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

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        <LoginForm />

        <p className="px-8 text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link
            href="/signup"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign up
          </Link>
        </p>

        <p className="px-8 text-center text-xs text-muted-foreground">
          By continuing, you agree to our{' '}
          <Link
            href="/community/guidelines"
            className="underline underline-offset-4 hover:text-primary"
          >
            Community Guidelines
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
