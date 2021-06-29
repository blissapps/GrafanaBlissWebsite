import BasePage from '../../basePage'
import SearchBar from '../../../components/searchBar'

const properties = {
  pageURL: '/settings/user-management'
}

const selectors = {
  numberOfSearchResultsInTable: '#userRecordCount .search-results-count',
  user: '#user-'
}

const searchBar = new SearchBar()

class UserManagementPage extends BasePage {
  /**
   * Checks if the current page is User settings URL
   */
  checkUserManagementUrl() {
    this.checkUrl(properties.pageURL)
  }

  // --------------------------------------- GETS --------------------------------------------- //

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

  // --------------------------------------- CLICKS --------------------------------------------- //

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

  // --------------------------------------- ASSERTIONS AND OTHERS --------------------------------------------- //

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
}

export default UserManagementPage
