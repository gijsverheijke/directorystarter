'use client'

import * as React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type CategorySelectProps = {
  name: string
  options: string[]
  required?: boolean
  placeholder?: string
  defaultValue?: string
}

export function CategorySelect({ name, options, required, placeholder = 'Select a category', defaultValue }: CategorySelectProps) {
  const [value, setValue] = React.useState<string>(defaultValue ?? '')
  const hiddenInputRef = React.useRef<HTMLInputElement | null>(null)

  React.useEffect(() => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = value
      // Trigger form validity re-check when value changes
      hiddenInputRef.current.dispatchEvent(new Event('input', { bubbles: true }))
      hiddenInputRef.current.dispatchEvent(new Event('change', { bubbles: true }))
    }
  }, [value])

  return (
    <>
      <input ref={hiddenInputRef} type="hidden" name={name} required={required} value={value} />
      <Select value={value || undefined} onValueChange={(v) => setValue(v)}>
        <SelectTrigger className="w-full" aria-invalid={required && !value ? true : undefined}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}


