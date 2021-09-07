// @ts-nocheck
import AuthLoginPage from '../support/pages/authLoginPage'
import HomePage from '../support/pages/homePage'
import LeftMenuNavBar from '../support/components/leftMenuNavBar'

import dataTest from '../fixtures/data.json'

describe('Login and Logout tests', () => {
  // Pages
  const authLoginPage = new AuthLoginPage()
  const homePage = new HomePage()

  //Components
  const leftMenuNavBar = new LeftMenuNavBar()

  // Localized data
  const dataTestLanguage = Cypress.env('language')

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
    authLoginPage.assertUnsuccessfulLoginErrorMessageDisplayed(dataTest[dataTestLanguage].errorMessages.loginInvalidEmailOrPassword)
  })

  it('C7668436_Login_With_Correct_User_And_Wrong_Password', () => {
    cy.login('lmello@globalshares.co.uk', '123!ABC')
    authLoginPage.assertUnsuccessfulLoginErrorMessageDisplayed(dataTest[dataTestLanguage].errorMessages.loginInvalidEmailOrPassword)
  })

  it('C7644496_Logout_Button_Consistency', () => {
    cy.login()
    cy.loginSuccessfulXHRWaits()
    homePage.checkUrl('/home')

    leftMenuNavBar.openProfileMenuBar()
    leftMenuNavBar.assertSignOutButtonIsVisible()
    leftMenuNavBar.closeProfileLeftBar()

    leftMenuNavBar.openProfileMenuBar()
    leftMenuNavBar.openProfilePersonalInformationPage()
    leftMenuNavBar.assertSignOutButtonIsVisible()
    leftMenuNavBar.closeProfileLeftBar()

    leftMenuNavBar.openProfileMenuBar()
    leftMenuNavBar.openProfileSecurityPage()
    leftMenuNavBar.assertSignOutButtonIsVisible()
    leftMenuNavBar.closeProfileLeftBar()

    leftMenuNavBar.openProfileMenuBar()
    leftMenuNavBar.openProfilePreferencesPage()
    leftMenuNavBar.assertSignOutButtonIsVisible()
    leftMenuNavBar.closeProfileLeftBar()

    leftMenuNavBar.clickLogoToGoToHomePage()
    leftMenuNavBar.assertSignOutButtonIsVisible(false)
  })
})
