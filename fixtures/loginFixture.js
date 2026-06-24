import { test as base, expect } from '@playwright/test';
import LoginData from '../test_data/loginTestData.json'
import { LoginPage } from '../pages/LoginPage';

const BASE_URL = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

export const test = base.extend({
    loggedIn: async({page}, use) => {
        
        const loginPage = new LoginPage(page);
        await loginPage.navigateTo(BASE_URL);
        await loginPage.userNameInput.fill(LoginData.validLoginData.username);
        await loginPage.passwordInput.fill(LoginData.validLoginData.password);
        await loginPage.submitBtn.click();
        await expect(loginPage.dashboard).toHaveText("Dashboard");
        await use(page);
    }
})