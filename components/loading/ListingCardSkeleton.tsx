import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function ListingCardSkeleton() {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="px-5 relative">
        <div className="flex items-start gap-5">
          <Skeleton className="size-8 flex-shrink-0 rounded-full" />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}