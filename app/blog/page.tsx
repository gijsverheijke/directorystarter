import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata = {
  title: 'Blog - Directory Starter',
  description: 'Read our latest insights, updates, and guides about tools and services in our directory.',
}

export default function BlogPage() {
  return (
    <div className="container-spacing">
      <div className="section-spacing">
        <Breadcrumbs breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' }
        ]} />
      </div>
      <div className="section-spacing">
        <h1 className="text-4xl font-bold element-spacing">Blog</h1>
        <p className="text-muted-foreground text-lg">
          Coming soon! Stay tuned for insights, updates, and guides about the tools and services in our directory.
        </p>
      </div>
    </div>
  )
}
