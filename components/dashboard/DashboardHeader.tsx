import { Badge } from '@/components/ui/badge'

interface DashboardHeaderProps {
  userEmail: string
  totalListings: number
  error?: string
  updated?: string
  deleted?: string
}

export default function DashboardHeader({ 
  userEmail, 
  totalListings, 
  error, 
  updated, 
  deleted 
}: DashboardHeaderProps) {
  return (
    <div className="element-spacing">
      <div className="flex items-center justify-between gap-5">
        <div>
          <h1 className="heading-1">Dashboard</h1>
          <p className="caption">
            Welcome back, {userEmail}
          </p>
        </div>
       
      </div>

      <div className="flex items-center gap-5">
        <Badge variant="secondary">
          {totalListings} {totalListings === 1 ? 'Listing' : 'Listings'}
        </Badge>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="p-5 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="body-text-small text-destructive">
            {error === 'missing_required' && 'Please fill in all required fields.'}
            {error === 'invalid_url' && 'Please provide valid URLs.'}
            {error === 'unauthorized' && 'You can only edit your own listings.'}
            {error === 'update_failed' && 'Failed to update listing. Please try again.'}
            {error === 'delete_failed' && 'Failed to delete listing. Please try again.'}
          </p>
        </div>
      )}

      {updated && (
        <div className="p-5 bg-secondary border border-border rounded-lg">
          <p className="body-text-small text-foreground">
            Listing updated successfully! It will be reviewed before appearing live.
          </p>
        </div>
      )}

      {deleted && (
        <div className="p-5 bg-secondary border border-border rounded-lg">
          <p className="body-text-small text-foreground">
            Listing deleted successfully.
          </p>
        </div>
      )}
    </div>
  )
}
