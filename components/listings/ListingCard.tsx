import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import SafeAvatar from "../ui/safe-avatar";
import { Badge } from "../ui/badge";
import { Listing } from "@/types/listing";
import { getAvatarFallback } from "@/app/submit/submitutils";

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {

  const listingSlug = listing.slug

  return (
    <Card className="listing-card group">
      <Link 
        href={`/listings/${listingSlug}`}
        className="absolute inset-0 z-10"
        aria-label={`View ${listing.title} details`}
      >
        <span className="sr-only">View {listing.title} details</span>
      </Link>
      
      <CardContent className="px-5 relative">
        <div className="flex items-start gap-5">
          <SafeAvatar 
            src={listing.logo_url}
            alt={listing.title}
            fallback={getAvatarFallback(listing.title)}
            className="size-8 flex-shrink-0"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors duration-200">
                {listing.title}
              </h3>
              {listing.is_featured && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5 mb-1 flex-shrink-0">
                  Featured
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground text-xs leading-tight line-clamp-2">
              {listing.blurb}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


