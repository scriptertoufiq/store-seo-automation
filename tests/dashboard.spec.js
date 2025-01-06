const { test, expect } = require('@playwright/test');

test.use({ storageState: 'playwright/.auth/user.json' });

test('Dashboard checking ', async ({ page }) => {
  const cookies = await page.context().cookies();

  await page.goto('https://admin.shopify.com/store/toufiq-automation-do-not-delete');
  await expect(page.getByText('Setup guide')).toBeVisible(); // Ensure the authenticated page loads
});