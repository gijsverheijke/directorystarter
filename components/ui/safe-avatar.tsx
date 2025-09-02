'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface SafeAvatarProps {
  src?: string | null
  alt: string
  fallback: string
  className?: string
}

export default function SafeAvatar({ src, alt, fallback, className }: SafeAvatarProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <Avatar className={className}>
      {src && !imageError && (
        <AvatarImage 
          src={src} 
          alt={alt}
          onError={() => setImageError(true)}
        />
      )}
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}