// specs/lab3_1.spec.js
import dotenv from 'dotenv';
dotenv.config({ quiet: true });
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const DashboardPage = require('../pages/dashboardPage');


test('Lab 3.1: Explicit Waits and Assertions (POM) - use .env creds', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Step 1: Open login page & login with credentials from .env
  await loginPage.open();
  await loginPage.login(process.env.LOGIN_EMAIL, process.env.LOGIN_PASSWORD);
  await loginPage.verifyDashboardNavigation();

  // Step 2: Explicit wait for product section
  await page.waitForSelector('.card-body', { state: 'visible' });
  console.log('Products section is visible');

  // Step 3: Assertion suite
  await expect(page.getByRole('heading', { name: 'Filters' })).toBeVisible();
  await expect(page.getByText('ZARA COAT 3')).toHaveText('ZARA COAT 3');

  const products = page.locator('.card-body');
  await expect(products).toHaveCount(3);

  // Optionally reuse existing DashboardPage methods
});
