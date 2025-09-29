import { Input } from '@/components/ui/input'
import { SubmitForm } from '@/components/submit/SubmitForm'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { getCategories } from '@/utils/supabase/queries'
import { updateListing } from '@/utils/supabase/actions'
import { CategorySelect } from '@/components/submit/CategorySelect'
import LogoUpload from '@/components/submit/LogoUpload'
import { createClient } from '@/utils/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { TABLE_NAME } from '@/utils/supabase/queries'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata = {
  title: 'Edit Listing',
  description: 'Edit your submitted listing details and information.',
}

export default async function EditListingPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id } = await params
  const categories = await getCategories()
  const sp = searchParams ? await searchParams : undefined
  const error = typeof sp?.error === 'string' ? sp.error : undefined

  // Get the current user and verify ownership
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch the listing and verify ownership
  const { data: listing, error: fetchError } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (fetchError || !listing) {
    notFound()
  }

  // Create the update action with the listing ID bound
  const updateListingWithId = updateListing.bind(null, id)

  return (
    <div className="container-spacing">
      <div className="section-spacing">
        <Breadcrumbs breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Edit Listing', href: `/submit/${id}` }
        ]} />
      </div>

      <div className="max-w-3xl mx-auto space-y-5">
        <Card className="px-5 py-10">
          <CardHeader className="px-5">
            <CardTitle className="heading-2">Edit Listing</CardTitle>
            <CardDescription>Update your resource details.</CardDescription>
          </CardHeader>
          <SubmitForm action={updateListingWithId} className="space-y-5" buttonText="Update listing">
            <CardContent className="px-5 space-y-5">
              {error && (
                <div className="bg-destructive/10 text-destructive border border-destructive/40 rounded-md px-5 py-2">
                  There was a problem: {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="label" htmlFor="title">Title</label>
                <Input id="title" name="title" required defaultValue={listing.title} />
              </div>

              <div className="space-y-2">
                <label className="label" htmlFor="blurb">Blurb</label>
                <Textarea
                  id="blurb"
                  name="blurb"
                  rows={3}
                  required
                  defaultValue={listing.blurb}
                  placeholder="One-liner that sells your resource. Aim for 20–160 characters."
                />
                <p className="caption">Short summary used in listings. Keep it concise.</p>
              </div>

              <div className="space-y-2">
                <label className="label" htmlFor="description">Description</label>
                <Textarea
                  id="description"
                  name="description"
                  rows={6}
                  required
                  defaultValue={listing.description}
                  placeholder="What is it, who is it for, and why is it great? Include key features, pricing (if any), and any unique angles. 3–8 sentences recommended."
                />
                <p className="caption">Provide enough detail for evaluation; avoid marketing fluff.</p>
              </div>

              <div className="space-y-2">
                <label className="label" htmlFor="external_url">Website</label>
                <Input id="external_url" name="external_url" type="url" required defaultValue={listing.external_url} />
              </div>

              <LogoUpload name="logo_url" title={listing.title} defaultUrl={listing.logo_url || ''} />

              <div className="space-y-2">
                <label className="label">Category</label>
                <CategorySelect name="category" options={categories} required defaultValue={listing.category} />
              </div>

              <div className="space-y-2">
                <label className="label" htmlFor="tags">Tags (comma-separated)</label>
                <Input 
                  id="tags" 
                  name="tags" 
                  placeholder="tag1, tag2, tag3"
                  defaultValue={listing.tags?.join(', ') || ''}
                />
              </div>
            </CardContent>
            <CardFooter className="px-5" />
          </SubmitForm>
        </Card>
      </div>
    </div>
  )
}
