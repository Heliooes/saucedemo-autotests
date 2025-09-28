const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');

test('пользователь может разлогиниться', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    
    await page.click('#react-burger-menu-btn');

    await page.click('#logout_sidebar_link');

    await expect(page.locator('#login-button')).toBeVisible();
});