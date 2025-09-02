import { createClient } from '@supabase/supabase-js'
import { Listing } from '@/types/listing'

// Table name constant - change this for different directory instances
const TABLE_NAME = 'test_directory'

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)



// Get all approved listings
export async function getAllListings(): Promise<Listing[]> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching listings:', error)
    return []
  }

  return data || []
}

// Get featured listings
export async function getFeaturedListings(): Promise<Listing[]> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('status', 'approved')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching featured listings:', error)
    return []
  }

  return data || []
}

// Get listing by slug
export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('slug', slug)
    .eq('status', 'approved')
    .single()

  if (error) {
    console.error('Error fetching listing by slug:', error)
    return null
  }

  return data
}

// Get listings by category
export async function getListingsByCategory(category: string): Promise<Listing[]> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('category', category)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching listings by category:', error)
    return []
  }

  return data || []
}

// Get listings by tag
export async function getListingsByTag(tag: string): Promise<Listing[]> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .contains('tags', [tag])
    .eq('status', 'approved')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching listings by tag:', error)
    return []
  }

  return data || []
}

// Search listings by title and description
export async function searchListings(query: string): Promise<Listing[]> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%,blurb.ilike.%${query}%`)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error searching listings:', error)
    return []
  }

  return data || []
}

// Get all unique categories
export async function getCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('category')
    .eq('status', 'approved')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  // Extract unique categories
  const categories = [...new Set(data?.map(item => item.category) || [])]
  return categories.sort()
}

// Get all unique tags
export async function getTags(): Promise<string[]> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('tags')
    .eq('status', 'approved')

  if (error) {
    console.error('Error fetching tags:', error)
    return []
  }

  // Flatten and deduplicate tags
  const allTags = data?.flatMap(item => item.tags || []) || []
  const uniqueTags = [...new Set(allTags)]
  return uniqueTags.sort()
}

// Get recent listings (limit configurable)
export async function getRecentListings(limit: number = 10): Promise<Listing[]> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent listings:', error)
    return []
  }

  return data || []
}

// Get listings with pagination
export async function getListingsWithPagination(
  page: number = 1, 
  pageSize: number = 12
): Promise<{ listings: Listing[], total: number, hasMore: boolean }> {
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  // Get total count
  const { count } = await supabase
    .from(TABLE_NAME)
    .select('*', { count: 'exact', head: true })
    .eq('status', 'approved')

  // Get paginated data
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    console.error('Error fetching paginated listings:', error)
    return { listings: [], total: 0, hasMore: false }
  }

  const total = count || 0
  const hasMore = to < total - 1

  return {
    listings: data || [],
    total,
    hasMore
  }
}

// Submit a new listing (for user submissions)
export async function submitListing(listing: Omit<Listing, 'id' | 'created_at' | 'updated_at' | 'status'>): Promise<{ success: boolean, id?: string, error?: string }> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([{
      ...listing,
      status: 'pending' // New submissions start as pending
    }])
    .select('id')
    .single()

  if (error) {
    console.error('Error submitting listing:', error)
    return { success: false, error: error.message }
  }

  return { success: true, id: data?.id }
}

