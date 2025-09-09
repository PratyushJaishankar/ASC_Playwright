// pages/loginPage.js
const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.getByRole('textbox', { name: 'email@example.com' });
        this.passwordInput = page.getByRole('textbox', { name: 'enter your passsword' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async navigate() {
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
        await expect(this.loginButton).toBeVisible(); // ✅ assertion: login page loaded
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.page.waitForTimeout(2000);
        await this.loginButton.click();
        // ✅ assertion: verify dashboard after login
        await expect(this.page).toHaveURL(/dashboard/);
    }
}

module.exports = LoginPage;
