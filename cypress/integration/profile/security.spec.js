import EquityAdmin from '../../support/pages/equityAdmin'

describe('Security tests', () => {
  const equityAdmin = new EquityAdmin()

  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.applicationLeftMenuBar.openProfileMenuBar()
    equityAdmin.profileMenuNavBar.openProfileSecurityPage()
  })

  /**
   * Test if the menu link sends to the correct page and it gets back to the home screen if closed
   */
  it('C1234567_Check_URL_Access_Over_The_Menu', () => {
    equityAdmin.securityPage.checkProfileSecurityUrl()
    equityAdmin.profileMenuNavBar.closeProfileMenuNavBar()
    equityAdmin.securityPage.checkProfileSecurityUrl()
  })

  /**
   * Change password Successfully
   */
  it('C1234567_Change_Password_Successfully', () => {
    equityAdmin.securityPage.checkProfileSecurityUrl()
    equityAdmin.securityPage.changePassword('test', 'test')
  })

  /**
   * Change password Unsuccessfully
   */
})
