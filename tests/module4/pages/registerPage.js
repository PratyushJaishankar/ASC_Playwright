const { expect } = require('@playwright/test');

class RegisterPage {
  constructor(page) {
    this.page = page;
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.urlPattern = /.*\/auth\/register/;
  }

  async open() {
    await this.page.goto('https://rahulshettyacademy.com/client');
  }

  async navigateToRegister() {
    await this.registerLink.click();
  }

  async verifyOnRegisterPage() {
    await expect(this.page).toHaveURL(this.urlPattern);
    await expect(this.registerButton).toBeVisible();
  }
}

module.exports = { RegisterPage };
