import BasePage from '../../pages/basePage'

const selectors = {
  inputBar: 'gs-global-search .input-bar input',
  searchButton: '.search-action',
  clearXButton: 'gs-global-search div.clear-action gs-svg-icon'
}

class SearchEngine extends BasePage {
  /**
   * Search bar
   *
   * @param {any} textToSearch Param to search in the search bar
   * @param {number} waitTime Delay in milliseconds to wait. Sometimes, there are no XHR requests to intercept, so it is necessary to have a quick delay after using the search engine.
   */
  search(textToSearch, waitTime = 500) {
    cy.log('SEARCHING FOR ' + textToSearch)
    this.clearSearchBox()

    cy.get(selectors.inputBar).as('inputBar')
    cy.get('@inputBar').type(textToSearch)
    cy.get(selectors.searchButton).click()

    cy.forcedWait(waitTime)
  }

  /**
   * Clear the search bar content.
   */
  clearSearchBox() {
    cy.get(selectors.inputBar).clear({ force: true })
    // cy.get(selectors.inputBar).type('{selectall}{backspace}{selectall}{backspace}')
  }

  /**
   * Clear the search bar by pressing the X icon
   */
  clearSearchBoxByXIcon() {
    cy.get(selectors.clearXButton).click()
  }
}

export default SearchEngine
