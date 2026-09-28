import { expect, test } from '@playwright/test';

test('muestra el acceso profesional', async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByRole('heading', { name: 'Iniciar Sesión' })).toBeVisible();
});
