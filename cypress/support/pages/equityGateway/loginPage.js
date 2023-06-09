import BasePage from '../basePage'

const selectors = {
  inputNameField: 'input[placeholder="Username"]',
  inputPasswordField: 'input[placeholder="Password"]',
  loginBtn: 'gs-button[type="default"][size="large"]',
  mismatch: 'gs-notification[type="error"] .message',
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
  errorToast(){
    cy.contains(selectors.mismatch, 'You entered an incorrect username or password.')
  }
  login(user, pw) {
    if (user === undefined || pw === undefined){
      this.loginWithSession(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER_AUTH'), Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
      cy.url().should('contain', '/dashboard')
    } else {
      this.loginWithSession(user, pw)
    }
    /**
     * >>> GATEWAY LOGIN STILL PROVISIONAL <<<
    cy.interceptHomeSystemInitializedAPICalls()
    cy.waitForHomeSystemInitializedApiCalls()
     */
  }

  loginWithSession(user, pw) {
    cy.visit(Cypress.env('EQUITY_GATEWAY_BASE_URL'));

    if (user !== 'null.status' && user !== ''){
      cy.get(selectors.inputNameField).clear({ force: true }).type(user);
    }
    if (pw !== 'null.status' && pw !== '') {
      cy.get(selectors.inputPasswordField).clear({ force: true }).type(pw);
    }

    cy.get(selectors.loginBtn).contains('Login').click({ force: true });
  }
}

export default LoginPage
