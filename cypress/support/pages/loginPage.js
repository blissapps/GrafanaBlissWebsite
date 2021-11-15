import BasePage from './basePage'

const selectors = {
  usernameInput: '#username-field',
  passwordInput: '#password-field',
  loginButton: '#login',
  errorMessageNotification: '.notification > .danger'
}

class LoginPage extends BasePage {
  /**
   * Login command through the application UI with session storage and XHR interceptions
   *
   * @param {String} email email to login. The default variable is set in the cypress.json file
   * @param {String} password password to login. The default variable is set in the cypress.json file
   */
  login(email = Cypress.env('DEFAULT_USER_AUTH'), password = Cypress.env('DEFAULT_PASSWORD_AUTH')) {
    this.loginWithSession(email, password)
    cy.visit('/') && cy.reload()
    cy.loginSuccessfulXHRWaits()
  }

  /**
   * Login command through the application UI with SESSION STORAGE
   *
   * @param {String} email email to login. The default variable is set in the cypress.json file
   * @param {String} password password to login. The default variable is set in the cypress.json file
   */
  loginWithSession(email = Cypress.env('DEFAULT_USER_AUTH'), password = Cypress.env('DEFAULT_PASSWORD_AUTH')) {
    cy.session([email, password], () => {
      cy.visit('/')
      cy.get(selectors.usernameInput).type(email)
      cy.get(selectors.passwordInput).type(password, { log: false })
      cy.forcedWait(500) // avoid element detached from the DOM. See https://github.com/cypress-io/cypress/issues/7306. A ticket was open https://globalshares.atlassian.net/browse/PB-828
      cy.get(selectors.loginButton).click()
      cy.url().should('contain', '/home')
    })
  }

  /**
   * Login command through the application UI without SESSION STORAGE
   *
   * @param {String} email email to login. The default variable is set in the cypress.json file
   * @param {String} password password to login. The default variable is set in the cypress.json file
   */
  loginWithoutSession(email = Cypress.env('DEFAULT_USER_AUTH'), password = Cypress.env('DEFAULT_PASSWORD_AUTH')) {
    cy.visit('/')
    cy.get(selectors.usernameInput).type(email)
    cy.get(selectors.passwordInput).type(password, { log: false })
    cy.forcedWait(500) // avoid element detached from the DOM. See https://github.com/cypress-io/cypress/issues/7306. A ticket was open https://globalshares.atlassian.net/browse/PB-828
    cy.get(selectors.loginButton).click()
  }

  // --------------------------------------- ASSERTIONS  --------------------------------------------- //

  /**
   * Assert the error message is displayed when a unsuccessful login is made for an valid email
   *
   * @param {String} errorMessage error message to be validated
   */
  assertUnsuccessfulLoginErrorMessageDisplayed(errorMessage) {
    cy.get(selectors.errorMessageNotification)
      .should('be.visible')
      .contains(errorMessage)
  }
}

export default LoginPage
