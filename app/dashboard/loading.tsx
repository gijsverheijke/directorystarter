import PageHeaderSkeleton from '@/components/loading/PageHeaderSkeleton'
import ListingGridSkeleton from '@/components/loading/ListingGridSkeleton'

export default function DashboardLoading() {
  return (
    <div className="container-spacing">
      <PageHeaderSkeleton />
      <ListingGridSkeleton />
    </div>
  )
}
