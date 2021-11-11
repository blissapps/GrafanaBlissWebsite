import AuthLoginPage from '../support/pages/authLoginPage'
import HomePage from '../support/pages/homePage'
import LeftMenuNavBar from '../support/components/leftMenuNavBar'
import ProfileMenuNavBar from '../support/components/profileMenuNavBar'

// @ts-ignore
import dataTest from '../fixtures/data.json'

describe('Login and Logout tests', () => {
  // Pages
  const authLoginPage = new AuthLoginPage()
  const homePage = new HomePage()

  //Components
  const leftMenuNavBar = new LeftMenuNavBar()
  const profileMenuNavBar = new ProfileMenuNavBar()

  // Localized data
  const dataTestLanguage = Cypress.env('LANGUAGE')

  it('C7644497_Login_And_Logout_Functionalities_Are_Persistent', () => {
    cy.loginWithoutSession()
    cy.loginSuccessfulXHRWaits()
    homePage.checkUrl('/home')
    cy.logout()

    authLoginPage.checkUrl('/Account/Login')
    authLoginPage.goBackOrForwardInBrowser('back')
    authLoginPage.checkUrl('/Account/Login')
  })

  it('C7668435_Login_With_Both_Wrong_User_And_Password', () => {
    cy.loginWithoutSession('wronguser@glbalshares.com', '123!ABC')
    authLoginPage.assertUnsuccessfulLoginErrorMessageDisplayed(dataTest[dataTestLanguage].errorMessages.loginInvalidEmailOrPassword)
  })

  it('C7668436_Login_With_Correct_User_And_Wrong_Password', () => {
    cy.loginWithoutSession('lmello@globalshares.co.uk', '123!ABC')
    authLoginPage.assertUnsuccessfulLoginErrorMessageDisplayed(dataTest[dataTestLanguage].errorMessages.loginInvalidEmailOrPassword)
  })

  it('C7644496_Logout_Button_Consistency', () => {
    cy.loginWithoutSession()
    cy.loginSuccessfulXHRWaits()
    homePage.checkUrl('/home')

    leftMenuNavBar.openProfileMenuBar()
    profileMenuNavBar.assertSignOutButtonIsVisible()
    profileMenuNavBar.closeProfileMenuNavBar()

    leftMenuNavBar.openProfileMenuBar()
    profileMenuNavBar.openProfilePersonalInformationPage()
    profileMenuNavBar.assertSignOutButtonIsVisible()
    profileMenuNavBar.closeProfileMenuNavBar()

    leftMenuNavBar.openProfileMenuBar()
    profileMenuNavBar.openProfileSecurityPage()
    profileMenuNavBar.assertSignOutButtonIsVisible()
    profileMenuNavBar.closeProfileMenuNavBar()

    leftMenuNavBar.openProfileMenuBar()
    profileMenuNavBar.openProfilePreferencesPage()
    profileMenuNavBar.assertSignOutButtonIsVisible()
    profileMenuNavBar.closeProfileMenuNavBar()

    leftMenuNavBar.clickLogoToGoToHomePage()
    profileMenuNavBar.assertSignOutButtonIsVisible(false)
  })
})
