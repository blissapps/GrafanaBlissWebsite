import BasePage from '../../basePage'

const selectors = {
  noDataFoundMessage: '#emptyContainer',
  numberOfRecords: '#gridCount',
  clientStatementsTab: '.tabs-bar [id*="Client Statements"]',
  participantRegulatoryLinkageTab: '.tabs-bar [id*="Participant Regulatory Linkage"]'
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

  // --------------------------------------- CLICKS --------------------------------------------- //

  /**
   * Click in the Client Statements or Participant Regulatory Linkage tabs
   *
   * @param {String} tabName Tab name to click. It can be 'client statements' or 'participant regulatory linkage'
   */
  clickTab(tabName) {
    tabName = tabName.toLowerCase()

    switch (tabName) {
      case 'client statements':
        cy.get(selectors.clientStatementsTab).click()
        break

      case 'participant regulatory linkage':
        cy.get(selectors.participantRegulatoryLinkageTab).click()
        break

      default:
        throw new Error('Option invalid. Tabs can be either "Client Statements" or "Participant Regulatory Linkage"')
    }
  }

  // --------------------------------------- ASSERTIONS --------------------------------------------- //

  /**
   * Assert the "no data found" message is displayed or not
   *
   * @param {Boolean} displayed True to assert the "no data message" is  displayed. False, otherwise.
   */
  assertNoDataMessageFoundDisplayed(displayed = true) {
    displayed ? this.getNoDataFoundMessage().should('be.visible') : this.getNoDataFoundMessage().should('not.exist')
  }

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
