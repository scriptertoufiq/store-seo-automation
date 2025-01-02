// @ts-check
const { test, expect } = require('@playwright/test');
require('dotenv').config();
const baseURL = process.env.BASE_URL;
const email = process.env.EMAIL;
const password = process.env.PASSWORD;


test('Go to login page', async ({ page }) => {
await page.goto('https://www.shopify.com/partners');

await page.waitForLoadState('load'); // 'load' ensures the document is fully loaded


await page.getByRole('link', { name: 'External source: Log in' }).click();

// Ensure email and password are set in the environment
if (!email || !password) {
    throw new Error("Environment variables EMAIL and PASSWORD are not set.");
}
await page.getByLabel('Email').click();
await page.getByLabel('Email').fill(email); // Use the environment variable
await page.getByRole('button', { name: 'Continue with email' }).click();
await page.getByLabel('Password', { exact: true }).click();
await page.getByLabel('Password', { exact: true }).fill(password); // Use the environment variable
await page.getByRole('button', { name: 'Log in' }).click();
// if remind me text is not visible 
const remindMeLink = page.getByRole('link', { name: 'Remind me next time' });
await expect.soft(remindMeLink).toBeVisible(); // Ensure it checks visibility softly
if (await remindMeLink.isVisible().catch(() => false)) {
    await remindMeLink.click();
}
await page.getByRole('link', { name: 'Storeware Storeware' }).click();
await page.getByLabel('', { exact: true }).click();
await expect(page.getByRole('heading', { name: 'Stores' })).toBeVisible();

// next step to search store and login 
await page.getByLabel('', { exact: true }).click();
await page.getByLabel('', { exact: true }).fill('toufiq-automation-do-not-delete');
await page.waitForTimeout(500);

// here has a issue with modal 




});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
