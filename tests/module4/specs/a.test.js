import {test,expect} from '@playwright/test'
test('Navigate and interact with registration page', async({page}) => {
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('a[href="#/auth/register"]').click();
    const actual_url= await page.url();
    console.log('The actual URL : ' ,actual_url);
    await expect(page).toHaveURL(/.*\/auth\/register/);
    console.log('URL contains /auth/register');
    await expect.soft(page.getByText('Create Account')).toBeVisible();
    console.log('Verified: "Create Account" heading is not present on the Registration page.');

});