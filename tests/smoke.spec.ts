import { expect, test } from '@playwright/test'

test('renders the home page shell', async ({ page }) => {
  const scriptWarnings: string[] = []
  page.on('console', (message) => {
    if (message.text().includes('Encountered a script tag while rendering React component')) {
      scriptWarnings.push(message.text())
    }
  })

  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Awesome Directory', level: 1 })).toBeVisible()
  await expect(page.getByRole('searchbox', { name: 'Search' })).toBeVisible()
  await expect(page.getByRole('navigation')).toBeVisible()
  expect(scriptWarnings).toEqual([])
})

test('renders file-backed MDX blog pages', async ({ page }) => {
  await page.goto('/blog')

  await expect(page.locator('nav[aria-label="breadcrumb"]')).toHaveCount(1)
  await expect(page.getByRole('heading', { name: 'Blog', level: 1 })).toBeVisible()
  await expect(page.getByRole('heading', { name: /hello world/i, level: 2 })).toBeVisible()

  await page.locator('a[href="/blog/hello-world"]').click()
  await expect(page.getByRole('heading', { name: /hello world/i, level: 1 })).toBeVisible()
})

test('renders listings quickly with placeholder Supabase env', async ({ page }) => {
  test.setTimeout(10_000)

  const startedAt = Date.now()
  await page.goto('/listings')
  await expect(page.getByRole('heading', { name: 'All Listings', level: 1 })).toBeVisible()

  expect(Date.now() - startedAt).toBeLessThan(5_000)
})

test('serves the generated sitemap', async ({ request }) => {
  const response = await request.get('/sitemap.xml')

  expect(response.ok()).toBe(true)
  expect(response.headers()['content-type']).toMatch(/xml/)
  expect(await response.text()).toContain('<urlset')
})
