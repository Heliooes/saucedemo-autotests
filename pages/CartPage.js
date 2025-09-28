const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('#checkout');
        this.itemName = page.locator('.cart_item .inventory_item_name');
        this.itemPrice = page.locator('.cart_item .inventory_item_price');
        this.removeButton = page.locator('.cart_item button').filter({ hasText: 'Remove' });
    }
    
    async verifyItemInCart(expectedItemName) {
        await expect(this.page.locator('.cart_item').filter({ hasText: expectedItemName })).toBeVisible();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    async expectCartIsEmpty() {
        await expect(this.page.locator('.cart_item')).toHaveCount(0);
        await expect(this.page.locator('.shopping_cart_badge')).not.toBeVisible();
    }
}

module.exports = { CartPage };