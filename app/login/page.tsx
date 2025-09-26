import { signInWithMagicLink } from './actions'

export default function LoginPage() {
  return (
    <div>
      <h1>Sign in to continue</h1>
      <p>Enter your email address and we&apos;ll send you a magic link to sign in.</p>
      
      <form>
        <label htmlFor="email">Email address:</label>
        <input id="email" name="email" type="email" required />
        
        <button formAction={signInWithMagicLink}>Send magic link</button>
      </form>
      
      <p className="text-sm text-gray-600 mt-4">
        Don&apos;t have an account? No problem! We&apos;ll create one for you automatically.
      </p>
    </div>
  )
}