import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCw } from 'lucide-react'
import Link from 'next/link'

interface DatabaseErrorProps {
  message?: string
}

export default function DatabaseError({ 
  message = 'We encountered a database error. Please try again later.' 
}: DatabaseErrorProps) {
  return (
    <div className="container-spacing">
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <AlertCircle className="h-16 w-16 text-destructive mb-5" />
        <h1 className="text-2xl font-semibold mb-2">Service Unavailable</h1>
        <p className="text-muted-foreground mb-5 max-w-md">
          {message}
        </p>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link href="/">
              Go Home
            </Link>
          </Button>
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Page
          </Button>
        </div>
      </div>
    </div>
  )
}