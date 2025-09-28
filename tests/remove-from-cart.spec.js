const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');

test('пользователь может удалить товар из корзины', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    await productsPage.addFirstItemToCart();
    await productsPage.goToCart();

    await page.click('#remove-sauce-labs-backpack');

    await cartPage.expectCartIsEmpty();

});