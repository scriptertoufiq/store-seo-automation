const { test, expect } = require("@playwright/test");
require('dotenv').config();
const baseUrl = process.env.BASE_URL;

test.use({ storageState: "playwright/.auth/user.json" });

test.describe("Go to Image Alt Text Generate page  ", () => {
  let dashboardLocator;

  test.beforeEach(async ({ page }) => {
    await page.goto(
      `${baseUrl}/apps/storeseo-2/image-alt-text`
    );
    await page.waitForLoadState("domcontentloaded"); // Better than fixed timeout
    dashboardLocator = page.frameLocator("iframe[name='app-iframe']");
  });



  test("Dashboard checking Of Image Alt Text Generator Page", async ({ page }) => {
     
     await page.waitForTimeout(5000);
     await expect(page.getByText(/Image Alt Text Generator/)).toBeVisible(); // Ensure the authenticated page loads
 
     let GetButtonTitle = dashboardLocator.getByRole("link", { name: /Manage Settings/ });
     if (await GetButtonTitle.isVisible()) {
       await GetButtonTitle.click();
       await page.waitForURL(`${baseUrl}/apps/storeseo-2/settings/auto-ai-optimization`);
     }
     // navigate to storeseo Image optimizer dashboard again
     await page.getByRole("link", { name: "Image Alt Text Generator" }).click();
   });




});
