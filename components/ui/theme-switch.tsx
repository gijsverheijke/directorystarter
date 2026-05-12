'use client'

import type { ReactNode } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useThemePreference, type ThemePreference } from '@/components/theme/use-theme-preference'

const THEMES_OPTIONS = [
  {
    label: 'Light',
    id: 'light' as const,
    icon: <Sun className="h-4 w-4" />,
  },
  {
    label: 'Dark',
    id: 'dark' as const,
    icon: <Moon className="h-4 w-4" />,
  },
  {
    label: 'System',
    id: 'system' as const,
    icon: <Monitor className="h-4 w-4" />,
  },
] satisfies Array<{
  label: string
  id: ThemePreference
  icon: ReactNode
}>

export function ThemeSwitch() {
  const { theme, setTheme } = useThemePreference()

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
