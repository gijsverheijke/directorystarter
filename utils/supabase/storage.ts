'use server'

import { createClient as createServerClient } from '@/utils/supabase/server'

const STORAGE_BUCKET = 'logos'
const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']

export async function uploadLogo(file: File, userId: string): Promise<string | null> {
  try {
    // Validate file
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size too large. Maximum 2MB allowed.')
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, WebP, and SVG are allowed.')
    }

    const supabase = await createServerClient()

    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${Date.now()}.${fileExt}`

    // Convert File to ArrayBuffer for server-side upload
    const arrayBuffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)

    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(fileName, uint8Array, {
        contentType: file.type,
        upsert: false
      })

    if (error) {
      console.error('Storage upload error:', error)
      throw new Error('Failed to upload file')
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(data.path)

    return urlData.publicUrl
  } catch (error) {
    console.error('Upload error:', error)
    return null
  }
}

export async function deleteLogo(logoUrl: string): Promise<boolean> {
  try {
    if (!logoUrl.includes(STORAGE_BUCKET)) {
      // Not a Supabase storage URL, nothing to delete
      return true
    }

    const supabase = await createServerClient()

    // Extract file path from URL
    const urlParts = logoUrl.split(`/${STORAGE_BUCKET}/`)
    if (urlParts.length !== 2) {
      return false
    }

    const filePath = urlParts[1]

    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([filePath])

    if (error) {
      console.error('Storage delete error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Delete error:', error)
    return false
  }
}