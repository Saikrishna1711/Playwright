import { test } from '../fixtures/loginFixture';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import LoginData from '../test_data/loginTestData.json';
import { PimPage } from '../pages/PimPage';
import HomeTestData from '../test_data/homeTestData.json'


test("Verify Login page", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await expect(loginPage.page).toHaveTitle("OrangeHRM");
});


test("Verify Login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.validateLogin(
        LoginData.validLoginData.username, 
        LoginData.validLoginData.password
    );
    await expect(loginPage.dashboard).toHaveText("Dashboard");
});

test("Verify Login without Credentials" , async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.validateLogin(
        LoginData.emptyLoginData.username, 
        LoginData.emptyLoginData.password
    );
    await expect(loginPage.requiredMessage.first()).toBeVisible();
    await expect(loginPage.requiredMessage.first()).toHaveText("Required");
});

test.describe("Verify Invalid Login Scenarios",()=>{
    for(const invalidData of LoginData.invalidLoginData){
        test(`Verify login with invalid username: ${invalidData.username} and password: ${invalidData.password}`, async ({page}) => {
            const loginPage = new LoginPage(page);

            await loginPage.validateLogin(
                invalidData.username, 
                invalidData.password
            );
    
            await expect(loginPage.invalidCredentials.first()).toBeVisible();
            await expect(loginPage.invalidCredentials.first()).toHaveText("Invalid credentials");
        });
    }

});

test("Verify forgot password successflow flow", async ({page}) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigateTo();
    await loginPage.forgotPasswordBtn.click();
    await expect(loginPage.resetPasswordHeader).toHaveText("Reset Password");

    await loginPage.resetPasswordUserNameInput.fill(LoginData.validLoginData.username);
    await loginPage.submitBtn.click();

    await expect(loginPage.resetPasswordHeader).toBeVisible();
    await expect(loginPage.resetPasswordHeader).toHaveText("Reset Password link sent successfully");  
});

test("Verify Forgot Password invalid flow", async ({page}) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigateTo();
    await loginPage.forgotPasswordBtn.click();

    await expect(loginPage.resetPasswordHeader).toHaveText("Reset Password");
    await expect(loginPage.resetPasswordHeader).toBeVisible();

    await loginPage.submitBtn.click();
    await expect(loginPage.requiredMessage).toBeVisible();
    await expect(loginPage.requiredMessage).toHaveText("Required");
});

test("Verify Cancel Forgot password", async ({page}) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigateTo();
    await loginPage.forgotPasswordBtn.click();
    await expect(loginPage.resetPasswordHeader).toHaveText("Reset Password");
    await expect(loginPage.resetPasswordUserNameInput).toBeVisible();
    await loginPage.resetPasswordCancelBtn.click();

    await expect(loginPage.loginHeader).toBeVisible();
    await expect(loginPage.loginHeader).toHaveText("Login");
});

test("Verify Navigation to Official pages", async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const titles = ["OrangeHRM | LinkedIn", "OrangeHRM (@orangehrm) / X", "OrangeHRM Inc - YouTube"];
    const loginPage = new LoginPage(page);
    
    await loginPage.navigateTo();
    const officialPages = await loginPage.officialPagesIcon;
    await expect(officialPages.last()).toBeVisible();
    const officialPagesCount = await officialPages.count();
    console.log(officialPagesCount);
    for(var i=0; i < officialPagesCount; i++){
        if(i!==1){
            const title = await loginPage.navigateToOfficialPage(context, officialPages, i);
            console.log("Opened "+ title + "page");
            await expect(titles).toContain(title);
            console.log("Back to original page: " + await page.title());
        }
    }    
});

test.describe("Verify Navigation to different pages from home", ()=>{
    for(const pageName of HomeTestData.pagesNames){
        test(`Verify Navigation to ${pageName.page}`, async({page, loggedIn}) =>{
            const loginPage = new LoginPage(page);
            const pimPage = new PimPage(page);
            await expect(loginPage.dashboard).toHaveText("Dashboard");
            await pimPage.navigateToPage(pageName.page);
            await expect(loginPage.dashboard).toHaveText(pageName.page);
        })
    }
})


