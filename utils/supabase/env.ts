const PLACEHOLDER_KEY_PARTS = ['placeholder', 'your-', 'publishable-key', 'anon-key']

function getPublishableKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    ''
}

function isPlaceholderUrl(value: string) {
  if (!value) {
    return true
  }

  const normalized = value.trim().toLowerCase()

  if (
    normalized === 'your-project-url' ||
    normalized.includes('placeholder') ||
    normalized.includes('example.supabase.co')
  ) {
    return true
  }

  try {
    const url = new URL(normalized)
    return url.hostname === 'example.supabase.co'
  } catch {
    return true
  }
}

function isPlaceholderKey(value: string) {
  if (!value) {
    return true
  }

  const normalized = value.trim().toLowerCase()
  return PLACEHOLDER_KEY_PARTS.some((part) => normalized.includes(part))
}

export function getSupabaseConfig() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    key: getPublishableKey(),
  }
}

export function getSupabaseConfigIssue() {
  const { url, key } = getSupabaseConfig()

  if (isPlaceholderUrl(url)) {
    return 'Supabase URL is missing or uses a placeholder value.'
  }

  if (isPlaceholderKey(key)) {
    return 'Supabase publishable key is missing or uses a placeholder value.'
  }

  return null
}

export function hasUsableSupabaseConfig() {
  return getSupabaseConfigIssue() === null
}
