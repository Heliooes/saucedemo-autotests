const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test('Полный процесс оформления заказа', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // 1. Логин
  await loginPage.open();
  await loginPage.verifyLoginPageLoaded();
  await loginPage.login('standard_user', 'secret_sauce');
  
  // 2. Проверка успешного логина
  await productsPage.verifyProductsPageLoaded();
  
  // 3. Добавление товара в корзину
  await productsPage.addFirstItemToCart();
  
  // 4. Переход в корзину
  await productsPage.goToCart();
  
  // 5. Проверка товара в корзине
  await cartPage.verifyItemInCart('Sauce Labs Backpack');
  
  // 6. Оформление заказа
  await cartPage.proceedToCheckout();
  await checkoutPage.fillInformation('testname', 'testlastname', '123123');
  await checkoutPage.finishCheckout();
  
  // 7. Проверка успешного завершения
  await checkoutPage.verifyOrderComplete();
});