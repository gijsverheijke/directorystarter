import { getAllListings } from '@/utils/supabase/queries'
import BrowseBadge from '@/components/ui/browse-badge'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateSlug } from '@/app/submit/submitutils'

export const metadata = {
  title: 'Tags - Directory Starter',
  description: 'Browse tools and services by tag. Discover resources with specific features and capabilities.',
  openGraph: {
    title: 'Tags - Directory Starter',
    description: 'Browse tools and services by tag.',
  },
}

export default async function TagsPage() {
  const { listings } = await getAllListings()

  // Get unique tags with counts
  const tagData = listings.reduce((acc, listing) => {
    (listing.tags || []).forEach(tag => {
      const slug = generateSlug(tag)
      if (!acc[tag]) {
        acc[tag] = {
          name: tag,
          count: 0,
          featuredCount: 0,
          slug
        }
      }
      acc[tag].count++
      if (listing.is_featured) {
        acc[tag].featuredCount++
      }
    })
    return acc
  }, {} as Record<string, { name: string; count: number; featuredCount: number; slug: string }>)

  const tags = Object.values(tagData).sort((a, b) => b.count - a.count)

  return (
    <div className="container-spacing">
      <div className="section-spacing">
        <Breadcrumbs breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Tags', href: '/tags' }
        ]} />
      </div>
      <div className="section-spacing">
        <div className="flex items-center gap-5 element-spacing">
          <div className="flex items-center gap-5">
            <h1 className="text-4xl font-bold">Tags</h1>
          </div>
        </div>
        <p className="text-muted-foreground text-lg">
          A list of all the tags in our directory.
        </p>
      </div>

      <div className="flex flex-wrap gap-5">
        {tags.map((tag) => (
          <BrowseBadge
            key={tag.slug}
            name={tag.name}
            count={tag.count}
            href={`/tags/${tag.slug}`}
            prefix="#"
          />
        ))}
      </div>

      
    </div>
  )
}
