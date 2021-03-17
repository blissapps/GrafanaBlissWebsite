// @ts-nocheck
import AuthLoginPage from '../support/pages/authLoginPage'
import HomePage from '../support/pages/homePage'

describe('Login and Logout tests', () => {
  const authLoginPage = new AuthLoginPage()
  const homePage = new HomePage()

  it('Login and logout positive ', () => {
    cy.login()
    homePage.checkUrl('/home')
    cy.logout()
    authLoginPage.checkUrl('/Account/Login')
  })

  it('Login negative with both wrong user and password', () => {
    cy.login('wronguser@glbalshares.com', '123!ABC')
    authLoginPage.checkUnsuccessfulLoginErrorMessageDisplayed().should('be.visible')
  })

  it('Login negative with correct user and wrong password', () => {
    cy.login('lmello@globalshares.co.uk', '123!ABC')
    authLoginPage.checkUnsuccessfulLoginErrorMessageDisplayed().should('be.visible')
  })

  // Add test to how many times until the user gets blocked?
})
