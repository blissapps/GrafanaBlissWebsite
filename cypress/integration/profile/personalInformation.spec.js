import PersonalInformationPage from '../../support/pages/profilePages/personalInformationPage'
import LeftMenuNavBar from '../../support/components/leftMenuNavBar'

describe('Personal Information tests', () => {
  const leftMenuNavBar = new LeftMenuNavBar()
  const personalInformationPage = new PersonalInformationPage()

  beforeEach(() => {
    cy.login()
    cy.visit('/') && cy.reload()
    cy.loginSuccessfulXHRWaits()
    leftMenuNavBar.openProfileMenuBar()
    leftMenuNavBar.openProfilePersonalInformationPage()
  })

  /**
   * Test if the menu link sends to the correct page and it gets back to the home screen if closed
   */
  it('C1234567_Check_URL_Access_Over_The_Menu', () => {
    personalInformationPage.checkProfilePersonalInformationUrl()
    leftMenuNavBar.closeProfileLeftBar()
    personalInformationPage.checkProfilePersonalInformationUrl()
  })

  /**
   * Edit personal information by sending name, contact number, and email
   */
  it('C1234567_Edit_Personal_Information', () => {
    personalInformationPage.editPersonalInfo('Test name', '+1 555 555 555', 'test email')
  })
})
