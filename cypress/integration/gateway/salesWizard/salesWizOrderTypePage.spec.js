import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
describe('Sales Wizard Order Type Page Tests', () => {
    context('Validate User Information', () => {
        /** Related to User Stories
         * EGVFOUR-143
         **/
        beforeEach(() => {
            //NOT NECESSARY YET  - equityGateway.LoginPage.login()
            equityGateway.SalesWizBase.gotoSalesWiz()
        })

        it('Test 1', () => {
            //equityGateway.SalesWizBase.gotoSalesWiz()
        })
    })
})
