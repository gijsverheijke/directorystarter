import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"


interface BreadcrumbsProps {
  breadcrumbs: {
    label: string
    href: string
  }[]
}

export default function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  return <Breadcrumb>
    <BreadcrumbList>
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center">
          <BreadcrumbItem>
            <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.label}</BreadcrumbLink>
          </BreadcrumbItem>
          {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
        </div>
      ))}
    </BreadcrumbList>
  </Breadcrumb>
}