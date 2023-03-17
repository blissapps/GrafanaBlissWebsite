import EquityAdmin from '../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Security tests', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.applicationLeftMenuBar.openProfileMenuBar()
    equityAdmin.profileMenuNavBar.openProfileSecurityPage()
  })

  /**
   * Test if the menu link sends to the correct page and it gets back to the home screen if closed
   */
  it('C18295658 Check URL Access Over The Menu', () => {
    equityAdmin.securityPage.checkPageUrl()
    equityAdmin.securityPage.assertHeaderIsDisplayedCorrectly(true, 'Security')
    equityAdmin.profileMenuNavBar.closeProfileMenuNavBar()
    equityAdmin.securityPage.checkPageUrl()
  })
})
