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
  it('C1234567 Check URL Access Over The Menu', () => {
    equityAdmin.securityPage.checkPageUrl()
    equityAdmin.profileMenuNavBar.closeProfileMenuNavBar()
    equityAdmin.securityPage.checkPageUrl()
  })

  /**
   * Change password Successfully
   */
  it('C1234567 Change Password Successfully', () => {
    equityAdmin.securityPage.checkPageUrl()
    equityAdmin.securityPage.changePassword('test', 'test')
  })

  /**
   * Change password Unsuccessfully
   */
})
