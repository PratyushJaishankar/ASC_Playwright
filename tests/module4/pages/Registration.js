const { expect } = require('@playwright/test');

class RegisterPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        this.registerLink = page.getByRole('link', { name: 'Register' }); // getByRole
        this.registerButton = page.getByRole('button', { name: 'Register' }); // getByRole
        this.urlPattern = /.*\/auth\/register/;
        this.firstNameInput = page.getByPlaceholder('First Name'); // getByPlaceholder
        this.lastNameInput = page.getByPlaceholder('Last Name'); // getByPlaceholder
        this.emailInput = page.getByRole('textbox', { name: 'email@example.com' }); // getByRole
        this.phoneInput = page.getByRole('textbox', { name: 'enter your number' }); // getByRole
        this.occupationDropdown = page.locator('body > app-root > app-register > div.banner > section:nth-child(2) > div > div.login-wrapper.my-auto.p-5 > form > div:nth-child(3) > div:nth-child(1) > select'); // locator
        this.genderRadio = page.getByRole('radio', { name: 'Female' }); // getByRole
        this.passwordInput = page.locator('input[formcontrolname="userPassword"]'); // locator (custom CSS)
        this.confirmPasswordInput = page.locator('input[formcontrolname="confirmPassword"]'); // locator
        this.termsCheckbox = page.getByRole('checkbox'); // getByRole
        this.createAccountHeader = page.getByText('Account Created Successfully'); // getByText
    }

    // Navigate to Register page
    async goto() {
        console.log('Navigating to client homepage');
        await this.page.goto('https://rahulshettyacademy.com/client');

        console.log('Clicking Register link');
        await this.page.getByRole('link', { name: 'Register' }).click(); // getByRole
    }

    // Generate a unique email for registration
    async generateRandomEmail() {
        const timestamp = Date.now();
        const email = `user${timestamp}@example.com`;
        console.log('Generated random email:', email);
        return email;
    }

    // Fill the registration form with provided data
    async fillRegistrationForm({ firstName, lastName, email, phone, password }) {
        console.log('Filling first name:', firstName);
        await this.firstNameInput.fill(firstName); // getByPlaceholder

        console.log('Filling last name:', lastName);
        await this.lastNameInput.fill(lastName); // getByPlaceholder

        console.log('Filling email:', email);
        await this.emailInput.fill(email); // getByRole

        console.log('Filling phone:', phone);
        await this.phoneInput.fill(phone); // getByRole

        console.log('Selecting occupation');
        await this.occupationDropdown.selectOption('3: Engineer'); // locator

        console.log('Selecting gender');
        await this.genderRadio.check(); // getByRole

        console.log('Filling password');
        await this.passwordInput.fill(password); // locator

        console.log('Filling confirm password');
        await this.confirmPasswordInput.fill(password); // locator

        console.log('Checking terms and conditions');
        await this.termsCheckbox.check(); // getByRole
    }

    // Submit the registration form
    async submitForm() {
        console.log('Clicking Register button');
        await this.registerButton.click(); // getByRole
    }

    // Verify "Account Created Successfully" header
    async verifyCreateAccountHeader() {
        console.log('Verifying Account Created Successfully header is visible');
        await expect(this.createAccountHeader).toBeVisible(); // getByText
    }

    // Navigate to Register page via link
    async navigateToRegister() {
        console.log('Clicking Register link');
        await this.registerLink.click(); // getByRole
    }

    // Verify we are on the Register page
    async verifyOnRegisterPage() {
        console.log('Verifying URL contains /auth/register');
        await expect(this.page).toHaveURL(/auth\/register/);

        console.log('Verifying Register button is visible');
        await expect(this.registerButton).toBeVisible(); // getByRole
    }
}

module.exports = { RegisterPage };
