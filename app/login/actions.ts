'use server'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function signInWithMagicLink(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string

  if (!email) {
    redirect('/error')
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      // User will be automatically signed up if they don't exist
      shouldCreateUser: true,
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
    },
  })

  if (error) {
    console.error('Magic link error:', error)
    redirect('/error')
  }

  // Redirect back to login with success feedback (server-rendered)
  const params = new URLSearchParams({ sent: '1', email })
  redirect(`/login?${params.toString()}`)
}