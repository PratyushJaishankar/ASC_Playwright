// pages/checkoutPage.js
const { expect } = require('@playwright/test');

class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.cardNumberField = page.locator('input[type="text"]').first();
        this.expiryMonthDropdown = page.getByRole('combobox').nth(1);
        this.cvvField = page.locator('xpath=/html/body/app-root/app-order/section/div/div/div[2]/div/div/div[3]/div[1]/form/div/div[2]/div[2]/input');
        this.nameOnCardField = page.locator('xpath=/html/body/app-root/app-order/section/div/div/div[2]/div/div/div[3]/div[1]/form/div/div[3]/div/input');
        this.countryInput = page.getByPlaceholder('Select Country');
    }

    async fillPaymentDetails(cardNumber, cvv, name, month = '25') {
        await this.cardNumberField.fill(cardNumber);
        await this.expiryMonthDropdown.selectOption(month);
        await this.cvvField.fill(cvv);
        await this.nameOnCardField.fill(name);

        // ✅ assertion: confirm values entered
        await expect(this.cardNumberField).toHaveValue(cardNumber);
        await expect(this.cvvField).toHaveValue(cvv);
        await expect(this.nameOnCardField).toHaveValue(name);
    }

    async selectCountry(country) {
        await this.countryInput.click();
        await this.countryInput.type(country, { delay: 150 });

        // Wait until dropdown suggestions are rendered
        await this.page.waitForSelector('button:has-text("India")');
        const options = this.page.locator('button:has-text("India")');
        await options.nth(1).click();
    }

    async placeOrder() {
        await this.page.getByText('Place Order').click();
        // ✅ assertion: verify confirmation screen
        await expect(this.page.getByText('$')).toBeVisible();
    }
}

module.exports = CheckoutPage;