import { test, expect } from '@playwright/test';
import { off } from 'node:cluster';
import { parentPort } from 'node:worker_threads';
const url = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

test("Verify Login page", async ({ page }) => {
    await page.goto(url);
    await expect(page).toHaveTitle("OrangeHRM");
});


test("Verify Login with valid credentials", async ({ page }) => {
    await page.goto(url);
    await page.locator("//input[@name='username']").fill("Admin");
    await page.locator("//input[@name='password']").fill("admin123");
    await page.locator("//button[@type='submit']").click();

    await expect(page.locator("header h6")).toHaveText("Dashboard");
});

test("Verify Login without Credentials" , async ({page}) => {
    await page.goto(url);
    await page.locator("//button[@type='submit']").click();
    await expect(page.locator("span").first()).toBeVisible();
     await expect(page.locator("span").first()).toHaveText("Required");
});

test("Verify login with invalid credentials" , async ({page}) => {
    await page.goto(url);
    await page.locator("//input[@name='username']").fill("invalidUsername");
    await page.locator("//input[@name='password']").fill("invalidpassword");
    await page.locator("//button[@type='submit']").click();

    await expect(page.locator(".orangehrm-login-error div p").first()).toBeVisible();
    await expect(page.locator(".orangehrm-login-error div p").first()).toHaveText("Invalid credentials");

    
});

test("Verify forgot password successflow flow", async ({page}) => {
    await page.goto(url);
    await page.locator(".orangehrm-login-forgot").click();

    await expect(page.locator(".orangehrm-card-container h6")).toHaveText("Reset Password");
    await expect(page.getByPlaceholder("Username")).toBeVisible();

    await page.getByPlaceholder("Username").fill("Admin");
    await page.locator("//button[@type='submit']").click();

    await expect(page.locator(".orangehrm-card-container h6")).toBeVisible();
    await expect(page.locator(".orangehrm-card-container h6")).toHaveText("Reset Password link sent successfully");  
});

test("Forgot Password invalid flow", async ({page}) => {
    await page.goto(url);
    await page.locator(".orangehrm-login-forgot").click();

    await expect(page.locator(".orangehrm-card-container h6")).toHaveText("Reset Password");
    await expect(page.getByPlaceholder("Username")).toBeVisible();

    await page.locator("//button[@type='submit']").click();
    await expect(page.locator("span")).toBeVisible();
    await expect(page.locator("span")).toHaveText("Required");
});

test("Cancel Forgot password", async ({page}) => {
    await page.goto(url);
    await page.locator(".orangehrm-login-forgot").click();
    await expect(page.locator(".orangehrm-card-container h6")).toHaveText("Reset Password");
    await expect(page.getByPlaceholder("Username")).toBeVisible();
    await page.locator("//button[@type='button']").click();

    await expect(page.locator(".orangehrm-login-slot h5")).toBeVisible();
    await expect(page.locator(".orangehrm-login-slot h5")).toHaveText("Login");
});

test("Verify Navigation to Official pages", async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const titles = ["OrangeHRM | LinkedIn", "OrangeHRM (@orangehrm) / X", "OrangeHRM Inc - YouTube"];
    await page.goto(url);

    const officialPages = await page.locator("div a svg")
    await expect(officialPages.last()).toBeVisible();
    const officialPagesCount = await officialPages.count();

    for(var i=0; i< officialPagesCount; i++){
        if(i!==1){
            const [newPage] = await Promise.all([context.waitForEvent('page'), officialPages.nth(i).click()]);
            const title = await newPage.title();
            console.log("Navigating to "+ title);
            await expect(titles).toContain(title);
            await newPage.close();
            console.log("Back to original page: " + await page.title());
        }
    }
});



