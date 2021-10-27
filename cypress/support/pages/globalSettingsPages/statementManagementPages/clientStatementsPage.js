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
  summaryDownloadButton: '#downloadSummary',
  participantName: '#pptNameFilter input',
  participantId: '#pptIdFilter input',
  participantStatus: '#statusSelect input',
  participantExternalId: '#pptExternalIdFilter input',
  onHoldBtn: '#gridActionHold',
  recallBtn: '#gridActionRecall',
  approveBtn: '#gridActionApprove',
  rerunBtn: '#gridActionRerun',
  actionsButton: '.action gs-button',
  actionsRerunButton: 'gs-action-panel-option span'
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
  actionButton: 'gs-container-l4 #actionBtn'
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

  // ------------------------------------------------------------------------------------------------ GETS --------------------------------------------------------------------------------------- //

  /**
   * Get client from the records table
   *
   * @param {Number} clientId clientId number to be searched in the client statements table
   *
   * @returns client row element from table
   */
  getClientFromTable(clientId) {
    return cy.get(selectors.clientStatementId + clientId).scrollIntoView()
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
   * Get reconciled button for a specific client
   *
   * @param clientId Id number of the statement with the reconcile button
   *
   * @returns reconcile button for the client
   */
  getReconcileButton(clientId) {
    return cy.get(`#hover-actions-${clientId} gs-svg-icon`)
  }

  // ------------------------------------------------------------------------------------------------- CLICKS --------------------------------------------------------------------------------------- //

  /**
   * Select a client from the table of clients
   *
   * @param {Number} clientStatementId clientId number to be searched in the client statements table
   */
  clickClientTable(clientStatementId) {
    this.getClientFromTable(clientStatementId)
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
   * Click in the buttons located in the header of the participants table right after selecting them on the checkboxes
   *
   * @param {String} actionToPerform Chose the action to perform. It can be Rerun, Approve, or On Hold.
   * @param {Number} numberOfParticipantsAffected Number of participants that are going be affected
   *
   */
  clickInTableHeaderToPerformActions(actionToPerform, numberOfParticipantsAffected) {
    actionToPerform = actionToPerform.toLowerCase()

    switch (actionToPerform) {
      case 'on hold':
        cy.get(selectors.onHoldBtn).click()
        break

      case 'rerun':
        cy.get(selectors.rerunBtn).click()
        break

      default:
        throw new Error('Parameter actionToPerform is invalid')
    }

    cy.get(onHoldStatementsSelectors.numberOfStatements).should('have.text', numberOfParticipantsAffected)
    cy.get(onHoldStatementsSelectors.actionButton).click()
  }

  // --------------------------------------------------------------------------------- ASSERTIONS ------------------------------------------------------------------------------------------ //

  /**
   * Assert the client is displayed in the table on statement/clients
   *
   * @param {Boolean} displayed True to assert theclient is displayed. False, otherwise.
   *
   */
  assertClientDisplayedOnClientStatementsTable(clientId, displayed = true) {
    displayed ? this.getClientFromTable(clientId).should('be.visible') : this.getClientFromTable(clientId).should('not.exist')
  }

  /**
   * Assert that the table from client statements shows all expected data in the columns, which are Ids, Clients, Regulators, and Statuses.
   *
   * @param {Boolean} displayed True to assert the summary window is displayed. False, otherwise.
   *
   */
  assertSummaryButtonDisplayed(displayed = true) {
    displayed ? this.getSummaryButton().should('be.visible') : this.getSummaryButton().should('not.exist')
  }

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
    displayed
      ? cy.get(selectors.clientParticipantStatementId + participantId).should('be.visible')
      : cy.get(selectors.clientParticipantStatementId + participantId).should('not.exist')
  }

  /**
   * Assert the participant status
   *
   * @param {Number} participantId Participant id number to be asserted
   * @param {String} participantStatus Status to be verified into this participant. Status can be: Pending Validation, On Hold ...
   *
   */
  assertParticipantStatus(participantId, participantStatus) {
    cy.get(selectors.clientParticipantStatementId + participantId + ' gs-grid-cell gs-badge')
      .scrollIntoView()
      .should('contain.text', participantStatus)
  }

  /**
   * Assert the recall button is available for a given participant
   *
   *
   * @param {Number} participantId The participant id to check if the recall button is available for it
   * @param {Boolean} displayed True to assert the recall button is displayed. False, otherwise.
   *
   *
   * @missing_ids
   */
  assertRecallButtonDisplayedForParticipant(participantId, displayed = true) {
    displayed
      ? cy
          .get(selectors.clientParticipantStatementId + participantId + ' ' + selectors.recallBtn)
          .eq(1)
          .should('be.visible')
      : cy
          .get(selectors.clientParticipantStatementId + participantId + ' ' + selectors.recallBtn)
          .eq(1)
          .should('not.exist')
  }

  /**
   * Assert the approve button is available for a given participant
   *
   *
   * @param {Number} participantId The participant id to check if the approve button is available for it
   * @param {Boolean} displayed True to assert the approve button is displayed. False, otherwise.
   *
   *
   * @missing_ids
   */
  assertApproveButtonDisplayedForParticipant(participantId, displayed = true) {
    displayed
      ? cy
          .get(selectors.clientParticipantStatementId + participantId + ' ' + selectors.approveBtn)
          .eq(1)
          .should('be.visible')
      : cy
          .get(selectors.clientParticipantStatementId + participantId + ' ' + selectors.approveBtn)
          .eq(1)
          .should('not.exist')
  }

  /**
   * Assert if the a specific button is displayed in the table header after selecting one or more participants
   *
   * @param {String} actionButtonName Action name. It can be approve, on hold, rerun
   * @param {Boolean} displayed True to assert the button is displayed. False, otherwise.
   *
   */
  assertActionButtonDisplayedInTableHeader(actionButtonName, displayed = true) {
    actionButtonName = actionButtonName.toLowerCase()

    switch (actionButtonName) {
      case 'on hold':
        displayed ? cy.get(selectors.onHoldBtn).should('be.visible') : cy.get(selectors.onHoldBtn).should('not.exist')
        break

      default:
        throw new Error('Parameter actionToPerform is invalid')
    }
  }

  /**
   * Assert the button/option is available inside the Actions button for a given participant
   *
   * @param {Number} participantId Participant id to verify the actions available for it.
   * @param {String} buttonName Button name to be asserted
   */
  assertButtonIsDisplayedInParticipantActions(participantId, buttonName) {
    buttonName = buttonName.toLowerCase()

    cy.get(selectors.clientParticipantStatementId + participantId + ' ' + selectors.actionsButton).click()

    switch (buttonName) {
      case 'rerun':
        cy.get(selectors.actionsRerunButton).should('be.visible')
        break

      default:
        throw new Error('The buttonName parameter is not valid!')
    }
  }

  // -------------------------------------------------------------------------------------------- OTHERS ------------------------------------------------------------------------------------------- //

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
   * @param {String} participantName participant name to be searched into the participant statement filter. '' to skip this filter
   * @param {Number} participantId participant id to be searched into the participant statement filter. -1 to skip this filter
   * @param {String} status participant status to be searched into the participant statement filter. '' to skip this filter
   * @param {Number} participantExternalId participant external id to be searched into the participant statement filter. -1 to skip this filter
   *
   * The Delay is necessary for Firefox only
   */
  filterParticipantStatements(participantName = '', participantId = -1, status = '', participantExternalId = -1) {
    // Firefox delay
    let delay = 10
    if (Cypress.isBrowser('firefox')) {
      delay = 100
    }

    cy.log('FILTERING PARTICIPANT')

    if (participantName != '') {
      cy.get(selectors.participantName).type(participantName + '{enter}', { delay: delay })
    }

    if (participantId != -1) {
      cy.get(selectors.participantId).type(participantId + '{enter}', { delay: delay })
    }

    if (status != '') {
      cy.get(selectors.participantStatus).type(status + '{enter}', { delay: delay })
    }

    if (participantExternalId != -1) {
      cy.get(selectors.participantExternalId).type(participantExternalId + '{enter}', { delay: delay })
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
