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
  frameworksElementsByCodes: '*[id*="regulatoryFrameworkList-"] gs-grid-cell:first-child',
  frameworksElementsByNames: '*[id*="regulatoryFrameworkList-"] gs-grid-cell:nth-child(2)'
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

  /**
   * Assert if the given framework is displayed or not in the Frameworks table
   *
   * @param {string} frameworkCode The framework code to be searched in the Frameworks table
   * @param {string} frameworkName The framework name to be searched in the Frameworks table
   * @param {boolean} displayed True is the default value to assert the given framework is displayed in the Frameworks table, false validates that the framework is not displayed
   */
  assertFrameworkListedOnTheFrameworksTable(frameworkCode = '', frameworkName = '', displayed = true) {
    if (frameworkCode === '' && frameworkName === '') {
      throw new Error('You need to send either a frameworkName or a frameworkCode to be verified')
    }

    if (displayed) {
      if (frameworkCode !== '') {
        cy.get(selectors.frameworksElementsByCodes).contains(frameworkCode).should('have.text', frameworkCode).scrollIntoView().and('be.visible')
      }
    } else {
      cy.get(selectors.frameworksElementsByNames).contains(frameworkCode).should('have.text', frameworkName).scrollIntoView().and('be.visible')
    }
  }
}

export default FrameworkManagementPage
