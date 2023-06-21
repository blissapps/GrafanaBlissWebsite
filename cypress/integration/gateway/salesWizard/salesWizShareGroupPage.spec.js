import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
describe('Sales Wizard Group Page Tests', () => {
    context('Validate User Information', () => {
        /** Related to User Stories
         * EGVFOUR-141, EGVFOUR-253
         **/
        beforeEach('User Chooses a Security', () => {
            //NOT NECESSARY YET  - equityGateway.LoginPage.login()
            equityGateway.SalesWizBase.gotoSalesWiz()
            equityGateway.SalesWizTopBar.nextBtn('click')
            cy.contains('h5', 'St James Place').click().click()
            equityGateway.SalesWizTopBar.nextBtn('click')
        })

        it('Validate Page Elements', () => {
            //TODO PAULO MONTINHO
            //Top Bar
            //Main Body
            equityGateway.SalesWizShareGroupPage.validateMainBody()
            //Share Group Border
            //Footer
            //equityGateway.FooterBar.checkPage('Help', '/help')
            //equityGateway.FooterBar.checkPage('Privacy Policy', '/privacy-policy')
            //equityGateway.FooterBar.checkPage('Terms and Conditions', '/terms-and-conditions')
        })

        it('Validate Page Elements are clickable', () => {
            equityGateway.SalesWizShareGroupPage.isSharesGroupClickable(equityGateway.SalesWizShareGroupPage.setSharesGroupAvailableButtons())
        })
    })
})
