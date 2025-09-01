import { ReactNode } from 'react'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function BlogLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="container-spacing">
      <div className="section-spacing">
        <Breadcrumbs breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' }
        ]} />
      </div>
      <div className="section-spacing max-w-4xl">
        {children}
      </div>
    </div>
  )
}
