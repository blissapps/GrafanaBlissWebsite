import BasePage from '../basePage'

const properties = {
  pageURL: '/unauthorized'
}

const selectors = {
  restrictedPageAccess: 'gs-empty-container[type="noAccess"] div.content'
}

class UnauthorizedPage extends BasePage {
  /**
   * Checks if the current page is the home page
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }

  // ----------------------------------------------------------------------------------- ASSERTIONS ---------------------------------------------------------------------------- //

  /**
   * Assert whether the message "Unfortunately, you are restricted to access this page." is displayed or not
   *
   * @param {string} message Text to validate if it is the text displayed in the message. '' is the default value to skip the verification
   * @param {boolean} displayed True to assert the message is displayed, false otherwise
   */
  assertYouAreRestrictedToAccessMessageIsDisplayed(message = '', displayed = true) {
    if (displayed) {
      cy.get(selectors.restrictedPageAccess).should('be.visible')
      message !== '' ? cy.get(selectors.restrictedPageAccess).should('contain.text', message) : null
    } else {
      cy.get(selectors.restrictedPageAccess).should('not.be.visible')
    }
  }
}

export default UnauthorizedPage
