import { signInWithMagicLink } from './actions'
import { LoadingButton } from '@/components/LoadingButton'

type LoginPageProps = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const sent = searchParams?.sent === '1'
  const emailParam = typeof searchParams?.email === 'string' ? searchParams?.email : ''

  return (
    <div className="container-spacing">
      <div className="max-w-md mx-auto">
        {sent ? (
          <>
            <h1 className="heading-1 element-spacing">Check your email</h1>
            <div className="element-spacing border border-border rounded-lg p-5 bg-accent">
              <p className="label">Magic link sent</p>
              <p className="body-text-small text-muted-foreground mt-2">
                {emailParam ? `We sent a link to ${emailParam}.` : 'Check your email for the sign-in link.'}
              </p>
            </div>
            <p className="caption">You can close this tab now.</p>
          </>
        ) : (
          <>
            <h1 className="heading-1 element-spacing">Sign in to continue</h1>
            <p className="body-text element-spacing">
              We&apos;ll email you a magic link to sign in.
            </p>
            <form className="element-spacing" action={signInWithMagicLink}>
              <label htmlFor="email" className="label element-spacing">Email address</label>
              <input id="email" name="email" type="email" required className="w-full border rounded-md px-5 py-2" defaultValue={emailParam} />
              <div className="mt-5">
                <LoadingButton>
                  Send magic link
                </LoadingButton>
              </div>
            </form>
            <p className="caption">
              First time here? No problem! We&apos;ll create an account for you automatically.
            </p>
          </>
        )}
      </div>
    </div>
  )
}