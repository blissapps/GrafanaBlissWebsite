import BasePage from '../basePage'
import SearchBar from '../../components/searchBar'

const properties = {
  pageURL: '/settings/user-management'
}

const selectors = {
  numberOfRecordsInTable: '#userRecordCount',
  numberOfSearchResultsInTable: '.search-results-count'
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
   * @param {string} username username text for the user to be searched
   *
   * Waiting for @IDS
   */
    getUserTable(username) {
      searchBar.search(username)

      return cy.xpath(`//div[@class='data']//*[text()='${username}']`)
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
   * Checks the amount of records displayed in the Users table
   *
   * @param {Number} records amount of people you want to check in the records
   * @param {Number} results amount of people you want to check after a search
   *
   * @example 'records = 1 for '1 record(s)' being displayed in the table
   *          'results = 2 for '2 SEARCH RESULT(S)' being displayed in the table
   */
    checkAmountOfPeopleTable(records, results) {
      cy.get(selectors.numberOfRecordsInTable).invoke('text').should('contain', records)
      cy.get(selectors.numberOfSearchResultsInTable).invoke('text').should('contain', results)
    }
}

export default UserManagementPage
