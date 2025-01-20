const { test, expect } = require('@playwright/test');

test.use({ storageState: 'playwright/.auth/user.json' });

test('Dashboard checking Of Shopify Store ', async ({ page }) => {
  const cookies = await page.context().cookies();
  let dashboardLocator = await page.frameLocator("iframe[name='app-iframe']");

  await page.goto('https://admin.shopify.com/store/toufiq-automation-do-not-delete');
  await page.waitForTimeout(4000);
  await expect(page.getByText('Setup guide')).toBeVisible(); // Ensure the authenticated page loads

  // navigate to storeseo dashboard
  await page.getByRole('link', { name: 'StoreSEO' }).click();
  //check dashboard is loaded and welcome message is visible
  let a = dashboardLocator.getByText(/Welcome to StoreSEO/);
  await expect(a).toBeVisible();
  //check dashboard is loaded  and store details text is visible
  let storeDet = dashboardLocator.getByText(/Store Details/);
  await expect(storeDet).toBeVisible();
  //check dashboard and go to optimize page
  let getStarted = dashboardLocator.getByText(/Get started/);
  await expect(getStarted).toBeVisible();
  let getStartedDes = dashboardLocator.getByText(/Optimize your product for search engines instantly and rank them on top of the search results/);
  await expect(getStartedDes).toBeVisible();
  // click button  optimize your products
  if(await expect(getStarted).toBeVisible()){
    await dashboardLocator.getByRole('button', { name: 'Optimize your products' }).click();
    await page.waitForURL('https://app.storeseo.com/optimize-seo');
    await page.waitForTimeout(5000);
  }

  // app embed button check and click 
  let appEmbed = dashboardLocator.getByText(/App embed is not enabled/);
  let appEmbedFalse = await expect(appEmbed).toBeVisible();
  if (appEmbedFalse) {
    await dashboardLocator.getByRole('button', { name: 'Enable app embed' }).click();
    await page.waitForURL('https://app.storeseo.com/settings/app-embed');
    await page.waitForTimeout(5000);
  }
  // whats new section check
  // let whatsNew = dashboardLocator.getByText(/ What's New/);
  // await expect(whatsNew).toBeVisible();

  

});  