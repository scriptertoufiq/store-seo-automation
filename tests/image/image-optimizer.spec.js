const { test, expect } = require("@playwright/test");
require('dotenv').config();
const baseUrl = process.env.BASE_URL;

test.use({ storageState: "playwright/.auth/user.json" });

test.describe("Go to Image Optimizer page  ", () => {
  let dashboardLocator;

  test.beforeEach(async ({ page }) => {
    await page.goto(
      `${baseUrl}/apps/storeseo-2/image-optimizer`
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
      await page.waitForURL(`${baseUrl}/apps/storeseo-2/settings/image-optimizer`);
    }
    // navigate to storeseo Image optimizer dashboard again
    await page.getByRole("link", { name: "Image Optimizer" }).click();
  });

  test("Test Image Optimizer Package ", async ({ page }) => {
    await page.waitForTimeout(6000);
    await expect(dashboardLocator.getByText("(Current plan: 1,000 Images/month)")).toBeVisible();
  });


  test("Test Image Optimizer In a Image ", async ({ page }) => {
    await page.waitForTimeout(6000);

    await dashboardLocator.locator("tr[id='447445769'] div[class='Polaris-ButtonGroup Polaris-ButtonGroup--noWrap'] div:nth-child(1) span:nth-child(1) button:nth-child(1) span:nth-child(1) span:nth-child(1) svg").click();
    let optimized447445769 = await dashboardLocator.locator("tr[id='447445769'] td:nth-child(4) span span:nth-child(2)").getByText("Optimized");
    await expect(optimized447445769).toBeVisible();

    await dashboardLocator.locator("tr[id='447445769'] div[class='Polaris-ButtonGroup Polaris-ButtonGroup--noWrap'] div:nth-child(2) span:nth-child(1) button:nth-child(1) span:nth-child(1) span:nth-child(1) svg").click();
    let not_optimized447445769 = await dashboardLocator.locator("tr[id='447445769'] td:nth-child(4) span span").getByText("Not Optimized");
    await expect(not_optimized447445769).toBeVisible();


    await dashboardLocator.locator("tr[id='447445768'] div[class='Polaris-ButtonGroup Polaris-ButtonGroup--noWrap'] div:nth-child(1) span:nth-child(1) button:nth-child(1) span:nth-child(1) span:nth-child(1) svg").click();
    let optimized447445768 = await dashboardLocator.locator("tr[id='447445768'] td:nth-child(4) span span:nth-child(2)").getByText("Optimized");
    await expect(optimized447445768).toBeVisible();

    await dashboardLocator.locator("tr[id='447445768'] div[class='Polaris-ButtonGroup Polaris-ButtonGroup--noWrap'] div:nth-child(2) span:nth-child(1) button:nth-child(1) span:nth-child(1) span:nth-child(1) svg").click();
    let not_optimized447445768 = await dashboardLocator.locator("tr[id='447445768'] td:nth-child(4) span span").getByText("Not Optimized");
    await expect(not_optimized447445768).toBeVisible();


    await dashboardLocator.locator("tr[id='447445767'] div[class='Polaris-ButtonGroup Polaris-ButtonGroup--noWrap'] div:nth-child(1) span:nth-child(1) button:nth-child(1) span:nth-child(1) span:nth-child(1) svg").click();
    let optimized447445767 = await dashboardLocator.locator("tr[id='447445767'] td:nth-child(4) span span:nth-child(2)").getByText("Optimized");
    await expect(optimized447445767).toBeVisible();

    await dashboardLocator.locator("tr[id='447445767'] div[class='Polaris-ButtonGroup Polaris-ButtonGroup--noWrap'] div:nth-child(2) span:nth-child(1) button:nth-child(1) span:nth-child(1) span:nth-child(1) svg").click();
    let not_optimized447445767 = await dashboardLocator.locator("tr[id='447445767'] td:nth-child(4) span span").getByText("Not Optimized");
    await expect(not_optimized447445767).toBeVisible();

    
  });



});
