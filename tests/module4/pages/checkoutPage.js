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

    // Fill payment form with card details
    async fillPaymentDetails(cardNumber, cvv, name, month = '25') {
        console.log('Filling card number');
        await this.cardNumberField.fill(cardNumber);

        console.log(`Selecting expiry month: ${month}`);
        await this.expiryMonthDropdown.selectOption(month);

        console.log('Filling CVV');
        await this.cvvField.fill(cvv);

        console.log('Filling name on card');
        await this.nameOnCardField.fill(name);

        // Assertions to verify values entered correctly
        console.log('Verifying card number entered');
        await expect(this.cardNumberField).toHaveValue(cardNumber);

        console.log('Verifying CVV entered');
        await expect(this.cvvField).toHaveValue(cvv);

        console.log('Verifying name on card entered');
        await expect(this.nameOnCardField).toHaveValue(name);
    }

    // Select country from dropdown
    async selectCountry(country) {
        console.log(`Selecting country: ${country}`);
        await this.countryInput.click();
        await this.countryInput.type(country, { delay: 150 });

        // Wait for dropdown options to appear
        console.log('Waiting for country suggestions to appear');
        await this.page.waitForSelector('button:has-text("India")');

        console.log('Clicking on country option');
        const options = this.page.locator('button:has-text("India")');
        await options.nth(1).click();
    }

    // Place the order
    async placeOrder() {
        console.log('Clicking Place Order button');
        await this.page.getByText('Place Order').click();

        console.log('Verifying order confirmation screen');
        await expect(this.page).toHaveURL(/thanks/);
    }
}

module.exports = CheckoutPage;
