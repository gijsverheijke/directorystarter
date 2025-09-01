import { Badge } from '@/components/ui/badge'

interface BrowseBadgeProps {
  name: string
  count: number
  href: string
  prefix?: string
}

export default function BrowseBadge({ name, count, href, prefix }: BrowseBadgeProps) {
  return (
    <a href={href} className="inline-block">
      <Badge 
        variant="outline" 
        className="hover:bg-muted transition-colors text-sm px-5 py-2 flex items-center gap-2"
      >
        {prefix && <span className="text-muted-foreground">{prefix}</span>}
        <span>{name}</span>
        <span className="text-muted-foreground">{count}</span>
      </Badge>
    </a>
  )
}
