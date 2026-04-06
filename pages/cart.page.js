export class CartPage{
    constructor(page){
        this.page = page;

        this.cartItemList = page.locator('[data-test="cart-list"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.removeFromCartButtons = page.locator('button:has-text("Remove")');
        this.cartItemName = page.locator('.inventory_item_name'); 
    }
    
    async goToCheckout(){
        await this.checkoutButton.click();
    }

    async goShopping(){
        await this.continueShoppingButton.click();
    }

    async removeItemFromCart(itemName){
        await this.removeFromCartButtons
        .locator('xpath=ancestor::div[@data-test="inventory-item"]//div[@data-test="inventory-item-name"]')
        .filter({ hasText: itemName }).click();
    }

    async isOnPage() {
        await this.page.waitForSelector('.title', { state: 'visible', timeout: 5000 });
        const url = this.page.url();
        return url.includes('cart.html');
    }

    async getCartItemName(){
        return await this.cartItemName.textContent();
    }
}