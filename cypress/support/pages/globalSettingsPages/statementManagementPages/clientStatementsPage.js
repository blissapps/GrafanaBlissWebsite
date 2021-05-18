import BasePage from '../../basePage'

const properties = {
  pageURL: '/statement/clients'
}

const selectors = {
  clientFilterStatementInput: '#clientSelect input',
  dateFilterStatementInput: '#date-range-input input',
  clearAllFiltersButton: '#clearButton',
  clientStatementId: '#clientStatement-',
  reconcileClientButton: '.cdk-overlay-connected-position-bounding-box',
  backToManageStatementsButton: '#backLink',
  participantStatementId: '#participantStatement-',
  participantNameFilterStatementInput: '.input > .ng-untouched',
  participantIdFilterStatementInput: '#participantIdSelect input',
  regulatorFilterStatementInput: '#regulatorSelect > .select > input',
  partnerFilterStatementInput: '#partnerSelect input',
  numberOfRecordsAfterFiltering: '//div[@class="grid-count ng-star-inserted"]',
  noDataFoundMessage: '#emptyContainer',
  summaryDownloadButton: '(//gs-button)[1]'
}

class ClientStatementsPage extends BasePage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkClientStatementsUrl() {
    this.checkUrl(properties.pageURL)
  }

  /**
   * Get client from the records table
   *
   * @param {Number} clientId clientId number to be searched in the client statements table
   *
   */
  getClientFromTable(clientId) {
    return cy.get(selectors.clientStatementId + clientId)
  }

  /**
   * Get no data found message when displayed
   *
   */
  getNoDataFoundMessage() {
    return cy.get(selectors.noDataFoundMessage)
  }

  /**
   * Get summary button
   *
   */
  getSummaryButton() {
    return cy.xpath(selectors.summaryDownloadButton)
  }

  /**
   * Select a client from the table of clients
   *
   * @param {Number} clientId clientId number to be searched in the client statements table
   */
  clickClientTable(clientId) {
    this.getClientFromTable(clientId)
      .scrollIntoView()
      .click()
  }

  /**
   * Go back to manage statements after clicking in a specific client from the table
   *
   */
  clickBackToManageStatements() {
    cy.get(selectors.backToManageStatementsButton).click()
  }

  /**
   * Click in the summary button to download a csv file for a client
   *
   */
  clickSummaryDownloadButton() {
    this.getSummaryButton().click()
  }

  /**
   * Checks the amount of records displayed in the table
   *
   * @param {Number} records amount of people you want to check in the records
   *
   * @example 'records = 1 for '1 record(s)' being displayed in the table
   */
  checkAmountOfPeopleTable(records) {
    cy.xpath(selectors.numberOfRecordsAfterFiltering)
      .invoke('text')
      .should('contain', records)
  }

  /**
   * Clear filters in a search
   *
   */
  clearAllFilters() {
    cy.get(selectors.clearAllFiltersButton).click()
  }

  /**
   * Filter data from client statements
   *
   * @param {String} clientName client name to be filtered in the client input field
   * @param {String} dateFrom initial date to be filtered in the As of Date input field
   * @param {String} dateTo final date to be filtered in the As of Date input field
   *
   * @example ('TomTom', '20190301', '20210519') for TomTom client with date range from 2019-03-01 up to 2021-05-19
   */
  filterStatementsInClientStatements(clientName = '', dateFrom = '', dateTo = '') {
    if (clientName != '') {
      cy.get(selectors.clientFilterStatementInput).type(clientName + '{enter}')
    }

    if (dateFrom != '' && dateTo != '') {
      cy.get(selectors.dateFilterStatementInput)
        .first()
        .type(dateFrom + dateTo)
    }
  }
}

export default ClientStatementsPage
