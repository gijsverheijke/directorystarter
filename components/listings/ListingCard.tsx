import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Listing } from "@/types/listing";

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const getAvatarFallback = (title: string) => {
    return title.charAt(0).toUpperCase();
  };

  const listingSlug = listing.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

  return (
    <Card className="cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/20 group relative overflow-hidden">
      <Link 
        href={`/listings/${listingSlug}`}
        className="absolute inset-0 z-10"
        aria-label={`View ${listing.title} details`}
      >
        <span className="sr-only">View {listing.title} details</span>
      </Link>
      
      <CardContent className="px-5 relative">
        <div className="flex items-start gap-5">
          <Avatar className="size-8 flex-shrink-0">
            <AvatarImage src={listing.logo} alt={listing.title} />
            <AvatarFallback className="bg-primary text-primary-foreground font-medium text-xs">
              {getAvatarFallback(listing.title)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors duration-200">
                {listing.title}
              </h3>
              {listing.isFeatured && (
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


