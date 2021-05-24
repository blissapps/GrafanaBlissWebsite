import PersonalInformationPage from '../../support/pages/profilePages/personalInformationPage'
import HomePage from '../../support/pages/homePage'

import LeftMenuBar from '../../support/components/leftMenuBar'

describe('Trusts tests', () => {
  const leftMenuBar = new LeftMenuBar()
  const personalInformationPage = new PersonalInformationPage()
  const homePage = new HomePage()

  beforeEach(() => {
    // @ts-ignore
    cy.login() && cy.loginSuccessfulXHRWaits()
    leftMenuBar.openProfilePersonalInformationPage()
  })

  /**
   * Test if the menu link sends to the correct page and it gets back to the home screen if closed
   */
  it.only('C1234567_Check_URL_Access_Over_The_Menu', () => {
    personalInformationPage.checkProfilePersonalInformationUrl()
    leftMenuBar.closeProfileLeftBar()
    homePage.checkUrl('home')
  })

  /**
   * xxxxx
   */
  it('C1234567_Edit_Personal_Information', () => {
    personalInformationPage.editPersonalInfo('Test name', '+1 555 555 555', 'test email')
  })
})
