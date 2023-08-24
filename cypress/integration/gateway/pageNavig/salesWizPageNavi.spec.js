import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
/**
 * https://globalshares.testrail.net/index.php?/suites/view/18820&group_by=cases:section_id&group_order=asc&display_deleted_cases=0&group_id=1008667
 * Cross Screen Functionalities Test Suite
 */
describe('Sales Wizard Page Navigation Tests', () => {
  context('Validate Sales Wizard Navigation', () => {
    /** Related to User Stories
     * EGVFOUR-266, EGVFOUR-264
     */
    beforeEach(() => {
      equityGateway.LoginPage.login(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER2_AUTH'), Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
    })
    it('C30159580 - Sales Wizard Default', () => {
      equityGateway.PageNavi.checkSalesWizardRedirect()
    })

    it('C30159581 - Sales Wizard Security', () => {
      equityGateway.PageNavi.checkSalesWizardRedirect('security')
    })

    it('C30159582 - Sales Wizard Share Group', () => {
      equityGateway.PageNavi.checkSalesWizardRedirect('share-group')
    })

    it('C30159583 - Sales Wizard Amount to Sell', () => {
      equityGateway.PageNavi.checkSalesWizardRedirect('amount-to-sell')
    })

    it('C30159584 - Sales Wizard Order Type', () => {
      equityGateway.PageNavi.checkSalesWizardRedirect('order-type')
    })

    it('C30159585 - Sales Wizard Distribution', () => {
      equityGateway.PageNavi.checkSalesWizardRedirect('distribution')
    })

    it('C30159586 - Sales Wizard Review Order', () => {
      equityGateway.PageNavi.checkSalesWizardRedirect('review-order')
    })

    it('C30159587 - Sales Wizard Success Confirmation', () => {
      equityGateway.PageNavi.checkSalesWizardRedirect('success-confirmation')
    })
  })
})
