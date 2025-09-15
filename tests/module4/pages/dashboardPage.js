// pages/dashboardPage.js
const { expect } = require('@playwright/test');

class DashboardPage {
    constructor(page) {
        this.page = page;

        // Locator for all product cards on the dashboard
        this.productCards = page.locator('.card'); // adjust selector

        // Locator for the Cart button in header
        this.cartButton = page.getByRole('button', { name: '   Cart' });

        // Locator for toast popup message after adding product to cart
        this.toastMessage = page.locator('.toast-message'); // adjust selector

        // Zoom in the page using keyboard (Ctrl + +)
        console.log('Zooming in the page');
        this.page.keyboard.down('Control');
        this.page.keyboard.press('+');
        this.page.keyboard.up('Control');
        console.log('Page zoom applied');
    }

    // Scroll down to the bottom of the page to load all products
    async scrollToBottom() {
        console.log('Scrolling to bottom of the page');
        await this.page.waitForTimeout(2000); // wait for page content to settle
        await this.page.mouse.wheel(0, 5000); // scroll down
        console.log('Scroll done, verifying first product visibility');
        await expect(this.productCards.first()).toBeVisible(); // assertion to confirm products loaded
        console.log('First product is visible');
    }

    // Hover over the first product to reveal Add To Cart button
    async hoverOverFirstProduct() {
        console.log('Hovering over the first product');
        await this.page.waitForTimeout(2000); // wait for page to stabilize
        const firstProduct = this.productCards.first();

        // Locator for Add To Cart button inside the first product card
        const addToCartButton = firstProduct.getByRole('button', { name: ' Add To Cart' });

        // Capture background color before hover
        const beforeHoverColor = await addToCartButton.evaluate(
            (el) => window.getComputedStyle(el).getPropertyValue('background-color')
        );
        console.log('Background color before hover:', beforeHoverColor);

        // Hover over the Add To Cart button
        await this.page.waitForTimeout(2000);
        await addToCartButton.hover();
        await this.page.waitForTimeout(2000);
        console.log('Hovered over Add To Cart button');

        // Capture background color after hover
        const afterHoverColor = await addToCartButton.evaluate(
            (el) => window.getComputedStyle(el).getPropertyValue('background-color')
        );
        console.log('Background color after hover:', afterHoverColor);

        // Assertion: background color should change on hover
        await expect(beforeHoverColor).not.toBe(afterHoverColor);
        console.log('Background color changed as expected');

        // Assertion: button should be visible
        await expect(addToCartButton).toBeVisible();
        console.log('Add To Cart button is visible');

        // Click the Add To Cart button
        await addToCartButton.click();
        console.log('Clicked on Add To Cart button');
    }

    // Handle the popup message after adding product to cart
    async handleAddToCartPopup() {
        console.log('Handling Add To Cart popup');
        await this.page.waitForTimeout(2000); // wait for toast message

        // Assert toast message contains expected text
        await expect(this.toastMessage).toContainText('Product Added To Cart');
        console.log('Verified toast message: Product Added To Cart');

        // Check if Cart button inside toast is visible and click it
        if (await this.toastMessage.getByRole('button', { name: 'Cart' }).isVisible()) {
            console.log('Clicking Cart button inside toast');
            await this.toastMessage.getByRole('button', { name: 'Cart' }).click();
        } else {
            console.log('Clicking Cart button from header');
            await this.cartButton.click();
        }

        // Assertion: ensure we navigated to the cart page
        await expect(this.page).toHaveURL(/cart/);
        console.log('Navigation to Cart page verified');
    }
}

module.exports = DashboardPage;
