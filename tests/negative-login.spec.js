const { test, expect } = require('@playwright/test');
const { LoginNegativePage } = require('../pages/LoginNegativePage');

test.describe('Негативные тесты логина', () => {
    let page;
    let loginNegativePage;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        loginNegativePage = new LoginNegativePage(page);
        await loginNegativePage.open();
    });

    test.afterEach(async () => {
        await page.close();
    });

    test('должен показывать ошибку при неверном пароле', async () => {
        console.log("🔹 Тест 1: неверный пароль");
        await loginNegativePage.attemptLogin('standard_user', 'wrong_password');
        await loginNegativePage.verifyErrorMessageIsVisible();
        await loginNegativePage.verifyErrorMessageText('Username and password do not match');
    });

    test('должен показывать ошибку для заблокированного пользователя', async () => {
        console.log("🔹 Тест 2: заблокированный пользователь");
        await loginNegativePage.attemptLogin('locked_out_user', 'secret_sauce');
        await loginNegativePage.verifyErrorMessageIsVisible();
        await loginNegativePage.verifyErrorMessageText('Sorry, this user has been locked out');
    });

        test('должен показывать ошибку при пустых полях', async () => {
        console.log("🔹 Тест 3: пустые поля");
        await loginNegativePage.attemptLogin('', '');
        await loginNegativePage.verifyErrorMessageIsVisible();
        await loginNegativePage.verifyErrorMessageText('Username is required');
    });

        test('должен показывать ошибку при вводе только username', async () => {
        console.log("🔹 Тест 4: только username");
        await loginNegativePage.attemptLogin('standard_user', '');
        await loginNegativePage.verifyErrorMessageIsVisible();
        await loginNegativePage.verifyErrorMessageText('Password is required');
    });
});