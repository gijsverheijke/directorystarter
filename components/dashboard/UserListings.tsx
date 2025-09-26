import { Listing } from '@/types/listing'
import DashboardListingCard from '@/components/dashboard/DashboardListingCard'

interface UserListingsProps {
  listings: Listing[]
}

export default function UserListings({ listings }: UserListingsProps) {
  if (listings.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="heading-3 element-spacing">No listings yet</h2>
        <p className="caption element-spacing">
          Your submitted listings will appear here. Get started by adding your first listing!
        </p>
        <a 
          href="/submit" 
          className="inline-flex items-center justify-center bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Add Your First Listing
        </a>
      </div>
    )
  }

  return (
    <div>
      <h2 className="heading-3 element-spacing">Your Listings</h2>
      <div className="loading-grid">
        {listings.map((listing) => (
          <DashboardListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  )
}
