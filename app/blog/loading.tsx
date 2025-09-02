import BreadcrumbsSkeleton from "@/components/loading/BreadcrumbsSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container-spacing">
      <BreadcrumbsSkeleton />
      
      <div className="section-spacing">
        <Skeleton className="h-10 w-20 element-spacing" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div 
              key={index}
              className="block border border-border rounded-lg p-5"
            >
              <article>
                <Skeleton className="h-6 w-48 element-spacing" />
                <Skeleton className="h-4 w-32" />
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}