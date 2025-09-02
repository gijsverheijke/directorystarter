import { getAllListings, getTags } from '@/utils/supabase/queries'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import ListingCard from '@/components/listings/ListingCard'
import { Tag } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

// Generate static params for all tags at build time
export async function generateStaticParams() {
  const uniqueTags = await getTags()
  
  return uniqueTags.map((tag) => ({
    tag: tag.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { tag: string } }) {
  const tagSlug = params.tag
  const tagName = tagSlug.replace(/-/g, ' ')
  
  const allListings = await getAllListings()
  const listingsWithTag = allListings.filter(
    listing => (listing.tags || []).some(tag => 
      tag.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === tagSlug
    )
  )

  if (listingsWithTag.length === 0) {
    return {
      title: 'Tag Not Found',
      description: 'The requested tag could not be found.'
    }
  }

  return {
    title: `#${tagName} - Directory Starter`,
    description: `Discover ${listingsWithTag.length} tools and services tagged with ${tagName}.`,
    openGraph: {
      title: `#${tagName} Tag`,
      description: `Browse ${listingsWithTag.length} listings tagged with ${tagName}`,
    },
  }
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const tagSlug = params.tag
  const tagName = tagSlug.replace(/-/g, ' ')
  
  const allListings = await getAllListings()
  const listingsWithTag = allListings.filter(
    listing => (listing.tags || []).some(tag => 
      tag.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === tagSlug
    )
  )

  if (listingsWithTag.length === 0) {
    notFound()
  }

  return (
    <div className="container-spacing">
      <div className="section-spacing">
        <Breadcrumbs breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Tags', href: '/tags' },
          { label: `#${tagName}`, href: `/tags/${tagSlug}` }
        ]} />
      </div>
      <div className="section-spacing">
        <div className="flex items-center gap-5 element-spacing">
          <div className="flex items-center gap-5">
            <Tag className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">#{tagName}</h1>
          </div>
          <Badge variant="secondary" className="text-lg px-5 py-1">
            {listingsWithTag.length} {listingsWithTag.length === 1 ? 'listing' : 'listings'}
          </Badge>
        </div>
        <p className="text-muted-foreground text-lg">
          Explore tools and services tagged with <strong>{tagName}</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {listingsWithTag.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      <div className="mt-15 text-center">
        <Link
          href="/tags"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Browse all tags
        </Link>
      </div>
    </div>
  )
}
