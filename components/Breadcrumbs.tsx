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
      <BreadcrumbItem>
        <BreadcrumbLink href={breadcrumbs[0].href}>{breadcrumbs[0].label}</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href={breadcrumbs[1].href}>{breadcrumbs[1].label}</BreadcrumbLink>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
}