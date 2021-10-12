import PersonalInformationPage from '../../support/pages/profilePages/personalInformationPage'
import LeftMenuNavBar from '../../support/components/leftMenuNavBar'
import ProfileMenuNavBar from '../../support/components/profileMenuNavBar'

describe('Personal Information tests', () => {
  const leftMenuNavBar = new LeftMenuNavBar()
  const profileMenuNavBar = new ProfileMenuNavBar()
  const personalInformationPage = new PersonalInformationPage()

  beforeEach(() => {
    cy.login()
    leftMenuNavBar.openProfileMenuBar()
    profileMenuNavBar.openProfilePersonalInformationPage()
  })

  /**
   * Test if the menu link sends to the correct page and it gets back to the home screen if closed
   */
  it('C1234567_Check_URL_Access_Over_The_Menu', () => {
    personalInformationPage.checkProfilePersonalInformationUrl()
    profileMenuNavBar.closeProfileMenuNavBar()
    personalInformationPage.checkProfilePersonalInformationUrl()
  })

  /**
   * Edit personal information by sending name, contact number, and email
   */
  it('C1234567_Edit_Personal_Information', () => {
    personalInformationPage.editPersonalInfo('Test name', '+1 555 555 555', 'test email')
  })
})
