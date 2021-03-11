import Common from './common'
import SearchBar from '../components/searchBar'

const searchBar = new SearchBar;

class HomePage extends Common{

  /**
   * Check if the current page is the home URL
   */
  CheckHomeUrl(){
    this.checkUrl(Cypress.env("homePageURL"))
  }


    /**
   * Search for a client using the search bar
   * @param {string} clientName Client name to search
   */
   selectClientFromTheList(clientName){
    searchBar.search(clientName)
    cy.xpath(`//gs-card//h4[normalize-space(text()) = '${clientName}']`).click()
  }
      
}
  
export default HomePage;
