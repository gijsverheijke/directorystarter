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
        return "border-0 bg-gray-50 dark:bg-gray-800/50 focus-within:bg-white dark:focus-within:bg-gray-900 focus-within:shadow-md"
      case "outlined":
        return "border-2 border-gray-200 dark:border-gray-700 focus-within:border-blue-500 dark:focus-within:border-blue-400"
      default:
        return "border border-gray-300 dark:border-gray-600 focus-within:border-blue-500 dark:focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-500/20"
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
          className="absolute left-3 h-4 w-4 text-gray-400 dark:text-gray-500" 
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
            variant === "minimal" && "text-gray-700 dark:text-gray-300"
          )}
          aria-label="Search"
        />

        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 h-7 w-7 rounded-md p-0 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            aria-label="Clear search"
          >
            <XIcon className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Optional: Show search suggestions or recent searches */}
      {isFocused && query.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 shadow-lg">
          {/* This can be populated with search suggestions */}
          <div className="p-2 text-sm text-gray-500 dark:text-gray-400">
            Press Enter to search for &ldquo;{query}&rdquo;
          </div>
        </div>
      )}
    </form>
  )
}