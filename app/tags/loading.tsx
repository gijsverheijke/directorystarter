import BreadcrumbsSkeleton from "@/components/loading/BreadcrumbsSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container-spacing">
      <BreadcrumbsSkeleton />
      
      <div className="section-spacing">
        <div className="flex items-center gap-5 element-spacing">
          <div className="flex items-center gap-5">
            <Skeleton className="h-10 w-20" />
          </div>
        </div>
        <Skeleton className="h-6 w-64" />
      </div>

      <div className="flex flex-wrap gap-5">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} className="h-12 w-24" />
        ))}
      </div>
    </div>
  );
}