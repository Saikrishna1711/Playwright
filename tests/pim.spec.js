import {test} from '../fixtures/loginFixture';
import { expect } from '@playwright/test';
import { PimPage } from '../pages/PimPage';
import { LoginPage } from '../pages/LoginPage';
import LoginData from '../test_data/loginTestData.json';
import EmployeeData from '../test_data/employeeTestData.json';

const pageName = "PIM";


test("Verify Successsful Add employee flow", async ({page, loggedIn}) => {
    const pimPage = new PimPage(page);
    const loginPage = new LoginPage(page);
    await pimPage.navigateToPage(pageName);
    await expect(loginPage.dashboard).toHaveText(pageName);

    await pimPage.employeeAddBtn.click();
    await pimPage.addEmployee(EmployeeData.validEmployeeDetails.empFirstName, EmployeeData.validEmployeeDetails.empLastName, EmployeeData.validEmployeeDetails.empId)
    await expect(pimPage.successToastmessage).toBeVisible();
})


test("Verify add employee with empty data", async ({page, loggedIn}) => {
    const loginPage = new LoginPage(page);
    const pimPage = new PimPage(page);
    await pimPage.navigateToPage(pageName);
    await expect(loginPage.dashboard).toHaveText(pageName);
    await pimPage.employeeAddBtn.click();
    await pimPage.addEmployee(EmployeeData.emptyEmployeeDetails.empFirstName, EmployeeData.emptyEmployeeDetails.empLastName, EmployeeData.emptyEmployeeDetails.empId)
    await pimPage.employeeIdInput.clear();
    await expect(pimPage.requiredMessage.first()).toHaveText("Required");
})


test("Verify Cancel Add employee", async ({page}) => {
    const loginPage = new LoginPage(page);
    const pimPage = new PimPage(page);
    await pimPage.navigateToPage(pageName);
    await expect(loginPage.dashboard).toHaveText(pageName);
    await pimPage.empCancelBtn.click();
    await expect(pimPage.empSaveBtn).toBeVisible();
})

test("verify employee created", async ({page}) => {
//search with employee id and search with employee name
})

test("Edit employee details", async ({page}) => {
})

test("Create employee with existing empid", async ({page}) => {
})


test("Delete employee", async ({page}) => {
})



