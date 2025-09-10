// pages/dashboardPage.js
const { expect } = require('@playwright/test');

class DashboardPage {
    constructor(page) {
        this.page = page;
        this.productCards = page.locator('.card'); // adjust selector
        this.cartButton = page.getByRole('button', { name: '   Cart' });
        this.toastMessage = page.locator('.toast-message'); // adjust selector
        this.page.keyboard.down('Control');
        this.page.keyboard.press('+');
        this.page.keyboard.up('Control');
    }

    async scrollToBottom() {
        await this.page.waitForTimeout(2000);
        await this.page.mouse.wheel(0, 5000);
        await expect(this.productCards.first()).toBeVisible();
    }

    async hoverOverFirstProduct() {
        await this.page.waitForTimeout(2000);
        const firstProduct = this.productCards.first();
        // await firstProduct.hover();
        const addToCartButton = firstProduct.getByRole('button', { name: ' Add To Cart' });
        const beforeHoverColor = await addToCartButton.evaluate(
            (el) => window.getComputedStyle(el).getPropertyValue('background-color')
        );
        await addToCartButton.hover();
        const afterHoverColor = await addToCartButton.evaluate(
            (el) => window.getComputedStyle(el).getPropertyValue('background-color')
        );
        // await expect(beforeHoverColor).not.toBe(afterHoverColor);
        // await this.page.pause();
        await expect(addToCartButton).toBeVisible(); // ✅ assertion
        await addToCartButton.click();
    }

    async handleAddToCartPopup() {
        await this.page.waitForTimeout(2000);
        await expect(this.toastMessage).toContainText('Product Added To Cart'); // ✅ assertion

        if (await this.toastMessage.getByRole('button', { name: 'Cart' }).isVisible()) {
            await this.toastMessage.getByRole('button', { name: 'Cart' }).click();
        } else {
            await this.cartButton.click();
        }

        // ✅ assertion: ensure navigation to cart page
        await expect(this.page).toHaveURL(/cart/);
    }
}

module.exports = DashboardPage;
