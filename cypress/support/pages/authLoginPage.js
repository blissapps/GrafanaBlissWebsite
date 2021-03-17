import BasePage from './basePage'

const messages = {
  errorMessage: 'You have an invalid username or password or your account is locked. Please try again or contact your service team to assist you.'
}

class AuthLoginPage extends BasePage {
  /**
   * Get the error message when a unsuccessful login is made
   *
   * @returns the failed login message if it is being displayed
   */
  checkUnsuccessfulLoginErrorMessageDisplayed() {
    return this.getElementByText(messages.errorMessage)
  }
}

export default AuthLoginPage
