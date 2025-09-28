const { expect } = require("@playwright/test");

class LoginNegativePage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator("#user-name");
        this.passwordInput = page.locator("#password");
        this.loginButton = page.locator("#login-button");
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async open() {
        await this.page.goto("https://www.saucedemo.com/");
    }

    async attemptLogin(username, password) {
        if (username) await this.usernameInput.fill(username);
        if (password) await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async verifyErrorMessageIsVisible() {
        await expect(this.errorMessage).toBeVisible();
    }

    async verifyErrorMessageText(expectedText) {
        await expect(this.errorMessage).toContainText(expectedText);
    }
}

module.exports = { LoginNegativePage };
