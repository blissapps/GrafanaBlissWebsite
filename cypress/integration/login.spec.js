// @ts-nocheck
import AuthLoginPage from '../support/pages/authLoginPage'
import HomePage from '../support/pages/homePage'

describe('Login and Logout tests', () => {
  const authLoginPage = new AuthLoginPage()
  const homePage = new HomePage()

  it('C1234567_Login_And_Logout_Positive', () => {
    cy.login()
    cy.loginSuccessfulXHRWaits()
    homePage.checkUrl('/home')
    cy.logout()
    authLoginPage.checkUrl('/Account/Login')
  })

  it('C1234567_Login_With_Both_Wrong_User_And_Password', () => {
    cy.login('wronguser@glbalshares.com', '123!ABC')
    authLoginPage.checkUnsuccessfulLoginErrorMessageDisplayedForInvalidEmail()
  })

  it('C1234567_Login_With_Correct_User_And_Wrong_Password', () => {
    cy.login('lmello@globalshares.co.uk', '123!ABC')
    authLoginPage.checkUnsuccessfulLoginErrorMessageDisplayed().should('be.visible')
  })

  // Add test to how many times until the user gets blocked?
})
