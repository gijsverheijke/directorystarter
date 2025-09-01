'use client'

import { useState } from "react"
import { SearchIcon, XIcon } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
  variant?: "default" | "minimal" | "outlined"
}

export default function SearchBar({ 
  placeholder = "Search listings...", 
  onSearch,
  className,
  variant = "default"
}: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim() && onSearch) {
      onSearch(query.trim())
    }
  }

  const handleClear = () => {
    setQuery("")
    if (onSearch) {
      onSearch("")
    }
  }

  const getVariantStyles = () => {
    switch (variant) {
      case "minimal":
        return "border-0 bg-muted focus-within:bg-background focus-within:shadow-md"
      case "outlined":
        return "border-2 border-border focus-within:border-ring"
      default:
        return "border border-input focus-within:border-ring focus-within:ring-1 focus-within:ring-ring/20"
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("relative max-w-lg", className)}>
      <div className={cn(
        "relative flex items-center rounded-lg transition-all duration-200",
        getVariantStyles(),
        isFocused && "shadow-sm"
      )}>
        <SearchIcon 
          className="absolute left-3 h-5 w-5 text-muted-foreground" 
          aria-hidden="true"
        />
        
        <Input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "pl-10 pr-10 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0",
            variant === "minimal" && "text-foreground"
          )}
          aria-label="Search"
        />

        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 h-7 w-7 rounded-md p-0 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <XIcon className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Optional: Show search suggestions or recent searches */}
      {isFocused && query.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border border-border bg-popover shadow-lg">
          {/* This can be populated with search suggestions */}
          <div className="p-2 body-text-small text-muted-foreground">
            Press Enter to search for &ldquo;{query}&rdquo;
          </div>
        </div>
      )}
    </form>
  )
}