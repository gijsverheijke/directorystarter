import { expect, test } from '@playwright/test'

test('renders the home page shell', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Awesome Directory', level: 1 })).toBeVisible()
  await expect(page.getByRole('searchbox', { name: 'Search' })).toBeVisible()
  await expect(page.getByRole('navigation')).toBeVisible()
})

test('renders file-backed MDX blog pages', async ({ page }) => {
  await page.goto('/blog')

  await expect(page.getByRole('heading', { name: 'Blog', level: 1 })).toBeVisible()
  await expect(page.getByRole('heading', { name: /hello world/i, level: 2 })).toBeVisible()

  await page.locator('a[href="/blog/hello-world"]').click()
  await expect(page.getByRole('heading', { name: /hello world/i, level: 1 })).toBeVisible()
})

test('serves the generated sitemap', async ({ request }) => {
  const response = await request.get('/sitemap.xml')

  expect(response.ok()).toBe(true)
  expect(response.headers()['content-type']).toMatch(/xml/)
  expect(await response.text()).toContain('<urlset')
})
