import EquityAdmin from '../../support/pages/equityAdmin'

describe('Personal Information tests', () => {
  const equityAdmin = new EquityAdmin()

  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.applicationLeftMenuBar.openProfileMenuBar()
    equityAdmin.profileMenuNavBar.openProfilePersonalInformationPage()
  })

  /**
   * Test if the menu link sends to the correct page and it gets back to the home screen if closed
   */
  it('C1234567_Check_URL_Access_Over_The_Menu', () => {
    equityAdmin.personalInformationPage.checkProfilePersonalInformationUrl()
    equityAdmin.profileMenuNavBar.closeProfileMenuNavBar()
    equityAdmin.personalInformationPage.checkProfilePersonalInformationUrl()
  })

  /**
   * Edit personal information by sending name, contact number, and email
   */
  it('C1234567_Edit_Personal_Information', () => {
    equityAdmin.personalInformationPage.editPersonalInfo('Test name', '+1 555 555 555', 'test email')
  })
})
