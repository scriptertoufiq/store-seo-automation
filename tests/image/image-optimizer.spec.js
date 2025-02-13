const { test, expect } = require("@playwright/test");

test.use({ storageState: "playwright/.auth/user.json" });

test.describe("Go to Image Optimizer page  ", () => {
  let dashboardLocator;

  test.beforeEach(async ({ page }) => {
    await page.goto(
      "https://admin.shopify.com/store/toufiq-automation-do-not-delete/apps/storeseo-2/image-optimizer"
    );
    await page.waitForLoadState("domcontentloaded"); // Better than fixed timeout
    dashboardLocator = page.frameLocator("iframe[name='app-iframe']");
  });

  test("Dashboard checking Of Image Optimizer Page", async ({ page }) => {
    
    await page.waitForTimeout(5000);
    await expect(page.getByText(/Image Optimizer/)).toBeVisible(); // Ensure the authenticated page loads

    let GetButtonTitle = dashboardLocator.getByRole("link", { name: /Manage Settings/ });
    if (await GetButtonTitle.isVisible()) {
      await GetButtonTitle.click();
      await page.waitForURL("https://admin.shopify.com/store/toufiq-automation-do-not-delete/apps/storeseo-2/settings/image-optimizer");
    }
    // navigate to storeseo Image optimizer dashboard again
    await page.getByRole("link", { name: "Image Optimizer" }).click();
  });

  test("Test Image Optimizer Package ", async ({ page }) => {
    // await page.waitForTimeout(6000);
    await expect(page.getByText("(Current plan: 1,000 Images/month)")).toBeVisible();
  });


  test("Test Image Optimizer In a Image ", async ({ page }) => {
    // await page.waitForTimeout(6000);
    const buttons = await page.locator('table tr:nth-of-type(2) ').allTextContents();
  });
});
