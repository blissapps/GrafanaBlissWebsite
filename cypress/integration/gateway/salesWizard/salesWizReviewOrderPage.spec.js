import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()

/**
 * https://globalshares.testrail.net/index.php?/suites/view/18820&group_by=cases:section_id&group_order=asc&display_deleted_cases=0&group_id=1026244
 * Sales Wizard Review Order Test Suite
 */
describe('Sales Wizard Review Order && T/C Page Tests', () => {
  context('Validate Review Order Page Elements', () => {
    /** Related to User Stories
     * EGVFOUR-145, EGVFOUR-251
     **/
    beforeEach(() => {
      equityGateway.LoginPage.login(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER2_AUTH'))
      equityGateway.SalesWizBase.goToReviewOrder()
    })

    it('C30639262 - Validate Review Order', () => {
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

  context('Validate T/C Modal Page Elements', () => {
    /** Related to User Stories
     * EGVFOUR-145, EGVFOUR-251
     **/
    beforeEach(() => {
      //NOT NECESSARY YET  - equityGateway.LoginPage.login()
      equityGateway.SalesWizBase.goToReviewOrder()
      equityGateway.SalesWizReviewOrderPage.validateSubmitButton()
    })

    it('C31122379 - Validate T/C Modal Elements', () => {
      equityGateway.SalesWizReviewOrderPage.validateModalElements()
    })

    it('C31122380 - Validate Close Button Behaviour', () => {
      equityGateway.SalesWizReviewOrderPage.validateModalCloseButton()
    })

    it('C31122381 - Validate Dismiss Button Behaviour', () => {
      equityGateway.SalesWizReviewOrderPage.validateModalDismissButton()
    })

    it('C31122382 - Validate Submit Button - Nothing Checked', () => {
      equityGateway.SalesWizReviewOrderPage.validateModalSubmitButton(false)
    })

    it('C31122383 - Validate Submit Button - Approvals Checked', () => {
      equityGateway.SalesWizReviewOrderPage.clickCheckBoxByName('Approvals & payments')
      equityGateway.SalesWizReviewOrderPage.validateModalSubmitButton(false)
    })

    it('C31122384 - Validate Submit Button - Trading Terms Checked', () => {
      equityGateway.SalesWizReviewOrderPage.clickCheckBoxByName('Trading terms & conditions')
      equityGateway.SalesWizReviewOrderPage.validateModalSubmitButton(false)
    })

    it('C31122385 - Validate Submit Button - Approvals && Trading Terms Checked', () => {
      equityGateway.SalesWizReviewOrderPage.clickCheckBoxByName('Approvals & payments')
      equityGateway.SalesWizReviewOrderPage.clickCheckBoxByName('Trading terms & conditions')
      equityGateway.SalesWizReviewOrderPage.validateModalSubmitButton()
    })
  })
})
