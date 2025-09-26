'use client'

import * as React from 'react'
import { deleteListing } from '@/utils/supabase/actions'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'

interface DeleteListingButtonProps {
  listingId: string
  listingTitle: string
}

export default function DeleteListingButton({ listingId, listingTitle }: DeleteListingButtonProps) {
  const [open, setOpen] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteListing(listingId)
      setOpen(false)
    } catch (error) {
      console.error('Error deleting listing:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
          Delete
        </Button>
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Listing</DialogTitle>
        </DialogHeader>
        
        <div className="py-5">
          <p className="body-text">
            Are you sure you want to delete <strong>{listingTitle}</strong>?
          </p>
          <p className="caption mt-2">
            This action cannot be undone.
          </p>
        </div>

        <DialogFooter className="gap-2">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Listing'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
