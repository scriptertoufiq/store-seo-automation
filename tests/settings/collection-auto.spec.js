const { test, expect } = require("@playwright/test");
require('dotenv').config();
const baseUrl = process.env.BASE_URL;

test.use({ storageState: "playwright/.auth/user.json" });

test.describe("Go to Email Settings page  ", () => {
  let dashboardLocator;

  test.beforeEach(async ({ page }) => {
    await page.goto(
      `${baseUrl}/apps/storeseo-2/settings/auto-ai-optimization?tab=COLLECTION`
    );
    await page.waitForLoadState("domcontentloaded"); // Better than fixed timeout
    dashboardLocator = page.frameLocator("iframe[name='app-iframe']");
  });

  test("Email Notificaiton  Settings Page", async ({ page }) => {
    
    await page.waitForTimeout(7000);
    let headingTitle = await dashboardLocator.locator("p[class='Polaris-Text--root Polaris-Text--headingMd']").getByText("Auto AI Optimization"); // Ensure the authenticated page loads
    await expect(headingTitle).toBeVisible();
    
  });

  



});
