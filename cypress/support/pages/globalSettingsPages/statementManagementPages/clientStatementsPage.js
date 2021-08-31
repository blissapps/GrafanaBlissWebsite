import BaseStatementManagementPage from './baseStatementsManagementPage'

const properties = {
  pageURL: '/statement/clients'
}

const selectors = {
  clientFilterStatementInput: '#clientSelect input',
  dateFilterStatementInput: '#date-range-input input',
  clientStatementId: '#clientStatement-',
  clientParticipantStatementId: '#clientParticipantStatement-',
  backToManageStatementsButton: '#backLink',
  summaryDownloadButton: 'div.header gs-button',
  participantName: '#pptNameFilter input',
  participantId: '#pptIdFilter input',
  participantStatus: '#statusSelect input',
  onHoldBtn: '#onHold'
}

const reconcileStatementsSelectors = {
  containerWindow: 'gs-container-l4-overlay gs-container-l4',
  securityCardList: 'gs-container-l4 .list',
  securityCard: 'gs-container-l4 gs-card[data-test-id*=security-',
  securityCheckBox: 'gs-container-l4 gs-checkbox',
  cancelButton: 'gs-container-l4 gs-button:first-child',
  reconcileButton: '#client-reconcile-btn'
}

const onHoldStatementsSelectors = {
  numberOfStatements: 'gs-container-l4 h2',
  onHoldBtn: 'gs-container-l4 gs-button[appearance=primary]'
}

const apiInterceptions = {
  tableReloadedAfterFiltering: 'https://api.stonly.com/api/v2/widget/integration**',
  clientStatementsLoaded: 'https://api-regrep.myglobalshares.co.uk/api/v1.0/ClientStatements?limit=50&offset=0'
}

class ClientStatementsPage extends BaseStatementManagementPage {
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
   * @param clientId Id number of the statement with the reconcile button
   *
   * @returns summary button element
   */
  getReconcileButton(clientId) {
    return cy.get(`#hover-actions-${clientId} gs-svg-icon`)
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
    return cy.get(selectors.clientParticipantStatementId + participantId).scrollIntoView()
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
    cy.get(selectors.clientParticipantStatementId + participantId + ' gs-svg-icon').as('participantRowSelected')
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

  /**
   * When bulk actions are available, click in the checkbox of a specific participant
   *
   * @param {Number} participantId Id of the participant that is going to be selected by the checkbox
   */
  clickInTheCheckboxToSelectParticipant(participantId) {
    cy.get(selectors.clientParticipantStatementId + participantId)
      .invoke('hover')
      .then(() => {
        cy.get(selectors.clientParticipantStatementId + participantId + ' gs-grid-cell').as('checkbox')
        cy.get('@checkbox')
          .first()
          .click()
      })
  }

  /**
   * Click in the on hold button located in the table header when one or more participants with Pending Validation statuses are selected.
   * After that, verify the number of participant statements that will be on hold and click in on hold
   *
   * @param {Number} numberOfParticipantsStatements Number of Participants Statements to be put On Hold
   */
  clickToOnHoldAllSelectedParticipants(numberOfParticipantsStatements) {
    cy.get(selectors.onHoldBtn).click()
    cy.get(onHoldStatementsSelectors.numberOfStatements).should('have.text', numberOfParticipantsStatements)
    cy.get(onHoldStatementsSelectors.onHoldBtn).click()
  }

  // --------------------------------------- ASSERTIONS --------------------------------------------- //

  /**
   * Assert that the table from client statements shows all expected data in the columns, which are Ids, Clients, Regulators, and Statuses.
   *
   * @MISSING_IDS
   */
  assertClientStatementsTableContainsExpectedColumns() {
    const columnsToValidate = ['Id', 'Client', 'Regulator', 'Status'] // necessary until ids are placed
    this.assertTableContainsExpectedColumns(columnsToValidate)
  }

  /**
   * This method will assert that the Client Statement list is being displayed in order, which is by ID
   *
   * @param {Array} idsList Ordered list of ids to validate
   *
   * @MISSING_IDS
   */
  assertClientStatementsTableInOrderById(idsList) {
    let idsListIndex = 0
    for (let i = 6; i <= 30; i += 6) {
      cy.xpath(`(//gs-grid//gs-grid-row-list//gs-grid-row//gs-grid-cell//span)[${i}]`).should('contain.text', idsList[idsListIndex])
      idsListIndex++
    }
  }

  /**
   * Assert the state of the reconcile button.
   *
   * @param {Number} clientId Client id number to hover in this client to make sure the reconcile button is visible or not
   * @param {Boolean} displayed True to assert the reconcile button is displayed. False, otherwise.
   */
  assertReconcileButtonDisplayed(clientId, displayed = true) {
    displayed ? this.getReconcileButton(clientId).should('be.visible') : this.getReconcileButton(clientId).should('not.exist')
  }

  /**
   * Assert the L4 window for RECONCILIATE STATEMENTS is visible
   *
   * @param {Boolean} displayed True to assert the reconcile window is displayed. False, otherwise.
   */
  assertReconcileStatemenRightWindowDisplayed(displayed = true) {
    displayed ? cy.get(reconcileStatementsSelectors.containerWindow).should('be.visible') : cy.get(reconcileStatementsSelectors.containerWindow).should('not.exist')
  }

  /**
   * Assert the L4 window for RECONCILIATE STATEMENTS is visible and all components are placed as expected. It was made according to PB-612
   *
   * @param {Array} securityIds Security ids to be validated
   */
  assertReconcileStatementRightWindowDisplaysElementsAsExpected(securityIds) {
    // Window must be open
    this.assertReconcileStatemenRightWindowDisplayed()

    // List containing cards must be displayed
    cy.get(reconcileStatementsSelectors.securityCardList).should('be.visible')

    // Security cards must be displayed
    for (let i = 0; i < securityIds.length; i++) {
      cy.get(reconcileStatementsSelectors.securityCard + securityIds[i]).should('be.visible')
    }

    // Checkbox security must be displayed
    cy.get(reconcileStatementsSelectors.securityCheckBox).should('be.visible')

    // Cancel button must be displayed
    cy.get(reconcileStatementsSelectors.cancelButton).should('be.visible')

    // Reconcile button must be displayed but it should be disabled
    cy.get(reconcileStatementsSelectors.reconcileButton)
      .should('be.visible')
      .should('have.class', 'default medium square primary disabled')

    // Reconcile button must be displayed and enabled
    cy.get(reconcileStatementsSelectors.securityCheckBox).click()
    cy.get(reconcileStatementsSelectors.reconcileButton)
      .should('be.visible')
      .should('have.class', 'default medium square primary')

    // Once clicked in a security option, the Reconcile Button must also be enabled
    cy.get(reconcileStatementsSelectors.securityCheckBox).click()
    cy.get(reconcileStatementsSelectors.reconcileButton)
      .should('be.visible')
      .should('have.class', 'default medium square primary disabled')
    cy.get(reconcileStatementsSelectors.securityCard)
      .first()
      .click()
    cy.get(reconcileStatementsSelectors.reconcileButton)
      .should('be.visible')
      .should('have.class', 'default medium square primary')

    // Cancel button must close the window
    cy.get(reconcileStatementsSelectors.cancelButton).click()
    this.assertReconcileStatemenRightWindowDisplayed(false)
  }

  /**
   * Assert the participant is displayed or not in the participant table
   *
   * @param {Number} participantId The id of the participant
   * @param {Boolean} displayed True is the default value to check the participant is visible. False, otherwise
   */
  assertParticipantStatementDisplayed(participantId, displayed = true) {
    displayed ? this.getClientParticipantStatement(participantId).should('be.visible') : this.getClientParticipantStatement(participantId).should('not.exist')
  }

  /**
   * Assert the participant status
   *
   * @param {Number} participantId Participant id number to be asserted
   * @param {String} participantStatus Status to be verified into this participant. Status can be: Pending Validation, On Hold ...
   *
   */
  assertParticipantStatus(participantId, participantStatus) {
    cy.get(selectors.clientParticipantStatementId + participantId + ' gs-grid-cell gs-badge').should('contain.text', participantStatus)
  }

  // ----------------------------------------------------------------------OTHERS ------------------------------------------------------------------- //

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
      cy.get(selectors.clientFilterStatementInput).as('clientFilterInput')
      cy.get('@clientFilterInput').type(clientName)
      cy.get('@clientFilterInput').type('{enter}')
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
   * @param {String} participantName participant name to be searched into the participant statement filter. Send '' to not use this filter
   * @param {Number} participantId participant id to be searched into the participant statement filter. Send -1 to not use this filter
   * @param {String} status participant status to be searched into the participant statement filter. Send '' to not use this filter
   */
  filterParticipantStatements(participantName = '', participantId = -1, status = '') {
    cy.log('FILTERING PARTICIPANT')

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

  // ---------------------------------------  INTERCEPTIONS --------------------------------------------- //

  /**
   * This method waits until the table in reloaded after filtering something in filter statements.
   * It intercepts the call that is being made in the backend, avoiding unnecessary waits.
   */
  waitForTableToReloadAfterFiltering() {
    cy.intercept('GET', apiInterceptions.tableReloadedAfterFiltering).as('tableReloads')
    cy.wait('@tableReloads', { timeout: 10000 })
  }

  /**
   * Waits for clients to be loaded in the table
   */
  waitForClientStatementsToBeLoaded() {
    cy.intercept('GET', apiInterceptions.clientStatementsLoaded).as('clientsLoaded')
    cy.wait('@clientsLoaded', { timeout: 10000 })
  }
}

export default ClientStatementsPage
