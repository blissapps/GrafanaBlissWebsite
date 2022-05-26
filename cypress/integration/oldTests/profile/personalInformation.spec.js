import EquityAdmin from '../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Personal Information tests', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.applicationLeftMenuBar.openProfileMenuBar()
    equityAdmin.profileMenuNavBar.openProfilePersonalInformationPage()
  })

  /**
   * Test if the menu link sends to the correct page and it gets back to the home screen if closed
   */
  it('C1234567 Check URL Access Over The Menu', () => {
    equityAdmin.personalInformationPage.checkPageUrl()
    equityAdmin.profileMenuNavBar.closeProfileMenuNavBar()
    equityAdmin.personalInformationPage.checkPageUrl()
  })

  /**
   * Edit personal information by sending name, contact number, and email
   */
  it('C1234567 Edit Personal Information', () => {
    // Login with another user to not mix things up
    equityAdmin.personalInformationPage.editPersonalInfo('Test name', '+1 555555555', 'editedEmail@gmail.com')
    equityAdmin.personalInformationPage.reloadPage()
  })
})
