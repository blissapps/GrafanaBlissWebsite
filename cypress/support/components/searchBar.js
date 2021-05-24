const selectors = {
  inputBar: '.input-bar input',
  searchClientButton: '.search-action',
  clearClientFieldButton: '.clear-action'
}

class SearchBar {
  /**
   * Search bar
   *
   * @param {any} textToSearch Param to search in the search bar
   */
  search(textToSearch) {
    cy.waitFor(selectors.inputBar)
    cy.get(selectors.inputBar).type(textToSearch)
    cy.get(selectors.searchClientButton).click()
    this.clearSearchBox()
  }

  /**
   * Clear the search bar content.
   * For this kind of element, we cannot use the default clear from Cypress
   */
  clearSearchBox() {
    cy.get(selectors.inputBar).clear()
  }
}

export default SearchBar
