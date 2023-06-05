import BasePage from '../../basePage'
import HelpForm from '../helpForm/helpForm'
import SideMenuBar from '../sideMenuBar/sideMenuBar'

// @ts-ignore
const selectors = {
    welcomePageHelp: 'a.ng-star-inserted',
    dashboardDropdown: 'gs-button.icon.medium.square.flat',
    dropdownPersonalInfo: '.eg-header__dropdown > :nth-child(1)'
}

class PageNavi extends BasePage {
    helpForm = new HelpForm()

    navigateToHelpDeskNoAuth(){
        cy.visit(`${Cypress.env('EQUITY_GATEWAY_BASE_URL')}/help`, { failOnStatusCode: false })
        cy.get(selectors.welcomePageHelp).click()
        this.helpForm.validateFormElements(false)
    }

    navigateToHelpDeskAuth(){
        const sideMenuBar = new SideMenuBar()
        sideMenuBar.support('/help')
        this.helpForm.validateFormElements()
    }

    navigateToDashboard(){
        // User logs in
        cy.url().should('contain', '/dashboard')
    }

    navigateToMyAccountProfile(){
        // User logs in and is in dashboard
        cy.get(selectors.dashboardDropdown).click()
        cy.get(selectors.dropdownPersonalInfo).click()
        cy.url().should('contains', 'my-account/profile/personal-information')
    }

    navigateToSalesWizard(salesWizardStep = 'default'){
        switch (salesWizardStep){
            case 'default': cy.visit('https://eg-v4-alpha-25.gsapps.dev/sale-wizard');
            break;
            case 'security': cy.visit('https://eg-v4-alpha-25.gsapps.dev/sale-wizard/security');
            break;
            case 'share-group': cy.visit('https://eg-v4-alpha-25.gsapps.dev/sale-wizard/share-group');
            break;
            case 'amount-to-sell': cy.visit('https://eg-v4-alpha-25.gsapps.dev/sale-wizard/amount-to-sell');
            break;
            case 'order-type': cy.visit('https://eg-v4-alpha-25.gsapps.dev/sale-wizard/order-type');
            break;
            case 'distribution': cy.visit('https://eg-v4-alpha-25.gsapps.dev/sale-wizard/distribution');
            break;
            case 'review-order': cy.visit('https://eg-v4-alpha-25.gsapps.dev/sale-wizard/review-order');
            break;
            case 'success-confirmation': cy.visit('https://eg-v4-alpha-25.gsapps.dev/sale-wizard/success-confirmation');
            break;
        }
        cy.url().should('contain', '/sale-wizard/overview')
    }
}
export default PageNavi