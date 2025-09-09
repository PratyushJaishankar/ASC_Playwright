// specs/e2eOrder.spec.js
const { test } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const DashboardPage = require('../pages/dashboardPage');
const CartPage = require('../pages/cartPage');
const CheckoutPage = require('../pages/checkoutPage');
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

test.describe('Order Flow with Assertions', () => {
    test('Place order successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        console.log('Step 1: Login');
        await loginPage.navigate();
        await loginPage.login(process.env.LOGIN_EMAIL, process.env.LOGIN_PASSWORD);

        console.log('Step 2: Scroll & Hover product');
        await dashboardPage.scrollToBottom();
        await dashboardPage.hoverOverFirstProduct();

        console.log('Step 3: Handle Add to Cart popup');
        await dashboardPage.handleAddToCartPopup();

        console.log('Step 4: Proceed to Checkout');
        await cartPage.proceedToCheckout();

        console.log('Step 5: Fill Payment Details');
        await checkoutPage.fillPaymentDetails(
            process.env.CARD_NUMBER,
            process.env.CVV,
            process.env.NAME_ON_CARD,
            process.env.EXPIRY_YEAR
        );

        console.log('Step 6: Select Country & Place Order');
        await checkoutPage.selectCountry('India');
        await checkoutPage.placeOrder();
    });
});
