import BasePage from '../../basePage'

const selectors = {
  currentPasswordInput: '#currentPassword input',
  newPasswordInput: '#newPassword input',
  confirmChangeButton: '#confirmChange',
  securityHeader: '#securityHeader'
}

const properties = {
  pageURL: '/profile/security'
}

class SecurityPage extends BasePage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }

  // -----------------------------------------------------------------------------  ASSERTIONS ---------------------------------------------------------------------- //

  /**
   * Assert if the Security header is displayed correctly
   *
   * @param {boolean} displayed True is the default value to validate with the header is displayed. False to validate the otherwise
   * @param {string} textToValidate Send a text to validate the text displayed in the header
   */
  assertHeaderIsDisplayedCorrectly(displayed = true, textToValidate = '') {
    if (displayed) {
      cy.get(selectors.securityHeader).should('be.visible')
      textToValidate !== '' ? cy.get(selectors.securityHeader).should('have.text', textToValidate) : null
    } else {
      cy.get(selectors.securityHeader).should('not.exist')
    }
  }

  // --------------------------------------------------------------------------------  OTHERS ----------------------------------------------------------------------- //

  /**
   * Change the password in Profile Security page
   *
   * @param {string} currentPassword Current password
   * @param {string} newPassword New password
   */
  changePassword(currentPassword = '', newPassword = '') {
    if (currentPassword !== '') {
      cy.get(selectors.currentPasswordInput).clear()
      cy.get(selectors.currentPasswordInput).type(currentPassword)
    }

    if (newPassword !== '') {
      cy.get(selectors.newPasswordInput).clear()
      cy.get(selectors.newPasswordInput).type(newPassword)
    }

    // uncomment only in future, because it changes the data permanently
    // cy.get(selectors.confirmChangeButton).click()
  }
}

export default SecurityPage
