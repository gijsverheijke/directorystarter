import BreadcrumbsSkeleton from "@/components/loading/BreadcrumbsSkeleton";
import ListingGridSkeleton from "@/components/loading/ListingGridSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container-spacing">
      <BreadcrumbsSkeleton />
      
      <div className="section-spacing">
        <div className="flex items-center gap-5 element-spacing">
          <div className="flex items-center gap-5">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="h-8 w-24" />
        </div>
        <Skeleton className="h-6 w-72" />
      </div>

      <ListingGridSkeleton />

      <div className="mt-15 text-center">
        <Skeleton className="h-5 w-32 mx-auto" />
      </div>
    </div>
  );
}