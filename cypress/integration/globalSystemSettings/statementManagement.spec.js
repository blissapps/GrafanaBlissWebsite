import ClientStatementsPage from '../../support/pages/globalSettingsPages/statementManagementPages/clientStatementsPage'
import ParticipantRegulatoryLinkagePage from '../../support/pages/globalSettingsPages/statementManagementPages/participantRegulatoryLinkagePage'
import Utils from '../../support/utils'
import LeftMenuNavBar from '../../support/components/leftMenuNavBar'

describe('Statement Management tests', () => {
  const clientStatementsPage = new ClientStatementsPage()
  const participantRegulatoryLinkagePage = new ParticipantRegulatoryLinkagePage()

  const leftMenuNavBar = new LeftMenuNavBar()
  const utils = new Utils()

  beforeEach(() => {
    cy.login() && cy.loginSuccessfulXHRWaits()
    leftMenuNavBar.accessGlobalSettingsMenu('statement')
    clientStatementsPage.checkClientStatementsUrl()
  })

  it('C7394715_Happy_Path_To_View_Statements_Accordingly', () => {
    const idsClientList = [76, 77, 78, 79, 80]

    clientStatementsPage.assertClientStatementsTableContainsExpectedColumns()
    clientStatementsPage.assertClientStatementsTableInOrderById(idsClientList)
  })

  it('C7394241_Statements_Download_Button_Visibility_Behavior', () => {
    // INITIATED
    clientStatementsPage.filterClientStatements('Velocys PLC')
    clientStatementsPage.clickClientTable(103)
    clientStatementsPage.getSummaryButton().should('not.exist')
    clientStatementsPage.clickBackToManageStatements()

    // RECONCILED
    clientStatementsPage.clearAllFilters()
    clientStatementsPage.filterClientStatements('Mercari')
    clientStatementsPage.clickClientTable(84)
    clientStatementsPage.getSummaryButton().should('not.exist')
    clientStatementsPage.clickBackToManageStatements()

    // Pending Validation
    clientStatementsPage.clearAllFilters()
    clientStatementsPage.filterClientStatements('Kerry Logistics')
    clientStatementsPage.clickClientTable(97)
    clientStatementsPage.getSummaryButton().should('be.visible')
    clientStatementsPage.clickBackToManageStatements()

    // PUBLISHED
    clientStatementsPage.clearAllFilters()
    clientStatementsPage.filterClientStatements('Interxion')
    clientStatementsPage.clickClientTable(76)
    clientStatementsPage.getSummaryButton().should('be.visible')
    clientStatementsPage.clickBackToManageStatements()

    // PARTIALLY PUBLISHED
    clientStatementsPage.clearAllFilters()
    clientStatementsPage.filterClientStatements('Cavotec')
    clientStatementsPage.clickClientTable(78)
    clientStatementsPage.getSummaryButton().should('be.visible')
  })

  /**
   * @firefox_limited because Firefox does not save the downloaded file in the default cypress download folder.
   * It works only in the pipeline with Linux machines. You will face an issue (running this test locally.) while this issue is not resolved by the Cypress team.
   *
   * Issue open in https://github.com/cypress-io/cypress/issues/17896
   */
  it('C7394242_Download_Summary_Report_Functionality', () => {
    // Pending Validation
    const clientName = 'Interxion'
    const clientID = 76

    clientStatementsPage.filterClientStatements(clientName)
    clientStatementsPage.clickClientTable(clientID)
    clientStatementsPage.getSummaryButton().should('be.visible')
    clientStatementsPage.clickSummaryDownloadButtonToDownloadCSVFile()
    clientStatementsPage.assertProgressBarDisplayed()
    clientStatementsPage.assertFileWasDownloadedSuccessfully(clientName + '_Summary.csv')
  })

  it('C7353833_Use_Filter_To_Search_For_Client_Statements', () => {
    // name and date
    const clientName = 'TomTom'
    const dateFrom = '20190301'
    const dateTo = '20210519'
    const clientId = 77
    const idsClientList = [76, 77, 78, 79, 80]

    clientStatementsPage.filterClientStatements(clientName, dateFrom, dateTo)
    clientStatementsPage.getClientFromTable(clientId).should('be.visible')
    clientStatementsPage.assertAmountOfRecordsTable(1)
    clientStatementsPage.clearAllFilters()
    clientStatementsPage.assertClientStatementsTableInOrderById(idsClientList)

    // only name
    clientStatementsPage.filterClientStatements('TomTom')
    clientStatementsPage.getClientFromTable(clientId).should('be.visible')
    clientStatementsPage.assertAmountOfRecordsTable(1)
  })

  /**
   * @chrome_only https://globalshares.atlassian.net/browse/GDP-49661
   */
  it('C7353834_Filter_To_Check_Empty_State', { browser: '!firefox' }, () => {
    const clientName = 'None'
    const yesterdayDate = utils.getDateInFutureOrPast(-1, 0, 0, 'YYYY/MM/DD').join()
    const todayDate = utils.getDateInFutureOrPast(0, 0, 0, 'YYYY/MM/DD').join()

    clientStatementsPage.filterClientStatements(clientName, yesterdayDate, todayDate)
    clientStatementsPage.getNoDataFoundMessage().should('be.visible')
  })

  /**
   * SKIPPED DUE TO https://globalshares.atlassian.net/browse/PB-806
   */
  it.skip('C7394266_Filter_Behavior_of_Participant_Regulatory_Linkage', () => {
    const clientName = 'Acacia Pharma'
    const participantName = 'Serrano'
    //const participantId = 544545
    const participantExternalId = 'API-10001'
    const regulator = 'FINRA'
    const partner = 'Global Shares Execution Services Ltd.'

    clientStatementsPage.clickTabByTitle('Participant Regulatory Linkage')
    participantRegulatoryLinkagePage.checkParticipantRegulatoryLinkageManagementUrl()
    participantRegulatoryLinkagePage.getNoDataFoundMessage().should('be.visible')

    // Not working yet for first name, so lets verify this until it is fixed
    cy.log('FILTER 0')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, 'Paisley')
    participantRegulatoryLinkagePage.getNoDataFoundMessage().should('be.visible')
    participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 1')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName)
    participantRegulatoryLinkagePage.assertAmountOfRecordsTable(125)
    participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 2')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName)
    participantRegulatoryLinkagePage.assertAmountOfRecordsTable(2)
    participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 3')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, participantExternalId)
    participantRegulatoryLinkagePage.assertAmountOfRecordsTable(2)
    participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 4')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, participantExternalId, regulator)
    participantRegulatoryLinkagePage.assertAmountOfRecordsTable(1)
    participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 5')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, participantExternalId, regulator, partner)
    participantRegulatoryLinkagePage.assertAmountOfRecordsTable(1)
    participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 6')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, '', participantExternalId, '', '')
    participantRegulatoryLinkagePage.assertAmountOfRecordsTable(2)
    participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 7')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, '', -1, regulator, '')
    participantRegulatoryLinkagePage.assertAmountOfRecordsTable(42)
    participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 8')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, '', -1, '', partner)
    participantRegulatoryLinkagePage.assertAmountOfRecordsTable(97)
    participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 9')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, '', -1, regulator, partner)
    participantRegulatoryLinkagePage.assertAmountOfRecordsTable(42)
    participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 10')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, -1, regulator, partner)
    participantRegulatoryLinkagePage.assertAmountOfRecordsTable(1)
    participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 11')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, participantExternalId, '', partner)
    participantRegulatoryLinkagePage.assertAmountOfRecordsTable(2)
    participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 12')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, participantExternalId, '', partner)
    participantRegulatoryLinkagePage.assertAmountOfRecordsTable(2)
    participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 13 - Empty State')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, 'emptyStateTest')
    participantRegulatoryLinkagePage.getNoDataFoundMessage().should('be.visible')
  })

  /**
   * @missing_data Need to have a clients for each possible state
   */
  it.skip('C7627260_Statements_Try_To_Reconcile_Single_Client_Statement_Not_In_Initiated_Status', () => {
    // INITIATED
    clientStatementsPage.filterClientStatements('Velocys PLC')
    clientStatementsPage.getReconcileButton(103).should('be.visible')

    // RECONCILED
    clientStatementsPage.clearAllFilters()
    clientStatementsPage.filterClientStatements('Mercari')
    clientStatementsPage.getReconcileButton(84).should('not.exist')

    // Pending Validation
    clientStatementsPage.clearAllFilters()
    clientStatementsPage.filterClientStatements('Kerry Logistics')
    clientStatementsPage.getReconcileButton(97).should('not.exist')

    // PUBLISHED
    clientStatementsPage.clearAllFilters()
    clientStatementsPage.filterClientStatements('Interxion')
    clientStatementsPage.getReconcileButton(76).should('not.exist')

    // PARTIALLY PUBLISHED
    clientStatementsPage.clearAllFilters()
    clientStatementsPage.filterClientStatements('Cavotec')
    clientStatementsPage.getReconcileButton(78).should('not.exist')
  })

  /**
   * @MISSING_STEPS scroll not working properly
   *
   */
  it('C7394265_View_Statements', () => {
    clientStatementsPage.filterClientStatements('Repsol')
    clientStatementsPage.clickClientTable(107)
    clientStatementsPage.checkUrl('/participants')
    clientStatementsPage.assertTableContainsExpectedColumns(['Participant', 'Status'])
  })

  it('C7395182_Select_Client_Without_Participants_To_Check_Empty_State', () => {
    clientStatementsPage.filterClientStatements('Mizuho International plc')
    clientStatementsPage.clickClientTable(141)
    clientStatementsPage.getNoDataFoundMessage().should('be.visible')
    clientStatementsPage.clickBackToManageStatements()
    clientStatementsPage.checkClientStatementsUrl()
  })

  /**
   * SPIKED DUE TO https://globalshares.atlassian.net/browse/PB-898 and https://globalshares.atlassian.net/browse/PB-806
   */
  it.skip('C7394707_Participant_Filter_Behavior', () => {
    const clientName = 'Interxion'
    const clientID = 76
    const participantID = 406750
    const participantName = 'Rangel'
    const participantStatus = 'Published'

    clientStatementsPage.filterClientStatements(clientName)
    clientStatementsPage.clickClientTable(clientID)
    clientStatementsPage.getNumberOfRecordsDisplayed()

    // By Id
    clientStatementsPage.filterParticipantStatements('', participantID)
    clientStatementsPage.assertParticipantStatementDisplayed(participantID)
    clientStatementsPage.assertAmountOfRecordsTable(1)
    clientStatementsPage.clearAllFilters()

    // By Name
    clientStatementsPage.filterParticipantStatements(participantName)
    clientStatementsPage.assertParticipantStatementDisplayed(participantID)
    clientStatementsPage.assertAmountOfRecordsTable(1)
    clientStatementsPage.clearAllFilters()

    // By Status
    clientStatementsPage.filterParticipantStatements('', -1, participantStatus)
    clientStatementsPage.assertAmountOfRecordsTable(15)
    clientStatementsPage.clearAllFilters()

    // By Id and Status
    clientStatementsPage.filterParticipantStatements('', participantID, participantStatus)
    clientStatementsPage.assertParticipantStatementDisplayed(participantID)
    clientStatementsPage.assertAmountOfRecordsTable(1)
    clientStatementsPage.clearAllFilters()

    // By Name and Id
    clientStatementsPage.filterParticipantStatements(participantName, participantID)
    clientStatementsPage.assertParticipantStatementDisplayed(participantID)
    clientStatementsPage.assertAmountOfRecordsTable(1)
    clientStatementsPage.clearAllFilters()

    // By Name and Status
    clientStatementsPage.filterParticipantStatements(participantName, -1, participantStatus)
    clientStatementsPage.assertParticipantStatementDisplayed(participantID)
    clientStatementsPage.assertAmountOfRecordsTable(1)
    clientStatementsPage.clearAllFilters()

    // By Name, Id, and Status
    clientStatementsPage.filterParticipantStatements(participantName, participantID, participantStatus)
    clientStatementsPage.assertParticipantStatementDisplayed(participantID)
    clientStatementsPage.assertAmountOfRecordsTable(1)
    clientStatementsPage.clearAllFilters()
  })

  /**
   * @firefox_limited because Firefox does not save the downloaded file in the default cypress download folder.
   * It works only in the pipeline with Linux machines. You will face an issue (running this test locally.) while this issue is not resolved by the Cypress team.
   *
   * Issue open in https://github.com/cypress-io/cypress/issues/17896
   *
   * SKIPPED because this test will have a different behavior
   *
   */
  it.skip('C7395183_download_PDF_File_From_Participant', () => {
    const clientName = 'Interxion'
    const clientID = 76
    const participantID = 32512
    const participantName = 'Pacheco'

    clientStatementsPage.filterClientStatements(clientName)
    clientStatementsPage.clickClientTable(clientID)
    clientStatementsPage.filterParticipantStatements('', participantID)
    clientStatementsPage.clickDownloadPDFFromParticipantStatement(participantID)
    clientStatementsPage.assertFileWasDownloadedSuccessfully(participantName + '_Summary.pdf')
  })

  /**
   *
   * @missing_data Need to have at least one client for each possible state {Published, Partially Publish, Reconciled, Pending Validation, and Initiated}
   *
   */
  it.skip('C9281169_Statements_Reconcile_Button', () => {
    const clientPublished = 'Interxion'
    const clientPublishedId = 76
    const clientPartiallyPublished = 'Cavotec'
    const clientPartiallyPublishedId = 78
    const clientReconciled = 'Veloxis'
    const clientReconciledId = 80
    const clientPendingValidation = 'Arcadis'
    const clientPendingValidationId = 136
    const clientInitiated = 'Dimension Data'
    const clientInitiatedId = 117

    clientStatementsPage.waitForClientStatementsToBeLoaded() // First make sure the clients were loaded before testing that the bulk actions are not displayed
    clientStatementsPage.assertBulkOptionsDisplayed(false)

    // Client status PUBLISHED
    clientStatementsPage.filterClientStatements(clientPublished)
    clientStatementsPage.assertReconcileButtonDisplayed(clientPublishedId, false)
    clientStatementsPage.clearAllFilters()

    // Client status PARTIALLY PUBLISHED
    clientStatementsPage.filterClientStatements(clientPartiallyPublished)
    clientStatementsPage.assertReconcileButtonDisplayed(clientPartiallyPublishedId, false)
    clientStatementsPage.clearAllFilters()

    // Client status RECONCILED
    clientStatementsPage.filterClientStatements(clientReconciled)
    clientStatementsPage.assertReconcileButtonDisplayed(clientReconciledId, false)
    clientStatementsPage.clearAllFilters()

    // Client status PENDING VALIDATION
    clientStatementsPage.filterClientStatements(clientPendingValidation)
    clientStatementsPage.assertReconcileButtonDisplayed(clientPendingValidationId, false)
    clientStatementsPage.clearAllFilters()

    // Client status INITIATED
    clientStatementsPage.filterClientStatements(clientInitiated)
    clientStatementsPage.assertReconcileButtonDisplayed(clientInitiatedId)
  })

  /**
   *
   * @missing_data Need to have one client Initiated to be able to Reconcile it
   *
   * SKIPPING DUE TO https://globalshares.atlassian.net/browse/PB-912
   *
   */
  it.skip('C9281170_Statements_L4_Window', () => {
    const clientInitiated = 'Santen Pharmaceutical'
    const clientInitiatedId = 140
    const securityIds = [795]

    clientStatementsPage.filterClientStatements(clientInitiated)
    clientStatementsPage.clickToReconcileClient(clientInitiatedId)
    clientStatementsPage.assertReconcileStatemenRightWindowDisplayed()
    clientStatementsPage.assertReconcileStatementRightWindowDisplaysElementsAsExpected(securityIds)
  })

  /**
   *
   * @missing_data Need to have one client with Pending Validation status. This client needs to have some participants with Pending Validation
   *
   */
  it.skip('C9309233_Statements_User_Puts_Statements_On_Hold', () => {
    const clientName = 'SJP'
    const clientId = 133
    const participantIDs = [166106, 354141, 169181, 202976]
    const participantStatusBefore = 'Pending Validation'
    const participantStatusAfter = 'On Hold'

    clientStatementsPage.filterClientStatements(clientName)
    clientStatementsPage.clickClientTable(clientId)

    clientStatementsPage.filterParticipantStatements('', participantIDs[0])
    clientStatementsPage.clickInTheCheckboxToSelectParticipant(participantIDs[0])
    clientStatementsPage.assertParticipantStatus(participantIDs[0], participantStatusBefore)
    clientStatementsPage.clearAllFilters()

    clientStatementsPage.filterParticipantStatements('', participantIDs[1])
    clientStatementsPage.clickInTheCheckboxToSelectParticipant(participantIDs[1])
    clientStatementsPage.assertParticipantStatus(participantIDs[1], participantStatusBefore)
    clientStatementsPage.clearAllFilters()

    clientStatementsPage.filterParticipantStatements('', participantIDs[2])
    clientStatementsPage.clickInTheCheckboxToSelectParticipant(participantIDs[2])
    clientStatementsPage.assertParticipantStatus(participantIDs[2], participantStatusBefore)
    clientStatementsPage.clearAllFilters()

    clientStatementsPage.filterParticipantStatements('', participantIDs[3])
    clientStatementsPage.clickInTheCheckboxToSelectParticipant(participantIDs[3])
    clientStatementsPage.assertParticipantStatus(participantIDs[3], participantStatusBefore)
    clientStatementsPage.clearAllFilters()

    clientStatementsPage.clickToOnHoldAllSelectedParticipants(participantIDs.length)

    clientStatementsPage.assertParticipantStatus(participantIDs[0], participantStatusAfter)
    clientStatementsPage.assertParticipantStatus(participantIDs[1], participantStatusAfter)
    clientStatementsPage.assertParticipantStatus(participantIDs[2], participantStatusAfter)
    clientStatementsPage.assertParticipantStatus(participantIDs[3], participantStatusAfter)
    clientStatementsPage.assertToastNotificationMessageIsDisplayed('Success')
  })

  /**
   *
   * @missing_data Need to have one client with Pending Validation status. This client needs to have some participants with Pending Validation and other with other statuses
   *
   */
  it.skip('C9309234_User_Tries_To_Move_Statements_Not_In_Pending_Validation_To_On_Hold', () => {
    const clientName = 'SJP'
    const clientId = 133
    const participantOnHoldIDs = [354141, 169181, 202976]
    const participantPendingValidationIDs = [233223]
    const participantStatusBefore = 'Pending Validation'
    const participantStatusAfter = 'On Hold'

    clientStatementsPage.filterClientStatements(clientName)
    clientStatementsPage.clickClientTable(clientId)

    clientStatementsPage.filterParticipantStatements('', participantOnHoldIDs[0])
    clientStatementsPage.clickInTheCheckboxToSelectParticipant(participantOnHoldIDs[0])
    clientStatementsPage.assertParticipantStatus(participantOnHoldIDs[0], participantStatusAfter)
    clientStatementsPage.clearAllFilters()

    clientStatementsPage.filterParticipantStatements('', participantOnHoldIDs[1])
    clientStatementsPage.clickInTheCheckboxToSelectParticipant(participantOnHoldIDs[1])
    clientStatementsPage.assertParticipantStatus(participantOnHoldIDs[1], participantStatusAfter)
    clientStatementsPage.clearAllFilters()

    clientStatementsPage.filterParticipantStatements('', participantOnHoldIDs[2])
    clientStatementsPage.clickInTheCheckboxToSelectParticipant(participantOnHoldIDs[2])
    clientStatementsPage.assertParticipantStatus(participantOnHoldIDs[2], participantStatusAfter)
    clientStatementsPage.clearAllFilters()

    clientStatementsPage.filterParticipantStatements('', participantPendingValidationIDs[0])
    clientStatementsPage.clickInTheCheckboxToSelectParticipant(participantPendingValidationIDs[0])
    clientStatementsPage.assertParticipantStatus(participantPendingValidationIDs[0], participantStatusBefore)
    clientStatementsPage.clearAllFilters()

    clientStatementsPage.clickToOnHoldAllSelectedParticipants(participantPendingValidationIDs.length)

    clientStatementsPage.assertParticipantStatus(participantOnHoldIDs[0], participantStatusAfter)
    clientStatementsPage.assertParticipantStatus(participantOnHoldIDs[1], participantStatusAfter)
    clientStatementsPage.assertParticipantStatus(participantOnHoldIDs[2], participantStatusAfter)
    clientStatementsPage.assertParticipantStatus(participantPendingValidationIDs[0], participantStatusAfter)
    clientStatementsPage.assertToastNotificationMessageIsDisplayed('Success')
  })

  /**
   * @missing_data Need to have one client with any status but Pending Validation nor Published.
   */
  it.skip('C9324997_Try_To_Recall_Single_Participant_Statement_Not_In_Published_Status', () => {
    const clientReconciledName = 'Veloxis Pharmaceuticals'
    const clientReconciledId = 80
    const participantOnHoldId = 251656
    const participantPendingValidationId = 251654

    clientStatementsPage.filterClientStatements(clientReconciledName)
    clientStatementsPage.clickClientTable(clientReconciledId)

    // Participant with On Hold status
    clientStatementsPage.filterParticipantStatements('', participantOnHoldId)
    clientStatementsPage.assertParticipantStatus(participantOnHoldId, 'On Hold')
    clientStatementsPage.assertRecallButtonDisplayedForParticipant(participantOnHoldId, false)
    clientStatementsPage.clearAllFilters()

    //Participant with Pending Validation status
    clientStatementsPage.filterParticipantStatements('', participantPendingValidationId)
    clientStatementsPage.assertParticipantStatus(participantPendingValidationId, 'Pending Validation')
    clientStatementsPage.assertRecallButtonDisplayedForParticipant(participantPendingValidationId, false)
  })

  /**
   *
   * @missing_data Need to have one client with PARTIALLY PUBLISHED status and at least 3 participants into it with ON HOLD status and 3 with other statuses
   *
   * @missing_steps
   *
   */
  it.skip('C9324992_Publish_Participant_Statements_Not_On_Hold', () => {
    const clientPartiallyPublished = 'Veloxis'
    const clientPartiallyPublishedId = 80
    const participantOnHoldIds = [251656, 251597, 251654]
    const participantOtherStatusesIds = [251593, 251613, 251629]

    clientStatementsPage.filterClientStatements(clientPartiallyPublished)
    clientStatementsPage.clickClientTable(clientPartiallyPublishedId)

    // Assert approve button displayed only for specific participants
    clientStatementsPage.assertApproveButtonDisplayedForParticipant(participantOnHoldIds[0])
    clientStatementsPage.assertApproveButtonDisplayedForParticipant(participantOnHoldIds[1])
    clientStatementsPage.assertApproveButtonDisplayedForParticipant(participantOnHoldIds[2])
    clientStatementsPage.assertApproveButtonDisplayedForParticipant(participantOtherStatusesIds[0], false)
    clientStatementsPage.assertApproveButtonDisplayedForParticipant(participantOtherStatusesIds[1], false)
    clientStatementsPage.assertApproveButtonDisplayedForParticipant(participantOtherStatusesIds[2], false)

    // Select participants to approve
    clientStatementsPage.filterParticipantStatements('', participantOnHoldIds[0])
    clientStatementsPage.clickInTheCheckboxToSelectParticipant(participantOnHoldIds[0])
    clientStatementsPage.assertParticipantStatus(participantOnHoldIds[0], 'On Hold')
    clientStatementsPage.clearAllFilters()

    clientStatementsPage.filterParticipantStatements('', participantOnHoldIds[1])
    clientStatementsPage.clickInTheCheckboxToSelectParticipant(participantOnHoldIds[1])
    clientStatementsPage.assertParticipantStatus(participantOnHoldIds[1], 'On Hold')
    clientStatementsPage.clearAllFilters()

    clientStatementsPage.filterParticipantStatements('', participantOnHoldIds[2])
    clientStatementsPage.clickInTheCheckboxToSelectParticipant(participantOnHoldIds[2])
    clientStatementsPage.assertParticipantStatus(participantOnHoldIds[2], 'On Hold')
    clientStatementsPage.clearAllFilters()
  })

  /**
   * Filter a client with participants and Check search with participant name, id and status with a variety of combination, such as
   * nameXid, name vs date, id vs date, name vs id vs date.. (USE TomTom)
   *
   * missing @IDS
   */

  /**
   * Reconcile a client - cancel the reconciliation
   */

  /**
   * Reconcile a client - Successfully
   */
})
