import { mockListings } from '@/lib/mock-data'
import BrowseBadge from '@/components/ui/browse-badge'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata = {
  title: 'Categories - Directory Starter',
  description: 'Browse tools and services by category. Find exactly what you need organized by type.',
  openGraph: {
    title: 'Categories - Directory Starter',
    description: 'Browse tools and services by category.',
  },
}

export default function CategoriesPage() {
  // Get unique categories with counts
  const categoryData = mockListings.reduce((acc, listing) => {
    const category = listing.category
    if (!acc[category]) {
      acc[category] = {
        name: category,
        count: 0,
        featuredCount: 0,
        slug: category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      }
    }
    acc[category].count++
    if (listing.isFeatured) {
      acc[category].featuredCount++
    }
    return acc
  }, {} as Record<string, { name: string; count: number; featuredCount: number; slug: string }>)

  const categories = Object.values(categoryData).sort((a, b) => b.count - a.count)

  return (
    <div className="container-spacing">
      <div className="section-spacing">
        <Breadcrumbs breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Categories', href: '/categories' }
        ]} />
      </div>
      <div className="section-spacing">
        <div className="flex items-center gap-5 element-spacing">
          <div className="flex items-center gap-5">
            <h1 className="text-4xl font-bold">Categories</h1>
          </div>
        </div>
        <p className="text-muted-foreground text-lg">
          A list of all the categories in our directory.
        </p>
      </div>

      <div className="flex flex-wrap gap-5">
        {categories.map((category) => (
          <BrowseBadge
            key={category.slug}
            name={category.name}
            count={category.count}
            href={`/categories/${category.slug}`}
          />
        ))}
      </div>

     
    </div>
  )
}
