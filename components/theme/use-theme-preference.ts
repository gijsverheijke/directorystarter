'use client'

import { useCallback, useEffect, useState } from 'react'

export type ThemePreference = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'theme'
const THEME_CHANGE_EVENT = 'theme-preference-change'
const mediaQuery = '(prefers-color-scheme: dark)'

function isThemePreference(value: string | null): value is ThemePreference {
  return value === 'light' || value === 'dark' || value === 'system'
}

function getStoredTheme(): ThemePreference {
  if (typeof window === 'undefined') {
    return 'system'
  }

  const storedTheme = window.localStorage.getItem(STORAGE_KEY)
  return isThemePreference(storedTheme) ? storedTheme : 'system'
}

function resolveTheme(theme: ThemePreference) {
  if (theme !== 'system') {
    return theme
  }

  return window.matchMedia(mediaQuery).matches ? 'dark' : 'light'
}

function applyTheme(theme: ThemePreference) {
  const resolvedTheme = resolveTheme(theme)
  document.documentElement.classList.toggle('dark', resolvedTheme === 'dark')
  document.documentElement.style.colorScheme = resolvedTheme
}

export function useThemePreference() {
  const [theme, setThemeState] = useState<ThemePreference>(() => getStoredTheme())

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    const updateFromSystem = () => {
      if (getStoredTheme() === 'system') {
        applyTheme('system')
      }
    }

    const updateFromStorage = () => {
      const storedTheme = getStoredTheme()
      setThemeState(storedTheme)
      applyTheme(storedTheme)
    }

    const media = window.matchMedia(mediaQuery)
    media.addEventListener('change', updateFromSystem)
    window.addEventListener('storage', updateFromStorage)
    window.addEventListener(THEME_CHANGE_EVENT, updateFromStorage)

    return () => {
      media.removeEventListener('change', updateFromSystem)
      window.removeEventListener('storage', updateFromStorage)
      window.removeEventListener(THEME_CHANGE_EVENT, updateFromStorage)
    }
  }, [])

  const setTheme = useCallback((nextTheme: ThemePreference) => {
    window.localStorage.setItem(STORAGE_KEY, nextTheme)
    setThemeState(nextTheme)
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT))
  }, [])

  return { theme, setTheme }
}
