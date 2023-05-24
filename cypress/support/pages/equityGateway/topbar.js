import BasePage from '../basePage'

const selectors = {
    accDetails: 'gs-button.icon.medium.square.flat',
    accMenuDetails: 'div.eg-header__dropdown'
}

class Topbar extends BasePage {
    checkPageUrl() {
        this.checkUrl(Cypress.env('EQUITY_GATEWAY_BASE_URL')+'/help')
    }

    accDetails(acc_name){
        cy.get(selectors.accDetails).contains(acc_name).click()
        cy.get(selectors.accMenuDetails).should('be.visible').contains('Personal Information')
        cy.get(selectors.accMenuDetails).should('be.visible').contains('Bank Account')
        cy.get(selectors.accMenuDetails).should('be.visible').contains('Tax Documents')
        cy.get(selectors.accMenuDetails).should('be.visible').contains('Logout')
    }
}
export default Topbar