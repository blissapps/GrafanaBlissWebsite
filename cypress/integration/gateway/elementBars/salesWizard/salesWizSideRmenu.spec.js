import EquityGateway from '../../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
describe('Page Navigation Tests', () => {
    context('Validate User Information', () => {
        /** Related to User Stories
         * EGVFOUR-138, EGVFOUR-138261
         **/
        beforeEach(() => {
            //NOT NECESSARY YET  - equityGateway.LoginPage.login()
            equityGateway.SalesWizBase.gotoSalesWiz()
        })

        it('Test 1', () => {
            //TODO TESTS
        })
    })
})
