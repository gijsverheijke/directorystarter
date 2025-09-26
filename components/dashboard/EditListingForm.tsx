'use client'

import * as React from 'react'
import { Listing } from '@/types/listing'
import { updateListing } from '@/utils/supabase/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CategorySelect } from '@/components/submit/CategorySelect'
import { SubmitForm } from '@/components/submit/SubmitForm'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface EditListingFormProps {
  listing: Listing
}

const categories = [
  'AI Tools',
  'Analytics',
  'Design',
  'Developer Tools',
  'E-commerce',
  'Education',
  'Finance',
  'Health & Fitness',
  'Marketing',
  'Productivity',
  'Social Media',
  'Other'
]

export default function EditListingForm({ listing }: EditListingFormProps) {
  const [open, setOpen] = React.useState(false)
  
  const handleUpdate = async (formData: FormData) => {
    await updateListing(listing.id!, formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Listing</DialogTitle>
        </DialogHeader>
        
        <SubmitForm action={handleUpdate} className="space-y-5">
          <div>
            <label htmlFor="title" className="label element-spacing">
              Title *
            </label>
            <Input
              id="title"
              name="title"
              type="text"
              required
              defaultValue={listing.title}
              placeholder="Your product or service name"
            />
          </div>

          <div>
            <label htmlFor="blurb" className="label element-spacing">
              Short Description *
            </label>
            <Input
              id="blurb"
              name="blurb"
              type="text"
              required
              defaultValue={listing.blurb}
              placeholder="One-line description of what you do"
              maxLength={120}
            />
          </div>

          <div>
            <label htmlFor="description" className="label element-spacing">
              Full Description *
            </label>
            <Textarea
              id="description"
              name="description"
              required
              defaultValue={listing.description}
              placeholder="Detailed description of your product or service..."
              rows={4}
            />
          </div>

          <div>
            <label htmlFor="external_url" className="label element-spacing">
              Website URL *
            </label>
            <Input
              id="external_url"
              name="external_url"
              type="url"
              required
              defaultValue={listing.external_url}
              placeholder="https://yourwebsite.com"
            />
          </div>

          <div>
            <label htmlFor="logo_url" className="label element-spacing">
              Logo URL
            </label>
            <Input
              id="logo_url"
              name="logo_url"
              type="url"
              defaultValue={listing.logo_url}
              placeholder="https://yourwebsite.com/logo.png (optional)"
            />
          </div>

          <div>
            <label htmlFor="category" className="label element-spacing">
              Category *
            </label>
            <CategorySelect
              name="category"
              options={categories}
              required
              defaultValue={listing.category}
              placeholder="Select a category"
            />
          </div>

          <div>
            <label htmlFor="tags" className="label element-spacing">
              Tags
            </label>
            <Input
              id="tags"
              name="tags"
              type="text"
              defaultValue={listing.tags?.join(', ') || ''}
              placeholder="ai, productivity, saas (comma-separated)"
            />
          </div>
        </SubmitForm>
      </DialogContent>
    </Dialog>
  )
}
