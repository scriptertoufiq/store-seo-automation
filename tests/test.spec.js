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