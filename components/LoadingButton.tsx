'use client'

import * as React from 'react'
import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'

type LoadingButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

export function LoadingButton({ children, className = '', disabled, ...props }: LoadingButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      {...props}
      disabled={pending || disabled}
      aria-busy={pending}
      className={`inline-flex items-center justify-center bg-primary text-primary-foreground px-5 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50 ${className}`}
   >
      {pending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
      {children}
    </button>
  )
}


