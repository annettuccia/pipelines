import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';
import { InventoryPage } from '../pages/inventory.page.js';
import { CartPage } from '../pages/cart.page.js';
import { CheckoutStepOnePage } from '../pages/checkout.stepOne.page.js';
import { CheckoutStepTwoPage } from '../pages/checkout.stepTwo.page.js';
import { CheckoutCompletePage } from '../pages/checkout.complete.page.js';

test('Shopping cycle @ui', async({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOne = new CheckoutStepOnePage(page);
    const checkoutStepTwo = new CheckoutStepTwoPage(page);
    const checkoutComplete = new CheckoutCompletePage(page);

    await loginPage.open();

    await loginPage.login("standard_user", "secret_sauce");

    const titleProductPage = await inventoryPage.getPageTitle();
    expect(titleProductPage).toBe("Products");

    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
    const mostExpensiveItem = await page.locator('[data-test="inventory-item-name"]').first().textContent();
    await inventoryPage.addItemToCart(mostExpensiveItem);

    await inventoryPage.openCart();

    expect(await cartPage.isOnPage()).toBe(true);
    
    const cartItemName = await cartPage.getCartItemName();
    expect(cartItemName).toBe(mostExpensiveItem);

    await cartPage.goToCheckout();
    expect(await checkoutStepOne.isOnPage()).toBe(true);

    await checkoutStepOne.fillUserInfo('Test', 'User', '12345');
    expect(await checkoutStepTwo.isOnPage()).toBe(true);

    await checkoutStepTwo.finishCheckout();

    const successMessage = await checkoutComplete.getCompletionMessage();
    expect(successMessage).toBe("Thank you for your order!");
});

test('Delete from cart', async({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");

    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
    const mostExpensiveItem = await page.locator('[data-test="inventory-item-name"]').first().textContent();
    await inventoryPage.addItemToCart(mostExpensiveItem);

    await inventoryPage.openCart();

    await cartPage.goShopping();
    await inventoryPage.openCart();
    
    await cartPage.removeItemFromCart(mostExpensiveItem);
})