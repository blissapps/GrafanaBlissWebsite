import BasePage from '../basePage'

const selectors = {
  inputNameField: '#Username',
  inputPasswordField: '#Password',
  loginButton: 'input[value="Login"],button[type="Submit"]',
  optCodeField: '#Code',
  validateOtpButton: 'button[value="send"]'
}

class LoginPage extends BasePage {
  /**
   * Check if the url is the one expected for this page
   */
  checkPageUrl() {
    this.checkUrl('Authentication/LogOn')
  }

  /**
   * Login command through the application UI
   *
   * @param {String} email email to login. The default variable is set in the cypress.json file
   * @param {String} password password to login. The default variable is set in the cypress.json file
   */
  login(email, password) {
    this.loginWithoutSession(email, password)
  }

  /**
   * Login command through the application UI WITHOUT session storage (We don't use sessions for the Equity Gateway)
   *
   * @param {String} email email to login. The default variable is set in the cypress.json file
   * @param {String} password password to login. The default variable is set in the cypress.json file
   */
  loginWithoutSession(email, password) {
    cy.get(selectors.inputNameField).clear({ force: true }).type(email)
    cy.get(selectors.loginButton).click({ force: true })

    cy.get(selectors.inputPasswordField).clear({ force: true }).type(password, { log: false, force: true })
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
}

export default LoginPage
