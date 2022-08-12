import BaseNewOrEditFrameworkPage from './baseNewOrEditFrameworkPage'

const properties = {
  pageURL: '/regulatory/regulatory-framework/new'
}

const selectors = {
  addRuleButton: '#noRulesBtn',
  rulesReferences: '#regulatoryFrameworkRuleList-0 gs-grid-cell:nth-child(2) span'
}

class NewFrameworkPage extends BaseNewOrEditFrameworkPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }

  // ----------------------------------------------------------------- CLICKS -------------------------------------------------------------------- //

  /**
   * Click in the Add Rule button
   */
  clickAddRuleButton() {
    cy.get(selectors.addRuleButton).click()
  }

  // ----------------------------------------------------------------- ASSERTIONS -------------------------------------------------------------------- //
}

export default NewFrameworkPage
