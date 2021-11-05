import ClientStatementsPage from '../../support/pages/globalSettingsPages/statementManagementPages/clientStatementsPage'
import ClientParticipantStatementsPage from '../../support/pages/globalSettingsPages/statementManagementPages/clientParticipantStatementsPage'
import ParticipantRegulatoryLinkagePage from '../../support/pages/globalSettingsPages/statementManagementPages/participantRegulatoryLinkagePage'
import Utils from '../../support/utils'
import LeftMenuNavBar from '../../support/components/leftMenuNavBar'
import SettingsMenuNavBar from '../../support/components/settingsMenuNavBar'

describe('Statement Management tests', () => {
  // Pages
  const clientStatementsPage = new ClientStatementsPage()
  const clientParticipantStatementsPage = new ClientParticipantStatementsPage()
  const participantRegulatoryLinkagePage = new ParticipantRegulatoryLinkagePage()

  // Components
  const settingsMenuNavBar = new SettingsMenuNavBar()

  // Others
  const utils = new Utils()

  beforeEach(() => {
    cy.login()
    settingsMenuNavBar.accessGlobalSettingsMenu('statement')
    clientStatementsPage.checkClientStatementsUrl()
  })

  it('C7394715_Happy_Path_To_View_Statements_Accordingly', () => {
    const idsClientList = [77, 78, 79, 80, 81]
    const columnsToValidate = ['Id', 'Client', 'Regulator', 'Status']

    clientStatementsPage.assertClientStatementsTableContainsExpectedColumns()
    clientStatementsPage.assertClientStatementsTableInOrderById(idsClientList)
    clientStatementsPage.assertTableContainsExpectedColumnsInOrder(columnsToValidate)
  })

  /**
   * @missing_data Need to have a clients for each possible status: INITIATED, RECONCILED, PendingValidation, PUBLISHED, and PARTIALLY PUBLISHED
   */
  it.skip('C7394241_Statements_Download_Button_Visibility_Behavior', () => {
    // INITIATED
    clientStatementsPage.filterClientStatements('Velocys PLC')
    clientStatementsPage.clickClientTable(103)
    clientParticipantStatementsPage.assertSummaryButtonDisplayed(false)
    clientParticipantStatementsPage.clickBackToManageStatements()

    // RECONCILED
    clientStatementsPage.clearAllFilters()
    clientStatementsPage.filterClientStatements('Mercari')
    clientStatementsPage.clickClientTable(84)
    clientParticipantStatementsPage.assertSummaryButtonDisplayed(false)
    clientParticipantStatementsPage.clickBackToManageStatements()

    // Pending Validation
    clientStatementsPage.clearAllFilters()
    clientStatementsPage.filterClientStatements('Kerry Logistics')
    clientStatementsPage.clickClientTable(97)
    clientParticipantStatementsPage.assertSummaryButtonDisplayed()
    clientParticipantStatementsPage.clickBackToManageStatements()

    // PUBLISHED
    clientStatementsPage.clearAllFilters()
    clientStatementsPage.filterClientStatements('Interxion')
    clientStatementsPage.clickClientTable(76)
    clientParticipantStatementsPage.assertSummaryButtonDisplayed()
    clientParticipantStatementsPage.clickBackToManageStatements()

    // PARTIALLY PUBLISHED
    clientStatementsPage.clearAllFilters()
    clientStatementsPage.filterClientStatements('Cavotec')
    clientStatementsPage.clickClientTable(78)
    clientParticipantStatementsPage.assertSummaryButtonDisplayed()
  })

  /**
   * @firefox_limited because Firefox does not save the downloaded file in the default cypress download folder.
   * It works only in the pipeline with Linux machines. You will face an issue (running this test locally.) while this issue is not resolved by the Cypress team.
   * Issue open in https://github.com/cypress-io/cypress/issues/17896
   *
   * @missing_data Client with "Pending Validation", PUBLISHED, or PARTIALLY PUBLISHED statement
   */
  it.skip('C7394242_Download_Summary_Report_Functionality', () => {
    // Pending Validation
    const clientName = 'Interxion'
    const clientID = 76

    clientStatementsPage.filterClientStatements(clientName)
    clientStatementsPage.clickClientTable(clientID)
    clientParticipantStatementsPage.assertSummaryButtonDisplayed()
    clientParticipantStatementsPage.clickSummaryDownloadButtonToDownloadCSVFile()
    clientParticipantStatementsPage.assertProgressBarDisplayed()
    clientParticipantStatementsPage.assertFileWasDownloadedSuccessfully(clientName + '_Summary.csv')
  })

  it('C7353833_Use_Filter_To_Search_For_Client_Statements', () => {
    // name and date
    const clientName = 'TomTom'
    const dateFrom = '20190301'
    const dateTo = '20210519'
    const clientId = 77
    const idsClientList = [77, 78, 79, 80, 81]

    clientStatementsPage.filterClientStatements(clientName, dateFrom, dateTo)
    clientStatementsPage.assertClientDisplayedOnClientStatementsTable(clientId)
    clientStatementsPage.assertAmountOfRecordsTable(1)
    clientStatementsPage.clearAllFilters()
    clientStatementsPage.assertClientStatementsTableInOrderById(idsClientList)

    // only name
    clientStatementsPage.filterClientStatements('TomTom')
    clientStatementsPage.assertClientDisplayedOnClientStatementsTable(clientId)
    clientStatementsPage.assertAmountOfRecordsTable(1)
  })

  /**
   * @chrome_only https://globalshares.atlassian.net/browse/GDP-49661
   */
  it('C7353834_Filter_To_Check_Empty_State', () => {
    const clientName = 'None'
    const yesterdayDate = utils.getDateInFutureOrPast(-1, 0, 0, 'YYYY/MM/DD').join()
    const todayDate = utils.getDateInFutureOrPast(0, 0, 0, 'YYYY/MM/DD').join()

    clientStatementsPage.filterClientStatements(clientName, yesterdayDate, todayDate)
    clientStatementsPage.assertNoDataMessageFoundDisplayed()
  })

  /**
   * SKIPPED DUE TO https://globalshares.atlassian.net/browse/PB-1008
   */
  it.skip('C7394266_Filter_Behavior_of_Participant_Regulatory_Linkage', () => {
    const clientName = 'Acacia Pharma'
    const participantName = 'Serrano'
    const participantFirstName = 'Paisley'
    const participantExternalId = 'API-10001'
    const regulator = 'FINRA'
    const partner = 'Global Shares Execution Services Ltd.'

    clientStatementsPage.clickTab('participant regulatory linkage')
    participantRegulatoryLinkagePage.checkParticipantRegulatoryLinkageManagementUrl()
    participantRegulatoryLinkagePage.assertNoDataMessageFoundDisplayed()

    // Not working yet for first name, so lets verify this until it is fixed
    cy.log('FILTER 0')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantFirstName)
    participantRegulatoryLinkagePage.assertNoDataMessageFoundDisplayed()
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
    participantRegulatoryLinkagePage.assertNoDataMessageFoundDisplayed()
  })

  /**
   * @missing_steps scroll not working properly
   *
   */
  it('C7394265_View_Statements', () => {
    const clientName = 'Hitachi'
    const clientId = 102
    const columnsToValidate = ['Participant', 'Status']
    const idsParticipantsList = [1, 2]

    clientStatementsPage.filterClientStatements(clientName)
    clientStatementsPage.clickClientTable(clientId)
    clientParticipantStatementsPage.checkClientParticipantStatementsUrl()
    clientParticipantStatementsPage.assertTableContainsExpectedColumnsInOrder(columnsToValidate)
    clientParticipantStatementsPage.assertParticipantStatementsTableContainsExpectedColumns()
    clientParticipantStatementsPage.assertParticipantStatementsTableInOrderById(idsParticipantsList)
  })

  it('C7395182_Select_Client_Without_Participants_To_Check_Empty_State', () => {
    const clientName = 'Mizuho International plc'
    const clientId = 211

    clientStatementsPage.filterClientStatements(clientName)
    clientStatementsPage.clickClientTable(clientId)
    clientParticipantStatementsPage.assertNoDataMessageFoundDisplayed()
    clientParticipantStatementsPage.clickBackToManageStatements()
    clientStatementsPage.checkClientStatementsUrl()
  })

  /**
   * @missing_data Need to have a client with some participants that meets the searches you want to do. Right now, this test is based on Interxion
   */
  it.skip('C7394707_Participant_Filter_Behavior', () => {
    const clientName = 'Interxion'
    const clientID = 76
    const participantID = 406750
    const participantName = 'Rangel'
    const participantStatus = 'Published'
    const participantExternalId = 111569

    clientStatementsPage.filterClientStatements(clientName)
    clientStatementsPage.clickClientTable(clientID)
    clientStatementsPage.getNumberOfRecordsDisplayed()

    // By Participant Name
    clientParticipantStatementsPage.filterParticipantStatements(participantName)
    clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    clientParticipantStatementsPage.assertAmountOfRecordsTable(1)
    clientParticipantStatementsPage.clearAllFilters()

    // By Internal Id
    clientParticipantStatementsPage.filterParticipantStatements('', participantID)
    clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    clientParticipantStatementsPage.assertAmountOfRecordsTable(1)
    clientParticipantStatementsPage.clearAllFilters()

    // By External Id
    clientParticipantStatementsPage.filterParticipantStatements('', -1, '', participantExternalId)
    clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    clientParticipantStatementsPage.assertAmountOfRecordsTable(1)
    clientParticipantStatementsPage.clearAllFilters()

    // By Status
    clientParticipantStatementsPage.filterParticipantStatements('', -1, participantStatus)
    clientParticipantStatementsPage.assertAmountOfRecordsTable(15)
    clientParticipantStatementsPage.clearAllFilters()

    // By Name and Internal Id
    clientParticipantStatementsPage.filterParticipantStatements(participantName, participantID)
    clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    clientParticipantStatementsPage.assertAmountOfRecordsTable(1)
    clientParticipantStatementsPage.clearAllFilters()

    // By Name External Id
    clientParticipantStatementsPage.filterParticipantStatements(participantName, -1, '', participantExternalId)
    clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    clientParticipantStatementsPage.assertAmountOfRecordsTable(1)
    clientParticipantStatementsPage.clearAllFilters()

    // By Name and Status
    clientParticipantStatementsPage.filterParticipantStatements(participantName, -1, participantStatus)
    clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    clientParticipantStatementsPage.assertAmountOfRecordsTable(1)
    clientParticipantStatementsPage.clearAllFilters()

    // By Internal Id and External Id
    clientParticipantStatementsPage.filterParticipantStatements('', participantID, '', participantExternalId)
    clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    clientParticipantStatementsPage.assertAmountOfRecordsTable(1)
    clientParticipantStatementsPage.clearAllFilters()

    // By Internal Id and Status
    clientParticipantStatementsPage.filterParticipantStatements('', participantID, participantStatus)
    clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    clientParticipantStatementsPage.assertAmountOfRecordsTable(1)
    clientParticipantStatementsPage.clearAllFilters()

    // By External Id and Status
    clientParticipantStatementsPage.filterParticipantStatements('', -1, participantStatus, participantExternalId)
    clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    clientParticipantStatementsPage.assertAmountOfRecordsTable(1)
    clientParticipantStatementsPage.clearAllFilters()

    // By Name, Internal Id, Status, and External Id
    clientParticipantStatementsPage.filterParticipantStatements(participantName, participantID, participantStatus, participantExternalId)
    clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    clientParticipantStatementsPage.assertAmountOfRecordsTable(1)
    clientParticipantStatementsPage.clearAllFilters()
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
    clientParticipantStatementsPage.filterParticipantStatements('', participantID)
    clientParticipantStatementsPage.clickDownloadPDFFromParticipantStatement(participantID)
    clientParticipantStatementsPage.assertFileWasDownloadedSuccessfully(participantName + '_Summary.pdf')
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
    clientStatementsPage.assertReconcileButtonDisplayedForClient(clientPublishedId, false)
    clientStatementsPage.clearAllFilters()

    // Client status PARTIALLY PUBLISHED
    clientStatementsPage.filterClientStatements(clientPartiallyPublished)
    clientStatementsPage.assertReconcileButtonDisplayedForClient(clientPartiallyPublishedId, false)
    clientStatementsPage.clearAllFilters()

    // Client status RECONCILED
    clientStatementsPage.filterClientStatements(clientReconciled)
    clientStatementsPage.assertReconcileButtonDisplayedForClient(clientReconciledId, false)
    clientStatementsPage.clearAllFilters()

    // Client status PENDING VALIDATION
    clientStatementsPage.filterClientStatements(clientPendingValidation)
    clientStatementsPage.assertReconcileButtonDisplayedForClient(clientPendingValidationId, false)
    clientStatementsPage.clearAllFilters()

    // Client status INITIATED
    clientStatementsPage.filterClientStatements(clientInitiated)
    clientStatementsPage.assertReconcileButtonDisplayedForClient(clientInitiatedId)
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

    clientParticipantStatementsPage.filterParticipantStatements('', participantIDs[0])
    clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantIDs[0])
    clientParticipantStatementsPage.assertParticipantStatus(participantIDs[0], participantStatusBefore)
    clientParticipantStatementsPage.clearAllFilters()

    clientParticipantStatementsPage.filterParticipantStatements('', participantIDs[1])
    clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantIDs[1])
    clientParticipantStatementsPage.assertParticipantStatus(participantIDs[1], participantStatusBefore)
    clientParticipantStatementsPage.clearAllFilters()

    clientParticipantStatementsPage.filterParticipantStatements('', participantIDs[2])
    clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantIDs[2])
    clientParticipantStatementsPage.assertParticipantStatus(participantIDs[2], participantStatusBefore)
    clientParticipantStatementsPage.clearAllFilters()

    clientParticipantStatementsPage.filterParticipantStatements('', participantIDs[3])
    clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantIDs[3])
    clientParticipantStatementsPage.assertParticipantStatus(participantIDs[3], participantStatusBefore)
    clientParticipantStatementsPage.clearAllFilters()

    clientParticipantStatementsPage.clickInTableHeaderToPerformActions('on hold', participantIDs.length)

    clientParticipantStatementsPage.assertParticipantStatus(participantIDs[0], participantStatusAfter)
    clientParticipantStatementsPage.assertParticipantStatus(participantIDs[1], participantStatusAfter)
    clientParticipantStatementsPage.assertParticipantStatus(participantIDs[2], participantStatusAfter)
    clientParticipantStatementsPage.assertParticipantStatus(participantIDs[3], participantStatusAfter)
    clientParticipantStatementsPage.assertToastNotificationMessageIsDisplayed('Success')
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

    clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldIDs[0])
    clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantOnHoldIDs[0])
    clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldIDs[0], participantStatusAfter)
    clientParticipantStatementsPage.clearAllFilters()

    clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldIDs[1])
    clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantOnHoldIDs[1])
    clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldIDs[1], participantStatusAfter)
    clientParticipantStatementsPage.clearAllFilters()

    clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldIDs[2])
    clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantOnHoldIDs[2])
    clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldIDs[2], participantStatusAfter)
    clientParticipantStatementsPage.clearAllFilters()

    clientParticipantStatementsPage.filterParticipantStatements('', participantPendingValidationIDs[0])
    clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantPendingValidationIDs[0])
    clientParticipantStatementsPage.assertParticipantStatus(participantPendingValidationIDs[0], participantStatusBefore)
    clientParticipantStatementsPage.clearAllFilters()

    clientParticipantStatementsPage.clickInTableHeaderToPerformActions('on hold', participantPendingValidationIDs.length)

    clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldIDs[0], participantStatusAfter)
    clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldIDs[1], participantStatusAfter)
    clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldIDs[2], participantStatusAfter)
    clientParticipantStatementsPage.assertParticipantStatus(participantPendingValidationIDs[0], participantStatusAfter)
    clientParticipantStatementsPage.assertToastNotificationMessageIsDisplayed('Success')
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
    clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldId)
    clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldId, 'On Hold')
    clientParticipantStatementsPage.assertRecallButtonDisplayedForParticipant(participantOnHoldId, false)
    clientParticipantStatementsPage.clearAllFilters()

    //Participant with Pending Validation status
    clientParticipantStatementsPage.filterParticipantStatements('', participantPendingValidationId)
    clientParticipantStatementsPage.assertParticipantStatus(participantPendingValidationId, 'Pending Validation')
    clientParticipantStatementsPage.assertRecallButtonDisplayedForParticipant(participantPendingValidationId, false)
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
    clientParticipantStatementsPage.assertApproveButtonDisplayedForParticipant(participantOnHoldIds[0])
    clientParticipantStatementsPage.assertApproveButtonDisplayedForParticipant(participantOnHoldIds[1])
    clientParticipantStatementsPage.assertApproveButtonDisplayedForParticipant(participantOnHoldIds[2])
    clientParticipantStatementsPage.assertApproveButtonDisplayedForParticipant(participantOtherStatusesIds[0], false)
    clientParticipantStatementsPage.assertApproveButtonDisplayedForParticipant(participantOtherStatusesIds[1], false)
    clientParticipantStatementsPage.assertApproveButtonDisplayedForParticipant(participantOtherStatusesIds[2], false)

    // Select participants to approve
    clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldIds[0])
    clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantOnHoldIds[0])
    clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldIds[0], 'On Hold')
    clientParticipantStatementsPage.clearAllFilters()

    clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldIds[1])
    clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantOnHoldIds[1])
    clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldIds[1], 'On Hold')
    clientParticipantStatementsPage.clearAllFilters()

    clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldIds[2])
    clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantOnHoldIds[2])
    clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldIds[2], 'On Hold')
    clientParticipantStatementsPage.clearAllFilters()
  })

  /**
   * @missing_data We need a client with at least one participant with Pending Validation status
   */
  it.skip('C7592120_Statements_Rerun_Button_Behavior_Over_On_Hold_Status', () => {
    const clientPendingValidation = 'Keywords Studios plc'
    const clientPendingValidationId = 87
    const participantPendingValidationId = 226084

    // Pick client
    clientStatementsPage.filterClientStatements(clientPendingValidation)
    clientStatementsPage.clickClientTable(clientPendingValidationId)

    // Pick participant and ensure correct status
    clientParticipantStatementsPage.filterParticipantStatements('', participantPendingValidationId)
    clientParticipantStatementsPage.assertParticipantStatus(participantPendingValidationId, 'Pending Validation')

    // On Hold behavior
    clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantPendingValidationId)
    clientParticipantStatementsPage.assertActionButtonDisplayedInTableHeader('on hold')
    clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantPendingValidationId)
    clientParticipantStatementsPage.assertActionButtonDisplayedInTableHeader('on hold', false)

    // On hold participant
    clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantPendingValidationId)
    clientParticipantStatementsPage.clickInTableHeaderToPerformActions('on hold', 1)

    // Verify rerun button
    clientParticipantStatementsPage.assertParticipantStatus(participantPendingValidationId, 'On Hold')
    clientParticipantStatementsPage.assertButtonIsDisplayedInParticipantActions(participantPendingValidationId, 'rerun')
    clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantPendingValidationId)
    clientParticipantStatementsPage.clickInTableHeaderToPerformActions('rerun', 1)
    clientParticipantStatementsPage.assertParticipantStatus(participantPendingValidationId, 'Pending Validation')
  })

  /**
   * @missing_data We need a client with at least 3 participants with On Hold status
   */
  it.skip('C7592122_Statements_Rerun_Multiple_Statements', () => {
    const clientPendingValidation = 'Keywords Studios plc'
    const clientPendingValidationId = 87
    const participantOnHoldId = [226084, 226072, 2260865]

    // Pick client
    clientStatementsPage.filterClientStatements(clientPendingValidation)
    clientStatementsPage.clickClientTable(clientPendingValidationId)

    // Select participant 1
    clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldId[0])
    clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldId[0], 'On Hold')
    clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantOnHoldId[0])
    clientParticipantStatementsPage.clearAllFilters()

    // Select participant 2
    clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldId[1])
    clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldId[1], 'On Hold')
    clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantOnHoldId[1])
    clientParticipantStatementsPage.clearAllFilters()

    // Select participant 3
    clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldId[2])
    clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldId[2], 'On Hold')
    clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantOnHoldId[2])
    clientParticipantStatementsPage.clearAllFilters()

    // Rerun participants
    clientParticipantStatementsPage.clickInTableHeaderToPerformActions('rerun', participantOnHoldId.length)
    clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldId[0], 'Pending Validation')
    clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldId[1], 'Pending Validation')
    clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldId[2], 'Pending Validation')
  })

  /**
   * @missing_data We need a client that has participants with all statuses, such as Initiated, Pending Validation, On Hold, Approved, Published, Recalled...
   *
   * @missing_steps This one is made only for On Hold status. Need to do it for the others statuses as well
   *
   * SKIPPING DUE TO https://globalshares.atlassian.net/browse/PB-1006
   */
  it.skip('C7592123_Audit_Log_Initiated,_Pending_Validation,_On_Hold,_Approved,_Published,_Recalled,_and_Viewed_Statuses', () => {
    const clientPendingValidation = 'Keywords Studios plc'
    const clientPendingValidationId = 87

    // On Hold data
    const participantOnHoldId = 229042
    const participantOnHoldName = 'Ramirez'
    const participantOnHoldAsOfDate = '2020'
    const participantOnHoldCurrentStatus = 'On Hold'
    const participantOnHoldAuditTrailStatuses = [participantOnHoldCurrentStatus, ' Initiated', 'Initiated']
    const participantOnHoldAuditTrailUsers = ['UK_148_812dcf25-2f02-4400-a563-6692bd440b84', 'system', 'system']
    const participantOnHoldAuditTrailTimestamps = ['07/09/2021 • 10:24:42', '11/05/2021 • 05:13:30', '11/05/2021 • 05:13:01']

    clientStatementsPage.filterClientStatements(clientPendingValidation)
    clientStatementsPage.clickClientTable(clientPendingValidationId)

    // On Hold
    clientParticipantStatementsPage.clickOnParticipant(participantOnHoldId)
    clientParticipantStatementsPage.assertRightL4BarIsDisplayed()
    clientParticipantStatementsPage.assertParticipantStatementDetailsOnL4Bar(
      participantOnHoldName,
      participantOnHoldAsOfDate,
      participantOnHoldCurrentStatus,
      participantOnHoldAuditTrailStatuses,
      participantOnHoldAuditTrailUsers,
      participantOnHoldAuditTrailTimestamps
    )
    clientParticipantStatementsPage.clickOutsideToCloseL4RightBar()
  })

  /**
   * @missing_data We clients with all the possible statuses
   *
   */
  it.skip('C7623837_Statements_Reject_Button_Displayed_Only_For_Pending_Validation_Status', () => {
    const clientPendingValidation = 'Keywords Studios plc'
    const clientPendingValidationId = 87
    const clientReconciling = 'Shelf Drilling Ltd'
    const clientReconcilingId = 83
    const clientPartiallyPublished = 'Cavotec'
    const clientPartiallyPublishedId = 78
    const clientPublished = 'Sanne Group PLC'
    const clientPublishedId = 85
    const clientInitiated = 'Skanska'
    const clientInitiatedId = 119

    // Pending Validation
    clientStatementsPage.filterClientStatements(clientPendingValidation)
    clientStatementsPage.clickClientTable(clientPendingValidationId)
    clientParticipantStatementsPage.checkClientParticipantStatementsUrl()
    clientParticipantStatementsPage.assertRejectButtonDisplayed()
    clientParticipantStatementsPage.clickBackToManageStatements()
    clientStatementsPage.clearAllFilters()

    // Initiated
    clientStatementsPage.filterClientStatements(clientInitiated)
    clientStatementsPage.clickClientTable(clientInitiatedId)
    clientParticipantStatementsPage.checkClientParticipantStatementsUrl()
    clientParticipantStatementsPage.waitForClientParticipantStatementsToBeLoaded() // wait until the page is loaded to avoid a false positive
    clientParticipantStatementsPage.assertRejectButtonDisplayed(false)
    clientParticipantStatementsPage.clickBackToManageStatements()
    clientStatementsPage.clearAllFilters()

    // Reconciling
    clientStatementsPage.filterClientStatements(clientReconciling)
    clientStatementsPage.clickClientTable(clientReconcilingId)
    clientParticipantStatementsPage.checkClientParticipantStatementsUrl()
    clientParticipantStatementsPage.waitForClientParticipantStatementsToBeLoaded() // wait until the page is loaded to avoid a false positive
    clientParticipantStatementsPage.assertRejectButtonDisplayed(false)
    clientParticipantStatementsPage.clickBackToManageStatements()
    clientStatementsPage.clearAllFilters()

    // Partially Published
    clientStatementsPage.filterClientStatements(clientPartiallyPublished)
    clientStatementsPage.clickClientTable(clientPartiallyPublishedId)
    clientParticipantStatementsPage.checkClientParticipantStatementsUrl()
    clientParticipantStatementsPage.waitForClientParticipantStatementsToBeLoaded() // wait until the page is loaded to avoid a false positive
    clientParticipantStatementsPage.assertRejectButtonDisplayed(false)
    clientParticipantStatementsPage.clickBackToManageStatements()
    clientStatementsPage.clearAllFilters()

    // Published
    clientStatementsPage.filterClientStatements(clientPublished)
    clientStatementsPage.clickClientTable(clientPublishedId)
    clientParticipantStatementsPage.checkClientParticipantStatementsUrl()
    clientParticipantStatementsPage.waitForClientParticipantStatementsToBeLoaded() // wait until the page is loaded to avoid a false positive
    clientParticipantStatementsPage.assertRejectButtonDisplayed(false)
  })

  /**
   * @missing_data A client with Pending Validation status
   *
   */
  it.skip('C7623838_Statements_Reject_Function_Behavior', () => {
    const clientPendingValidation = 'Generali Share Save Plan'
    const clientPendingValidationId = 94
    const clientStatus = 'Pending Validation'
    const clientNewStatus = 'Initiated'

    clientStatementsPage.filterClientStatements(clientPendingValidation)
    clientStatementsPage.clickClientTable(clientPendingValidationId)
    clientParticipantStatementsPage.assertClientStatus(clientStatus)
    clientParticipantStatementsPage.clickToRejectStatement()
    clientParticipantStatementsPage.assertClientStatus(clientNewStatus)
    clientParticipantStatementsPage.assertRejectButtonDisplayed(false)
  })

  /**
   * @missing_data We need clients with all statuses available, such as Initiated, Pending Validation, On Hold, Approved, Published, Recalled...
   *
   * @missing_steps Waiting for https://globalshares.atlassian.net/browse/PB-954
   */
  it.skip('C7623839_Statements_Partially_Published_Or_Published_States_Can_Be_Recalled', () => {
    const clientPublished = 'Garrett Motion'
    const clientPublishedId = 95
    const clientPartiallyPublished = 'UDG Healthcare plc'
    const clientPartiallyPublishedId = 88
    const clientPendingValidation = 'Keywords Studios plc'
    const clientPendingValidationId = 87
    const clientInitiated = 'Skanska'
    const clientInitiatedId = 119
    const clientReconciling = 'Shelf Drilling Ltd'
    const clientReconcilingId = 83

    // Published
    clientStatementsPage.filterClientStatements(clientPublished)
    clientStatementsPage.clickClientTable(clientPublishedId)
    clientParticipantStatementsPage.checkClientParticipantStatementsUrl()
    clientParticipantStatementsPage.waitForClientParticipantStatementsToBeLoaded() // wait until the page is loaded to avoid a false positive
    clientParticipantStatementsPage.assertRecallButtonDisplayed()
    clientParticipantStatementsPage.clickToRecallStatement()
    clientParticipantStatementsPage.assertClientStatus('Initiated')
    // *** Missing steps in here to validate what the recall does to the participants***
    clientParticipantStatementsPage.clickBackToManageStatements()
    clientStatementsPage.clearAllFilters()

    // Partially Published
    clientStatementsPage.filterClientStatements(clientPartiallyPublished)
    clientStatementsPage.clickClientTable(clientPartiallyPublishedId)
    clientParticipantStatementsPage.checkClientParticipantStatementsUrl()
    clientParticipantStatementsPage.waitForClientParticipantStatementsToBeLoaded() // wait until the page is loaded to avoid a false positive
    clientParticipantStatementsPage.assertRecallButtonDisplayed()
    clientParticipantStatementsPage.clickBackToManageStatements()
    clientStatementsPage.clearAllFilters()

    // Pending Validation
    clientStatementsPage.filterClientStatements(clientPendingValidation)
    clientStatementsPage.clickClientTable(clientPendingValidationId)
    clientParticipantStatementsPage.checkClientParticipantStatementsUrl()
    clientParticipantStatementsPage.assertRecallButtonDisplayed(false)
    clientParticipantStatementsPage.clickBackToManageStatements()
    clientStatementsPage.clearAllFilters()

    // Initiated
    clientStatementsPage.filterClientStatements(clientInitiated)
    clientStatementsPage.clickClientTable(clientInitiatedId)
    clientParticipantStatementsPage.checkClientParticipantStatementsUrl()
    clientParticipantStatementsPage.waitForClientParticipantStatementsToBeLoaded() // wait until the page is loaded to avoid a false positive
    clientParticipantStatementsPage.assertRecallButtonDisplayed(false)
    clientParticipantStatementsPage.clickBackToManageStatements()
    clientStatementsPage.clearAllFilters()

    // Reconciling
    clientStatementsPage.filterClientStatements(clientReconciling)
    clientStatementsPage.clickClientTable(clientReconcilingId)
    clientParticipantStatementsPage.checkClientParticipantStatementsUrl()
    clientParticipantStatementsPage.waitForClientParticipantStatementsToBeLoaded() // wait until the page is loaded to avoid a false positive
    clientParticipantStatementsPage.assertRecallButtonDisplayed(false)
  })

  /**
   * @missing_data Client statement with status Pending Validation. Also, it needs to have 3 participant statements with Pending Validation and 2 with any other status
   *
   */
  it.skip('C7627257_Statements_User_Puts_Multiple_Statements_On_Hold_For_Only_Pending_Validation_Status', () => {
    const clientPendingValidation = 'Keywords Studios plc'
    const clientPendingValidationId = 87
    const participantsPendingValidationIds = [226330, 226625, 226331]
    const participantsOtherStatusIds = [229042, 226082]

    clientStatementsPage.filterClientStatements(clientPendingValidation)
    clientStatementsPage.clickClientTable(clientPendingValidationId)

    clientParticipantStatementsPage.filterParticipantStatements('', participantsPendingValidationIds[0])
    clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantsPendingValidationIds[0])
    clientParticipantStatementsPage.clearAllFilters()

    clientParticipantStatementsPage.filterParticipantStatements('', participantsPendingValidationIds[1])
    clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantsPendingValidationIds[1])
    clientParticipantStatementsPage.clearAllFilters()

    clientParticipantStatementsPage.filterParticipantStatements('', participantsPendingValidationIds[2])
    clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantsPendingValidationIds[2])
    clientParticipantStatementsPage.clearAllFilters()

    clientParticipantStatementsPage.filterParticipantStatements('', participantsOtherStatusIds[0])
    clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantsOtherStatusIds[0])
    clientParticipantStatementsPage.clearAllFilters()

    clientParticipantStatementsPage.filterParticipantStatements('', participantsOtherStatusIds[1])
    clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantsOtherStatusIds[1])
    clientParticipantStatementsPage.clearAllFilters()

    clientParticipantStatementsPage.clickInTableHeaderToPerformActions('on hold', 3)
    clientParticipantStatementsPage.assertParticipantStatus(participantsPendingValidationIds[0], 'On Hold')
    clientParticipantStatementsPage.assertParticipantStatus(participantsPendingValidationIds[1], 'On Hold')
    clientParticipantStatementsPage.assertParticipantStatus(participantsPendingValidationIds[2], 'On Hold')
    clientParticipantStatementsPage.assertParticipantStatus(participantsOtherStatusIds[0], 'On Hold')
    clientParticipantStatementsPage.assertParticipantStatus(participantsOtherStatusIds[1], 'On Hold')
  })

  /**
   * @missing_data Client statement with status Initiated
   */
  it.skip('C7627258_Statements_Reconcile_Single_Client_Statement', () => {
    const clientInitiated = 'Legal and General'
    const clientInitiatedId = 148

    clientStatementsPage.filterClientStatements(clientInitiated)
    clientStatementsPage.assertClientStatus(clientInitiatedId, 'Initiated')
    clientStatementsPage.assertReconcileButtonDisplayedForClient(clientInitiatedId)
    clientStatementsPage.reconcileClient(clientInitiatedId, true)
    clientStatementsPage.assertToastNotificationMessageIsDisplayed('Success')
    clientStatementsPage.assertClientStatus(clientInitiatedId, 'Reconciling')
  })

  /**
   * @missing_data Clients statements with all statuses but Initiated
   */
  it.skip('C7627260_Statements_Try_To_Reconcile_Single_Client_Statement_Not_In_Initiated_Status', () => {
    const clientReconciled = 'Alfa Systems'
    const clientReconciledId = 203
    const clientPendingValidation = 'SJP Partners'
    const clientPendingValidationId = 93
    const clientPartiallyPublished = 'Lenovo'
    const clientPartiallyPublishedId = 108
    const clientPublished = 'Repsol'
    const clientPublishedId = 107

    // Reconciling
    clientStatementsPage.filterClientStatements(clientReconciled)
    clientStatementsPage.assertClientStatus(clientReconciledId, 'Reconciling')
    clientStatementsPage.assertReconcileButtonDisplayedForClient(clientReconciledId, false)
    clientStatementsPage.clearAllFilters()

    // Pending Validation
    clientStatementsPage.filterClientStatements(clientPendingValidation)
    clientStatementsPage.assertClientStatus(clientPendingValidationId, 'Pending Validation')
    clientStatementsPage.assertReconcileButtonDisplayedForClient(clientPendingValidationId, false)
    clientStatementsPage.clearAllFilters()

    // Partially Published
    clientStatementsPage.filterClientStatements(clientPartiallyPublished)
    clientStatementsPage.assertClientStatus(clientPartiallyPublishedId, 'Partially Published')
    clientStatementsPage.assertReconcileButtonDisplayedForClient(clientPartiallyPublishedId, false)
    clientStatementsPage.clearAllFilters()

    // Published
    clientStatementsPage.filterClientStatements(clientPublished)
    clientStatementsPage.assertClientStatus(clientPublishedId, 'Published')
    clientStatementsPage.assertReconcileButtonDisplayedForClient(clientPublishedId, false)
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

describe('Statement Management tests - View Only User', () => {
  // Pages
  const clientStatementsPage = new ClientStatementsPage()

  // Components
  const leftMenuNavBar = new LeftMenuNavBar()
  const settingsMenuNavBar = new SettingsMenuNavBar()

  beforeEach(() => {
    cy.login(Cypress.env('VIEW_ONLY_USER_2_AUTH'))
    settingsMenuNavBar.accessGlobalSettingsMenu('statement')
    clientStatementsPage.checkClientStatementsUrl()
  })

  /**
   * @missing_data Need to have one user associated with a group without permissions to see any User Management settings (including users, groups, roles, and DAPs (access filters))
   */
  it.skip('C7544061_User_Does_Not_Have_View_Permissions_For_Users,_Groups,_Roles,_And_Access_Filters', () => {
    leftMenuNavBar.openSettingsMenuBar()
    settingsMenuNavBar.assertGlobalSettingsMenuOpen()
    settingsMenuNavBar.assertUserManagementMenuDisplayed(false)
  })
})
