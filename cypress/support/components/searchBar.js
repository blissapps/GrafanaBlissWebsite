const selectors = {
  inputBar: '.input-bar',
  searchClientButton: '.search-action',
  clearClientFieldButton: '.clear-action'
}

class SearchBar{

  /**
   * Search bar
   * 
   * @param {string} textToSearch Param to search in the search bar
   */
   search(textToSearch){
    cy.get(selectors.inputBar).type(textToSearch)
    cy.get(selectors.searchClientButton).click()
  }
      
}
  
export default SearchBar;
