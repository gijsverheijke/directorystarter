'use server'

import { redirect } from 'next/navigation'
import { createClient as createServerClient } from '@/utils/supabase/server'
import { TABLE_NAME } from '@/utils/supabase/queries'
import type { Listing } from '@/types/listing'
import { generateSlug, normalizeTags, isValidUrl } from '@/app/submit/submitutils'

async function ensureUniqueSlug(baseSlug: string): Promise<string> {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('slug')
    .ilike('slug', `${baseSlug}%`)

  if (error) {
    console.error('Error checking slug uniqueness:', error)
    return baseSlug
  }

  const used = new Set((data || []).map((r: { slug: string }) => r.slug))
  if (!used.has(baseSlug)) return baseSlug

  for (let i = 2; i < 1000; i++) {
    const candidate = `${baseSlug}-${i}`
    if (!used.has(candidate)) return candidate
  }
  return `${baseSlug}-${Date.now()}`
}

export async function createListing(formData: FormData) {
  const title = String(formData.get('title') || '').trim()
  const blurb = String(formData.get('blurb') || '').trim()
  const description = String(formData.get('description') || '').trim()
  const external_url = String(formData.get('external_url') || '').trim()
  const logo_url = String(formData.get('logo_url') || '').trim()
  const category = String(formData.get('category') || '').trim()
  const tagsInput = String(formData.get('tags') || '')

  if (!title || !blurb || !description || !external_url || !category) {
    return redirect('/submit?error=missing_required')
  }
  if (!isValidUrl(external_url) || (logo_url && !isValidUrl(logo_url))) {
    return redirect('/submit?error=invalid_url')
  }

  const tags = normalizeTags(tagsInput)
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  const baseSlug = generateSlug(title)
  const slug = await ensureUniqueSlug(baseSlug)

  // Use the Listing type properly
  const listing: Omit<Listing, 'id' | 'created_at' | 'updated_at'> = {
    title,
    blurb,
    slug,
    description,
    external_url,
    logo_url,
    category,
    tags,
    is_featured: false,
    status: 'pending',
    user_id: user?.id ?? null
  }

  const { error } = await supabase
    .from(TABLE_NAME)
    .insert([listing])

  if (error) {
    console.error('Error submitting listing:', error)
    return redirect('/submit?error=insert_failed')
  }
  return redirect('/?submitted=1')
}

export async function getUserListings(userId: string): Promise<Listing[]> {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching user listings:', error)
    return []
  }

  return data || []
}

export async function updateListing(listingId: string, formData: FormData) {
  console.log('=== UPDATE LISTING START ===')
  console.log('Listing ID:', listingId)
  
  const title = String(formData.get('title') || '').trim()
  const blurb = String(formData.get('blurb') || '').trim()
  const description = String(formData.get('description') || '').trim()
  const external_url = String(formData.get('external_url') || '').trim()
  const logo_url = String(formData.get('logo_url') || '').trim()
  const category = String(formData.get('category') || '').trim()
  const tagsInput = String(formData.get('tags') || '')

  console.log('Form data:', { title, blurb, category, external_url })

  if (!title || !blurb || !description || !external_url || !category) {
    console.log('Missing required fields')
    return redirect('/dashboard?error=missing_required')
  }
  if (!isValidUrl(external_url) || (logo_url && !isValidUrl(logo_url))) {
    console.log('Invalid URL')
    return redirect('/dashboard?error=invalid_url')
  }

  const tags = normalizeTags(tagsInput)
  const supabase = await createServerClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  console.log('User:', user?.id, 'User error:', userError)
  
  if (!user) {
    console.log('No user found, redirecting to login')
    return redirect('/login')
  }

  // First verify the user owns this listing
  console.log('Checking ownership for listing:', listingId, 'user:', user.id)
  const { data: existingListing, error: fetchError } = await supabase
    .from(TABLE_NAME)
    .select('user_id, slug')
    .eq('id', listingId)
    .single()

  console.log('Existing listing:', existingListing, 'Fetch error:', fetchError)

  if (!existingListing || existingListing.user_id !== user.id) {
    console.log('Ownership check failed:', { 
      listingExists: !!existingListing,
      listingUserId: existingListing?.user_id,
      currentUserId: user.id 
    })
    return redirect('/dashboard?error=unauthorized')
  }

  // Generate new slug only if title changed
  const baseSlug = generateSlug(title)
  let slug = existingListing.slug
  
  // Check if we need a new slug (title changed)
  if (generateSlug(title) !== existingListing.slug) {
    slug = await ensureUniqueSlug(baseSlug)
  }

  const updates: Partial<Listing> = {
    title,
    blurb,
    slug,
    description,
    external_url,
    logo_url,
    category,
    tags,
    status: 'pending' // Reset to pending when edited
  }

  console.log('Attempting to update with:', updates)
  console.log('Update conditions: listingId =', listingId, 'user.id =', user.id)
  console.log('TABLE_NAME:', TABLE_NAME)
  
  const { error, data } = await supabase
    .from(TABLE_NAME)
    .update(updates)
    .eq('id', listingId)
    .eq('user_id', user.id) // Double-check ownership

  console.log('Update result:', { error, data })

  if (error) {
    console.error('Error updating listing:', error)
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint
    })
    return redirect('/dashboard?error=update_failed')
  }
  
  console.log('Update successful, redirecting to dashboard')
  return redirect('/dashboard?updated=1')
}

export async function deleteListing(listingId: string) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return redirect('/login')
  }

  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', listingId)
    .eq('user_id', user.id) // Ensure user can only delete their own listings

  if (error) {
    console.error('Error deleting listing:', error)
    return redirect('/dashboard?error=delete_failed')
  }
  
  return redirect('/dashboard?deleted=1')
}