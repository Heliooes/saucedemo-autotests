const { expect } = require('@playwright/test');

class ProductsPage {
    constructor(page) {
        this.page = page;
        this.title = page.locator('.title');
        this.firstItem = page.locator('.inventory_item').first();
        this.addToCartButton = this.firstItem.locator('[data-test^=add-to-cart]');
        this.cartIcon = page.locator('.shopping_cart_link');
    }
    
    async verifyProductsPageLoaded() {
        await expect(this.title).toHaveText('Products');
    }

    async addFirstItemToCart() {
        await this.addToCartButton.click();
    }
    
    async goToCart() {
        await this.cartIcon.click();
    }
}

module.exports = { ProductsPage };