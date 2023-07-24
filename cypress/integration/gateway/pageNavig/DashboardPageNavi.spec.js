import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
/**
 * https://globalshares.testrail.net/index.php?/suites/view/18820&group_by=cases:section_id&group_order=asc&display_deleted_cases=0&group_id=1008667
 * Cross Screen Functionalities Test Suite
 */
describe('Dashboard Page Navigation Tests', () => {

  context('Dashboard Page Navigations', () => {
    /** Related to User Stories
     * EGVFOUR-252
     **/
    beforeEach(() => {
      equityGateway.LoginPage.login()
    })
    it('C30665111 - User is redirected to dashboard when it clicks on sidebar Dashboard Button', () => {
      equityGateway.MainPageSideMenu.clickSideMenuButton('Dashboard')
      equityGateway.PageNavi.pageNaviUrlValidation('/dashboard')
    })

    it('C30458338 - User is redirected to Helpdesk when it clicks on sidebar Support-Help Button', () => {
      equityGateway.MainPageSideMenu.support('Help')
      equityGateway.PageNavi.pageNaviUrlValidation('/help')
    })

    it('TBD Later - Validate other side menu elements', () => {
      //TBD When the other elements are available
    })

    it('C30665112 - Validates Dashboard Page Footer', () => {
      equityGateway.FooterBar.checkPage('Help', '/help')
      equityGateway.FooterBar.checkPage('Privacy Policy', '/privacy-policy')
      equityGateway.FooterBar.checkPage('Terms and Conditions', '/terms-and-conditions')
    })

    it('C30159579 - Validates Dashboard Top Bar Personal Information Navigation', () => {
      equityGateway.TopBar.accMenuClick(null, 'Personal Information')
      equityGateway.PageNavi.pageNaviUrlValidation('/my-account/profile/personal-information')
    })

    it('C30665113 - Validates Dashboard Top Bar Bank Account Navigation', () => {
      equityGateway.TopBar.accMenuClick(null, 'Bank Account')
      equityGateway.PageNavi.pageNaviUrlValidation('/my-account/account-preferences/bank-account')
    })

    it('C30665114 - Validates Dashboard Top Bar Tax Documents Navigation', () => {
      equityGateway.TopBar.accMenuClick(null, 'Tax Documents')
      equityGateway.PageNavi.pageNaviUrlValidation('/my-account/tax/tax-documents')
    })

    it('C30665115 - Validates Dashboard Top Bar Logout Navigation', () => {
      equityGateway.TopBar.accMenuClick(null, 'Logout')
      equityGateway.PageNavi.pageNaviUrlValidation('/welcome')
    })

    it('C30159588 - Validates Dashboard View All Activity Navigation', () => {
      equityGateway.DashboardPage.clickViewAllActivity()
      equityGateway.PageNavi.pageNaviUrlValidation('/activity')
    })
  })
})
