import EquityAdmin from '../support/pages/equityAdmin'
// @ts-ignore
import dataTest from '../fixtures/data.json'

const equityAdmin = new EquityAdmin()
const dataTestLanguage = Cypress.env('LANGUAGE')

describe('Login and Logout tests', { tags: ['@smoke'] }, () => {
  it('C7644497_Login_And_Logout_Functionalities_Are_Persistent', () => {
    equityAdmin.loginPage.loginWithoutSession()
    cy.loginSuccessfulXHRWaits()
    equityAdmin.homePage.checkUrl('/home')
    equityAdmin.profileMenuNavBar.logout()

    equityAdmin.loginPage.checkUrl('/Account/Log')
    equityAdmin.loginPage.goBackOrForwardInBrowser('back')
    equityAdmin.loginPage.checkUrl('/Account/Log')
  })

  it('C7668435_Login_With_Both_Wrong_User_And_Password', () => {
    equityAdmin.loginPage.loginWithoutSession('wronguser@glbalshares.com', '123!ABC')
    equityAdmin.loginPage.assertUnsuccessfulLoginErrorMessageDisplayed(dataTest[dataTestLanguage].errorMessages.loginInvalidEmailOrPassword)
  })

  it('C7668436_Login_With_Correct_User_And_Wrong_Password', () => {
    equityAdmin.loginPage.loginWithoutSession('lmello@globalshares.co.uk', '123!ABC')
    equityAdmin.loginPage.assertUnsuccessfulLoginErrorMessageDisplayed(dataTest[dataTestLanguage].errorMessages.loginInvalidEmailOrPassword)
  })

  it('C7644496_Logout_Button_Consistency', () => {
    equityAdmin.loginPage.loginWithoutSession()
    cy.loginSuccessfulXHRWaits()
    equityAdmin.homePage.checkUrl('/home')

    equityAdmin.applicationLeftMenuBar.openProfileMenuBar()
    equityAdmin.profileMenuNavBar.assertSignOutButtonIsVisible()
    equityAdmin.profileMenuNavBar.closeProfileMenuNavBar()

    equityAdmin.applicationLeftMenuBar.openProfileMenuBar()
    equityAdmin.profileMenuNavBar.openProfilePersonalInformationPage()
    equityAdmin.profileMenuNavBar.assertSignOutButtonIsVisible()
    equityAdmin.profileMenuNavBar.closeProfileMenuNavBar()

    equityAdmin.applicationLeftMenuBar.openProfileMenuBar()
    equityAdmin.profileMenuNavBar.openProfileSecurityPage()
    equityAdmin.profileMenuNavBar.assertSignOutButtonIsVisible()
    equityAdmin.profileMenuNavBar.closeProfileMenuNavBar()

    equityAdmin.applicationLeftMenuBar.openProfileMenuBar()
    equityAdmin.profileMenuNavBar.openProfilePreferencesPage()
    equityAdmin.profileMenuNavBar.assertSignOutButtonIsVisible()
    equityAdmin.profileMenuNavBar.closeProfileMenuNavBar()

    equityAdmin.applicationLeftMenuBar.clickLogoToGoToHomePage()
    equityAdmin.profileMenuNavBar.assertSignOutButtonIsVisible(false)
  })
})
