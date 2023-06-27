import EquityGateway from '../../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
describe('Sales Wizard Element Bars Tests', () => {
    context('Validate User Information', () => {
        /** Related to User Stories
         * EGVFOUR-133
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
