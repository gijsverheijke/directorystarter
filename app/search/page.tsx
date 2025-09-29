import { searchListings } from '@/utils/supabase/queries'
import ListingCard from '@/components/listings/ListingCard'
import { Badge } from '@/components/ui/badge'
import SearchBar from '@/components/search/SearchBar'
import Breadcrumbs from '@/components/Breadcrumbs'
import { SearchIcon } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Search Results - Directory Starter',
  description: 'Search through our directory of tools and services.',
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || ''
  const results = query ? await searchListings(query) : []

  return (
    <div className="container-spacing">
      <div className="section-spacing">
        <Breadcrumbs breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Search', href: '/search' }
        ]} />
      </div>
      
      <div className="section-spacing">
        <div className="flex items-center gap-5 element-spacing">
          <SearchIcon className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Search Results</h1>
        </div>
        
        <div className="max-w-md element-spacing">
          <SearchBar />
        </div>
        
        {query && (
          <div className="flex items-center gap-5">
            <p className="text-muted-foreground text-lg">
              {results.length === 0 
                ? `No results found for "${query}"`
                : `Found ${results.length} result${results.length === 1 ? '' : 's'} for "${query}"`
              }
            </p>
            {results.length > 0 && (
              <Badge variant="secondary" className="text-sm">
                {results.length} listings
              </Badge>
            )}
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="listing-grid">
          {results.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}

      {query && results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-4">
            Try searching with different keywords or browse our categories.
          </p>
          <div className="flex gap-5 justify-center">
            <Link
              href="/listings"
              className="text-primary hover:underline"
            >
              Browse All Listings
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/categories"
              className="text-primary hover:underline"
            >
              View Categories
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}