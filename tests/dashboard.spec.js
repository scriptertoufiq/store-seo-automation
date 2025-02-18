const { test, expect } = require("@playwright/test");
require('dotenv').config();
const baseUrl = process.env.BASE_URL;


test.use({ storageState: "playwright/.auth/user.json" });

test.describe("Dashboard checking Of Shopify Store ", () => {
  let dashboardLocator;

  test.beforeEach(async ({ page }) => {
    await page.goto(
      `${baseUrl}`
    );
    await page.waitForLoadState("domcontentloaded"); // Better than fixed timeout
    dashboardLocator = page.frameLocator("iframe[name='app-iframe']");
  });



  test("Dashboard checking Of Shopify Store ", async ({ page }) => {
    

    await page.waitForTimeout(5000);
    await expect(page.getByText(/Setup guide/)).toBeVisible(); // Ensure the authenticated page loads

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
      await page.waitForURL(`${baseUrl}/apps/storeseo-2/reports`);
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
      await page.waitForURL(`${baseUrl}/apps/storeseo-2/optimize-seo`);
    }
  });

  test("Dashboard Get App Embed Section", async ({ page }) => {
    await page.getByRole("link", { name: "StoreSEO" }).click();

    let getDataDes = dashboardLocator.getByText("To enable some advanced features (i.e., SEO Schema, Google verification, Noindex/Nofollow), you need to enable the App Embed for StoreSEO from your Shopify settings. Go to the settings page and follow the instructions to enable it.");
    // await expect(getDataDes).toBeVisible();

    if (await getDataDes.isVisible()) {
      await dashboardLocator.getByText(/App Embed Settings/).click();
      await page.waitForURL(`${baseUrl}/apps/storeseo-2/settings/app-embed`);
    }
    await page.waitForTimeout(10000);
    let GetButtonTitle = dashboardLocator.getByText(/Enable app embed/);
    if (await GetButtonTitle.isVisible()) {
      await GetButtonTitle.click();
    }



  });

  test("Dashboard What New Section", async ({ page }) => {
    await page.getByRole("link", { name: "StoreSEO" }).click();

    let GetSecHeading = dashboardLocator.getByText("What's New");
    await expect(GetSecHeading).toBeVisible();
  });

  test("Dashboard Image Optimizer Subscription check ", async ({ page }) => {
    await page.getByRole("link", { name: "StoreSEO" }).click();

    let getCardHeading = dashboardLocator.getByText("Image Optimizer");
    await expect(getCardHeading).toBeVisible();
    await page.waitForTimeout(3000);
    let GetButtonTitle = dashboardLocator.getByText("Increase limit");

    if (await GetButtonTitle.isVisible()) {
      await GetButtonTitle.click();
      await page.waitForURL(`${baseUrl}/apps/storeseo-2/checkout/basic?coupon=TREAT19`);
    }
  });

  test("Dashboard AI Optimizer Subscription check ", async ({ page }) => {
    await page.getByRole("link", { name: "StoreSEO" }).click();

    let getCardHeading = dashboardLocator.getByText("AI Content Optimizer");
    await expect(getCardHeading).toBeVisible();
    await page.waitForTimeout(3000);
    let GetButtonTitle = dashboardLocator.getByText("Increase limit");

    if (await GetButtonTitle.isVisible()) {
      await GetButtonTitle.click();
      await page.waitForURL(`${baseUrl}/apps/storeseo-2/credit-bundles`);
    }
  });

  test("Dashboard Auto image optimizer card check ", async ({ page }) => {
    await page.getByRole("link", { name: "StoreSEO" }).click();

    let getCardHeading = dashboardLocator.getByText(/Activate auto image optimization/);
    await page.waitForTimeout(3000);
    await expect(getCardHeading).toBeVisible();
    

    let GetButtonTitle = dashboardLocator.getByText("Enable auto image optimizer");
    if (await GetButtonTitle.isVisible()) {
      await GetButtonTitle.click();
      await page.waitForURL(`${baseUrl}/apps/storeseo-2/settings/image-optimizer`);
    }
  });

  test("Dashboard  AI Auto Product optimizer card check ", async ({ page }) => {
    await page.getByRole("link", { name: "StoreSEO" }).click();

    let getCardHeading = dashboardLocator.getByText(/Enable AI auto optimizer/);
    await page.waitForTimeout(3000);
    await expect(getCardHeading).toBeVisible();
    

    let GetButtonTitle = dashboardLocator.getByText("Activate AI auto optimizer");
    if (await GetButtonTitle.isVisible()) {
      await GetButtonTitle.click();
      await page.waitForURL(`${baseUrl}/apps/storeseo-2/settings/auto-ai-optimization`);
    }
  });

  test("Dashboard Doc and Tutorial Section", async ({ page }) => {
    await page.getByRole("link", { name: "StoreSEO" }).click();

    await page.waitForTimeout(10000);
    let docSection = dashboardLocator.getByText(/Stay tuned with StoreSEO/);
    if (!(await docSection.isVisible())) {
        throw new Error("The 'Stay tuned with StoreSEO' section is not visible.");
    }
    
    let appFromStoreWare = dashboardLocator.getByText(/Others apps from Storeware/);
    if (!(await appFromStoreWare.isVisible())) {
        throw new Error("The 'Others apps from Storeware' section is not visible.");
    }
    
    let guideSection = dashboardLocator.getByText(/Get our free Shopify SEO guide/);
    if (!(await guideSection.isVisible())) {
        throw new Error("The 'Get our free Shopify SEO guide' section is not visible.");
    }
    
    let pageFly = dashboardLocator.getByText(/PageFly Page Builder/);
    if (!(await pageFly.isVisible())) {
        throw new Error("The 'PageFly Page Builder' section is not visible.");
    }
    
    let thirdPartyApp = dashboardLocator.getByText(/Discover apps to add additional functionality/);
    if (!(await thirdPartyApp.isVisible())) {
        throw new Error("The 'Discover apps to add additional functionality' section is not visible.");
    }
  });

});
