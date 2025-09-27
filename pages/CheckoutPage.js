const { expect } = require('@playwright/test');

class CheckoutPage {
    constructor(page) {
        this.page = page;
        
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        
        this.itemTotal = page.locator('.summary_subtotal_label');
        this.total = page.locator('.summary_total_label');
        this.finishButton = page.locator('#finish');
        
        this.completeHeader = page.locator('.complete-header');
    }
    
    async fillInformation(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }
    
    async finishCheckout() {
        await this.finishButton.click();
    }
    
    async verifyOrderComplete() {
        await expect(this.completeHeader).toHaveText('Thank you for your order!');
    }
}

module.exports = { CheckoutPage };