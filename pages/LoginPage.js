const { Page } = require('@playwright/test');
  /**
   * @param {Page} page
   */

class LoginPage{

    constructor(page){
        this.page = page;
        this.loginHeader = page.locator(".orangehrm-login-slot h5");
        this.userNameInput = page.locator("//input[@name='username']");
        this.passwordInput = page.locator("//input[@name='password']");
        this.submitBtn = page.locator("//button[@type='submit']");
        this.dashboard = page.locator("header h6");
        this.requiredMessage = page.locator("span");
        this.invalidCredentials = page.locator(".orangehrm-login-error div p");
        this.forgotPasswordBtn = page.locator(".orangehrm-login-forgot");
        this.resetPasswordHeader = page.locator(".orangehrm-card-container h6");
        this.resetPasswordUserNameInput = page.getByPlaceholder("Username");
        this.resetPasswordCancelBtn = page.locator("//button[@type='button']")
        this.officialPagesIcon = page.locator("div a svg");

    }
    
    async navigateTo(url){
        await this.page.goto(url);
        await this.page.waitForLoadState();
    }

    async validateLogin(url, username, password){
        await this.page.goto(url)
        await this.userNameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitBtn.click();
    }

    async navigateToOfficialPage(context, officialPages, i){
        const [newPage] = await Promise.all([context.waitForEvent('page'), officialPages.nth(i).click()]);
        const title = await newPage.title();
        await newPage.close();
        return title;
    }
}
module.exports = {LoginPage};