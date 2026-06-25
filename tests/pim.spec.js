import { test } from '../fixtures/loginFixture';
import { expect } from '@playwright/test';
import { PimPage } from '../pages/PimPage';
import { LoginPage } from '../pages/LoginPage';
import LoginData from '../test_data/loginTestData.json';
import EmployeeData from '../test_data/employeeTestData.json';


test("Verify Successsful Add employee flow", async ({page, loggedIn}) => {
    const pimPage = new PimPage(page);
    const loginPage = new LoginPage(page);
    await pimPage.navigateToPage(EmployeeData.pageNames.pimPage);
    await expect(loginPage.dashboard).toHaveText(EmployeeData.pageNames.pimPage);

    await pimPage.employeeAddBtn.click();
    await pimPage.addEmployee(
        EmployeeData.validEmployeeDetails.empFirstName, 
        EmployeeData.validEmployeeDetails.empLastName,
        EmployeeData.validEmployeeDetails.empId
    )
    await expect(pimPage.successToastmessage).toBeVisible();
})


test("Verify add employee with empty data", async ({page, loggedIn}) => {
    const loginPage = new LoginPage(page);
    const pimPage = new PimPage(page);
    await pimPage.navigateToPage(EmployeeData.pageNames.pimPage);
    await expect(loginPage.dashboard).toHaveText(EmployeeData.pageNames.pimPage);
    await pimPage.employeeAddBtn.click();
    await pimPage.addEmployee(
        EmployeeData.emptyEmployeeDetails.empFirstName,
        EmployeeData.emptyEmployeeDetails.empLastName, 
        EmployeeData.emptyEmployeeDetails.empId
    )
    await pimPage.employeeIdInput.clear();
    await expect(pimPage.requiredMessage.first()).toHaveText("Required");
})


test("Verify Cancel Add employee", async ({page, loggedIn}) => {
    const loginPage = new LoginPage(page);
    const pimPage = new PimPage(page);
    await pimPage.navigateToPage(EmployeeData.pageNames.pimPage);
    await expect(loginPage.dashboard).toHaveText(EmployeeData.pageNames.pimPage);
    await pimPage.empCancelBtn.click();
    await expect(pimPage.empSaveBtn).toBeVisible();
    
})

test.describe("verify employee created", async () => {
    test("Verify employee with employeeId", async({page, loggedIn})=>{
        
        //create emp
        const pimPage = new PimPage(page);
        const loginPage = new LoginPage(page);
        await pimPage.navigateToPage(EmployeeData.pageNames.pimPage);
        await expect(loginPage.dashboard).toHaveText(EmployeeData.pageNames.pimPage);

        await pimPage.employeeAddBtn.click();
        await pimPage.addEmployee(
            EmployeeData.validEmployeeDetails2.empFirstName, 
            EmployeeData.validEmployeeDetails2.empLastName, 
            EmployeeData.validEmployeeDetails2.empId
        )
        await expect(pimPage.successToastmessage).toBeVisible();
    
        //verify created employee
        await pimPage.navigateToPage(EmployeeData.pageNames.dashBoardPage);
        await expect(loginPage.dashboard).toHaveText(EmployeeData.pageNames.dashBoardPage);
        await pimPage.navigateToPage(EmployeeData.pageNames.pimPage);
        await expect(loginPage.dashboard).toHaveText(EmployeeData.pageNames.pimPage);
        await pimPage.filterEmpId.fill(EmployeeData.validEmployeeDetails2.empId);
        await pimPage.searchBtn.click();

        await expect(pimPage.empRecord.locator("div div").last()).toBeVisible();
        const alldivs = await pimPage.empRecord.locator("div div").allInnerTexts();
        const empId =  await pimPage.empRecord.locator("div div").nth(2).innerText();
        await expect(empId).toBe(EmployeeData.validEmployeeDetails2.empId);
    })
})

test("Edit employee details", async ({page, loggedIn}) => {

})

test("Create employee with existing empid", async ({page, loggedIn}) => {
    const loginPage = new LoginPage(page);
    const pimPage = new PimPage(page);
    await pimPage.navigateToPage(EmployeeData.pageNames.pimPage);
    await expect(loginPage.dashboard).toHaveText(EmployeeData.pageNames.pimPage);
    await pimPage.employeeAddBtn.click();
    await pimPage.addEmployee(
        EmployeeData.validEmployeeDetails3.empFirstName, 
        EmployeeData.validEmployeeDetails3.empLastName, 
        EmployeeData.validEmployeeDetails3.empId
    )
    await expect(pimPage.successToastmessage).toBeVisible();

    await pimPage.navigateToPage(EmployeeData.pageNames.dashBoardPage);
    await expect(loginPage.dashboard).toHaveText(EmployeeData.pageNames.dashBoardPage);
    
    await pimPage.addEmployee(
        EmployeeData.validEmployeeDetails3.empFirstName, 
        EmployeeData.validEmployeeDetails3.empLastName, 
        EmployeeData.validEmployeeDetails3.empId
    )
    await expect(pimPage.empExistsMessage).toHaveText("Employee Id already exists");
})


test("Delete employee", async ({page}) => {
})



