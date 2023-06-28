import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
describe('Sales Wizard Order Page Tests', () => {
    context('Validate User Information', () => {
        /** Related to User Stories
         * EGVFOUR-145, EGVFOUR-251
         **/
        beforeEach(() => {
            //NOT NECESSARY YET  - equityGateway.LoginPage.login()
            equityGateway.SalesWizBase.goToReviewOrder()
        })

        it('Validate Page Elements', () => {
            equityGateway.SalesWizReviewOrderPage.validateElements()
        })

        it('Validate Review Estimated Proceeds Card', () => {
            equityGateway.SalesWizReviewOrderPage.validateTableElements('reviewEstimatedProceeds')
        })

        it('Validate Order Detail Card', () => {
            equityGateway.SalesWizReviewOrderPage.validateTableElements('orderDetail')
        })

        it('Validate Fund Distribution Card', () => {
            equityGateway.SalesWizReviewOrderPage.validateTableElements('fundDistribution')
        })

        it('Validate Notes Card', () => {
           equityGateway.SalesWizReviewOrderPage.validateSectionContent('notes')
        })

        it('Validate Confirmation Card', () => {
            equityGateway.SalesWizReviewOrderPage.validateSectionContent('confirmation')
        })

        it('Validate Submit Button - Accepted', () => {
            equityGateway.SalesWizReviewOrderPage.validateSubmitButton()
        })

        it('Validate Submit Button - Not Accepted', () => {
            equityGateway.SalesWizReviewOrderPage.validateSubmitButton(false)
        })
    })
})
