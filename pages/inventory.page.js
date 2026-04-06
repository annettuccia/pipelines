import { test, expect } from '@playwright/test';
export class InventoryPage{
    constructor(page ){
        this.page = page;

        this.pageTitle = page.locator('.title');
        this.cartIcon = page.locator('#shopping_cart_container'); // или тут лучше shopping-cart-link?
        this.inventoryList = page.locator('[data-test="inventory-list"]');
        this.addToCartButton = page.locator('button:has-text("Add to cart")');
    }

    async addItemToCart(itemName){
        const names = await this.page.locator('[data-test="inventory-item-name"]').allTextContents();
        const index = names.indexOf(itemName);
        await this.addToCartButton.nth(index).click();
    }

    async openCart(){
        await this.cartIcon.click();
    }

    async getPageTitle(){
        return await this.pageTitle.textContent();
    }
}