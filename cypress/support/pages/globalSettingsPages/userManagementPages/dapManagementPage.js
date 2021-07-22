import BaseManagementPage from './baseManagementPage'

const properties = {
  pageURL: '/settings/dap-management'
}

const selectors = {
  activeDapList: 'gs-tab[data-test-id=activeTab] #dapList gs-list',
  inactiveDapList: 'gs-tab[data-test-id=inactiveTab] #dapList gs-list',
  noDapExistsMessage: '#emptyList',
  dapId: '#a[data-test-id=dap-'
}

class DapManagementPage extends BaseManagementPage {
  /**
   * Checks if the current page is Data Access Profile management URL
   */
  checkDapManagementUrl() {
    this.checkUrl(properties.pageURL)
  }

  // ----------------------------------------------- GETS --------------------------------------------- //

  /**
   * Get a DAP by sending the DAP ID.
   *
   * @param {Number} dapId DAP id number.
   *
   * @returns The DAP element
   */
  getDapById(dapId) {
    return cy.get(selectors.dapId + dapId).scrollIntoView()
  }

  // ----------------------------------------------- CLICKS --------------------------------------------- //

  /**
   * Click in a DAP by sending the DAP ID.
   *
   * @param {Number} dapId DAP id number.
   */
  clickDapById(dapId) {
    this.getDapById(dapId).click()
  }

  // ----------------------------------------------- ASSERTS --------------------------------------------- //

  /**
   * Assert a list of daps is displayed under the correlated Active tab.
   *
   * @param {Boolean} displayed True to validate if the list is displayed. False otherwise
   */
  assertActiveDapsAreDisplayed(displayed = true) {
    displayed ? cy.get(selectors.activeDapList).should('be.visible') : cy.get(selectors.activeDapList).should('not.exist')
  }

  /**
   * Assert a list of daps is displayed under the correlated Inactive tab.
   *
   * @param {Boolean} displayed True to validate if the list is displayed. False otherwise
   */
  assertInactiveDapsAreDisplayed(displayed = true) {
    displayed ? cy.get(selectors.inactiveDapList).should('be.visible') : cy.get(selectors.inactiveDapList).should('not.exist')
  }

  /**
   * Assert the message "There are no data access profiles" is displayed when there is no data displayed
   */
  assertNoDapExistsMessageIsDisplayed() {
    cy.get(selectors.noDapExistsMessage).should('be.visible')
  }
}

export default DapManagementPage
