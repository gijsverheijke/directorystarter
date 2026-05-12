import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getSupabaseConfig, getSupabaseConfigIssue } from './env'

export async function createClient() {
  const configIssue = getSupabaseConfigIssue()
  if (configIssue) {
    throw new Error(`Cannot create Supabase server client: ${configIssue}`)
  }

  const config = getSupabaseConfig()
  const cookieStore = await cookies()

  return createServerClient(
    config.url,
    config.key,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
