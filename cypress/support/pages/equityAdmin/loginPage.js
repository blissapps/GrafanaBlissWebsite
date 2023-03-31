import BasePage from '../basePage'
import HomePage from '../equityAdmin/homePage'

const homePage = new HomePage()

const selectors = {
  inputNameField: '#Username',
  inputPasswordField: '#Password',
  loginButton: 'button[type="Submit"]',
  errorMessageNotification: '.validation-summary-errors li',
  optCodeField: '#Code',
  validateOtpButton: 'button[value="send"]'
}

class LoginPage extends BasePage {
  /**
   * Check if the url is the one expected for this page
   */
  checkPageUrl() {
    this.checkUrl('/Account/Login')
  }

  /**
   * Login command through the application UI with session storage and XHR interceptions
   *
   * @param {String} email email to login. The default variable is set in the cypress.json file
   * @param {String} password password to login. The default variable is set in the cypress.json file
   */
  login(email = Cypress.env('DEFAULT_USER_AUTH'), password = Cypress.env('DEFAULT_PASSWORD_AUTH')) {
    this.loginWithSession(email, password)
    cy.interceptHomeSystemInitializedAPICalls()
    cy.waitForHomeSystemInitializedApiCalls()
  }

  /**
   * Login command through the application UI WITH session storage
   *
   * @param {string} email email to login. The default variable is set in the cypress.json file
   * @param {string} password password to login. The default variable is set in the cypress.json file
   */
  loginWithSession(email = Cypress.env('DEFAULT_USER_AUTH'), password = Cypress.env('DEFAULT_PASSWORD_AUTH')) {
    cy.session(
      [email, password],
      () => {
        this.loginWithoutSession(email, password)
      },
      {
        validate() {
          // @ts-ignore
          cy.request(Cypress.config('baseUrl')).its('status').should('eq', 200)
        }
      }
    )

    cy.visit('/')

    /**
     * Final verification - The code below creates a new session in case the "Session Timeout" message is displayed
     * Warning!!! This method works in a recursion, so be careful while touching it since you can end up in an infinite loop!
     */
    cy.get('body').then(($body) => {
      if ($body.find('#messageView').length > 0) {
        cy.get('#messageView').then(($header) => {
          if ($header.is(':visible')) {
            cy.log('Session timeout message, moving to login to create a new session')
            Cypress.session.clearAllSavedSessions()
            cy.get('a[href="/Authentication/Logout"]').click()
            this.loginWithSession(email, password)
          }
        })
      } else {
        //you get here if the session is already created
        assert.isOk('Everything is OK', 'Session already created, moving on...')
      }
    })
  }

  /**
   * Login command through the application UI WITHOUT session storage
   *
   * @param {String} email email to login. The default variable is set in the cypress.json file
   * @param {String} password password to login. The default variable is set in the cypress.json file
   */
  loginWithoutSession(email = Cypress.env('EQUITY_ADMIN_DEFAULT_USER_AUTH'), password = Cypress.env('EQUITY_ADMIN_DEFAULT_PASSWORD_AUTH')) {
    cy.visit('/')

    // Warning!!! This method works in a recursion, so be careful while touching it since you can end up in an infinite loop!
    cy.get('body').then(($body) => {
      if ($body.find('#messageView').length > 0) {
        cy.get('#messageView').then(($header) => {
          if ($header.is(':visible')) {
            cy.log('Session timeout message, moving to the login page to log in again')
            cy.get('a[href="/Authentication/Logout"]').click()
            this.loginWithoutSession(email, password)
          }
        })
      } else {
        //you get here if the session is already created
        assert.isOk('Everything is OK', 'Session already created, moving on...')
      }
    })

    // Continues the normal login
    cy.get(selectors.inputNameField).type(email)
    cy.get(selectors.inputPasswordField).type(password, { log: false })
    cy.get(selectors.loginButton).click()

    cy.url().then(($url) => {
      if ($url.includes('/Mfa/Authenticate')) {
        cy.task('generateOTP', Cypress.env('OTP_SECRET_KEY')).then((token) => {
          // @ts-ignore
          cy.get(selectors.optCodeField).type(token)
        })

        cy.get(selectors.validateOtpButton).click()
      }
    })
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
    cy.get(selectors.inputNameField).should('be.visible')
    cy.get(selectors.inputPasswordField).should('be.visible')
    cy.get(selectors.loginButton).should('be.visible')
  }
}

export default LoginPage
