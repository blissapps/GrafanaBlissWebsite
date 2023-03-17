import EquityAdmin from '../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Security tests', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.applicationLeftMenuBar.openProfileMenuBar()
    equityAdmin.profileMenuNavBar.openProfileSecurityPage()
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
