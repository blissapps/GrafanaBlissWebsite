import BasePage from './basePage'

const selectors = {
  errorMessageNotification: '.notification > .danger'
}

class AuthLoginPage extends BasePage {
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

export default AuthLoginPage
