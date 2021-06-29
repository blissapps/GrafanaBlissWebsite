import BasePage from './basePage'
import SearchBar from '../components/searchBar'

const searchBar = new SearchBar()

const selectors = {
  groupBySelector: '#clientGroupSelect .select > input',
  groupByAlphabetical: '.select-panel > :nth-child(2) > div',
  separatorContainerForClientsList: '//gs-preloader-container//div[@class="card-group-section ng-star-inserted"]//div[@class="section-title"]',
  favorite_icon: 'div.client-action-btn',
  clientCard: '#client-',
  clientCardHeader: '#clientCardHeader',
  clientCardCountryBadge: '#countryBadge',
  clientCardRegulatedStatus: '#regBadge',
  clientCardStatus: '#statusBadge'
}

class HomePage extends BasePage {
  /**
   * Check if the current page is the home URL
   */
  checkHomeUrl() {
    this.checkUrl(Cypress.env('homePageURL'))
  }

  /**
   * Get client from the cards list
   *
   * @param {Number} clientId Client name to search
   */
  getClientCard(clientId) {
    return cy.get(`${selectors.clientCard}${clientId}`)
  }

  /**
   * Search for a client by ID
   *
   * @param {Number} clientId Client name to search
   */
  selectClientById(clientId) {
    this.getClientCard(clientId)
      .scrollIntoView()
      .click()
  }

  /**
   * Search for a client using the search bar
   *
   * @param {String} clientName Client name to search
   */
  selectClientFromTheListBySearch(clientName) {
    searchBar.search(clientName)
    searchBar.clearSearchBox()
    cy.contains(clientName) // avoid element detached from the DOM
    cy.xpath(`//gs-card//h4[normalize-space(text()) = '${clientName}']`).click()
  }

  /**
   * Favorite/Unfavorite a client from the home client list
   *
   * @param {Number} clientId Client id to be favored
   */
  favoriteUnfavoriteClient(clientId) {
    cy.get(`${selectors.clientCard}${clientId} ${selectors.favorite_icon}`)
      .first()
      .click({ force: true })
  }

  /**
   * Check the favorite status of a specific client
   *
   * @param {Number} clientId Client id to be checked
   */
  isClientFavorite(clientId) {
    return cy.get(`${selectors.clientCard}${clientId}.favoriteVisible`)
  }

  /**
   * Group By selector. If groupBy is not given, the default group method is Alphabetical
   * Change this solution as soon as an ID is provided
   *
   * @param {String} groupBy Client name to search
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
   *
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
   * @param {Number} clientId Client id to verify the summary information
   * @param {String} clientName Client name to verify the summary information
   * @param {String} location Client location, example 'GBR' for UK clients
   * @param {String} regulated Client information about if it is regulated. Accepted parameters: 'Regulated' and 'Not Regulated'
   * @param {String} status Client status. Accepted parameters includes: 'Active', 'NOT SET', 'Terminated', 'Implementation'
   *
   * @example validateClientCardSummaryInformation('144', 'GBR', 'Regulated', 'Active')
   */
  validateClientCardSummaryInformation(clientId, clientName, location = 'GBR', regulated = 'Regulated', status = 'Active') {
    return (
      cy
        .get(selectors.clientCard + clientId + ' ' + selectors.clientCardHeader + clientId)
        .scrollIntoView()
        .contains(clientName) &&
      cy
        .get(selectors.clientCard + clientId + ' ' + selectors.clientCardCountryBadge + clientId)
        .scrollIntoView()
        .contains(location) &&
      cy
        .get(selectors.clientCard + clientId + ' ' + selectors.clientCardRegulatedStatus + clientId)
        .scrollIntoView()
        .contains(regulated) &&
      cy
        .get(selectors.clientCard + clientId + ' ' + selectors.clientCardStatus + clientId)
        .scrollIntoView()
        .contains(status)
    )
  }
}

export default HomePage
