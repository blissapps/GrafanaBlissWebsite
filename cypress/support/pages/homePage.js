import BasePage from './basePage'
import SearchBar from '../components/searchBar'

const searchBar = new SearchBar()

const selectors = {
  groupBySelector: 'gs-select .select > .ng-untouched',
  groupByAlphabetical: '.select-panel > :nth-child(2) > div',
  separatorContainerForClientsList: '//gs-preloader-container//div[@class="card-group-section ng-star-inserted"]//div[@class="section-title"]'
}

class HomePage extends BasePage {
  /**
   * Check if the current page is the home URL
   */
  CheckHomeUrl() {
    this.checkUrl(Cypress.env('homePageURL'))
  }

  /**
   * Search for a client using the search bar
   * @param {string} clientName Client name to search
   */
  selectClientFromTheList(clientName) {
    searchBar.search(clientName)
    searchBar.clearSearchBox()
    cy.contains(clientName) // avoid element detached from the DOM
    cy.xpath(`//gs-card//h4[normalize-space(text()) = '${clientName}']`).click()
  }

  /**
   * Group By selector. If groupBy is not given, the default group method is Alphabetical
   * Change this solution as soon as an ID is provided
   * @param {string} groupBy Client name to search
   */
  groubyByList(groupBy = '') {
    cy.get(selectors.groupBySelector).click()

    switch (groupBy) {
      default:
        cy.get(selectors.groupByAlphabetical).click()
    }

    this.checkGroupListOrder(groupBy)
  }

  /**
   * Check if the client list is displayed correctly. If groupBy is not given, the default group method to validate is Alphabetical
   * Change this solution as soon as an ID is provided
   */
  checkGroupListOrder(groupBy = '') {
    switch (groupBy) {
      default:
        cy.xpath(selectors.separatorContainerForClientsList)
          .eq(0)
          .should('contain.text', '0-9')
        cy.xpath(selectors.separatorContainerForClientsList)
          .eq(1)
          .should('contain.text', 'A')
        cy.xpath(selectors.separatorContainerForClientsList)
          .eq(2)
          .should('contain.text', 'B')
    }
  }
}

export default HomePage
