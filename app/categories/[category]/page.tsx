import { getAllListings, getCategories } from '@/utils/supabase/queries'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import ListingCard from '@/components/listings/ListingCard'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import { generateSlug } from '@/app/submit/submitutils'

// Generate static params for all categories at build time
export async function generateStaticParams() {
  const categories = await getCategories()
  
  return categories.map((category) => ({
    category: generateSlug(category)
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { category: string } }) {
  const categorySlug = params.category
  const categoryName = categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  // Find the actual category by matching the slug
  const { listings: allListings } = await getAllListings()
  const listingsInCategory = allListings.filter(
    listing => generateSlug(listing.category) === categorySlug
  )

  if (listingsInCategory.length === 0) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.'
    }
  }

  return {
    title: `${categoryName} - Directory Starter`,
    description: `Discover ${listingsInCategory.length} ${categoryName.toLowerCase()} tools and services in our directory.`,
    openGraph: {
      title: `${categoryName} Category`,
      description: `Browse ${listingsInCategory.length} ${categoryName.toLowerCase()} listings`,
    },
  }
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const categorySlug = params.category
  const categoryName = categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  // Find the actual category by matching the slug
  const { listings: allListings } = await getAllListings()
  const listingsInCategory = allListings.filter(
    listing => generateSlug(listing.category) === categorySlug
  )

  if (listingsInCategory.length === 0) {
    notFound()
  }

  return (
    <div className="container-spacing">
      <div className="section-spacing">
        <Breadcrumbs breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Categories', href: '/categories' },
          { label: categoryName, href: `/categories/${categorySlug}` }
        ]} />
      </div>
      <div className="section-spacing">
        <div className="flex items-center gap-5 element-spacing">
          <h1 className="text-4xl font-bold">{categoryName}</h1>
          <Badge variant="secondary" className="text-lg px-5 py-1">
            {listingsInCategory.length} {listingsInCategory.length === 1 ? 'listing' : 'listings'}
          </Badge>
        </div>
        <p className="text-muted-foreground text-lg">
          Explore our curated collection of {categoryName.toLowerCase()} tools and services.
        </p>
      </div>

      <div className="listing-grid">
        {listingsInCategory.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      <div className="mt-15 text-center">
        <Link
          href="/categories"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Browse all categories
        </Link>
      </div>
    </div>
  )
}
