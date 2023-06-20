import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
describe('Sales Wizard Overview Page Tests', () => {
    context('Validate User Information', () => {
        /** Related to User Stories
         * EGVFOUR-143
         **/
        beforeEach(() => {
            //NOT NECESSARY YET  - equityGateway.LoginPage.login()
            equityGateway.SalesWizBase.gotoSalesWiz()
        })

        it('Test 1', () => {
            //EXEMPLE
            const elements = [
                'Sell your shares',
                'Shares to sell',
                'Process overview'
            ]
            equityGateway.SalesWizOverviewPage.pageElementsValidation(elements)
        })
    })
})
