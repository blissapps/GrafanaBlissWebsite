import BasePage from '../basePage'
import HomePage from '../equityAdmin/homePage'

const homePage = new HomePage()

const selectors = {
  usernameInput: '#username-field',
  passwordInput: '#password-field',
  loginButton: '#login',
  errorMessageNotification: '.notification > .danger'
}

class LoginPage extends BasePage {
  /**
   * Check if the current page is the home URL
   */
  checkLoginPageUrl() {
    this.checkUrl('/Account/Login')
  }

  /**
   * Login command through the application UI with session storage and XHR interceptions
   *
   * @param {string} email email to login. The default variable is set in the cypress.json file
   * @param {string} password password to login. The default variable is set in the cypress.json file
   */
  login(email = Cypress.env('DEFAULT_USER_AUTH'), password = Cypress.env('DEFAULT_PASSWORD_AUTH'), cacheSession = true) {
    cy.interceptHomeSystemInitializedAPICalls()

    if (cacheSession) {
      this.loginWithSession(email, password, cacheSession)
      cy.visit('/')
      cy.waitForHomeSystemInitializedApiCalls() // Make sure the necessary permissions are given before anything
      cy.url().should('contain', '/home') // Make sure the home page is the one loaded after the login
    } else {
      this.loginWithSession(email, password, cacheSession)
    }
  }

  /**
   * Login command through the application UI with SESSION STORAGE
   *
   * @param {string} email email to login. The default variable is set in the cypress.json file
   * @param {string} password password to login. The default variable is set in the cypress.json file
   */
  loginWithSession(email = Cypress.env('DEFAULT_USER_AUTH'), password = Cypress.env('DEFAULT_PASSWORD_AUTH'), cacheSession = true) {
    const login = () => {
      cy.visit('/')
      cy.get(selectors.usernameInput).type(email)
      cy.get(selectors.passwordInput).type(password, { log: false })
      cy.forcedWait(500) // avoid element detached from the DOM. See https://github.com/cypress-io/cypress/issues/7306. A ticket was open https://globalshares.atlassian.net/browse/PB-828
      cy.get(selectors.loginButton).click()
    }
    if (cacheSession) {
      cy.session([email, password], login), { cacheAcrossSpecs: true }
    } else {
      login()
    }
  }

  /**
   * Login command through the application UI With SESSION STORAGE and with MOCKED permissions
   *
   * @param {string} permissionsFixtureFile Name for the permission file located in the fixture folder
   * @param {string} email email to login. The default variable is set in the cypress.json file
   * @param {string} password password to login. The default variable is set in the cypress.json file
   */
  loginWithMockedPermissions(permissionsFixtureFile, email = Cypress.env('DEFAULT_USER_AUTH'), password = Cypress.env('DEFAULT_PASSWORD_AUTH')) {
    cy.interceptHomeSystemInitializedAPICalls(true, permissionsFixtureFile)
    this.login(email, password)
    homePage.assertCompaniesHeaderIsDisplayed() // Just to make sure we are in the landing page and the Companies are already loaded
    cy.forcedWait(2000) // Wait for the settings menu to reload without any issues - This is necessary until the https://github.com/cypress-io/cypress/issues/7306 is fixed
  }

  // ----------------------------------------------------------------------------- ASSERTIONS  ----------------------------------------------------------------------------------- //

  /**
   * Assert the error message is displayed when a unsuccessful login is made for an valid email
   *
   * @param {string} errorMessage error message to be validated
   */
  assertUnsuccessfulLoginErrorMessageDisplayed(errorMessage) {
    cy.get(selectors.errorMessageNotification).should('be.visible').contains(errorMessage)
  }

  /**
   * Assert the main login elements (username field, password field, and Sign In button) are visible.
   * This method is very useful for a warmup test
   */
  assertLoginElementsAreVisible() {
    cy.get(selectors.usernameInput).should('be.visible')
    cy.get(selectors.passwordInput).should('be.visible')
    cy.get(selectors.loginButton).should('be.visible')
  }
}

export default LoginPage
