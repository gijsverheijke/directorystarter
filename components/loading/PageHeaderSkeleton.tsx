import { Skeleton } from "../ui/skeleton";

export default function PageHeaderSkeleton() {
  return (
    <div className="section-spacing">
      <div className="flex items-center justify-between element-spacing">
        <div>
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-6 w-64" />
        </div>
        <Skeleton className="h-8 w-24" />
      </div>
      
      <div className="max-w-md">
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}