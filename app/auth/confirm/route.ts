import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  
  // Check for intended destination from cookie (for server-side auth flow)
  const authRedirect = request.cookies.get('auth-redirect')?.value
  const next = searchParams.get('next') ?? authRedirect ?? '/'

  if (token_hash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      // Clear the redirect cookie and redirect to intended destination
      const response = NextResponse.redirect(new URL(next, request.url))
      response.cookies.delete('auth-redirect')
      return response
    }
  }

  // redirect the user to an error page with some instructions
  redirect('/error')
}