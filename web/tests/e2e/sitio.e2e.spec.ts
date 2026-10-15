import { expect, test } from '@playwright/test'

test.describe('Sitio público', () => {
  test('portada', async ({ page }) => {
    await page.goto('http://localhost:3000/')
    await expect(page).toHaveTitle(/Firmatech/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Reparamos tu equipo')
    await expect(page.getByRole('link', { name: 'Pedir turno' }).first()).toBeVisible()
  })

  test('mi cuenta pide iniciar sesión', async ({ page }) => {
    await page.goto('http://localhost:3000/cuenta')
    await expect(page).toHaveURL(/\/ingresar\?next=%2Fcuenta|\/ingresar\?next=\/cuenta/)
    await expect(page.getByRole('heading', { name: 'Ingresá a tu cuenta' })).toBeVisible()
  })

  test('login con datos incorrectos muestra error', async ({ page }) => {
    await page.goto('http://localhost:3000/ingresar')
    await page.getByLabel('Correo').fill('nadie@firmatech.test')
    await page.getByLabel('Contraseña').fill('incorrecta-123')
    await page.getByRole('button', { name: 'Ingresar' }).click()
    await expect(page.getByRole('alert')).toContainText('Correo o contraseña incorrectos')
  })

  test('el healthcheck responde', async ({ request }) => {
    const res = await request.get('http://localhost:3000/api/salud')
    expect(res.ok()).toBe(true)
  })
})
