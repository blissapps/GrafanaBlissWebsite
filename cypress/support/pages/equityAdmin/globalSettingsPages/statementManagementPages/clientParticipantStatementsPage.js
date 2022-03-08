import BaseStatementManagementPage from './baseStatementsManagementPage'

const properties = {
  pageURL: /.?statement\/*client\/*.*[0-9]\/*statement.*[0-9]\/*participants$/
}

const selectors = {
  summaryDownloadButton: '#downloadSummary',
  backToManageStatementsButton: '#backLink',
  clientParticipantStatementId: '#clientParticipantStatement-',
  rejectButton: '#reject',
  recallButton: '#recall',
  publishButton: '#publish',
  participantStatementIdsInTable: '*[id*=clientParticipantStatement-] gs-grid-extension-checkable-row-number-cell span',
  recallBtnOnTable: '#gridActionRecall',
  approveBtn: '#gridActionApprove',
  onHoldBtn: '#gridActionHold',
  rerunBtn: '#gridActionRerun',
  actionsButton: '.action gs-button',
  actionsRerunButton: '//gs-action-panel-option//span[contains(text(),"Rerun")]',
  actionsRecallButton: '//gs-action-panel-option//span[contains(text(),"Recall")]',
  actionsApproveButton: '//gs-action-panel-option//span[contains(text(),"Approve")]',
  actionsViewPdfButton: '//gs-action-panel-option//span[contains(text(),"View PDF")]',
  clientStatusBadge: '*.title-header-info gs-badge',
  participantName: '#pptNameFilter input',
  participantId: '#pptIdFilter input',
  participantStatus: '#statusSelect input',
  participantExternalId: '#pptExternalIdFilter input'
}

const selectorsOnL4Bar = {
  numberOfStatements: 'gs-container-l4 h2',
  actionButton: 'gs-container-l4 #actionBtn'
}

const tableColumnIds = {
  tableNumberColumn: '#rowNumberColumn',
  tableParticipantColumn: '#participantColumn',
  tableStatusColumn: '#statusColumn'
}

const apiInterceptions = {
  tableReloadedAfterFiltering: 'https://api.stonly.com/api/v2/widget/integration**',
  clientParticipantStatementsLoaded: 'https://api-regrep.myglobalshares.co.uk/api/v1.0/Clients/**/ParticipantStatements?clientStatementId**'
}

class ClientParticipantStatementsPage extends BaseStatementManagementPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrlByRegex(properties.pageURL)
  }

  // -------------------------------------------------------------------------------------- CLICKS --------------------------------------------------------------------------------- //

  /**
   * Click in the summary button to download a csv file for a client
   *
   */
  clickSummaryDownloadButtonToDownloadCSVFile() {
    this.getNumberOfRecordsDisplayed() //make sure we have data, so we can continue to download. Otherwise, summary button may fail
    cy.get(selectors.summaryDownloadButton).should('be.visible').as('summaryBtn')
    cy.get('@summaryBtn').click()
  }

  /**
   * Go back to the client statements page
   *
   */
  clickBackToManageStatements() {
    cy.get(selectors.backToManageStatementsButton).click()
  }

  /**
   * Click on a participant
   *
   * @param {number} participantId Id of the participant that is going to be clicked in the participants table
   */
  clickOnParticipantById(participantId) {
    cy.get(selectors.clientParticipantStatementId + participantId)
      .scrollIntoView()
      .click({ force: true })
  }

  /**
   * When bulk actions are available, click in the checkbox of a specific participant
   *
   * @param {number} participantId Id of the participant that is going to be selected by the checkbox
   */
  clickOnTheCheckboxToSelectParticipant(participantId) {
    cy.get(selectors.clientParticipantStatementId + participantId)
      .invoke('hover')
      .then(() => {
        cy.get(selectors.clientParticipantStatementId + participantId + ' gs-grid-cell').as('checkbox')
        cy.get('@checkbox').first().click()
      })
  }

  /**
   * Click in the Reject button to reject the entire client statement
   */
  clickToRejectStatement() {
    cy.get(selectors.rejectButton).click()
  }

  /**
   * Click in the Recall button to recall a Client Statement
   */
  clickToRecallClientStatement() {
    cy.get(selectors.recallButton).click()
    cy.get(selectorsOnL4Bar.actionButton).click()
  }

  /**
   * Click in the buttons located in the header of the participants table right after selecting them on the checkboxes
   *
   * @param {string} actionToPerform Chose the action to perform. It can be Rerun, Approve, or On Hold.
   * @param {number} numberOfParticipantsAffected Number of participants that are going be affected
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

      case 'approve':
        cy.get(selectors.approveBtn).click()
        break

      case 'recall':
        cy.get(selectors.recallBtnOnTable).click()
        break

      default:
        throw new Error('Parameter actionToPerform is invalid')
    }

    cy.get(selectorsOnL4Bar.numberOfStatements).should('have.text', numberOfParticipantsAffected)
    cy.get(selectorsOnL4Bar.actionButton).click()
  }

  /**
   * Click in the publish button to publish the client statement
   */
  clickToPublish() {
    cy.get(selectors.publishButton).click()
  }

  /**
   * Click in the action button of a specific Participant Statement
   *
   * @param {number} participantId Participant Id number to click in its action button
   */
  clickInTheActionsButtonOfParticipant(participantId) {
    cy.get(selectors.clientParticipantStatementId + participantId + ' ' + selectors.actionsButton).click()
  }

  // ------------------------------------------------------------------------------------------ ASSERTIONS -------------------------------------------------------------------------------- //
  /**
   * Assert the client status badge displayed in the top right beside the year
   *
   * @param {string} statusName The name of the status
   *
   */
  assertClientStatus(statusName) {
    cy.get(selectors.clientStatusBadge).should('contain.text', statusName)
  }

  /**
   * Assert the table from participant statements shows all expected data in the columns, which are role number column, Participant, and Status
   */
  assertParticipantStatementsTableContainsExpectedColumnsInOrder() {
    cy.get(tableColumnIds.tableNumberColumn).should('be.visible')
    cy.get(tableColumnIds.tableParticipantColumn).should('be.visible')
    cy.get(tableColumnIds.tableStatusColumn).should('be.visible')

    this.assertTableContainsExpectedColumnsInOrder(['Participant', 'Status'])
  }

  /**
   * This method will assert that the Participant Statements list is being displayed in order, which is by ID
   *
   * @param {array} idsList Ordered list of ids to validate
   *
   * @example
   * assertParticipantStatementsTableInOrderById(1,2,3,4,5) to check if the 5 first elements have ids 1,2,3,4, and 5 in order
   */
  assertParticipantStatementsTableInOrderById(idsList) {
    for (let i = 0; i < idsList.length; i++) {
      cy.get(selectors.participantStatementIdsInTable).eq(i).should('contain.text', idsList[i])
    }
  }

  /**
   * Assert the participant is displayed or not in the participants table
   *
   * @param {number} participantId The id of the participant
   * @param {boolean} displayed True is the default value to check the participant is visible. False, otherwise
   */
  assertParticipantStatementDisplayed(participantId, displayed = true) {
    displayed
      ? cy.get(selectors.clientParticipantStatementId + participantId).should('be.visible')
      : cy.get(selectors.clientParticipantStatementId + participantId).should('not.exist')
  }

  /**
   * Assert the participant status in the participants table
   *
   * @param {number} participantId Participant id number to be asserted
   * @param {string} participantStatus Status to be verified into this participant. Status can be: Pending Validation, On Hold, Approved ... Check HTML to make sure
   *
   */
  assertParticipantStatus(participantId, participantStatus) {
    cy.get(selectors.clientParticipantStatementId + participantId + ' gs-grid-cell gs-badge')
      .scrollIntoView()
      .should('contain.text', participantStatus)
  }

  /**
   * Assert whether the summary button is  displayed or not
   *
   * @param {boolean} displayed True to assert the summary button is displayed. False, otherwise.
   *
   */
  assertSummaryButtonDisplayed(displayed = true) {
    displayed ? cy.get(selectors.summaryDownloadButton).should('be.visible') : cy.get(selectors.summaryDownloadButton).should('not.exist')
  }

  /**
   * Assert whether the Reject button is displayed or not.
   *
   * @param {boolean} displayed True to validate the Reject button is displayed. False otherwise.
   */
  assertRejectButtonDisplayed(displayed = true) {
    displayed ? cy.get(selectors.rejectButton).should('be.visible') : cy.get(selectors.rejectButton).should('not.exist')
  }

  /**
   * Assert whether the Recall button is displayed or not for the Client statement.
   *
   * @param {boolean} displayed True to validate the Recall button is displayed. False otherwise.
   */
  assertRecallButtonDisplayedForClientStatement(displayed = true) {
    displayed ? cy.get(selectors.recallButton).should('be.visible') : cy.get(selectors.recallButton).should('not.exist')
  }

  /**
   * Assert whether the recall button is available for a given participant or not
   *
   * @param {number} participantId The participant id to check if the recall button is available for it
   * @param {boolean} displayed True to assert the recall button is displayed. False, otherwise.
   *
   */
  assertRecallButtonDisplayedForParticipantStatement(participantId, displayed = true) {
    this.clickInTheActionsButtonOfParticipant(participantId)

    displayed ? cy.xpath(selectors.actionsRecallButton).should('be.visible') : cy.xpath(selectors.actionsRecallButton).should('not.exist')
  }

  /**
   * Assert whether the approve button is available for a given participant or not
   *
   *
   * @param {number} participantId The participant id to check if the approve button is available for it
   * @param {boolean} displayed True to assert the approve button is displayed. False, otherwise.
   *
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
   * Assert if the button "Actions" is displayed for a specific participant statement
   *
   * @param {number} participantId Participant Id number
   * @param {boolean} displayed True to assert the button is displayed. False, otherwise.
   */
  assertActionButtonDisplayedForParticipant(participantId, displayed) {
    displayed
      ? cy.get(selectors.clientParticipantStatementId + participantId + ' ' + selectors.actionsButton).should('be.visible')
      : cy.get(selectors.clientParticipantStatementId + participantId + ' ' + selectors.actionsButton).should('not.exist')
  }

  /**
   * Assert if a specific button for a statement action is displayed in the table header after selecting one or more participants
   *
   * @param {string} actionButtonName Action name. It can be approve, on hold, rerun
   * @param {boolean} displayed True to assert the button is displayed. False, otherwise.
   *
   */
  assertActionButtonDisplayedInTableHeader(actionButtonName, displayed = true) {
    actionButtonName = actionButtonName.toLowerCase()

    switch (actionButtonName) {
      case 'on hold':
        displayed ? cy.get(selectors.onHoldBtn).should('be.visible') : cy.get(selectors.onHoldBtn).should('not.exist')
        break

      case 'recall':
        displayed ? cy.get(selectors.recallBtnOnTable).should('be.visible') : cy.get(selectors.recallBtnOnTable).should('not.exist')
        break

      default:
        throw new Error('Parameter actionToPerform is invalid')
    }
  }

  /**
   * Assert the button/option is available inside the Actions button for a given participant
   *
   * @param {number} participantId Participant id to verify the actions available for it.
   * @param {string} buttonName Button name to be asserted
   * @param {boolean} displayed True do assert the button is displayed in actions
   */
  assertActionButtonIsDisplayedInParticipantActions(participantId, buttonName, displayed = true) {
    buttonName = buttonName.toLowerCase()

    this.clickInTheActionsButtonOfParticipant(participantId)

    switch (buttonName) {
      case 'rerun':
        displayed ? cy.xpath(selectors.actionsRerunButton).should('be.visible') : cy.xpath(selectors.actionsRerunButton).should('not.exist')
        break

      case 'recall':
        displayed ? cy.xpath(selectors.actionsRecallButton).should('be.visible') : cy.xpath(selectors.actionsRecallButton).should('not.exist')
        break

      case 'approve':
        displayed ? cy.xpath(selectors.actionsApproveButton).should('be.visible') : cy.xpath(selectors.actionsApproveButton).should('not.exist')
        break

      case 'view pdf':
        displayed ? cy.xpath(selectors.actionsViewPdfButton).should('be.visible') : cy.xpath(selectors.actionsViewPdfButton).should('not.exist')
        break

      default:
        throw new Error('The buttonName parameter is not valid!')
    }
  }

  // -------------------------------------------------------------------------------- OTHERS ----------------------------------------------------------------------------- //

  /**
   * Filter for a participant in the participants table
   *
   * @param {string} participantName participant name to be searched into the participant statement filter. '' to skip this filter
   * @param {number} participantId participant id to be searched into the participant statement filter. -1 to skip this filter
   * @param {string} status participant status to be searched into the participant statement filter. '' to skip this filter
   * @param {string} participantExternalId participant external id to be searched into the participant statement filter. -1 to skip this filter
   *
   * The Delay is necessary for Firefox only
   */
  filterParticipantStatements(participantName = '', participantId = -1, status = '', participantExternalId = '') {
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

    if (participantExternalId != '') {
      cy.get(selectors.participantExternalId).type(participantExternalId + '{enter}', { delay: delay })
    }

    this.waitForTableToReloadAfterFiltering()
    cy.forcedWait(800) // Necessary to avoid any errors regarding the table being reloaded in the UI.
  }

  /**
   * Approve a single participant id that is On Hold
   *
   * @param {number} participantStatementId Id of the participant statement to be approved
   */
  approveSingleParticipantById(participantStatementId) {
    this.clickInTheActionsButtonOfParticipant(participantStatementId)
    cy.xpath(selectors.actionsApproveButton).click()
  }

  /**
   * Recall a single participant by its id
   *
   * @param {number} participantStatementId Id of the participant statement to be recalled
   */
  recallSingleParticipantById(participantStatementId) {
    this.clickInTheActionsButtonOfParticipant(participantStatementId)
    cy.xpath(selectors.actionsRecallButton).click()
    this.clickInTableHeaderToPerformActions('recall', 1)
    cy.get(selectorsOnL4Bar.numberOfStatements).should('have.text', 1)
    cy.get(selectorsOnL4Bar.actionButton).click()
  }

  // --------------------------------------------------------------------------------  INTERCEPTIONS ----------------------------------------------------------------------- //

  /**
   * This method waits until the table in reloaded after filtering something in filter statements.
   */
  waitForTableToReloadAfterFiltering() {
    cy.intercept('GET', apiInterceptions.tableReloadedAfterFiltering).as('tableReloads')
    cy.wait('@tableReloads', { timeout: 10000 })
  }

  /**
   * Waits for participants to be loaded in the table
   */
  waitForClientParticipantStatementsToBeLoaded() {
    cy.intercept('GET', apiInterceptions.clientParticipantStatementsLoaded).as('participantsLoaded')
    cy.wait('@participantsLoaded', { timeout: 10000 })
  }

  /**
   * Intercept the clientParticipantStatementsLoaded request located in the object apiInterceptions and mock the data with a given fixture file.
   *
   * @param {string} fixtureFile name or path for the fixture file located inside the fixtures folder
   */
  interceptAndMockParticipantStatementsLoadingRequest(fixtureFile) {
    cy.intercept('GET', apiInterceptions.clientParticipantStatementsLoaded, { fixture: fixtureFile }).as('emptyParticipantsList')
  }
}

export default ClientParticipantStatementsPage
