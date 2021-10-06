import SecurityPage from '../../support/pages/profilePages/securityPage'
import LeftMenuNavBar from '../../support/components/leftMenuNavBar'
import ProfileMenuNavBar from '../../support/components/profileMenuNavBar'

describe('Security tests', () => {
  const leftMenuNavBar = new LeftMenuNavBar()
  const profileMenuNavBar = new ProfileMenuNavBar()
  const securityPage = new SecurityPage()

  beforeEach(() => {
    cy.login()
    cy.visit('/') && cy.reload()
    cy.loginSuccessfulXHRWaits()
    leftMenuNavBar.openProfileMenuBar()
    profileMenuNavBar.openProfileSecurityPage()
  })

  /**
   * Test if the menu link sends to the correct page and it gets back to the home screen if closed
   */
  it('C1234567_Check_URL_Access_Over_The_Menu', () => {
    securityPage.checkProfileSecurityUrl()
    profileMenuNavBar.closeProfileMenuNavBar()
    securityPage.checkProfileSecurityUrl()
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
