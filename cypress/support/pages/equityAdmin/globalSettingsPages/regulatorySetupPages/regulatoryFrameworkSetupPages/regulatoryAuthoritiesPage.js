import BaseRegulatoryFrameworkSetupPage from './baseRegulatoryFrameworkSetupPage'

const properties = {
  pageURL: '/regulatory/framework-setup/authorities'
}

const selectors = {
  idHeaderColumn: '#rowNumberColumn',
  codeHeaderColumn: '#codeColumn',
  nameHeaderColumn: '#nameColumn',
  countryHeaderColumn: '#countryColumn',
  regulatoryProgramHeaderColumn: '#filingProgramColumn',
  codeIds: '*[id*=regulatoryAuthorityGrid-] gs-grid-cell:nth-child(2)'
}

class RegulatoryAuthoritiesPage extends BaseRegulatoryFrameworkSetupPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }

  // ----------------------------------------------------------------- ASSERTIONS -------------------------------------------------------------------- //

  /**
   * Assert if the expect columns are displayed, which are code, name, country, and regularly program
   */
  assertExpectedColumnsAreDisplayed() {
    cy.get(selectors.idHeaderColumn).should('be.visible')
    cy.get(selectors.codeHeaderColumn).should('be.visible')
    cy.get(selectors.nameHeaderColumn).should('be.visible')
    cy.get(selectors.countryHeaderColumn).should('be.visible')
    cy.get(selectors.regulatoryProgramHeaderColumn).should('be.visible')
  }

  /**
   * Check if the codes are unique
   */
  assertCodesAreUnique() {
    this.assertNoDuplicatesOnList(selectors.codeIds)
  }
}

export default RegulatoryAuthoritiesPage
