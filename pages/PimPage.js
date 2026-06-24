
const { Page } = require('@playwright/test');
class PimPage{
     /**
   * @param {Page} page
   */

    constructor(page){
        this.page= page;
        this.employeeAddBtn = page.getByRole('button', {name: 'Add'});
        this.firstNameInput = page.getByPlaceholder("First Name");
        this.middleNameInput = page.getByPlaceholder("Middle Name");
        this.lastNameInput = page.getByPlaceholder("Last Name");
        this.employeeIdInput = page.locator(".oxd-grid-2 input");
        this.empSaveBtn = page.getByRole('button', {name: 'Save'});
        this.empCancelBtn = page.getByRole('button', {name: 'Cancel'});
        this.requiredMessage = page.locator(".oxd-input-field-error-message");
        this.successToastmessage = page.locator(".oxd-toast--success");
        this.filterEmpId = page.locator('.oxd-form-row div .oxd-input');
        this.filterEmpName = page.getByPlaceholder("Type for hints...");

    
    }

    async navigateToPage(pageName){
        await this.page.getByText(pageName).click();
    }

    async addEmployee(firstName, lastName, employeeId){
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.employeeIdInput.fill(employeeId);
        await this.empSaveBtn.click();
    }

}
module.exports = {PimPage};