import { Skeleton } from '@/components/ui/skeleton'

export default function EditListingLoading() {
  return (
    <div className="container-spacing">
      <div className="section-spacing">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-12" />
          <span className="text-muted-foreground">/</span>
          <Skeleton className="h-4 w-20" />
          <span className="text-muted-foreground">/</span>
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-5">
        <div className="px-5 py-10 border rounded-lg">
          <div className="px-5 mb-6">
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          
          <div className="px-5 space-y-5">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
            
            <div className="mt-5">
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
