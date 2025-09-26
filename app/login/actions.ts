'use server'

import { revalidatePath } from 'next/cache'
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

  // Don't redirect here - user needs to check their email
  revalidatePath('/', 'layout')
}