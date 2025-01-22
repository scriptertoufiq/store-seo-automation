const { test, expect } = require("@playwright/test");

test.use({ storageState: "playwright/.auth/user.json" });

test.describe("Dashboard checking Of Shopify Store ", () => {
  let dashboardLocator;

  test.beforeEach(async ({ page }) => {
    await page.goto(
      "https://admin.shopify.com/store/toufiq-automation-do-not-delete"
    );
    await page.waitForLoadState("domcontentloaded"); // Better than fixed timeout
    dashboardLocator = page.frameLocator("iframe[name='app-iframe']");
  });



  test("Dashboard checking Of Shopify Store ", async ({ page }) => {
   
    await expect(page.getByText("Setup guide")).toBeVisible(); // Ensure the authenticated page loads

    // navigate to storeseo dashboard
    await page.getByRole("link", { name: "StoreSEO" }).click();
    //check dashboard is loaded and welcome message is visible
    let a = dashboardLocator.getByText(/Welcome to StoreSEO/);
    await expect(a).toBeVisible();
    //check dashboard is loaded  and store details text is visible
    let dashBoardProductCard = dashboardLocator.getByText(/Products/);
    await expect(dashBoardProductCard).toBeVisible();
    let dashBoardCollectionCard = dashboardLocator.getByText(/Collections/);
    await expect(dashBoardCollectionCard).toBeVisible();
    let dashBoardPageCard = dashboardLocator.getByText(/Pages/);
    await expect(dashBoardPageCard).toBeVisible();
    let dashBoardBlogCard = dashboardLocator.getByText(/Blog Posts/);
    await expect(dashBoardBlogCard).toBeVisible();

    let storeDet = dashboardLocator.getByText(/Store Details/);
    if (await storeDet.isVisible()) {
      await dashboardLocator.getByText(/View reports/).click();
      await page.waitForURL("https://admin.shopify.com/store/toufiq-automation-do-not-delete/apps/storeseo-2/reports");
    }
  });

  test("Dashboard Get Stated Section of optimization", async ({ page }) => {
     // navigate to storeseo dashboard
     await page.getByRole("link", { name: "StoreSEO" }).click();

    let getStarted = dashboardLocator.getByText(/Get started/);
    await expect(getStarted).toBeVisible();
    let getStartedDes = dashboardLocator.getByText(/Optimize your product for search engines instantly and rank them on top of the search results/);
    await expect(getStartedDes).toBeVisible();

    if (await getStarted.isVisible()) {
      await dashboardLocator.getByText(/Optimize your products/).click();
      await page.waitForURL("https://admin.shopify.com/store/toufiq-automation-do-not-delete/apps/storeseo-2/optimize-seo");
    }
  });

  test("Dashboard Get App Embed Section", async ({ page }) => {
    await page.getByRole("link", { name: "StoreSEO" }).click();

    let getDataDes = dashboardLocator.getByText("To enable some advanced features (i.e., SEO Schema, Google verification, Noindex/Nofollow), you need to enable the App Embed for StoreSEO from your Shopify settings. Go to the settings page and follow the instructions to enable it.");
    await expect(getDataDes).toBeVisible();

    if (await getDataDes.isVisible()) {
      await dashboardLocator.getByText(/App Embed Settings/).click();
      await page.waitForURL("https://admin.shopify.com/store/toufiq-automation-do-not-delete/apps/storeseo-2/settings/app-embed");
    }
    await page.waitForTimeout(10000);
    let GetButtonTitle = dashboardLocator.getByText(/Enable app embed/);
    if (await GetButtonTitle.isVisible()) {
      await GetButtonTitle.click();
    }



  });

});
