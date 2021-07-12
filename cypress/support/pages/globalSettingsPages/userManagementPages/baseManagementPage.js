import BasePage from '../../basePage'

const selectors = {
  numberOfSearchResultsInTable: 'div.search-label',
  searchResultList: 'gs-list[data-test-id=searchListing-found]',
  searchResultItem: '#searchResultItem_',
  otherGroupList: 'gs-list[data-test-id=searchListing-other]',
  otherItem: '#otherItem_',
  noResultsFound: 'div.not-found'
}

/**
 * This class is a common page for all common methods and locators over User Management, Group Management, Role Management, and Data Access Profiles.
 *
 */
class BaseManagementPage extends BasePage {
  // --------------------------------------- ASSERTIONS --------------------------------------------- //
  /**
   * Assert the amount of results displayed in the Search Results list, after using the search engine
   *
   * @param {Number} results amount of results you want to check after a search
   *
   * @example Send 'results = 2' to validate the '2 SEARCH RESULT(S)' is being displayed in the Search Results list
   */
  assertAmountOfSearchResults(results) {
    this.assertNumberOfRecordsTable(selectors.numberOfSearchResultsInTable, results)
  }

  /**
   * Assert the Search Results list id is displayed with the accurate results highlighted.
   * It also asserts that a Other Groups list is displayed
   *
   * @param {Array} entityId Array containing the ids of groups, roles, or daps that are supposed to be displayed in the search result list.
   *
   * @example Send entityId=[1] to assert if the group Global Admin Group was correctly found after using the search engine.
   */
  assertSearchResultListAccuracy(entityId) {
    cy.get(selectors.searchResultList).should('be.visible')

    for (let i = 0; i < entityId.length; i++) {
      cy.get(selectors.searchResultList + ' ' + selectors.searchResultItem + entityId[i])
        .should('be.visible')
        .invoke('attr', 'class')
        .should('contain', 'item-highlight ng-star-inserted') // assert it is highlighted
    }

    cy.get(selectors.otherGroupList).should('be.visible')
  }

  /**
   * Assert a text saying "NO '$entity' FOUND" is visible when searching for a group, role, or dap that does not exist
   */
  assertNoResultFoundIsVisible() {
    cy.get(selectors.noResultsFound).should('be.visible')
  }
}

export default BaseManagementPage
