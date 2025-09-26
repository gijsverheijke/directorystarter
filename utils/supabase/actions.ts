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
  return redirect('/submit?success=1')
}