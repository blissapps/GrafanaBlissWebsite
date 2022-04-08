import EquityAdmin from '../../support/pages/equityAdmin'
// @ts-ignore
import dataTest from '../fixtures/data.json'

const equityAdmin = new EquityAdmin()
const dataTestLanguage = Cypress.env('LANGUAGE') // Used just as an example if we want to apply l10n in other spec files

describe('Login and Logout tests', { tags: ['@smoke'] }, () => {
  it('C16515484_Unsuccessful Login with wrong password', () => {
    equityAdmin.loginPage.loginWithoutSession(Cypress.env('DEFAULT_USER_AUTH'), 'Test@1234')
    equityAdmin.loginPage.assertUnsuccessfulLoginErrorMessageDisplayed(dataTest[dataTestLanguage].errorMessages.loginInvalidEmailOrPassword)
  })

  it('C16515485_Successful Login', () => {
    equityAdmin.loginPage.loginWithoutSession()
    equityAdmin.homePage.checkPageUrl()
  })

  it('C16515486_Unsuccessful Login with wrong username', () => {
    equityAdmin.loginPage.loginWithoutSession('test@test.com', Cypress.env('DEFAULT_PASSWORD_AUTH'))
    equityAdmin.loginPage.assertUnsuccessfulLoginErrorMessageDisplayed(dataTest[dataTestLanguage].errorMessages.loginInvalidEmailOrPassword)
  })

  it('C16515487_Logout from the application', () => {
    equityAdmin.loginPage.loginWithoutSession()
    cy.loginSuccessfulXHRWaits()
    equityAdmin.homePage.checkUrl('/home')
    equityAdmin.profileMenuNavBar.logout()

    equityAdmin.loginPage.checkUrl('/Account/Log')
  })

  it('C16515488_Login and Logout functionalities are persistent', () => {
    equityAdmin.loginPage.loginWithoutSession()
    cy.loginSuccessfulXHRWaits()
    equityAdmin.homePage.checkUrl('/home')
    equityAdmin.profileMenuNavBar.logout()

    equityAdmin.loginPage.checkUrl('/Account/Log')
    equityAdmin.loginPage.goBackOrForwardInBrowser('back')
    equityAdmin.loginPage.checkUrl('/Account/Log')
  })
})
