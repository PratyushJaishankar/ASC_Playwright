const { test } = require('@playwright/test');
const { RegisterPage } = require('../pages/RegisterPage'); 

test('Navigate and interact with registration page', async ({ page }) => {
  const registerPage = new RegisterPage(page);

  await registerPage.open();                 // Step 1: Go to homepage
  await registerPage.navigateToRegister();   // Step 2: Click Register
  await registerPage.verifyOnRegisterPage(); // Step 3: Verify URL + Register button
});
