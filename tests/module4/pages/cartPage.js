const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.checkoutButton = page.getByText('Checkout', { exact: true });
    }

    // Proceed from cart page to checkout
    async proceedToCheckout() {
        console.log('Verifying Checkout button is visible');
        await expect(this.checkoutButton).toBeVisible(); // assertion

        console.log('Clicking Checkout button');
        await this.checkoutButton.click();

        console.log('Verifying navigation to Checkout page');
        await expect(this.page).toHaveURL(/order/); // assertion
    }
}

module.exports = CartPage;
