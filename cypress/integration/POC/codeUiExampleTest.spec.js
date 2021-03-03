// import HomePage from '../../support/pages/homePage';

import BasePage from "../../support/pages/basePage";

describe.skip('GlobalShares.CodedUI.Tests.EquityAdmin.Modules.LoanManagement', () => {
    const basePage = new BasePage();
    
    beforeEach(() => {
        cy.visit('/')
        cy.login(Cypress.env('adminTestUser'), Cypress.env('passwordForAdminTestUser'))
    });

    it('C4650384_Check_Loan_Deleted_First_Attempt', () => {
        // Today:
        EquityAdmin.LoginPage.LoginAs(AdminConfig.Username_26).WithPassword(AdminConfig.Password).Login();
        EquityAdmin.LandingPage.Navbar.NavigateClientHomepage("HasTermination");
        EquityAdmin.LandingPage.SideBar.NavigateByMenuTextandSubMenuText(TopMenu.EQAdmin, SubMenu.Loan);
        EquityAdmin.Common.FilterAndClickTableIcon("trash", "Description", "Delete1");
        SharedActionsAndElements.Common.ClickSubmit();
        AssertThat.PageDoesNotContainExactText("Delete1");
        
        // Using Cypress example:
        landingPage.navBar().navigateClientHomepage("HasTermination")
        landingPage.sideBar().navigateByMenuTextandSubMenuText("TopMenu", "SubMenu")
        basePage.filterAndClickTableIcon("trash", "Description", "Delete1")
        basePage.clickSubmit()
        basePage.getTextOnPage("Delete1").should('not.be.visible')
    });

    it('C4650385_Check_Loan_Deleted_First_Attempt_Multiple', () => {
         // Today:
         EquityAdmin.LoginPage.LoginAs(AdminConfig.Username_26).WithPassword(AdminConfig.Password).Login();
         EquityAdmin.LandingPage.Navbar.NavigateClientHomepage("HasTermination");
         EquityAdmin.LandingPage.SideBar.NavigateByMenuTextandSubMenuText(TopMenu.EQAdmin, SubMenu.Loan);
         EquityAdmin.LoanManagement.ManageLoans.ClickLoanCheckBoxes();
         EquityAdmin.LoanManagement.ManageLoans.ClickDeleteSelctedLoans();
         SharedActionsAndElements.Common.ClickSubmit();
         AssertThat.PageDoesNotContainExactText("Delete2");
         AssertThat.PageDoesNotContainExactText("Delete3");
         
         // Using Cypress example:
         landingPage.navBar().navigateClientHomepage("HasTermination")
         landingPage.sideBar().navigateByMenuTextandSubMenuText("TopMenu", "SubMenu")
         loadManagementPage.manageLoans.ClickLoanCheckBoxes()
         loadManagementPage.manageLoans.clickDeleteSelctedLoans()
         basePage.clickSubmit()
         basePage.getTextOnPage("Delete2").should('not.be.visible')
         basePage.getTextOnPage("Delete3").should('not.be.visible')
    });

});