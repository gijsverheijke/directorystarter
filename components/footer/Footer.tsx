import { getCategories } from '@/utils/supabase/queries'
import { rights } from '@/lib/keycopy'
import { ThemeSwitch } from '@/components/ui/theme-switch'
import Link from 'next/link'
import { generateSlug } from '@/app/submit/submitutils'

export default async function Footer() {
  // Get unique categories from the database
  const categoryNames = await getCategories()
  
  // Generate category data with slugs
  const categories = categoryNames.map(category => ({
    name: category,
    slug: generateSlug(category)
  })).sort((a, b) => a.name.localeCompare(b.name))

  return (
    <footer className="border-t bg-muted/50">
      <div className="container-spacing py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="md:col-span-1">
            <p className="text-sm text-muted-foreground mb-4">
              {rights}
            </p>
            <div className="">
            <ThemeSwitch />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-foreground mb-3">Navigation</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/listings"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Browse Listings
              </Link>
              <Link
                href="/tags"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Tags
              </Link>
              <Link
                href="/blog"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Categories Section */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-foreground mb-3">Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}