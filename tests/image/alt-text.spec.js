const { test, expect } = require("@playwright/test");

test.use({ storageState: "playwright/.auth/user.json" });

test.describe("Dashboard checking Of Shopify Store ", () => {
  let dashboardLocator;

  test.beforeEach(async ({ page }) => {
    await page.goto(
      "https://admin.shopify.com/store/toufiq-automation-do-not-delete/apps/storeseo-2/image-optimizer"
    );
    await page.waitForLoadState("domcontentloaded"); // Better than fixed timeout
    dashboardLocator = page.frameLocator("iframe[name='app-iframe']");
  });

  test("Dashboard checking Of Shopify Store ", async ({ page }) => {
    
    await page.waitForTimeout(5000);
    await expect(page.getByText(/Image Optimizer/)).toBeVisible(); // Ensure the authenticated page loads

    let GetButtonTitle = dashboardLocator.getByRole("link", { name: "Manage Settings" });
    if (await GetButtonTitle.isVisible()) {
      await GetButtonTitle.click();
      await page.waitForURL("https://admin.shopify.com/store/toufiq-automation-do-not-delete/apps/storeseo-2/settings/image-optimizer");
    }
    
    
  });

});
