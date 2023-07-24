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

  context('Validate Personal Information Page Navigation', () => {
    beforeEach(() => {
      equityGateway.LoginPage.login()
      equityGateway.TopBar.accMenuClick(null, 'Personal Information')
    })
    /** Related to User Stories
     * EGVFOUR-266
     */
    it('C30665116 - Close Button Navigation', () => {
      equityGateway.PersonInfoRMenu.clickCloseButton()
      equityGateway.PageNavi.pageNaviUrlValidation('/dashboard')
    })

    it('C30665117 - Bank Account Navigation', () => {
      equityGateway.PersonInfoRMenu.clickSideMenuButton('Bank account')
      equityGateway.PageNavi.pageNaviUrlValidation('/my-account/account-preferences/bank-account')
    })

    it('C30665118 - Payments Navigation', () => {
      equityGateway.PersonInfoRMenu.clickSideMenuButton('Payments')
      equityGateway.PageNavi.pageNaviUrlValidation('/my-account/account-preferences/payments')
    })

    it.skip('******** - Password and Security Navigation', () => {
      // equityGateway.PersonInfoRMenu.clickSideMenuButton('Password & Security')
      // equityGateway.PageNavi.pageNaviUrlValidation('/my-account/account-preferences/password-and-security')
      //#TODO the behaviour is broken in the application
    })

    it('C30665119 - Language Navigation', () => {
      equityGateway.PersonInfoRMenu.clickSideMenuButton('Language')
      equityGateway.PageNavi.pageNaviUrlValidation('/my-account/account-preferences/language')
    })

    it('C30665120 - Tax Documents Navigation', () => {
      equityGateway.PersonInfoRMenu.clickSideMenuButton('Tax documents')
      equityGateway.PageNavi.pageNaviUrlValidation('/my-account/tax/tax-documents')
    })

    it('C30665121 - Help Navigation', () => {
      equityGateway.PersonInfoRMenu.clickSideMenuButton('Help')
      equityGateway.PageNavi.pageNaviUrlValidation('/help')
    })

    it('C30665122 - Logout Navigation', () => {
      equityGateway.PersonInfoRMenu.clickSideMenuButton('Log Out')
      equityGateway.PageNavi.pageNaviUrlValidation('/welcome')
    })
  })

})
