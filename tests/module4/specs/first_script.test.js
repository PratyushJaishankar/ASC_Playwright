const { test,expect } = require('@playwright/test');
const { RegisterPage } = require('../pages/Registration');

test('Navigate and interact with registration page (POM)', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    // Go to registration page
    await registerPage.goto();

    // Verify we are on the registration page
    await registerPage.verifyOnRegisterPage();

    // Verify "Create Account" heading is NOT present
    await expect.soft(registerPage.createAccountHeader).toHaveCount(0);
    console.log('Verified: "Create Account" heading is not present on the Registration page.');
});
