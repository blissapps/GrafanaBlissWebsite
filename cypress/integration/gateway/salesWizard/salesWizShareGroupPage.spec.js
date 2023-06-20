import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
describe('Sales Wizard Group Page Tests', () => {
    context('Validate User Information', () => {
        /** Related to User Stories
         * EGVFOUR-141, EGVFOUR-253
         **/
        beforeEach(() => {
            //NOT NECESSARY YET  - equityGateway.LoginPage.login()
            equityGateway.SalesWizBase.gotoSalesWiz()
            equityGateway.SalesWizTopBar.nextBtn('click')
            cy.contains('h5', 'St James Place').click()
            equityGateway.SalesWizTopBar.nextBtn('click')
        })

        it('Test 1', () => {
            //equityGateway.SalesWizBase.gotoSalesWiz()
        })
    })
})
