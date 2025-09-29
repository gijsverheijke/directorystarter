import { Input } from '@/components/ui/input'
import { SubmitForm } from '@/components/submit/SubmitForm'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { getCategories } from '@/utils/supabase/queries'
import { createListing } from '@/utils/supabase/actions'
import { CategorySelect } from '@/components/submit/CategorySelect'
import LogoUpload from '@/components/submit/LogoUpload'

export default async function SubmitPage({
  searchParams
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const categories = await getCategories()
  const sp = searchParams ? await searchParams : undefined
  const error = typeof sp?.error === 'string' ? sp.error : undefined
  const success = typeof sp?.success === 'string' ? sp.success : undefined

  return (
    <div className="max-w-3xl mx-auto page-spacing space-y-5">
      <Card className="px-5 py-10">
        <CardHeader className="px-5">
          <CardTitle className="heading-2">Submit</CardTitle>
          <CardDescription>Share your resource with the community.</CardDescription>
        </CardHeader>
        <SubmitForm action={createListing} className="space-y-5">
          <CardContent className="px-5 space-y-5">
            {error && (
              <div className="bg-destructive/10 text-destructive border border-destructive/40 rounded-md px-5 py-2">
                There was a problem: {error}
              </div>
            )}
            {success && (
              <div className="bg-secondary text-secondary-foreground border rounded-md px-5 py-2">
                Thanks! Your listing was submitted.
              </div>
            )}

            <div className="space-y-2">
              <label className="label" htmlFor="title">Title</label>
              <Input id="title" name="title" required />
            </div>

            <div className="space-y-2">
              <label className="label" htmlFor="blurb">Blurb</label>
              <Textarea
                id="blurb"
                name="blurb"
                rows={3}
                required
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
                placeholder="What is it, who is it for, and why is it great? Include key features, pricing (if any), and any unique angles. 3–8 sentences recommended."
              />
              <p className="caption">Provide enough detail for evaluation; avoid marketing fluff.</p>
            </div>

            <div className="space-y-2">
              <label className="label" htmlFor="external_url">Website</label>
              <Input id="external_url" name="external_url" type="url" required />
            </div>

            <LogoUpload name="logo_url" />

            <div className="space-y-2">
              <label className="label">Category</label>
              <CategorySelect name="category" options={categories} required />
            </div>

            <div className="space-y-2">
              <label className="label" htmlFor="tags">Tags (comma-separated)</label>
              <Input id="tags" name="tags" placeholder="tag1, tag2, tag3" />
            </div>
          </CardContent>
          <CardFooter className="px-5" />
        </SubmitForm>
      </Card>
    </div>
  )
}