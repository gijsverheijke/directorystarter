import { mockListings } from '@/lib/mock-data'
import ListingCard from '@/components/listings/ListingCard'
import { Badge } from '@/components/ui/badge'
import SearchBar from '@/components/search/SearchBar'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata = {
  title: 'All Listings - Directory Starter',
  description: 'Browse our complete directory of tools and services. Find the perfect solution for your needs.',
  openGraph: {
    title: 'All Listings - Directory Starter',
    description: 'Browse our complete directory of tools and services.',
  },
}

export default function ListingsPage() {
  const featuredListings = mockListings.filter(listing => listing.isFeatured)
  const regularListings = mockListings.filter(listing => !listing.isFeatured)

  return (
    <div className="container-spacing">
      <div className="section-spacing">
        <Breadcrumbs breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'All Listings', href: '/listings' }
        ]} />
      </div>
      <div className="section-spacing">
        <div className="flex items-center justify-between element-spacing">
          <div>
            <h1 className="text-4xl font-bold mb-2">All Listings</h1>
            <p className="text-muted-foreground text-lg">
              Discover {mockListings.length} amazing tools and services in our directory.
            </p>
          </div>
          <Badge variant="secondary" className="text-lg px-5 py-2">
            {mockListings.length} listings
          </Badge>
        </div>
        
        <div className="max-w-md">
          <SearchBar />
        </div>
      </div>

      {featuredListings.length > 0 && (
        <div className="section-spacing">
          <div className="flex items-center gap-5 section-spacing">
            <h2 className="text-2xl font-semibold">Featured Listings</h2>
            <Badge className="text-sm">
              {featuredListings.length} featured
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.title} listing={listing} />
            ))}
          </div>
        </div>
      )}

      {regularListings.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold section-spacing">All Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {regularListings.map((listing) => (
              <ListingCard key={listing.title} listing={listing} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-15 text-center space-y-5">
        <p className="text-muted-foreground">
          Looking for something specific? Browse by category or tag.
        </p>
        <div className="flex justify-center gap-5">
          <a
            href="/categories"
            className="text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Browse Categories →
          </a>
          <a
            href="/tags"
            className="text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Browse Tags →
          </a>
        </div>
      </div>
    </div>
  )
}
