'use client'

import { useSearchParams } from 'next/navigation'

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const error_description = searchParams.get('error_description')

  return (
    <div className="container-spacing py-20">
      <div className="max-w-md mx-auto text-center">
        <h1 className="heading-1 mb-5">Authentication Error</h1>
        <p className="text-muted-foreground mb-5">
          Something went wrong during the authentication process.
        </p>
        
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-5 mb-5">
            <p className="text-sm font-mono text-destructive">{error}</p>
            {error_description && (
              <p className="text-sm text-muted-foreground mt-2">{error_description}</p>
            )}
          </div>
        )}
        
        <a href="/login" className="inline-block bg-primary text-primary-foreground px-5 py-2 rounded-md hover:bg-primary/90">
          Try Again
        </a>
      </div>
    </div>
  )
}