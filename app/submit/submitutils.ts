export function generateSlug(title: string): string {
  const normalized = title
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .replace(/-{2,}/g, '-')
  // Ensure max length (DB column is 255)
  return normalized.slice(0, 255)
}

export function normalizeTags(input: string): string[] {
  const parts = input
    .split(',')
    .map((t) => t.trim().toLowerCase())
    .filter((t) => t.length > 0)

  const unique = Array.from(new Set(parts))
  const limited = unique
    .filter((t) => t.length >= 2 && t.length <= 30)
    .slice(0, 10)
  return limited
}

export function isValidUrl(url: string): boolean {
  try {
    const u = new URL(url)
    return u.protocol === 'https:' || u.protocol === 'http:'
  } catch {
    return false
  }
}

export function getAvatarFallback(title: string): string {
  return title.charAt(0).toUpperCase()
}


