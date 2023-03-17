import BaseManagementPage from './baseManagementPage'

const properties = {
  pageURL: '/settings/user-management'
}

const selectors = {
  numberOfSearchResultsInTable: '#recordCount span',
  user: '#user-',
  noUserExistsMessage: '#noUsersMsg',
  pageHeader: '#userMgmtHeader'
}

const apiInterceptions = {
  usersLoading: '/api/Users?**'
}

class UserManagementPage extends BaseManagementPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }

  // ----------------------------------------------------------------------------------- GETS ----------------------------------------------------------------------------------- //

  /**
   * Get a user from the table of users
   *
   * @param {number} userId User id for the user to be searched
   *
   * @example send userId = 454292 to select this user from the table
   */
  getUserInTable(userId) {
    cy.get(selectors.user + userId + ' gs-grid-cell').as('userInTable') //doing this to avoid the element detached, we can refactor it when Cypress solve this issue

    return cy.get('@userInTable').first().scrollIntoView()
  }

  // ---------------------------------------------------------------------------------------- CLICKS --------------------------------------------------------------------------- //

  /**
   * Select a user from the table of users
   *
   * @param {number} userId User id for the user to be searched
   *
   */
  clickUserTable(userId) {
    this.getUserInTable(userId).as('clickUserTable') //doing this to avoid the element detached, we can refactor it when Cypress solve this issue
    cy.get('@clickUserTable').click('left')
  }

  // ------------------------------------------------------------------------------------- ASSERTIONS  --------------------------------------------------------------------------- //

  /**
   * Assert if a given user is visible in the table of Users
   *
   * @param {number} userId user id to validate its visibility
   * @param {boolean} displayed True is the default value to see if the user is visible. Send false to validate the contrary
   */
  assertUserIsVisibleOnTable(userId, displayed = true) {
    displayed ? this.getUserInTable(userId).should('be.visible') : this.getUserInTable(userId).should('not.be.visible')
  }

  /**
   * Assert if the message informing that "There are no users" is displayed or not.
   *
   * @param {boolean} displayed True to check if the empty state message is visible, false otherwise
   */
  assertNoUserExistsMessageIsDisplayed(displayed = true) {
    displayed ? cy.get(selectors.noUserExistsMessage).should('be.visible') : cy.get(selectors.noUserExistsMessage).should('not.exist')
  }

  /**
   * Validate the header for Users is displayed in the page
   *
   * @param {string} headerText Send a text if you want to validate the text in the header. Send '' to skip the text validation.
   * @param {boolean} displayed True is the default value to assert the user header is displayed. Send false to otherwise.
   */
  assertUsersPageHeaderDisplayed(headerText = '', displayed = true) {
    if (displayed) {
      cy.get(selectors.pageHeader).should('be.visible')

      if (headerText !== '') {
        cy.get(selectors.pageHeader).should('have.text', headerText)
      }
    } else {
      cy.get(selectors.pageHeader).should('not.exist')
    }
  }

  // --------------------------------------------------------------------------------------  INTERCEPTIONS ---------------------------------------------------------------------------- //

  /**
   * Intercept the usersLoading request located in the object apiInterceptions. You need to user the method waitForUsersToBeLoaded to wait for this interception
   */
  interceptUsersLoadingRequest() {
    cy.intercept('GET', apiInterceptions.usersLoading).as('waitsUsersToBeLoaded')
  }

  /**
   * Intercept the usersLoading request located in the object apiInterceptions and mock the data with a given fixture file.
   *
   * @param {string} fixtureFile name or path for the fixture file located inside the fixtures folder
   */
  interceptAndMockUsersLoadingRequest(fixtureFile) {
    cy.intercept('GET', apiInterceptions.usersLoading, { fixture: fixtureFile }).as('emptyUserList')
  }

  /**
   * This method waits for the interception in the interceptUsersLoadingRequest method
   */
  waitForUsersLoadingRequest() {
    cy.wait('@waitsUsersToBeLoaded', { timeout: 5000 })
  }
}

export default UserManagementPage
