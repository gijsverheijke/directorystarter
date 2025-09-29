import Link from "next/link"
import { Card, CardContent } from "../ui/card"
import SafeAvatar from "../ui/safe-avatar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Listing } from "@/types/listing"
import DeleteListingButton from "@/components/dashboard/DeleteListingButton"
import { getAvatarFallback } from "@/app/submit/submitutils"

interface DashboardListingCardProps {
  listing: Listing
}

export default function DashboardListingCard({ listing }: DashboardListingCardProps) {

  const getStatusClass = (status: string | undefined) => {
    switch (status) {
      case 'approved':
        return 'status-approved'
      case 'pending':
        return 'status-pending'
      case 'rejected':
        return 'status-rejected'
      default:
        return 'status-default'
    }
  }

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="px-5">
        <div className="flex items-start gap-5 element-spacing">
          <SafeAvatar 
            src={listing.logo_url}
            alt={listing.title}
            fallback={getAvatarFallback(listing.title)}
            className="size-8 flex-shrink-0"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-sm text-foreground">
                {listing.title}
              </h3>
              <div className="flex gap-1 flex-shrink-0">
                {listing.is_featured && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5">
                    Featured
                  </Badge>
                )}
                <Badge
                  className={`text-[10px] px-1.5 py-0.5 ${getStatusClass(listing.status)}`}
                >
                  {listing.status || 'pending'}
                </Badge>
              </div>
            </div>
            <p className="text-muted-foreground text-xs leading-tight line-clamp-2 element-spacing">
              {listing.blurb}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {listing.status === 'approved' && (
            <Link href={`/listings/${listing.slug}`}>
              <Button variant="outline" size="sm">
                View Live
              </Button>
            </Link>
          )}
          
          <Link href={`/submit/${listing.id}`}>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </Link>
          <DeleteListingButton listingId={listing.id!} listingTitle={listing.title} />
        </div>
      </CardContent>
    </Card>
  )
}
