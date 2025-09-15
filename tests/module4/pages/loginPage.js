const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('#userEmail');
    this.passwordInput = page.locator('#userPassword');
    this.loginButton = page.locator('#login');
  }

  async open() {
    await this.page.goto('https://rahulshettyacademy.com/client');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyDashboardNavigation() {
    await expect.soft(this.page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash');
  }
}
module.exports = { LoginPage };
