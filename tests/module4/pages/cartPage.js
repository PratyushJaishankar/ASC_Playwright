// pages/cartPage.js
const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.checkoutButton = page.getByText('Checkout', { exact: true });

    }

    async proceedToCheckout() {
        await expect(this.checkoutButton).toBeVisible(); // ✅ assertion
        await this.checkoutButton.click();

        // ✅ assertion: verify on checkout page
        await expect(this.page).toHaveURL(/order/);
    }
}

module.exports = CartPage;