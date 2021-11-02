import BaseStatementManagementPage from './baseStatementsManagementPage'

const properties = {
  pageURL: /.?statement\/*client\/*.*[0-9]\/*statement.*[0-9]\/*participants/
}

const selectors = {
  summaryDownloadButton: '#downloadSummary',
  backToManageStatementsButton: '#backLink',
  clientParticipantStatementId: '#clientParticipantStatement-',
  rejectButton: '#reject',
  participantStatementIdsInTable: '*[id*=clientParticipantStatement-] gs-grid-extension-checkable-row-number-cell span',
  recallBtn: '#gridActionRecall',
  approveBtn: '#gridActionApprove',
  onHoldBtn: '#gridActionHold',
  actionsButton: '.action gs-button',
  rerunBtn: '#gridActionRerun',
  actionsRerunButton: 'gs-action-panel-option span',
  clientStatusBadge: '*.title-header-info gs-badge',
  participantName: '#pptNameFilter input',
  participantId: '#pptIdFilter input',
  participantStatus: '#statusSelect input',
  participantExternalId: '#pptExternalIdFilter input'
}

const onHoldStatementsSelectorsOnL4Bar = {
  numberOfStatements: 'gs-container-l4 h2',
  actionButton: 'gs-container-l4 #actionBtn'
}

const tableColumnIds = {
  tableNumberColumn: '#rowNumberColumn',
  tableParticipantColumn: '#participantColumn',
  tableStatusColumn: '#statusColumn'
}

const statementsDetailsSelectorsOnL4Bar = {
  nameOfParticipantHeader: 'gs-container-l4 div.statement-header',
  participantAvatar: 'gs-container-l4 div > gs-avatar',
  asOfDate: 'gs-container-l4 div.statement-info:nth-child(2)',
  currentStatus: 'gs-container-l4 div.statement-info:nth-child(3) > gs-badge',
  statementAuditTrailContainer: 'gs-container-l4 ul.audit-trail',
  statementAuditTrailElementsHistory: 'gs-container-l4 ul.audit-trail li',
  statementAuditTrailStatusBadge: 'gs-container-l4 ul.audit-trail li gs-badge',
  statementAuditTrailUser: 'gs-container-l4 ul.audit-trail li *.audit-entry-user',
  statementAuditTrailTimestamp: 'gs-container-l4 ul.audit-trail li *.audit-entry-date'
}

const apiInterceptions = {
  tableReloadedAfterFiltering: 'https://api.stonly.com/api/v2/widget/integration**',
  clientParticipantStatementsLoaded: 'https://api-regrep.myglobalshares.co.uk/api/v1.0/Clients/**/ParticipantStatements?clientStatementId**'
}

class ClientParticipantStatementsPage extends BaseStatementManagementPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkClientParticipantStatementsUrl() {
    this.checkUrlByRegex(properties.pageURL)
  }

  // ------------------------------------------------------------------------------------------------ CLICKS --------------------------------------------------------------------------------------- //

  /**
   * Click in the summary button to download a csv file for a client
   *
   */
  clickSummaryDownloadButtonToDownloadCSVFile() {
    this.getNumberOfRecordsDisplayed() //make sure we have data, so we can continue to download. Otherwise, summary button may fail
    cy.get(selectors.summaryDownloadButton)
      .should('be.visible')
      .as('summaryBtn')
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
   * Click to download a PDF file of a specific participant
   *
   * @param {Number} participantId clientId number to be searched in the client statements table
   *
   */
  clickDownloadPDFFromParticipantStatement(participantId) {
    cy.get(selectors.clientParticipantStatementId + participantId + ' gs-svg-icon').as('participantRowSelected')
    cy.get('@participantRowSelected').click()
  }

  /**
   * Click on a participant
   *
   * @param {Number} participantId Id of the participant that is going to be clicked in the participants table
   */
  clickOnParticipant(participantId) {
    cy.get(selectors.clientParticipantStatementId + participantId).click()
  }

  /**
   * When bulk actions are available, click in the checkbox of a specific participant
   *
   * @param {Number} participantId Id of the participant that is going to be selected by the checkbox
   */
  clickOnTheCheckboxToSelectParticipant(participantId) {
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
   * Click in the Reject button to reject a statement
   */
  clickToRejectStatement() {
    cy.get(selectors.rejectButton).click()
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

    cy.get(onHoldStatementsSelectorsOnL4Bar.numberOfStatements).should('have.text', numberOfParticipantsAffected)
    cy.get(onHoldStatementsSelectorsOnL4Bar.actionButton).click()
  }

  // ------------------------------------------------------------------------------------------ ASSERTIONS -------------------------------------------------------------------------------- //

  /**
   * Assert the table from participant statements shows all expected data in the columns, which are role number column, Participant, and Status
   */
  assertParticipantStatementsTableContainsExpectedColumns() {
    cy.get(tableColumnIds.tableNumberColumn).should('be.visible')
    cy.get(tableColumnIds.tableParticipantColumn).should('be.visible')
    cy.get(tableColumnIds.tableStatusColumn).should('be.visible')
  }

  /**
   * This method will assert that the Participant Statements list is being displayed in order, which is by ID
   *
   * @param {Array} idsList Ordered list of ids to validate
   */
  assertParticipantStatementsTableInOrderById(idsList) {
    for (let i = 0; i < idsList.length; i++) {
      cy.get(selectors.participantStatementIdsInTable)
        .eq(i)
        .should('contain.text', idsList[i])
    }
  }

  /**
   * Assert the participant is displayed or not in the participants table
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
   * Assert the participant status in the participants table
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
   * Assert the summary button is correctly displayed
   *
   * @param {Boolean} displayed True to assert the summary button is displayed. False, otherwise.
   *
   */
  assertSummaryButtonDisplayed(displayed = true) {
    displayed ? cy.get(selectors.summaryDownloadButton).should('be.visible') : cy.get(selectors.summaryDownloadButton).should('not.exist')
  }

  /**
   * Assert the Reject button is displayed. Tip: so far it is only available for Pending Validation status
   *
   * @param {Boolean} displayed True to validate the Reject button is displayed. False otherwise.
   */
  assertRejectButtonDisplayed(displayed = true) {
    displayed ? cy.get(selectors.rejectButton).should('be.visible') : cy.get(selectors.rejectButton).should('not.exist')
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

  /**
   * Assert the details in the Statement Detail L4 bar right after selecting a participant on the participant table
   *
   * @param {String} participantName Name of the participant
   * @param {String} participantAsOfDate Participant as of date
   * @param {String} participantCurrentStatus Participant current status displayed in the Badge. Attention: It is not in uppercase, so take a look in the HTML
   * @param {Array} statusNameTrailList List of status to be verified in order decrescent
   * @param {Array} nameUserTrailList List of names to be verified in order decrescent
   * @param {Array} timestampTrailList List of timestamps to be verified in order decrescent
   *
   * @examples
   * assertParticipantStatementDetailsOnL4Bar('', '', '', [' Initiated', 'Initiated'], ['system', 'system'], ['07/09/2021 • 10:24:42', '11/05/2021 • 05:13:30'])
   *
   */
  assertParticipantStatementDetailsOnL4Bar(
    participantName = '',
    participantAsOfDate = '',
    participantCurrentStatus = '',
    statusNameTrailList = [],
    nameUserTrailList = [],
    timestampTrailList = []
  ) {
    if (participantName != '') {
      cy.get(statementsDetailsSelectorsOnL4Bar.nameOfParticipantHeader).should('contain.text', participantName)
    }

    if (participantAsOfDate != '') {
      cy.get(statementsDetailsSelectorsOnL4Bar.asOfDate).should('contain.text', participantAsOfDate)
    }

    if (participantCurrentStatus != '') {
      cy.get(statementsDetailsSelectorsOnL4Bar.currentStatus).should('contain.text', participantCurrentStatus)
    }

    if (statusNameTrailList.length != 0) {
      for (let i = 0; i < statusNameTrailList.length; i++) {
        cy.get(statementsDetailsSelectorsOnL4Bar.statementAuditTrailStatusBadge)
          .eq(i)
          .should('contain.text', statusNameTrailList[i])
      }
    }

    if (nameUserTrailList.length != 0) {
      for (let i = 0; i < nameUserTrailList.length; i++) {
        cy.get(statementsDetailsSelectorsOnL4Bar.statementAuditTrailUser)
          .eq(i)
          .should('contain.text', nameUserTrailList[i])
      }
    }

    if (timestampTrailList.length != 0) {
      for (let i = 0; i < timestampTrailList.length; i++) {
        cy.get(statementsDetailsSelectorsOnL4Bar.statementAuditTrailTimestamp)
          .eq(i)
          .should('contain.text', timestampTrailList[i])
      }
    }
  }

  /**
   * Assert the client status badge displayed in the top
   *
   * @param {String} statusName The name of the status
   *
   */
  assertClientStatus(statusName) {
    cy.get(selectors.clientStatusBadge).should('contain.text', statusName)
  }

  // -------------------------------------------------------------------------------------------- OTHERS ------------------------------------------------------------------------------------------- //

  /**
   * Filter for a participant in the participants table
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

  // -----------------------------------------------------------------------------------------  INTERCEPTIONS ------------------------------------------------------------------------------ //

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
  waitForClientParticipantStatementsToBeLoaded() {
    cy.intercept('GET', apiInterceptions.clientParticipantStatementsLoaded).as('participantsLoaded')
    cy.wait('@participantsLoaded', { timeout: 10000 })
  }
}

export default ClientParticipantStatementsPage
