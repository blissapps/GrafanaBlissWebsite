import BasePage from '../../basePage'
import SearchBar from '../../../components/searchBar'

const properties = {
  pageURL: '/settings/user-management'
}

const selectors = {
  numberOfRecordsInTable: '#userRecordCount',
  numberOfSearchResultsInTable: '.search-results-count',
  userRowFromTable: '.data > gs-grid-row-list > gs-grid-row > gs-grid-cell'
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
    this.getUserTable(username)
      .first()
      .click()
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
    cy.get(selectors.numberOfRecordsInTable)
      .invoke('text')
      .should('contain', records)
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
      //cy.get('.data > gs-grid-row-list > gs-grid-row > gs-grid-cell span').eq(i)
      cy.get(selectors.userRowFromTable)
        .eq(i)
        .invoke('text')
        .should('contain', data[i])
    }
  }
}

export default UserManagementPage
