import BreadcrumbsSkeleton from "@/components/loading/BreadcrumbsSkeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container-spacing">
      <BreadcrumbsSkeleton />
      
      <Card className="section-spacing">
        <CardHeader className="pb-6">
          <div className="flex items-start small-spacing">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-9 w-64 mb-2" />
              <Skeleton className="h-6 w-full element-spacing" />
              <div className="flex items-center small-spacing">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Skeleton className="h-6 w-24 element-spacing" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>

            <div>
              <Skeleton className="h-6 w-16 element-spacing" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-6 w-16" />
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}