import BasePage from '../../basePage'

const selectors = {
  noDataFoundMessage: '#emptyContainer',
  numberOfRecords: '#gridCount'
}

/**
 * This class is a common page for all common methods and/or locators over Statement Management
 *
 */
class BaseStatementManagementPage extends BasePage {
  // --------------------------------------- GETS --------------------------------------------- //

  /**
   * Get no data found message when displayed
   *
   * @returns no data message
   */
  getNoDataFoundMessage() {
    return cy.get(selectors.noDataFoundMessage)
  }

  /**
   * Get number of records displayed in the table
   *
   * @returns element containing the number of records displayed
   */
  getNumberOfRecordsDisplayed() {
    return cy.get(selectors.numberOfRecords)
  }

  // --------------------------------------- ASSERTIONS --------------------------------------------- //

  /**
   * Checks the amount of records displayed in the table
   *
   * @param {Number} records amount of people you want to check in the records
   *
   * @example 'records = 1 for '1 record(s)' being displayed in the table
   */
  assertAmountOfRecordsTable(records) {
    cy.xpath(`//*[@id="gridCount"][normalize-space(text())="${records} record(s)"]`)
      .scrollIntoView()
      .should('be.visible')
  }
}

export default BaseStatementManagementPage
