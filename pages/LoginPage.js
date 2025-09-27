const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.cartIcon = page.locator('.shopping_cart_link');
    }

    async open() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async verifyLoginPageLoaded() {
        await expect(this.page).toHaveTitle('Swag Labs');
    }

    async goToCart() {
        await this.cartIcon.click();
    }
}

module.exports = { LoginPage };