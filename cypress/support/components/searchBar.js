const selectors = {
  inputBar: '.input-bar',
  searchClientButton: '.search-action',
  clearClientFieldButton: '.clear-action'
}

class SearchBar {
  /**
   * Search bar
   *
   * @param {string} textToSearch Param to search in the search bar
   */
  search(textToSearch) {
    cy.get(selectors.inputBar).type(textToSearch)
    cy.get(selectors.searchClientButton).click()
    this.clearSearchBox()
  }

  /**
   * Clear the search bar content
   */
  clearSearchBox() {
    cy.get(selectors.inputBar).type('{selectall}{backspace}{selectall}{backspace}')
  }
}

export default SearchBar
