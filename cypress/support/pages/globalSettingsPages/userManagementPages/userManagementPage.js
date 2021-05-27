import BasePage from '../../basePage'
import SearchBar from '../../../components/searchBar'

const properties = {
  pageURL: '/settings/user-management'
}

const selectors = {
  numberOfSearchResultsInTable: '#userRecordCount .search-results-count',
  user: '#user-',
  userRowFromTable: 'div.data gs-grid-cell'
}

const searchBar = new SearchBar()

class UserManagementPage extends BasePage {
  /**
   * Checks if the current page is User settings URL
   */
  checkUserManagementUrl() {
    this.checkUrl(properties.pageURL)
  }

  /**
   * Get a user from the table of users
   *
   * @param {string} userId username text for the user to be searched
   *
   * @example send userId = 454292 to select this user from the table
   */
  getUserTable(userId) {
    searchBar.search(userId)

    return cy.get(selectors.user + userId).first()
  }

  /**
   * Select a user from the table of users
   *
   * @param {string} username username text for the user to be searched
   *
   * Waiting for @IDS
   */
  clickUserTable(username) {
    this.getUserTable(username).click()
  }

  /**
   * Checks the amount of results displayed in the Users table after using the search engine
   *
   * @param {Number} results amount of people you want to check after a search
   *
   * @example 'results = 2 for '2 SEARCH RESULT(S)' being displayed in the table
   */
  checkAmountOfSearchResults(results) {
    cy.get(selectors.numberOfSearchResultsInTable)
      .invoke('text')
      .should('contain', results)
  }

  /**
   * Check the data listed in a user [username, email, and status] over the Users table
   *
   * @param {Array} data Array with the data needed to be validated. The correct order is the ORDER displayed in the UI,
   * which actually is [username, email, and status]
   *
   * @example: send ['amulcahyNE', 'test@globalshares.com', 'Active'] to validate the data from user amulcahyNE is
   * displayed correctly in the Participants table list
   */
  AssertUsersDataDisplayedOnTheParticipantsList(data) {
    for (let i = 0; i < data.length; i++) {
      cy.get(selectors.userRowFromTable)
        .eq(i)
        .invoke('text')
        .should('contain', data[i])
    }
  }
}

export default UserManagementPage
