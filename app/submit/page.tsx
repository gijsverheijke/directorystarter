import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getCategories } from '@/utils/supabase/queries'
import { createListing } from '@/utils/supabase/actions'

export default async function SubmitPage({ 
  searchParams 
}: { 
  searchParams?: { [key: string]: string | string[] | undefined } 
}) {
  const categories = await getCategories()
  const error = typeof searchParams?.error === 'string' ? searchParams?.error : undefined
  const success = typeof searchParams?.success === 'string' ? searchParams?.success : undefined

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <h1 className="text-2xl font-semibold">Submit</h1>

      {error && <div className="text-destructive">There was a problem: {error}</div>}
      {success && <div className="text-green-600">Thanks! Your listing was submitted.</div>}

      <form action={createListing} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="title">Title</label>
          <Input id="title" name="title" required />
        </div>

        <div className="space-y-2">
          <label htmlFor="blurb">Blurb</label>
          <textarea id="blurb" name="blurb" required className="w-full rounded-md border px-5 py-2" rows={3} />
        </div>

        <div className="space-y-2">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" required className="w-full rounded-md border px-5 py-2" rows={6} />
        </div>

        <div className="space-y-2">
          <label htmlFor="external_url">Website</label>
          <Input id="external_url" name="external_url" type="url" required />
        </div>

        <div className="space-y-2">
          <label htmlFor="logo_url">Logo URL</label>
          <Input id="logo_url" name="logo_url" type="url" />
        </div>

        <div className="space-y-2">
          <label>Category</label>
          <Select name="category" required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <Input id="tags" name="tags" placeholder="tag1, tag2, tag3" />
        </div>

        <Button type="submit">Submit listing</Button>
      </form>
    </div>
  )
}