import { createClient } from '@/utils/supabase/server'
import { getUserListings } from '@/utils/supabase/actions'
import { redirect } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import UserListings from '@/components/dashboard/UserListings'
import { Suspense } from 'react'
import ListingGridSkeleton from '@/components/loading/ListingGridSkeleton'

export const metadata = {
  title: 'Dashboard | Manage Your Listings',
  description: 'View and manage your submitted listings. Edit, delete, and track the status of your directory submissions.',
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ 
    error?: string
    updated?: string
    deleted?: string
  }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const params = await searchParams
  const listings = await getUserListings(user.id)

  return (
    <div className="container-spacing">
      <div className="section-spacing">
        <Breadcrumbs breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dashboard', href: '/dashboard' }
        ]} />
      </div>

      <DashboardHeader 
        userEmail={user.email || 'Anonymous'}
        totalListings={listings.length}
        error={params.error}
        updated={params.updated}
        deleted={params.deleted}
      />
      
      <div className="section-spacing">
        <Suspense fallback={<ListingGridSkeleton />}>
          <UserListings listings={listings} />
        </Suspense>
      </div>
    </div>
  )
}
