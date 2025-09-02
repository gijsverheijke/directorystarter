import { Skeleton } from "../ui/skeleton";

export default function BreadcrumbsSkeleton() {
  return (
    <div className="section-spacing">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-12" />
        <span className="text-muted-foreground">/</span>
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}