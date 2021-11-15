import EquityAdmin from '../support/pages/equityAdmin'

// @ts-ignore
import dataTest from '../fixtures/data.json'

describe('Login and Logout tests', () => {
  const equityAdmin = new EquityAdmin()
  const dataTestLanguage = Cypress.env('LANGUAGE')

  it('C7644497_Login_And_Logout_Functionalities_Are_Persistent', () => {
    cy.loginWithoutSession()
    cy.loginSuccessfulXHRWaits()
    equityAdmin.homePage.checkUrl('/home')
    cy.logout()

    equityAdmin.authLoginPage.checkUrl('/Account/Login')
    equityAdmin.authLoginPage.goBackOrForwardInBrowser('back')
    equityAdmin.authLoginPage.checkUrl('/Account/Login')
  })

  it('C7668435_Login_With_Both_Wrong_User_And_Password', () => {
    cy.loginWithoutSession('wronguser@glbalshares.com', '123!ABC')
    equityAdmin.authLoginPage.assertUnsuccessfulLoginErrorMessageDisplayed(dataTest[dataTestLanguage].errorMessages.loginInvalidEmailOrPassword)
  })

  it('C7668436_Login_With_Correct_User_And_Wrong_Password', () => {
    cy.loginWithoutSession('lmello@globalshares.co.uk', '123!ABC')
    equityAdmin.authLoginPage.assertUnsuccessfulLoginErrorMessageDisplayed(dataTest[dataTestLanguage].errorMessages.loginInvalidEmailOrPassword)
  })

  it('C7644496_Logout_Button_Consistency', () => {
    cy.loginWithoutSession()
    cy.loginSuccessfulXHRWaits()
    equityAdmin.homePage.checkUrl('/home')

    equityAdmin.leftMenuNavBar.openProfileMenuBar()
    equityAdmin.profileMenuNavBar.assertSignOutButtonIsVisible()
    equityAdmin.profileMenuNavBar.closeProfileMenuNavBar()

    equityAdmin.leftMenuNavBar.openProfileMenuBar()
    equityAdmin.profileMenuNavBar.openProfilePersonalInformationPage()
    equityAdmin.profileMenuNavBar.assertSignOutButtonIsVisible()
    equityAdmin.profileMenuNavBar.closeProfileMenuNavBar()

    equityAdmin.leftMenuNavBar.openProfileMenuBar()
    equityAdmin.profileMenuNavBar.openProfileSecurityPage()
    equityAdmin.profileMenuNavBar.assertSignOutButtonIsVisible()
    equityAdmin.profileMenuNavBar.closeProfileMenuNavBar()

    equityAdmin.leftMenuNavBar.openProfileMenuBar()
    equityAdmin.profileMenuNavBar.openProfilePreferencesPage()
    equityAdmin.profileMenuNavBar.assertSignOutButtonIsVisible()
    equityAdmin.profileMenuNavBar.closeProfileMenuNavBar()

    equityAdmin.leftMenuNavBar.clickLogoToGoToHomePage()
    equityAdmin.profileMenuNavBar.assertSignOutButtonIsVisible(false)
  })
})
