import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCw } from 'lucide-react'

interface ListingsErrorProps {
  message?: string
  onRetry?: () => void
}

export default function ListingsError({ 
  message = 'Failed to load listings. Please try again later.',
  onRetry 
}: ListingsErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <AlertCircle className="h-16 w-16 text-destructive mb-5" />
      <h2 className="text-xl font-semibold mb-2">Unable to load listings</h2>
      <p className="text-muted-foreground mb-5 max-w-md">
        {message}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try again
        </Button>
      )}
    </div>
  )
}