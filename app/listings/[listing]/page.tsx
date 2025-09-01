import { mockListings } from '@/lib/mock-data'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ExternalLink, Tag } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'

// Generate static params for all listings at build time
export async function generateStaticParams() {
  return mockListings.map((listing) => ({
    listing: listing.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { listing: string } }) {
  const listing = mockListings.find(
    (l) => l.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === params.listing
  )

  if (!listing) {
    return {
      title: 'Listing Not Found',
      description: 'The requested listing could not be found.'
    }
  }

  return {
    title: `${listing.title} - Directory Starter`,
    description: listing.blurb,
    openGraph: {
      title: listing.title,
      description: listing.blurb,
      images: [listing.logo],
    },
  }
}

export default function ListingPage({ params }: { params: { listing: string } }) {
  const listing = mockListings.find(
    (l) => l.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === params.listing
  )

  if (!listing) {
    notFound()
  }

  return (
    <div className="container mx-auto px-5 py-10 max-w-4xl">
      <div className="section-spacing">
        <Breadcrumbs breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'All Listings', href: '/listings' },
          { label: listing.title, href: `/listings/${params.listing}` }
        ]} />
      </div>
      <Card className="section-spacing">
        <CardHeader className="pb-6">
          <div className="flex items-start gap-5">
            <Avatar className="h-16 w-16">
              <AvatarImage src={listing.logo} alt={`${listing.title} logo`} />
              <AvatarFallback>{listing.title.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-3xl mb-2">{listing.title}</CardTitle>
              <p className="text-muted-foreground text-lg element-spacing">{listing.blurb}</p>
              <div className="flex items-center gap-5">
                <Badge variant="secondary" className="text-sm">
                  {listing.category}
                </Badge>
                {listing.isFeatured && (
                  <Badge className="text-sm">Featured</Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold element-spacing">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{listing.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold element-spacing flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {listing.tags.map((tag) => (
                  <a
                    key={tag}
                    href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-block"
                  >
                    <Badge variant="outline" className="hover:bg-muted transition-colors">
                      #{tag}
                    </Badge>
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <a
                href={listing.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-5 rounded-md hover:bg-primary/90 transition-colors font-medium"
              >
                Visit Website
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <a
          href={`/categories/${listing.category.toLowerCase().replace(/\s+/g, '-')}`}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to {listing.category} listings
        </a>
      </div>
    </div>
  )
}
