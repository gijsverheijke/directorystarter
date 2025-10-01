import { MetadataRoute } from 'next'
import { getAllListings, getCategories, getTags } from '@/utils/supabase/queries'
import { readdirSync } from 'fs'
import { join } from 'path'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all approved listings
  const { listings } = await getAllListings()

  // Get all categories
  const categories = await getCategories()

  // Get all tags
  const tags = await getTags()

  // Get blog posts from file system
  const blogDir = join(process.cwd(), 'app', 'blog')
  let blogPosts: string[] = []
  try {
    blogPosts = readdirSync(blogDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
  } catch (error) {
    console.error('Error reading blog directory:', error)
  }

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Listing pages
  const listingPages: MetadataRoute.Sitemap = listings.map((listing) => ({
    url: `${baseUrl}/listings/${listing.slug}`,
    lastModified: new Date(listing.updated_at || listing.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/categories/${encodeURIComponent(category)}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  // Tag pages
  const tagPages: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${baseUrl}/tags/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // Blog post pages
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...listingPages, ...categoryPages, ...tagPages, ...blogPages]
}