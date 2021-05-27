import SecurityPage from '../../support/pages/profilePages/securityPage'
import HomePage from '../../support/pages/homePage'

import LeftMenuNavBar from '../../support/components/leftMenuNavBar'

describe('Trusts tests', () => {
  const leftMenuNavBar = new LeftMenuNavBar()
  const securityPage = new SecurityPage()
  const homePage = new HomePage()

  beforeEach(() => {
    // @ts-ignore
    cy.login() && cy.loginSuccessfulXHRWaits()
    leftMenuNavBar.openProfileSecurityPage()
  })

  /**
   * Test if the menu link sends to the correct page and it gets back to the home screen if closed
   */
  it('C1234567_Check_URL_Access_Over_The_Menu', () => {
    securityPage.checkProfileSecurityUrl()
    leftMenuNavBar.closeProfileLeftBar()
    homePage.checkUrl('home')
  })

  /**
   * Change password Successfully
   */
  it('C1234567_Change_Password_Successfully', () => {
    securityPage.checkProfileSecurityUrl()
    securityPage.changePassword('test', 'test')
  })

  /**
   * Change password Unsuccessfully
   */
})
