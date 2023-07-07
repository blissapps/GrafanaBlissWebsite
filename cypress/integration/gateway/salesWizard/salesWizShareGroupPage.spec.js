import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
describe('Sales Wizard Group Page Tests', () => {
    context('Validate User Information', () => {
        /** Related to User Stories
         * EGVFOUR-141, EGVFOUR-253
         **/
        beforeEach('User Chooses a Security', () => {
            //NOT NECESSARY YET  - equityGateway.LoginPage.login()
            equityGateway.SalesWizBase.gotoShareGroup()
        })

        it('C30639258 - Validate Page Elements', () => {
            equityGateway.SalesWizShareGroupPage.validateMainBody()
        })

        it('C30639258 - Validate Page Elements are clickable', () => {
            equityGateway.SalesWizShareGroupPage.isSharesGroupClickable(equityGateway.SalesWizShareGroupPage.setSharesGroupAvailableButtons())
        })
    })
})
