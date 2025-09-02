import BreadcrumbsSkeleton from "@/components/loading/BreadcrumbsSkeleton";
import PageHeaderSkeleton from "@/components/loading/PageHeaderSkeleton";
import ListingGridSkeleton from "@/components/loading/ListingGridSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container-spacing">
      <BreadcrumbsSkeleton />
      <PageHeaderSkeleton />

      <div className="section-spacing">
        <div className="flex items-center gap-5 section-spacing">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-6 w-20" />
        </div>
        <ListingGridSkeleton count={3} />
      </div>

      <div>
        <Skeleton className="h-8 w-32 section-spacing" />
        <ListingGridSkeleton count={9} />
      </div>
    </div>
  );
}