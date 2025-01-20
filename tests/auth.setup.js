import { test as setup, expect } from '@playwright/test';
import path from 'path';
require('dotenv').config();
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto('https://admin.shopify.com/store/toufiq-automation-do-not-delete');
    await page.getByLabel('Email').fill(email);
    await page.getByRole('button', { name: 'Continue with email' }).click();
    await page.waitForTimeout(40000);
    // await page.getByLabel('Password').fill(password);
    // await page.getByText('You are offline Reconnect or refresh the page to log in. Log in Continue to').click();
    // await page.getByRole('button', { name: 'Log in' }).click();

    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    await page.waitForURL('https://admin.shopify.com/store/toufiq-automation-do-not-delete?country=BD');

    // // Alternatively, you can wait until the page reaches a state where all cookies are set.
    await expect(page.getByText('Setup guide')).toBeVisible();

    // End of authentication steps.
    // await page.waitForTimeout(30000);
    await page.context().storageState({ path: authFile });
});