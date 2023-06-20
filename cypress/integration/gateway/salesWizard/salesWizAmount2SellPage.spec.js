import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
describe('Sales Wizard Amount to Sell Page Tests', () => {
    beforeEach(() => {
        //NOT NECESSARY YET  - equityGateway.LoginPage.login()
        equityGateway.SalesWizBase.gotoSalesWiz()
        equityGateway.SalesWizTopBar.nextBtn('click')
        equityGateway.SalesWizSecurityPage.cardClick('St James Place')
        equityGateway.SalesWizTopBar.nextBtn('click')
        cy.get('gs-radio-button-option').contains('Purchase plan issuances').click()
        equityGateway.SalesWizTopBar.nextBtn('click')
        cy.url().should('include', '/amount-to-sell')
    })

    context('General Page Validations', () => {
        /** Related to User Stories
         * EGVFOUR-142, EGVFOUR-295
         **/
        it('Title and Description Verification', () => {
            equityGateway.SalesWizAmount2SellPage.titleAndDescription('Amount to sell', 'Please enter the number of shares')
            equityGateway.SalesWizAmount2SellPage.interactiveElementsCheck()
        })
    })
})
