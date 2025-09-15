const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;

    // Locator for email input field
    this.emailInput = page.locator('#userEmail');

    // Locator for password input field
    this.passwordInput = page.locator('#userPassword');

    // Locator for login button
    this.loginButton = page.locator('#login');
  }

  // Open the login page URL
  async open() {
    console.log('Navigating to login page');
    await this.page.goto('https://rahulshettyacademy.com/client');
    console.log('Login page opened');
  }

  // Perform login with provided email and password
  async login(email, password) {
    console.log(`Filling email: ${email}`);
    await this.emailInput.fill(email);

    console.log('Filling password');
    await this.passwordInput.fill(password);

    console.log('Clicking login button');
    await this.loginButton.click();
    console.log('Login submitted');
  }

  // Verify navigation to the dashboard page after login
  async verifyDashboardNavigation() {
    console.log('Verifying navigation to dashboard page');
    await expect.soft(this.page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash');
    console.log('Dashboard navigation verified');
  }
}

module.exports = { LoginPage };
