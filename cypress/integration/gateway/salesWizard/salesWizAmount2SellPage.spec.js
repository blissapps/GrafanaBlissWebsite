import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
describe('Page Navigation Tests', () => {
    context('Validate User Information', () => {
        /** Related to User Stories
         * EGVFOUR-142, EGVFOUR-295
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
