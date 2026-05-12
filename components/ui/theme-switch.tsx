'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon, Monitor } from 'lucide-react'

const THEMES_OPTIONS = [
  {
    label: 'Light',
    id: 'light',
    icon: <Sun className="h-4 w-4" />,
  },
  {
    label: 'Dark',
    id: 'dark',
    icon: <Moon className="h-4 w-4" />,
  },
  {
    label: 'System',
    id: 'system',
    icon: <Monitor className="h-4 w-4" />,
  },
]

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-1" suppressHydrationWarning>
      {THEMES_OPTIONS.map((option) => (
        <button
          key={option.id}
          onClick={() => setTheme(option.id)}
          className={`
            flex items-center justify-center w-5 h-5 rounded-sm transition-colors
            ${
              theme === option.id
                ? 'bg-background text-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
            }
          `}
          title={`Switch to ${option.label} theme`}
        >
          {option.icon}
        </button>
      ))}
    </div>
  )
}
