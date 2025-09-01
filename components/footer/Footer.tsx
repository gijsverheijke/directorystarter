import { mockListings } from '@/lib/mock-data'
import { rights } from '@/lib/keycopy'

export default function Footer() {
  // Get unique categories and generate slugs (same logic as categories page)
  const categoryData = mockListings.reduce((acc, listing) => {
    const category = listing.category
    if (!acc[category]) {
      acc[category] = {
        name: category,
        slug: category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      }
    }
    return acc
  }, {} as Record<string, { name: string; slug: string }>)

  const categories = Object.values(categoryData).sort((a, b) => a.name.localeCompare(b.name))

  return (
    <footer className="border-t bg-muted/50">
      <div className="container-spacing py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <p className="text-sm text-muted-foreground">
              {rights}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-foreground mb-3">Navigation</h3>
            <div className="flex flex-col gap-2">
              <a
                href="/listings"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Browse Listings
              </a>
              <a
                href="/tags"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Tags
              </a>
              <a
                href="/blog"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Blog
              </a>
            </div>
          </div>

          {/* Categories Section */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-foreground mb-3">Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <a
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}