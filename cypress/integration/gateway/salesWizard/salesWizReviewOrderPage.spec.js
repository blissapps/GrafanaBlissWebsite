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

        it('C30639262 - Validate Review Order / T&C', () => {
            equityGateway.SalesWizReviewOrderPage.validateElements()
        })

        it('C30639263 - Validate Review Estimated Proceeds Card', () => {
            equityGateway.SalesWizReviewOrderPage.validateTableElements('reviewEstimatedProceeds')
        })

        it('C30639264 - Validate Order Detail Card', () => {
            equityGateway.SalesWizReviewOrderPage.validateTableElements('orderDetail')
        })

        it('C30639265 - Validate Fund Distribution Card', () => {
            equityGateway.SalesWizReviewOrderPage.validateTableElements('fundDistribution')
        })

        it('C30639266 - Validate Notes Card', () => {
           equityGateway.SalesWizReviewOrderPage.validateSectionContent('notes')
        })

        it('C30639267 - Validate Confirmation Card', () => {
            equityGateway.SalesWizReviewOrderPage.validateSectionContent('confirmation')
        })

        it('C30639268 - Validate Submit Button - Accepted', () => {
            equityGateway.SalesWizReviewOrderPage.validateSubmitButton()
        })

        it('C30639268 - Validate Submit Button - Not Accepted', () => {
            equityGateway.SalesWizReviewOrderPage.validateSubmitButton(false)
        })
    })
})
