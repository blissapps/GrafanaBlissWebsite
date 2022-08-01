import BaseRegulatoryFrameworkSetupPage from './baseRegulatoryFrameworkSetupPage'

const properties = {
  pageURL: '/regulatory/framework-setup/programs'
}

const selectors = {
  idHeaderColumn: '#rowNumberColumn',
  codeHeaderColumn: '#codeColumn',
  nameHeaderColumn: '#nameColumn',
  fillingTypeHeaderColumn: '#fillingTypeColumn',
  frequencyHeaderColumn: '#frequencyColumn',
  lastGenerationDateHeaderColumn: '#lastGenerationDateColumn',
  nextGenerationHeaderColumn: '#nextGenerationDateColumn',
  codeIds: '*[id*=regulatoryProgramGrid-] gs-grid-cell:nth-child(2)'
}

class CorporateFilingProgramsPage extends BaseRegulatoryFrameworkSetupPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }

  /**
   * Assert if the expect columns are displayed, which are code, name, filing type, frequency, last generation, and next generation
   */
  assertExpectedColumnsAreDisplayed() {
    cy.get(selectors.idHeaderColumn).should('be.visible')
    cy.get(selectors.codeHeaderColumn).should('be.visible')
    cy.get(selectors.nameHeaderColumn).should('be.visible')
    cy.get(selectors.fillingTypeHeaderColumn).should('be.visible')
    cy.get(selectors.frequencyHeaderColumn).should('be.visible')
    cy.get(selectors.lastGenerationDateHeaderColumn).should('be.visible')
    cy.get(selectors.nextGenerationHeaderColumn).should('be.visible')
  }

  /**
   * Check if the codes are unique
   */
  assertCodesAreUnique() {
    this.assertNoDuplicatesOnList(selectors.codeIds)
  }
}

export default CorporateFilingProgramsPage
