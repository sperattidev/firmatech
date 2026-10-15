import { expect, test, type Page } from '@playwright/test'

import { login } from '../helpers/login'
import { cleanupTestUser, seedTestUser, testUser } from '../helpers/seedUser'

test.describe('Panel de administración', () => {
  let page: Page

  test.beforeAll(async ({ browser }) => {
    await seedTestUser()
    page = await (await browser.newContext()).newPage()
    await login({ page, user: testUser })
  })

  test.afterAll(async () => {
    await cleanupTestUser()
  })

  test('muestra las colecciones en español', async () => {
    await page.goto('http://localhost:3000/admin/collections/customers')
    await expect(page.locator('h1', { hasText: 'Clientes' }).first()).toBeVisible()
  })
})
