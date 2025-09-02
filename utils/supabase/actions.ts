import { Listing } from "@/types/listing"
import { createClient } from '@supabase/supabase-js'
import { TABLE_NAME } from './queries'

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

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