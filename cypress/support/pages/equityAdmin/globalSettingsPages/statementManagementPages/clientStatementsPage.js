import BaseStatementManagementPage from './baseStatementsManagementPage'

const properties = {
  pageURL: '/statement/clients'
}

const selectors = {
  clientFilterStatementInput: '#clientSelect input',
  regulatorFilterStatementInput: '#regulatorSelect input',
  statusFilterStatementInput: '#statusSelect input',
  dateFilterStatementInput: '#date-range-input input',
  clientStatementId: '#clientStatement-',
  clientsStatementIdsInTable: 'gs-grid-row gs-grid-cell:nth-child(1):not([id=idColumn]) span'
}

const tableColumnIds = {
  tableIdColumn: '#idColumn',
  tableClientColumn: '#clientColumn',
  tableRegulatorColumn: '#regulatorColumn',
  tableStatusColumn: '#statusColumn',
  tableUndefinedColumn: '#undefinedColumn'
}

const reconcileStatementsSelectorsOnL4Bar = {
  containerWindow: 'gs-container-l4-overlay gs-container-l4',
  securityCardList: 'gs-container-l4 .list',
  securityCard: 'gs-container-l4 gs-card[data-test-id*=security-',
  securityCheckBox: 'gs-container-l4 gs-checkbox',
  cancelButton: 'gs-container-l4 gs-button:first-child',
  reconcileButton: '#client-reconcile-btn'
}

const apiInterceptions = {
  clientStatementsLoaded: 'https://api-regrep.myglobalshares.co.uk/api/v1.0/ClientStatements?limit=50&offset=0'
}

class ClientStatementsPage extends BaseStatementManagementPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }

  // -------------------------------------------------------------------------------------- GETS ------------------------------------------------------------------------- //

  /**
   * Get reconciled button for a specific client
   *
   * @param clientStatementId Id number of the client statement with the reconcile button
   *
   * @returns reconcile button for the client
   */
  getReconcileButton(clientStatementId) {
    return cy.get(`#clientStatement-${clientStatementId} gs-button`)
  }

  // ---------------------------------------------------------------------------------- CLICKS --------------------------------------------------------------------------- //

  /**
   * Select a client statement from the table of Client Statements
   *
   * @param {number} clientStatementId Client Statement id number to be clicked in the table
   */
  clickClientTable(clientStatementId) {
    cy.get(selectors.clientStatementId + clientStatementId)
      .scrollIntoView()
      .click()
  }

  /**
   * Click in the button to reconcile a client statement
   *
   * PS: This method does not reconcile the client, it only clicks in the reconcile button so you can verify its behavior. To reconcile go to the reconcileClient method
   *
   * @param {number} clientStatementId id number from the Client Statements table
   */
  clickToReconcileClient(clientStatementId) {
    this.getReconcileButton(clientStatementId).scrollIntoView().click()
  }

  // --------------------------------------------------------------------------------- ASSERTIONS -------------------------------------------------------------------------------- //

  /**
   * Assert the client is displayed in the table of Client Statements
   *
   * @param {number} clientStatementId The client statement id number
   * @param {boolean} displayed True to assert the client statement is displayed. False, otherwise.
   *
   */
  assertClientDisplayedOnClientStatementsTable(clientStatementId, displayed = true) {
    displayed ? cy.get(selectors.clientStatementId + clientStatementId).should('be.visible') : cy.get(selectors.clientStatementId + clientStatementId).should('not.exist')
  }

  /**
   * Assert the table from Client Statements shows all expected data in the columns, which are Ids, Clients, Regulators, Statuses and one to allocate the action items
   *
   */
  assertClientStatementsTableContainsExpectedColumnsInOrder() {
    const columnsToValidate = ['Id', 'Client', 'Regulator', 'Status']

    // Assert visibility
    cy.get(tableColumnIds.tableIdColumn).should('be.visible')
    cy.get(tableColumnIds.tableClientColumn).should('be.visible')
    cy.get(tableColumnIds.tableRegulatorColumn).should('be.visible')
    cy.get(tableColumnIds.tableStatusColumn).should('be.visible')
    cy.get(tableColumnIds.tableUndefinedColumn).should('be.visible')

    // Assert order
    this.assertTableContainsExpectedColumnsInOrder(columnsToValidate)
  }

  /**
   * This method will assert that the Client Statement list is correctly ordered b IDs
   *
   */
  assertClientStatementsTableInOrderById() {
    this.assertElementsInAlphabeticalOrNumericalOrder(selectors.clientsStatementIdsInTable)
  }

  /**
   * Assert the state of the reconcile button.
   *
   * @param {number} clientStatementId Client id number to hover in this client to make sure the reconcile button is visible or not
   * @param {boolean} displayed True to assert the reconcile button is displayed. False, otherwise.
   */
  assertReconcileButtonDisplayedForClient(clientStatementId, displayed = true) {
    displayed ? this.getReconcileButton(clientStatementId).should('be.visible') : this.getReconcileButton(clientStatementId).should('not.exist')
  }

  /**
   * Assert the L4 window for RECONCILIATE STATEMENTS is visible and all components are placed as expected. It was made according to PB-612
   *
   * @param {number[]} securityIds Security ids to be validated
   */
  assertReconcileStatementRightWindowDisplaysElementsAsExpected(securityIds) {
    // L4 Window must be open
    this.assertRightL4BarIsDisplayed()

    // List containing cards must be displayed
    cy.get(reconcileStatementsSelectorsOnL4Bar.securityCardList).should('be.visible')

    // Security cards must be displayed
    for (let i = 0; i < securityIds.length; i++) {
      cy.get(reconcileStatementsSelectorsOnL4Bar.securityCard + securityIds[i]).should('be.visible')
    }

    // Checkbox security must be displayed
    cy.get(reconcileStatementsSelectorsOnL4Bar.securityCheckBox).should('be.visible')

    // Cancel button must be displayed
    cy.get(reconcileStatementsSelectorsOnL4Bar.cancelButton).should('be.visible')

    // Reconcile button must be displayed but it should be disabled
    cy.get(reconcileStatementsSelectorsOnL4Bar.reconcileButton).should('be.visible').should('have.class', 'default medium square primary disabled')

    // Reconcile button must be displayed and enabled
    cy.get(reconcileStatementsSelectorsOnL4Bar.securityCheckBox).click()
    cy.get(reconcileStatementsSelectorsOnL4Bar.reconcileButton).should('be.visible').should('have.class', 'default medium square primary')

    // Once clicked in a security option, the Reconcile Button must also be enabled
    cy.get(reconcileStatementsSelectorsOnL4Bar.securityCheckBox).click()
    cy.get(reconcileStatementsSelectorsOnL4Bar.reconcileButton).should('be.visible').and('have.class', 'default medium square primary disabled')
    cy.get(reconcileStatementsSelectorsOnL4Bar.securityCard).first().click()
    cy.get(reconcileStatementsSelectorsOnL4Bar.reconcileButton).should('be.visible').and('have.class', 'default medium square primary')

    // Cancel button must close the window
    cy.get(reconcileStatementsSelectorsOnL4Bar.cancelButton).click()
    this.assertRightL4BarIsDisplayed(false)
  }

  /**
   * Assert the client status in the Client Statements table
   *
   * @param {number} clientStatementId Client statement id number to be asserted
   * @param {string} clientStatus Status to be verified in this client. Status can be: Pending Validation, On Hold ... Check HTML to make sure
   *
   */
  assertClientStatus(clientStatementId, clientStatus) {
    cy.get(selectors.clientStatementId + clientStatementId + ' gs-grid-cell gs-badge')
      .scrollIntoView()
      .should('contain.text', clientStatus)
  }

  // ----------------------------------------------------------------------------------- OTHERS ------------------------------------------------------------------------------- //

  /**
   * Filter data from client statements
   *
   * @param {string} clientName client name to be filtered in the client input field
   * @param {string} dateFrom initial date to be filtered in the As of Date input field
   * @param {string} dateTo final date to be filtered in the As of Date input field
   * @param {string} regulator regulator to be filtered in the Regulator input field
   * @param {string} status status to be filtered in the Status field
   *
   * @example ('TomTom', '20190301', '20210519') for TomTom client statement with date range from 2019-03-01 up to 2021-05-19
   */
  filterClientStatements(clientName = '', dateFrom = '', dateTo = '', regulator = '', status = '') {
    if (clientName != '') {
      cy.get(selectors.clientFilterStatementInput).as('clientFilterInput')
      cy.get('@clientFilterInput').type(clientName)
      cy.get('@clientFilterInput').type('{enter}')
    }

    if (dateFrom != '' && dateTo != '') {
      cy.get(selectors.dateFilterStatementInput).first().type(dateFrom)
      cy.get(selectors.dateFilterStatementInput).last().type(dateTo)
    }

    if (regulator != '') {
      cy.get(selectors.regulatorFilterStatementInput).as('regulatorFilterInput')
      cy.get('@regulatorFilterInput').type(regulator)
      cy.get('@regulatorFilterInput').type('{enter}')
    }

    if (status != '') {
      cy.get(selectors.statusFilterStatementInput).as('statusFilterStatementInput')
      cy.get('@statusFilterStatementInput').type(status)
      cy.get('@statusFilterStatementInput').type('{enter}')
    }
  }

  /**
   * Reconcile a client given its client statement id and the security id(s)
   *
   * @param {number} clientStatementId Client statement id number to be reconciled
   * @param {boolean} noSecurityConsidered True to select the checkbox to do not consider securities for IRS submission. False does not select the checkbox
   * @param {number[]} securityIds Client id number to be reconciled
   */
  reconcileClient(clientStatementId, noSecurityConsidered, securityIds = []) {
    // Make sure the data is consistent
    if (noSecurityConsidered && securityIds.length > 0) {
      throw new Error('It does not make sense to send securityIds and mark the checkbox (noSecurityConsidered as True). Please, choose one option only')
    } else if (!noSecurityConsidered && securityIds.length == 0) {
      throw new Error('In order to reconcile you need to choose to either send securityIds or to click in the checkbox by sending noSecurityConsidered as true')
    }

    this.clickToReconcileClient(clientStatementId)

    // Checkbox selection
    if (noSecurityConsidered) {
      cy.get(reconcileStatementsSelectorsOnL4Bar.securityCheckBox).click()
    }

    // Security cards
    if (securityIds.length > 0) {
      for (let i = 0; i < securityIds.length; i++) {
        cy.get(reconcileStatementsSelectorsOnL4Bar.securityCard + securityIds[i]).click()
      }
    }

    // Reconcile
    cy.get(reconcileStatementsSelectorsOnL4Bar.reconcileButton).click()
  }

  // -------------------------------------------------------------------------------  INTERCEPTIONS ------------------------------------------------------------------------- //

  /**
   * Waits for client statements to be loaded in the table
   */
  waitForClientStatementsToBeLoaded() {
    cy.intercept('GET', apiInterceptions.clientStatementsLoaded).as('clientStatementsLoaded')
    cy.wait('@clientStatementsLoaded', { timeout: 10000 })
  }
}

export default ClientStatementsPage
