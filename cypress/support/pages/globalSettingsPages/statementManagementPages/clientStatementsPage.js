import BasePage from '../../basePage'

const properties = {
  pageURL: '/statement/clients'
}

const selectors = {
  clientFilterStatementInput: '#clientSelect input',
  dateFilterStatementInput: '#date-range-input input',
  clearAllFiltersButton: '#clearButton',
  clientStatementId: '#clientStatement-',
  clientParticipantStatementId: '#clientParticipantStatement-',
  backToManageStatementsButton: '#backLink',
  numberOfRecords: '#gridCount',
  noDataFoundMessage: '#emptyContainer',
  summaryDownloadButton: 'div.header gs-button',
  participantName: '#pptNameFilter input',
  participantId: '#pptIdFilter input',
  participantStatus: '#statusSelect input'
}

const apiInterceptions = {
  tableReloadedAfterFiltering: 'https://api.stonly.com/api/v2/widget/integration**'
}

class ClientStatementsPage extends BasePage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkClientStatementsUrl() {
    this.checkUrl(properties.pageURL)
  }

  // --------------------------------------- GETS --------------------------------------------- //

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
    return cy.get(selectors.summaryDownloadButton)
  }

  /**
   * Get reconciled button
   *
   * @param recordId Id number of the statement with the reconcile button
   *
   * @returns summary button element
   */
  getReconcileButton(recordId) {
    return cy.get(`#hover-actions-${recordId} gs-svg-icon`)
  }

  /**
   * Get number of records displayed in the table
   *
   * @returns element containing the number of records displayed
   */
  getNumberOfRecordsDisplayed() {
    return cy.get(selectors.numberOfRecords)
  }

  /**
   * Get the participant element in the client participants statements.
   * This one is found right after opening the participants page inside a client statement.
   *
   * @param {Number} participantId participant Id number
   *
   * @returns the client participant statement.
   */
  getClientParticipantStatement(participantId) {
    return cy.get(selectors.clientParticipantStatementId + participantId)
  }

  // --------------------------------------- CLICKS --------------------------------------------- //

  /**
   * Select a client from the table of clients
   *
   * @param {Number} clientId clientId number to be searched in the client statements table
   */
  clickClientTable(clientId) {
    this.getClientFromTable(clientId)
      .scrollIntoView()
      .click('left')
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
    this.getNumberOfRecordsDisplayed() //make sure we have data, so we can continue to download. Otherwise, summary button may fail
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
    cy.get('#clientParticipantStatement-' + participantId + ' gs-svg-icon').as('participantRowSelected')
    cy.get('@participantRowSelected').click()
  }

  /**
   * Reconcile a client statement
   *
   * @param {Number} recordId id number from the Client Statements table to reconcile
   */
  clickToReconcileClient(recordId) {
    this.getReconcileButton(recordId)
      .scrollIntoView()
      .click()
  }

  // --------------------------------------- ASSERTIONS AND OTHERS --------------------------------------------- //

  /**
   * Checks the amount of records displayed in the table
   *
   * @param {Number} records amount of people you want to check in the records
   *
   * @example 'records = 1 for '1 record(s)' being displayed in the table
   */
  checkAmountOfRecordsTable(records) {
    this.assertNumberOfRecordsTable(selectors.numberOfRecords, records)
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
   * @param {String} participantName participant name to be searched into the participant statement filter. Send '' to do use this filter
   * @param {Number} participantId participant id to be searched into the participant statement filter. Send '' to do use this filter
   * @param {String} status participant status to be searched into the participant statement filter. Send '' to do use this filter
   */
  filterParticipantStatements(participantName = '', participantId = -1, status = '') {
    if (participantName != '') {
      cy.get(selectors.participantName).type(participantName + '{enter}')
    }

    if (participantId != -1) {
      cy.get(selectors.participantId).type(participantId + '{enter}')
    }

    if (status != '') {
      cy.get(selectors.participantStatus).type(status + '{enter}')
    }

    this.waitForTableToReloadAfterFiltering()
  }

  /**
   * Assert that the table from client statements shows all expected data in the columns, which are Ids, Clients, Regulators, and Statuses.
   *
   * @MISSING_IDS
   */
  AssertClientStatementsTableContainsExpectedColumns() {
    const columnsToValidate = ['Id', 'Client', 'Regulator', 'Status'] // necessary until ids are placed
    this.assertTableContainsExpectedColumns(columnsToValidate)
  }

  /**
   * Assert that the table from participant statements (inside a client) shows all expected data in the columns, which are Ids and Statuses.
   *
   * @MISSING_IDS
   */
  assertParticipantsStatementsTableContainsExpectedColumns() {
    const columnsToValidate = ['Participant', 'Status'] // necessary until ids are placed
    this.assertTableContainsExpectedColumns(columnsToValidate)
  }

  /**
   * This method will assert that the Client Statement list is being displayed in order, which is by ID
   *
   * @MISSING_IDS
   */
  assertClientStatementsTableInOrderById() {
    const idsList = [76, 77, 78, 79, 80] // This is the expected list with the database we have in the environment right now

    let idsListIndex = 0
    for (let i = 6; i <= 30; i += 5) {
      cy.xpath(`(//gs-grid//gs-grid-row-list//gs-grid-row//gs-grid-cell//span)[${i}]`)
        .invoke('text')
        .should('contain', idsList[idsListIndex])
      idsListIndex++
    }
  }

  // ---------------------------------------  INTERCEPTIONS --------------------------------------------- //

  /**
   * This method waits until the table in reloaded after filtering something in filter statements.
   * It intercepts the call that is being made in the backend, avoiding unnecessary waits.
   */
  waitForTableToReloadAfterFiltering() {
    cy.intercept('GET', apiInterceptions.tableReloadedAfterFiltering).as('tableReloads')
    cy.wait('@tableReloads', { timeout: 10000 })
  }
}

export default ClientStatementsPage
