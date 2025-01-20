const { test, expect } = require('@playwright/test');

test.use({ storageState: 'playwright/.auth/user.json' });

test('Check AI Package Is Subscribed ', async ({ page }) => {
  const cookies = await page.context().cookies();

  




});  