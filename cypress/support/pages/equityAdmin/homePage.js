import BasePage from '../basePage'
import SearchEngine from '../../components/equityAdmin/searchEngine'

const properties = {
  pageURL: /.*\/home$/
}

const searchEngine = new SearchEngine()

const selectors = {
  groupBySelector: '#clientGroupSelect .select > input',
  groupByAllCompanies: '#optionallclients',
  groupByAlphabetical: '#optionalphabetical',
  groupByStatus: '#optionstatus',
  groupByCountry: '#optioncountry',
  groupBySector: '#optionsector',
  favorite_icon: 'div.client-action-btn',
  clientCard: '#client-',
  clientCardHeader: '#clientCardHeader',
  clientCardCountryBadge: '#countryBadge',
  clientCardRegulatedStatus: '#regBadge',
  clientCardStatus: '#statusBadge',
  homePageHeader: '#homepageHeader',
  groupSections: '*[id*=cardGroupSection]',
  clientCards: 'hearth-client-group-card gs-card',
  cardsByGroupSection: '#cardGroupSection',
  noDataFoundMessage: '#clientsEmpty'
}

class HomePage extends BasePage {
  /**
   * Checks if the current page is the home page
   */
  checkPageUrl() {
    this.checkUrlByRegex(properties.pageURL)
  }

  // ------------------------------------------------------------------------------ CLICKS ---------------------------------------------------------------------------------- //

  /**
   * Click in a specific client by its id
   *
   * @param {number} clientId Client name to search
   */
  clickClientById(clientId) {
    cy.get(selectors.clientCard + clientId)
      .scrollIntoView()
      .click()
  }

  /**
   * Click in a client after using the search engine first
   *
   * @param {string} clientName Client name to search
   */
  clickClientFromTheListBySearchForName(clientName) {
    searchEngine.search(clientName)
    searchEngine.clearSearchBox()
    cy.contains(clientName) // avoid element detached from the DOM
    cy.xpath(`//gs-card//h4[normalize-space(text()) = '${clientName}']`).click()
  }

  // ----------------------------------------------------------------------------- ASSERTIONS ---------------------------------------------------------------------------- //

  /**
   *
   * @param {boolean} displayed True is the default value to assert the "Companies" text header is displayed. Send false otherwise
   */
  assertCompaniesHeaderIsDisplayed(displayed = true) {
    displayed ? cy.get(selectors.homePageHeader).should('be.visible') : cy.get(selectors.homePageHeader).should('not.exist')
  }

  /**
   * Assert if the client is favorite by checking the star icon and the Favorites section
   *
   * @param {number} clientId Client id to be checked
   * @param {boolean} favorite True fo assert the client is favorite, false otherwise
   */
  assertClientIsFavorite(clientId, favorite = true) {
    if (favorite) {
      cy.get(`${selectors.clientCard}${clientId}.favoriteVisible`).should('be.visible')
    } else {
      cy.get(`${selectors.clientCard}${clientId}.favoriteVisible`).should('not.exist')
    }
  }

  /**
   * Validate basic information for the client. This information is the one displayed in the home page for each client
   * Example: Ex: 7digital => {GBR, REGULATED, ACTIVE}
   *
   * @param {number} clientId Client id to verify the summary information
   * @param {string} clientName Client name to verify the summary information
   * @param {string} location Client location, example 'GBR' for UK clients
   * @param {string} regulated Client information about if it is regulated. Accepted parameters: 'Regulated' and 'Not Regulated'
   * @param {string} status Client status. Accepted parameters includes: 'Active', 'NOT SET', 'Terminated', 'Implementation'
   *
   * @example assertClientCardSummaryInformation('144', 'GBR', 'Regulated', 'Active')
   */
  assertClientCardSummaryInformation(clientId, clientName = '', location = '', regulated = '', status = '') {
    clientName !== ''
      ? cy
          .get(selectors.clientCard + clientId + ' ' + selectors.clientCardHeader + clientId)
          .scrollIntoView()
          .contains(clientName)
      : null

    location !== ''
      ? cy
          .get(selectors.clientCard + clientId + ' ' + selectors.clientCardCountryBadge + clientId)
          .scrollIntoView()
          .contains(location)
      : null

    regulated !== ''
      ? cy
          .get(selectors.clientCard + clientId + ' ' + selectors.clientCardRegulatedStatus + clientId)
          .scrollIntoView()
          .contains(regulated)
      : null

    status !== ''
      ? cy
          .get(selectors.clientCard + clientId + ' ' + selectors.clientCardStatus + clientId)
          .scrollIntoView()
          .contains(status)
      : null
  }

  /**
   * Check if the client list is correctly organized in the home page
   */
  assertCompaniesAreOrdered() {
    this.assertElementsInAlphabeticalOrNumericalOrder(selectors.groupSections)
  }

  /**
   * Assert the number of clients displayed. It is the number displayed in the top of the page as 'X CLIENTS(S)'
   *
   * @param {number} number Number of clients to assert
   */
  assertNumberOfClientsDisplayedOnThePageHeader(number) {
    //this.assertNormalizedTextInElement(selectors.homePageClientsCounter, number + ' Client(s)')
    cy.xpath(`//*[@id='homepageCount' and normalize-space(text()) = '${number} Client(s)']`).should('be.visible')
  }

  /**
   * Assert the number of client cards displayed. This method counts the number of cards
   *
   * @param {number} numberOfCountedCards Number of clients to assert
   */
  assertNumberOfClientCardsCounted(numberOfCountedCards) {
    cy.get(selectors.clientCards).should('have.length', numberOfCountedCards)
  }

  /**
   * Assert the number of groups displayed in each section
   *
   * @param {string} groupName
   * @param {number} numberOfClientsCounted
   *
   * @example assertNumberOfClientsByGroup('All Companies', 6) -> Assert there are 6 clients being counted in the All Companies section
   *
   */
  assertNumberOfClientsByGroupSection(groupName, numberOfClientsCounted) {
    cy.get(selectors.cardsByGroupSection + groupName.replace(/\s/g, '') + ' + .section-count').contains(numberOfClientsCounted + ' Client(s)')
  }

  /**
   * Assert if a section of clients is displayed
   *
   * @param {string} sectionName The name of the section to be evaluated if it is displayed
   * @param {boolean} displayed True is the default value to validate if the section is displayed. Send false to validate the opposite case
   *
   * @example
   * Send 'Favorites' as sectionName to assert the section of Favorites is displayed
   * Send 'All Companies' as sectionName to assert the section of All Companies is displayed
   */
  assertSectionIsDisplayed(sectionName, displayed = true) {
    displayed
      ? cy
          .get(selectors.cardsByGroupSection + sectionName.replace(/\s/g, ''))
          .scrollIntoView()
          .should('be.visible')
      : cy.get(selectors.cardsByGroupSection + sectionName.replace(/\s/g, '')).should('not.exist')
  }

  /**
   * Assert the tooltip shows the expected text in the country badge for a specific client
   *
   * @chrome_only Only works for chrome based browsers
   *
   * @param {number} clientId Client id number
   * @param {string} text Text to be validated within the tollTip
   */
  assertClientCountryBadgeTollTipDisplaysCorrectText(clientId, text) {
    cy.get(selectors.clientCardCountryBadge + clientId)
      .scrollIntoView()
      .realHover() // Only works for chrome based browsers
      .then(() => {
        this.assertToolTipDisplayedWithText(text)
      })
  }

  /**
   * Assert the message 'No data found' when the list of clients is empty or when it does not return clients while searching in the search bar
   *
   * @param {boolean} displayed True to assert the message 'No data found' is displayed
   */
  assertNoDataFoundDisplayed(displayed = true) {
    displayed ? cy.get(selectors.noDataFoundMessage).should('be.visible') : cy.get(selectors.noDataFoundMessage).should('not.exist')
  }

  // ------------------------------------------------------------------------------------ OTHERS------------------------------------------------------------------------------ //

  /**
   * Favorite/Unfavorite a client from the home client list
   *
   * @param {number} clientId Client id to be favored
   */
  favoriteUnfavoriteClient(clientId) {
    cy.get(`${selectors.clientCard}${clientId} ${selectors.favorite_icon}`).first().click({ force: true })
  }

  /**
   * Group the clients in the home page by the option chosen in the Group By selector.
   *
   * @param {string} groupBy The option to group the clients, it can be: alphabetical, status, country, or sector. If groupBy is not given, the default group method is All Companies
   */
  selectGroupByOptionForCompanies(groupBy = '') {
    cy.get(selectors.groupBySelector).click()

    switch (groupBy.toLowerCase()) {
      case '':
        cy.get(selectors.groupByAllCompanies).click()
        break

      case 'alphabetical':
        cy.get(selectors.groupByAlphabetical).click()
        break

      case 'status':
        cy.get(selectors.groupByStatus).click()
        break

      case 'country':
        cy.get(selectors.groupByCountry).click()
        break

      case 'sector':
        cy.get(selectors.groupBySector).click()
        break

      default:
        throw new Error('The Group by option' + groupBy + ' is not valid, please fix it!')
    }
  }
}

export default HomePage
