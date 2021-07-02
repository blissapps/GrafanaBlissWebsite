const selectors = {
  inputBar: 'gs-global-search .input-bar input',
  searchClientButton: '.search-action',
  clearClientFieldButton: '.clear-action'
}

class SearchBar {
  /**
   * Search bar
   *
   * @param {any} textToSearch Param to search in the search bar
   * @param {Number} delay Delay in milliseconds to wait. Sometimes, there are no XHR requests to intercept, so it is necessary to have a quick delay after using the search engine.
   */
  search(textToSearch, delay = 500) {
    this.clearSearchBox()
    cy.waitFor(selectors.inputBar)
    cy.get(selectors.inputBar).type(textToSearch)
    cy.get(selectors.searchClientButton).click()

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(delay)
  }

  /**
   * Clear the search bar content.
   * For this kind of element, we cannot use the default clear from Cypress
   */
  clearSearchBox() {
    cy.get(selectors.inputBar).clear()
    // cy.get(selectors.inputBar).type('{selectall}{backspace}{selectall}{backspace}')
  }
}

export default SearchBar
