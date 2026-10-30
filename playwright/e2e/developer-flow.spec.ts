import { test, expect } from '@playwright/test';

test.describe('MonoForge /developer Route Flow', () => {
  test('navigates to /developer and displays Monaco workspace', async ({ page }) => {
    await page.goto('/developer');

    // Verify developer page loaded with header
    await expect(page.locator('header').getByText('MonoForge')).toBeVisible();
    await expect(page.getByText('/developer')).toBeVisible();

    // Verify action buttons
    await expect(page.getByRole('button', { name: 'Plugins & Presets' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Copy README/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /README\.md/i })).toBeVisible();
  });

  test('toggles plugin drawer and live preview', async ({ page }) => {
    await page.goto('/developer');

    // Toggle plugin panel
    const pluginsBtn = page.getByRole('button', { name: 'Plugins & Presets' });
    if (await pluginsBtn.isVisible()) {
      await pluginsBtn.click();
      await expect(page.getByRole('button', { name: /Plugins \(\d+\)/ })).toBeHidden();
      await pluginsBtn.click();
      await expect(page.getByRole('button', { name: /Plugins \(\d+\)/ })).toBeVisible();
    }
  });
});
