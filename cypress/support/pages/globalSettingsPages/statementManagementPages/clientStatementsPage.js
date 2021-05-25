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
  numberOfRecordsAfterFiltering: '//div[@class="grid-count ng-star-inserted"]',
  noDataFoundMessage: '#emptyContainer',
  summaryDownloadButton: '//gs-button[contains(text(),"Summary")]',
  participantName: '(//gs-input-field//*[@class="input"])[1]',
  participantId: '(//gs-input-field//*[@class="input"])[2]',
  participantStatus: '#statusSelect input'
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
   * @returns client row element from table
   */
  getClientFromTable(clientId) {
    return cy.get(selectors.clientStatementId + clientId)
  }

  /**
   * Get no data found message when displayed
   *
   * @returns no data message
   */
  getNoDataFoundMessage() {
    return cy.get(selectors.noDataFoundMessage)
  }

  /**
   * Get summary button
   *
   * @returns summary button element
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
  clickSummaryDownloadButtonToDownloadCSVFile() {
    cy.xpath(selectors.numberOfRecordsAfterFiltering) //make sure we have data, so we can continue to download. Otherwise, summary button may fail
    this.getSummaryButton()
      .should('be.visible')
      .as('summaryBtn')
    cy.get('@summaryBtn').click()
  }

  /**
   * Inside the client, select a client participant from the table of participants and click in download pdf
   *
   * @param {Number} participantId clientId number to be searched in the client statements table
   *
   */
  clickDownloadPDFFromParticipantStatement(participantId) {
    // Make sure to search for the participant first, otherwise it wont work
    this.filterParticipantStatements('', participantId, '')
    this.checkAmountOfRecordsTable(1)

    //cy.get('#clientParticipantStatement-' + participantId).trigger('mouseover', 'right')
    //cy.xpath('//*[contains(@id,"cdk-overlay-")]//gs-svg-icon').click({ force: true })

    cy.get('#clientParticipantStatement-' + participantId)
      .click()
      .then(() => {
        cy.xpath('//*[contains(@id,"cdk-overlay-")]//gs-svg-icon')
          .invoke('show')
          .click({ force: true })
      })
  }

  /**
   * Checks the amount of records displayed in the table
   *
   * @param {Number} records amount of people you want to check in the records
   *
   * @example 'records = 1 for '1 record(s)' being displayed in the table
   */
  checkAmountOfRecordsTable(records) {
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
  filterClientStatements(clientName = '', dateFrom = '', dateTo = '') {
    if (clientName != '') {
      cy.get(selectors.clientFilterStatementInput).type(clientName + '{enter}')
    }

    if (dateFrom != '' && dateTo != '') {
      cy.get(selectors.dateFilterStatementInput)
        .first()
        .type(dateFrom)
      cy.get(selectors.dateFilterStatementInput)
        .last()
        .type(dateTo)
    }
  }

  /**
   * Filter for a participant in the participants table inside a client
   *
   * @param {String} participantName participant name to be searched into the participant statement filter
   * @param {Number} participantId participant id to be searched into the participant statement filter
   * @param {String} status participant status to be searched into the participant statement filter
   */
  filterParticipantStatements(participantName = '', participantId = -1, status = '') {
    this.clearAllFilters()

    if (participantName != '') {
      cy.xpath(selectors.participantName).type(participantName + '{enter}')
    }

    if (participantId != -1) {
      cy.xpath(selectors.participantId).type(participantId + '{enter}')
    }

    if (status != '') {
      cy.get(selectors.participantStatus).type(status + '{enter}')
    }
  }
}

export default ClientStatementsPage
