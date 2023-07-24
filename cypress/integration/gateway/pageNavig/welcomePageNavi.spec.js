import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
/**
 * https://globalshares.testrail.net/index.php?/suites/view/18820&group_by=cases:section_id&group_order=asc&display_deleted_cases=0&group_id=1008667
 * Cross Screen Functionalities Test Suite
 */
describe('Welcome Page Navigation Tests', () => {
  /** Related to User Stories
   * EGVFOUR-266
   **/
  context('Welcome Page Navigations', () => {
    beforeEach(() => {
      equityGateway.LoginPage.login()
    })

    it('C30159578 - User is redirected to dashboard when it logs in', () => {
      equityGateway.PageNavi.pageNaviUrlValidation('/dashboard')
    })

    it('C30665103 - Validates Welcome Page Footer', () => {
      equityGateway.FooterBar.checkPage('Help', '/help')
      equityGateway.FooterBar.checkPage('Privacy Policy', '/privacy-policy')
    })
  })
})
