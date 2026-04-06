export class CheckoutCompletePage{
    constructor(page){
        this.page = page;

        this.successHeader = page.locator('[data-test="complete-header"]');
        this.homeButton = page.locator('[data-test="back-to-products"]');
    }

    async getCompletionMessage(){
        return await this.successHeader.textContent();
    }
}