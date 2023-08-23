import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
/**
 * https://globalshares.testrail.net/index.php?/suites/view/18820&group_by=cases:section_id&group_order=asc&display_deleted_cases=0&group_id=1008667
 * Cross Screen Functionalities Test Suite
 */
describe('Page Navigation Tests', () => {
  /** Related to User Stories
   * EGVFOUR-266
   **/

  context('Validate Activity Page Navigation', () => {
    beforeEach(() => {
      equityGateway.LoginPage.login()
      equityGateway.DashboardPage.clickViewAllActivity()
    })
    /** Related to User Stories
     * EGVFOUR-266
     */
    it('C30665123 - Navigates to Dashboard from Activity Page', () => {
      equityGateway.ActivityPage.breadcrumbNavi()
      cy.url().should('include', '/dashboard')
    })
  })
})
