import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export const createClient = () => {
  return createClientComponentClient()
}

// Server-side client for use in Server Components and API routes
export const createServerClient = () => {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
      },
    }
  )
}

// Type for Supabase client
export type SupabaseClient = ReturnType<typeof createClient>
