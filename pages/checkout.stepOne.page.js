export class CheckoutStepOnePage{
    constructor(page){
        this.page = page;

        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
    }

    async fillUserInfo(firstName, lastName, postalCode){
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }

    async isOnPage() {
        await this.page.waitForSelector('.title', { state: 'visible', timeout: 5000 });
        const url = this.page.url();
        return url.includes('checkout-step-one.html');
    }
}