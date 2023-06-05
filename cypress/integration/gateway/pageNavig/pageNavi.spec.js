import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
describe('Validate Page Navi Elements', () => {
  context('Validate Helpdesk Navigation', () => {
    /** Related to User Stories
     * EGVFOUR-39, EGVFOUR-151
     **/
    it('Need to include in Testrail - Helpdesk navigation from welcome page', () => {
      equityGateway.PageNavi.navigateToHelpDeskNoAuth()
    })

    /** Related to User Stories
     * EGVFOUR-40
     */
    it('Need to include in Testrail - Helpdesk navigation from dashboard', () => {
      equityGateway.LoginPage.login() //Workaround for now
      equityGateway.PageNavi.navigateToHelpDeskAuth()
    })
  })

  context('Validate Dashboard Navigation', () => {
    /** Related to User Stories
     * EGVFOUR-266
     */
    it('C30159578 - Dashboard path navigation', () => {
      equityGateway.LoginPage.login()
      equityGateway.PageNavi.navigateToDashboard()
    })
  })

  context('Validate My Account Navigation', () => {
    /** Related to User Stories
     * EGVFOUR-266
     */
    it('C30159579 - My Account path navigation', () => {
      equityGateway.LoginPage.login()
      equityGateway.PageNavi.navigateToDashboard()
    })
  })

  context('Validate Sales Wizard Navigation', () => {
    /** Related to User Stories
     * EGVFOUR-266
     */
    it('C30159578 - Sales Wizard Default', () => {
      equityGateway.PageNavi.navigateToSalesWizard()
    })

    it('C30159578 - Sales Wizard Security', () => {
      equityGateway.PageNavi.navigateToSalesWizard('security')
    })

    it('C30159578 - Sales Wizard Share Group', () => {
      equityGateway.PageNavi.navigateToSalesWizard('share-group')
    })

    it('C30159578 - Sales Wizard Amount to Sell', () => {
      equityGateway.PageNavi.navigateToSalesWizard('amount-to-sell')
    })

    it('C30159578 - Sales Wizard Order Type', () => {
      equityGateway.PageNavi.navigateToSalesWizard('order-type')
    })

    it('C30159578 - Sales Wizard Distribution', () => {
      equityGateway.PageNavi.navigateToSalesWizard('distribution')
    })

    it('C30159578 - Sales Wizard Review Order', () => {
      equityGateway.PageNavi.navigateToSalesWizard('review-order')
    })

    it('C30159578 - Sales Wizard Success Confirmation', () => {
      equityGateway.PageNavi.navigateToSalesWizard('success-confirmation')
    })
  })
})
