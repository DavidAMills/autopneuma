'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

const signupSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  agreeToGuidelines: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Community Guidelines',
  }),
  affirmFaith: z.boolean().refine((val) => val === true, {
    message: 'You must affirm the Statement of Faith',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

type SignupFormValues = z.infer<typeof signupSchema>

export function SignupForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      agreeToGuidelines: false,
      affirmFaith: false,
    },
  })

  const agreeToGuidelines = watch('agreeToGuidelines')
  const affirmFaith = watch('affirmFaith')

  const onSubmit = async (data: SignupFormValues) => {
    try {
      setIsLoading(true)
      setError(null)

      const supabase = createClient()

      // Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
          },
        },
      })

      if (authError) {
        setError(authError.message)
        return
      }

      if (authData.user) {
        // Redirect to profile setup
        router.push('/profile/setup')
        router.refresh()
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          type="text"
          placeholder="John Doe"
          disabled={isLoading}
          {...register('fullName')}
        />
        {errors.fullName && (
          <p className="text-sm text-destructive">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          disabled={isLoading}
          {...register('email')}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          disabled={isLoading}
          {...register('password')}
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          disabled={isLoading}
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="agreeToGuidelines"
            checked={agreeToGuidelines}
            onCheckedChange={(checked) =>
              setValue('agreeToGuidelines', checked as boolean, {
                shouldValidate: true,
              })
            }
            disabled={isLoading}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="agreeToGuidelines"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the{' '}
              <Link
                href="/community/guidelines"
                className="underline underline-offset-4 hover:text-primary"
                target="_blank"
              >
                Community Guidelines
              </Link>
            </label>
            {errors.agreeToGuidelines && (
              <p className="text-sm text-destructive">
                {errors.agreeToGuidelines.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="affirmFaith"
            checked={affirmFaith}
            onCheckedChange={(checked) =>
              setValue('affirmFaith', checked as boolean, {
                shouldValidate: true,
              })
            }
            disabled={isLoading}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="affirmFaith"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I affirm the{' '}
              <Link
                href="/faith"
                className="underline underline-offset-4 hover:text-primary"
                target="_blank"
              >
                Statement of Faith
              </Link>
            </label>
            {errors.affirmFaith && (
              <p className="text-sm text-destructive">
                {errors.affirmFaith.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create Account
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        We are here to build a Christian community that supports and spreads the
        Gospel for the glory of our Lord.
      </p>
    </form>
  )
}
