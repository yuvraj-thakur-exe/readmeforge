import { test, expect } from '@playwright/test';

test.describe('ReadmeForge Visual Wizard Flow', () => {
  test('navigates through the wizard steps, fills profile details, and validates real-time preview', async ({
    page,
  }) => {
    await page.goto('/wizard?mode=guided');

    // 1. Verify Header & Guided Studio
    await expect(page.locator('header').getByText('ReadmeForge')).toBeVisible();
    await expect(page.getByText('Step-by-Step Wizard')).toBeVisible();

    // 2. Identity Step: fill inputs
    const usernameInput = page.locator('input[placeholder="e.g. torvalds"]');
    await expect(usernameInput).toBeVisible();
    await usernameInput.fill('octocat');

    const nameInput = page.locator('input[placeholder="e.g. Linus Torvalds"]');
    await expect(nameInput).toBeVisible();
    await nameInput.fill('Mona Lisa Octocat');

    const roleInput = page.locator('input[placeholder*="Engineer"], input[placeholder*="Full-Stack" i], input[placeholder*="Developer" i]').first();
    if (await roleInput.isVisible()) {
      await roleInput.fill('Senior Open Source Engineer');
    }

    // 3. Verify Live Preview updates with typed identity
    await expect(page.getByText(/Hi there, I'm Mona Lisa Octocat/i)).toBeVisible();

    // 4. Click next step to Style & Vibe
    const nextBtn = page.getByRole('button', { name: /^Next$/i });
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();

    // 5. Verify Step 2 (Style & Vibe) loaded
    await expect(page.getByText('Visual Design & Badges')).toBeVisible();

    // 6. Navigate to Skills & Tech
    await page.getByRole('button', { name: 'Skills & Tech' }).click();
    await expect(page.getByText('Skills & Tech Stack Badges')).toBeVisible();

    // 7. Navigate to Stats & Plugins
    await page.getByRole('button', { name: 'Stats & Plugins' }).click();
    await expect(page.getByText('Stats Cards & Interactive Widgets')).toBeVisible();

    // 8. Toggle a plugin widget (e.g., GitHub Readme Stats)
    const statsToggle = page.locator('button').filter({ hasText: /GitHub Readme Stats/i });
    if (await statsToggle.isVisible()) {
      await statsToggle.click();
    }
  });
});
