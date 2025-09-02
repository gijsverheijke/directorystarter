import HeroSkeleton from "@/components/loading/HeroSkeleton";
import ListingGridSkeleton from "@/components/loading/ListingGridSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <HeroSkeleton />
      <main className="container-spacing">
        <ListingGridSkeleton />
        
        <div className="section-spacing pt-20">
          <div className="space-y-5">
            <Skeleton className="h-8 w-48 mx-auto" />
            <div className="space-y-2 max-w-2xl mx-auto">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-5/6 mx-auto" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}