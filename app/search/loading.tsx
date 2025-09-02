import BreadcrumbsSkeleton from "@/components/loading/BreadcrumbsSkeleton";
import ListingGridSkeleton from "@/components/loading/ListingGridSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container-spacing">
      <BreadcrumbsSkeleton />
      
      <div className="section-spacing">
        <div className="flex items-center gap-5 element-spacing">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-10 w-48" />
        </div>
        
        <div className="max-w-md element-spacing">
          <Skeleton className="h-10 w-full" />
        </div>
        
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>

      <ListingGridSkeleton />
    </div>
  );
}