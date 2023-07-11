import BasePage from '../../../../basePage'

const properties = {
  pageURL: '/regulatory/frameworks'
}

const selectors = {
  codeColumnHeader: '#codeColumn',
  nameColumnHeader: '#nameColumn',
  resellerAccessColumnHeader: '#resellerAccessColumn',
  clientAccessColumnHeader: '#clientAccessColumn',
  threeDotActionButtonColumnHeader: '#Column',
  newFrameworkButton: '#newFrameworkBtn',
  regulatoryFrameworkRows: '#regulatoryFrameworkList-',
  editButton: 'gs-action-panel-option span'
}

class FrameworkManagementPage extends BasePage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }

  // ----------------------------------------------------------------- CLICKS -------------------------------------------------------------------- //

  /**
   * Clicks in the New Framework button
   */
  clickNewFramework() {
    cy.get(selectors.newFrameworkButton).click()
  }

  /**
   * Click in the edit button of a given Framework
   *
   * @param {number} regulatoryFrameworkId The regulatory framework id to be edited
   */
  clickToEditFramework(regulatoryFrameworkId) {
    cy.get(selectors.regulatoryFrameworkRows + regulatoryFrameworkId + ' gs-grid-cell:last-child svg').click({ force: true })
    cy.get(selectors.editButton).click()
  }

  // ----------------------------------------------------------------- ASSERTIONS -------------------------------------------------------------------- //

  /**
   * Assert the expect columns, which currently are CODE, NAME, RESELLER APPLICATION, CLIENT APPLICATION, and the empty colum for the 3 dot button are displayed
   */
  assertExpectedFrameworkColumnsAreDisplayedOverTheTable() {
    cy.get(selectors.codeColumnHeader).should('be.visible')
    cy.get(selectors.nameColumnHeader).should('be.visible')
    cy.get(selectors.resellerAccessColumnHeader).should('be.visible')
    cy.get(selectors.clientAccessColumnHeader).should('be.visible')
    cy.get(selectors.threeDotActionButtonColumnHeader).should('be.visible')
  }
}

export default FrameworkManagementPage
