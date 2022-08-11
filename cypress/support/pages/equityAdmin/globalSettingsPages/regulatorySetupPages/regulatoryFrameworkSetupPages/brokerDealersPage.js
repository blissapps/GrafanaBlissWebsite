import BaseRegulatoryFrameworkSetupPage from './baseRegulatoryFrameworkSetupPage'

const properties = {
  pageURL: '/regulatory/framework-setup/partners'
}

const selectors = {
  nameHeaderColumn: '#nameColumn',
  idHeaderColumn: '#idColumn',
  regulatoryAuthoritiesHeaderColumn: '#regulatoryAuthorityNameColumn',
  brokerDealersIds: '*[id*=regulatoryPartnerGrid-] gs-grid-cell:first-child',
  brokerDealersNames: '*[id*=regulatoryPartnerGrid-] gs-grid-cell:nth-child(2)'
}

class BrokerDealersPage extends BaseRegulatoryFrameworkSetupPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }

  // ----------------------------------------------------------------- ASSERTIONS -------------------------------------------------------------------- //

  /**
   * Assert if the expect columns are displayed, which are name, id, and regulatory authority
   */
  assertExpectedColumnsAreDisplayed() {
    cy.get(selectors.nameHeaderColumn).should('be.visible')
    cy.get(selectors.idHeaderColumn).should('be.visible')
    cy.get(selectors.regulatoryAuthoritiesHeaderColumn).should('be.visible')
  }

  /**
   * Check if the client list is correctly organized in the home page
   */
  assertBrokerDealersAreOrdered() {
    this.assertElementsInAlphabeticalOrNumericalOrder(selectors.brokerDealersIds)
  }

  /**
   * Check if the ids are unique
   */
  assertBrokerDealersIdsAreUnique() {
    this.assertNoDuplicatesOnList(selectors.brokerDealersIds)
  }

  /**
   * Check if the names are unique
   */
  assertBrokerDealersNamesAreUnique() {
    this.assertNoDuplicatesOnList(selectors.brokerDealersNames)
  }
}

export default BrokerDealersPage
