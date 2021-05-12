import BasePage from './basePage'
import SearchBar from '../components/searchBar'

const searchBar = new SearchBar()

const selectors = {
  groupBySelector: 'gs-select .select > .ng-untouched',
  groupByAlphabetical: '.select-panel > :nth-child(2) > div',
  separatorContainerForClientsList: '//gs-preloader-container//div[@class="card-group-section ng-star-inserted"]//div[@class="section-title"]',
  favorite_icon: '//div[@class="client-action-btn"]'
}

class HomePage extends BasePage {
  /**
   * Check if the current page is the home URL
   */
  CheckHomeUrl() {
    this.checkUrl(Cypress.env('homePageURL'))
  }

  /**
   * Search for a client by ID
   *
   * @param {Number} clientId Client name to search
   */
  selectClientById(clientId) {
    cy.get(`#client-${clientId}`)
      .scrollIntoView()
      .click()
  }

  /**
   * Search for a client using the search bar
   *
   * @param {string} clientName Client name to search
   */
  selectClientFromTheList(clientName) {
    searchBar.search(clientName)
    searchBar.clearSearchBox()
    cy.contains(clientName) // avoid element detached from the DOM
    cy.xpath(`//gs-card//h4[normalize-space(text()) = '${clientName}']`).click()
  }

  /**
   * Favorite/Unfavorite a client from the home client list
   *
   * @param {string} clientId Client id to be favored
   */
  favoriteUnfavoriteClient(clientId) {
    cy.xpath(`//gs-card[@id='${clientId}']${selectors.favorite_icon}`).click({ force: true })
  }

  /**
   * Check the favorite status of a specific client
   *
   * @param {string} clientId Client id to be checked
   */
  isClientFavorite(clientId) {
    return cy.xpath(`//gs-card[@id='${clientId}' and @class='success ng-star-inserted favoriteVisible']`)
  }

  /**
   * Group By selector. If groupBy is not given, the default group method is Alphabetical
   * Change this solution as soon as an ID is provided
   *
   * @param {string} groupBy Client name to search
   */
  groupByList(groupBy = '') {
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

  /**
   * Validate basic information for the client. This information is the one displayed in the home page for each client
   * Example: Ex: 7digital => {GBR, REGULATED, ACTIVE}
   *
   * @param {string} clientId Client id to verify the summary information
   * @param {string} location Client location, example 'GBR' for UK clients
   * @param {string} regulated Client information about if it is regulated. Accepted parameters: 'Regulated' and 'Not Regulated'
   * @param {string} status Client status. Accepted parameters includes: 'Active', 'NOT SET', 'Terminated', 'Implementation'
   */
  validateClientCardSummaryInformation(clientId, location = 'GBR', regulated = 'Regulated', status = 'Active') {
    return (
      cy.xpath(`//*[@id='${clientId}']//gs-badge[contains(text(),'${location}')]`).scrollIntoView() &&
      cy.xpath(`//*[@id='${clientId}']//gs-badge[contains(text(),'${regulated}')]`).scrollIntoView() &&
      cy.xpath(`//*[@id='${clientId}']//div[@class='card-footer']//gs-badge[contains(text(),'${status}')]`).scrollIntoView()
    )
  }
}

export default HomePage
