// @ts-nocheck
import AuthLoginPage from '../support/pages/authLoginPage'
import HomePage from '../support/pages/homePage'
import LeftMenuNavBar from '../support/components/leftMenuNavBar'

describe('Login and Logout tests', () => {
  const authLoginPage = new AuthLoginPage()
  const homePage = new HomePage()
  const leftMenuNavBar = new LeftMenuNavBar()

  it('C7644497_Login_And_Logout_Functionalities_Are_Persistent', () => {
    cy.login()
    cy.loginSuccessfulXHRWaits()
    homePage.checkUrl('/home')
    cy.logout()
    authLoginPage.checkUrl('/Account/Login')
    authLoginPage.goBackOrForwardInBrowser('back')
    authLoginPage.checkUrl('/Account/Login')
  })

  it('C7668435_Login_With_Both_Wrong_User_And_Password', () => {
    cy.login('wronguser@glbalshares.com', '123!ABC')
    authLoginPage.checkUnsuccessfulLoginErrorMessageDisplayed()
  })

  it('C7668436_Login_With_Correct_User_And_Wrong_Password', () => {
    cy.login('lmello@globalshares.co.uk', '123!ABC')
    authLoginPage.checkUnsuccessfulLoginErrorMessageDisplayed().should('be.visible')
  })

  it('C7644496_Logout_Button_Consistency', () => {
    cy.login()
    cy.loginSuccessfulXHRWaits()
    homePage.checkUrl('/home')

    leftMenuNavBar.openProfileMenuBar()
    leftMenuNavBar.assertSignOutButtonIsVisible()
    leftMenuNavBar.closeProfileLeftBar()

    leftMenuNavBar.openProfilePersonalInformationPage()
    leftMenuNavBar.assertSignOutButtonIsVisible()
    leftMenuNavBar.closeProfileLeftBar()

    leftMenuNavBar.openProfileSecurityPage()
    leftMenuNavBar.assertSignOutButtonIsVisible()
    leftMenuNavBar.closeProfileLeftBar()

    leftMenuNavBar.openProfilePreferencesPage()
    leftMenuNavBar.assertSignOutButtonIsVisible()
    leftMenuNavBar.closeProfileLeftBar()

    leftMenuNavBar.clickLogoToGoToHomePage()
    leftMenuNavBar.assertSignOutButtonIsVisible(false)
  })
})
