export interface Listing {
  id?: string
  created_at?: string
  updated_at?: string
  title: string
  blurb: string
  slug: string
  description: string
  external_url: string
  logo_url: string
  category: string
  tags: string[]
  status?: 'pending' | 'approved' | 'rejected'
  is_featured: boolean
  user_id?: string | null
}