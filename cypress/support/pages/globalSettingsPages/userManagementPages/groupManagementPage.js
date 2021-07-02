import BasePage from '../../basePage'

const properties = {
  pageURL: '/settings/group-management'
}

const selectors = {
  noGroupSelectedMsg: '#noGroupSelectedContainer div.content',
  numberOfSearchResultsInTable: 'div.search-label',
  searchResultList: 'gs-list[data-test-id="searchListing-found"]',
  searchResultItem: '#searchResultItem_',
  otherGroupList: 'gs-list[data-test-id="searchListing-other"]',
  otherItem: '#otherItem_',
  noGroupsFound: 'div.not-found'
}

class GroupManagementPage extends BasePage {
  /**
   * Checks if the current page is Group management URL
   */
  checkGroupManagementUrl() {
    this.checkUrl(properties.pageURL)
  }

  /**
   * Checks the amount of results displayed in the Users table after using the search engine
   *
   * @param {Number} results amount of people you want to check after a search
   *
   * @example 'results = 2 for '2 SEARCH RESULT(S)' being displayed in the table
   */
  assertAmountOfSearchResults(results) {
    this.assertNumberOfRecordsTable(selectors.numberOfSearchResultsInTable, results)
  }

  /**
   * Assert if the msg about no groups selected is displayed or not
   *
   * @param {Boolean} visible True to check if the state is visible, false otherwise
   */
  assertNoGroupSelectedMessageState(visible = true) {
    if (visible) {
      cy.get(selectors.noGroupSelectedMsg).should('be.visible')
    } else {
      cy.get(selectors.noGroupSelectedMsg).should('not.exist')
    }
  }

  /**
   * Assert the text saying "NO GROUPS FOUND" is visible when searching for a group that does not exist
   */
  assertNoGroupsFoundIsVisible() {
    cy.get(selectors.noGroupsFound).should('be.visible')
  }

  /**
   * Assert the search results list id displayed with the results highlighted. It also asserts that a Other Groups list is displayed
   *
   * @param {Array} groupsId Array containing the ids of the groups that are supposed to be displayed in the search result list.
   *
   * @example Send groupsId=[1] to assert if the group Global Admin Group was correctly found after using the search engine.
   */
  assertSearchResultGroups(groupsId) {
    cy.get(selectors.searchResultList).should('be.visible')

    for (let i = 0; i < groupsId.length; i++) {
      cy.get(selectors.searchResultList + ' ' + selectors.searchResultItem + groupsId[i])
        .should('be.visible')
        .invoke('attr', 'class')
        .should('contain', 'item-highlight ng-star-inserted') // assert it is highlighted
    }

    cy.get(selectors.otherGroupList).should('be.visible')
  }
}

export default GroupManagementPage
