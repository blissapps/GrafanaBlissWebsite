import BasePage from '../basePage'

const selectors = {
  inputNameField: 'input[placeholder="Username"]',
  inputPasswordField: 'input[placeholder="Password"]',
  optCodeField: '#Code',
  validateOtpButton: 'button[value="send"]'
}

class LoginPage extends BasePage {
  /**
   * Check if the url is the one expected for this page
   */
  checkPageUrl() {
    this.checkUrl(Cypress.env('EQUITY_GATEWAY_BASE_URL'))
  }
  login() {
    this.loginWithSession(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER_AUTH'), Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
    cy.url().should('contain', '/dashboard')
    /**
     * >>> GATEWAY LOGIN STILL PROVISIONAL <<<
    cy.interceptHomeSystemInitializedAPICalls()
    cy.waitForHomeSystemInitializedApiCalls()
     */
  }

  loginWithSession(email, password) {
    cy.visit(Cypress.env('EQUITY_GATEWAY_BASE_URL'));
    cy.get(selectors.inputNameField).clear({ force: true }).type(email);
    cy.get(selectors.inputPasswordField).clear({ force: true }).type(password, { log: false, force: true });
    cy.contains('Login').click({ force: true });

    // Store login details in session storage using cookies
    cy.setCookie('email', email, { httpOnly: true });
    cy.setCookie('password', password, { httpOnly: true })
  }
}

export default LoginPage
