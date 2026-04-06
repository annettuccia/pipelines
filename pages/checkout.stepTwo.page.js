export class CheckoutStepTwoPage{
    constructor(page){
        this.page = page;

        this.orderInfo = page.locator('[data-test="cart-list"]');
        this.totalPrice = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
    }

    async finishCheckout(){
        await this.finishButton.click();
    }

    async isOnPage() {
        await this.page.waitForSelector('.title', { state: 'visible', timeout: 5000 });
        const url = this.page.url();
        return url.includes('checkout-step-two.html');
    }
}