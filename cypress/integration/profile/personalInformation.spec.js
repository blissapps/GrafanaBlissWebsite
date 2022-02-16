import EquityAdmin from '../../support/pages/equityAdmin'

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
  it('C1234567_Check_URL_Access_Over_The_Menu', () => {
    equityAdmin.personalInformationPage.checkPageUrl()
    equityAdmin.profileMenuNavBar.closeProfileMenuNavBar()
    equityAdmin.personalInformationPage.checkPageUrl()
  })

  /**
   * Edit personal information by sending name, contact number, and email
   */
  it('C1234567_Edit_Personal_Information', () => {
    equityAdmin.personalInformationPage.editPersonalInfo('Test name', '+1 555 555 555', 'test email')
  })
})
