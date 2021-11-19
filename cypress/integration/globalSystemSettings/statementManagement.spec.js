import EquityAdmin from '../../support/pages/equityAdmin'
import Utils from '../../support/utils'

describe('Statement Management tests', () => {
  const equityAdmin = new EquityAdmin()
  const utils = new Utils()

  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('statement')
    equityAdmin.clientStatementsPage.checkPageUrl()
  })

  it('C7394715_Happy_Path_To_View_Statements_Accordingly', () => {
    const idsClientList = [77, 78, 79, 80, 81]
    const columnsToValidate = ['Id', 'Client', 'Regulator', 'Status']

    equityAdmin.clientStatementsPage.assertClientStatementsTableContainsExpectedColumns()
    equityAdmin.clientStatementsPage.assertClientStatementsTableInOrderById(idsClientList)
    equityAdmin.clientStatementsPage.assertTableContainsExpectedColumnsInOrder(columnsToValidate)
  })

  /**
   * @missing_data Need to have a clients for each possible status: INITIATED, RECONCILED, PendingValidation, PUBLISHED, and PARTIALLY PUBLISHED
   */
  it.skip('C7394241_Statements_Download_Button_Visibility_Behavior', () => {
    // INITIATED
    equityAdmin.clientStatementsPage.filterClientStatements('Velocys PLC')
    equityAdmin.clientStatementsPage.clickClientTable(103)
    equityAdmin.clientParticipantStatementsPage.assertSummaryButtonDisplayed(false)
    equityAdmin.clientParticipantStatementsPage.clickBackToManageStatements()

    // RECONCILED
    equityAdmin.clientStatementsPage.clearAllFilters()
    equityAdmin.clientStatementsPage.filterClientStatements('Mercari')
    equityAdmin.clientStatementsPage.clickClientTable(84)
    equityAdmin.clientParticipantStatementsPage.assertSummaryButtonDisplayed(false)
    equityAdmin.clientParticipantStatementsPage.clickBackToManageStatements()

    // Pending Validation
    equityAdmin.clientStatementsPage.clearAllFilters()
    equityAdmin.clientStatementsPage.filterClientStatements('Kerry Logistics')
    equityAdmin.clientStatementsPage.clickClientTable(97)
    equityAdmin.clientParticipantStatementsPage.assertSummaryButtonDisplayed()
    equityAdmin.clientParticipantStatementsPage.clickBackToManageStatements()

    // PUBLISHED
    equityAdmin.clientStatementsPage.clearAllFilters()
    equityAdmin.clientStatementsPage.filterClientStatements('Interxion')
    equityAdmin.clientStatementsPage.clickClientTable(76)
    equityAdmin.clientParticipantStatementsPage.assertSummaryButtonDisplayed()
    equityAdmin.clientParticipantStatementsPage.clickBackToManageStatements()

    // PARTIALLY PUBLISHED
    equityAdmin.clientStatementsPage.clearAllFilters()
    equityAdmin.clientStatementsPage.filterClientStatements('Cavotec')
    equityAdmin.clientStatementsPage.clickClientTable(78)
    equityAdmin.clientParticipantStatementsPage.assertSummaryButtonDisplayed()
  })

  /**
   * ! @firefox_limited because Firefox does not save the downloaded file in the default cypress download folder:
   * * It works only in the pipeline with Linux machines. You will face an issue (running this test locally.) while this issue is not resolved by the Cypress team.
   * * Issue open in https://github.com/cypress-io/cypress/issues/17896
   *
   * @missing_data Client with "Pending Validation", PUBLISHED, or PARTIALLY PUBLISHED statement
   */
  it.skip('C7394242_Download_Summary_Report_Functionality', () => {
    // Pending Validation
    const clientName = 'Interxion'
    const clientID = 76

    equityAdmin.clientStatementsPage.filterClientStatements(clientName)
    equityAdmin.clientStatementsPage.clickClientTable(clientID)
    equityAdmin.clientParticipantStatementsPage.assertSummaryButtonDisplayed()
    equityAdmin.clientParticipantStatementsPage.clickSummaryDownloadButtonToDownloadCSVFile()
    equityAdmin.clientParticipantStatementsPage.assertProgressBarDisplayed()
    equityAdmin.clientParticipantStatementsPage.assertFileWasDownloadedSuccessfully(clientName + '_Summary.csv')
  })

  /**
   * TODO: @missing steps to add filter by status and Regulator
   */
  it('C7353833_Use_Filter_To_Search_For_Client_Statements', () => {
    // name and date
    const clientName = 'TomTom'
    const dateFrom = '20190301'
    const dateTo = '20210519'
    const clientId = 77
    const idsClientList = [77, 78, 79, 80, 81]

    // Initial verification
    equityAdmin.clientStatementsPage.filterClientStatements(clientName, dateFrom, dateTo)
    equityAdmin.clientStatementsPage.assertClientDisplayedOnClientStatementsTable(clientId)
    equityAdmin.clientStatementsPage.assertAmountOfRecordsTable(1)
    equityAdmin.clientStatementsPage.clearAllFilters()
    equityAdmin.clientStatementsPage.assertClientStatementsTableInOrderById(idsClientList)

    // By Name
    equityAdmin.clientStatementsPage.filterClientStatements('TomTom')
    equityAdmin.clientStatementsPage.assertClientDisplayedOnClientStatementsTable(clientId)
    equityAdmin.clientStatementsPage.assertAmountOfRecordsTable(1)

    // By Status

    // By Reporter
  })

  /**
   * ! @chrome_only https://globalshares.atlassian.net/browse/GDP-49661
   */
  it('C7353834_Filter_To_Check_Empty_State', () => {
    const clientName = 'None'
    const yesterdayDate = utils.getDateInFutureOrPast(-1, 0, 0, 'YYYY/MM/DD').join()
    const todayDate = utils.getDateInFutureOrPast(0, 0, 0, 'YYYY/MM/DD').join()

    equityAdmin.clientStatementsPage.filterClientStatements(clientName, yesterdayDate, todayDate)
    equityAdmin.clientStatementsPage.assertNoDataMessageFoundDisplayed()
  })

  /**
   * * SkIPPING DUE TO https://globalshares.atlassian.net/browse/PB-1008
   */
  it.skip('C7394266_Filter_Behavior_of_Participant_Regulatory_Linkage', () => {
    const clientName = 'Acacia Pharma'
    const participantName = 'Serrano'
    const participantFirstName = 'Paisley'
    const participantExternalId = 'API-10001'
    const regulator = 'FINRA'
    const partner = 'Global Shares Execution Services Ltd.'

    equityAdmin.clientStatementsPage.clickTab('participant regulatory linkage')
    equityAdmin.participantRegulatoryLinkagePage.checkPageUrl()
    equityAdmin.participantRegulatoryLinkagePage.assertNoDataMessageFoundDisplayed()

    // Not working yet for first name, so lets verify this until it is fixed
    cy.log('FILTER 0')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantFirstName)
    equityAdmin.participantRegulatoryLinkagePage.assertNoDataMessageFoundDisplayed()
    equityAdmin.participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 1')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName)
    equityAdmin.participantRegulatoryLinkagePage.assertAmountOfRecordsTable(125)
    equityAdmin.participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 2')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName)
    equityAdmin.participantRegulatoryLinkagePage.assertAmountOfRecordsTable(2)
    equityAdmin.participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 3')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, participantExternalId)
    equityAdmin.participantRegulatoryLinkagePage.assertAmountOfRecordsTable(2)
    equityAdmin.participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 4')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, participantExternalId, regulator)
    equityAdmin.participantRegulatoryLinkagePage.assertAmountOfRecordsTable(1)
    equityAdmin.participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 5')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, participantExternalId, regulator, partner)
    equityAdmin.participantRegulatoryLinkagePage.assertAmountOfRecordsTable(1)
    equityAdmin.participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 6')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, '', participantExternalId, '', '')
    equityAdmin.participantRegulatoryLinkagePage.assertAmountOfRecordsTable(2)
    equityAdmin.participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 7')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, '', -1, regulator, '')
    equityAdmin.participantRegulatoryLinkagePage.assertAmountOfRecordsTable(42)
    equityAdmin.participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 8')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, '', -1, '', partner)
    equityAdmin.participantRegulatoryLinkagePage.assertAmountOfRecordsTable(97)
    equityAdmin.participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 9')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, '', -1, regulator, partner)
    equityAdmin.participantRegulatoryLinkagePage.assertAmountOfRecordsTable(42)
    equityAdmin.participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 10')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, -1, regulator, partner)
    equityAdmin.participantRegulatoryLinkagePage.assertAmountOfRecordsTable(1)
    equityAdmin.participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 11')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, participantExternalId, '', partner)
    equityAdmin.participantRegulatoryLinkagePage.assertAmountOfRecordsTable(2)
    equityAdmin.participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 12')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, participantExternalId, '', partner)
    equityAdmin.participantRegulatoryLinkagePage.assertAmountOfRecordsTable(2)
    equityAdmin.participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 13 - Empty State')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, 'emptyStateTest')
    equityAdmin.participantRegulatoryLinkagePage.assertNoDataMessageFoundDisplayed()
  })

  /**
   * TODO: @missing_steps scroll not working properly. Need to investigate why it does not work in our website
   */
  it('C7394265_View_Statements', () => {
    const clientName = 'Keywords Studios plc'
    const clientId = 87
    const columnsToValidate = ['Participant', 'Status']
    const idsParticipantsList = [1, 2]

    equityAdmin.clientStatementsPage.filterClientStatements(clientName)
    equityAdmin.clientStatementsPage.clickClientTable(clientId)
    equityAdmin.clientParticipantStatementsPage.checkPageUrl()
    equityAdmin.clientParticipantStatementsPage.assertTableContainsExpectedColumnsInOrder(columnsToValidate)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatementsTableContainsExpectedColumns()
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatementsTableInOrderById(idsParticipantsList)
  })

  it('C7395182_Select_Client_Without_Participants_To_Check_Empty_State', () => {
    const clientName = 'Mizuho International plc'
    const clientId = 211

    equityAdmin.clientStatementsPage.filterClientStatements(clientName)
    equityAdmin.clientStatementsPage.clickClientTable(clientId)
    equityAdmin.clientParticipantStatementsPage.assertNoDataMessageFoundDisplayed()
    equityAdmin.clientParticipantStatementsPage.clickBackToManageStatements()
    equityAdmin.clientStatementsPage.checkPageUrl()
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

    equityAdmin.clientStatementsPage.filterClientStatements(clientName)
    equityAdmin.clientStatementsPage.clickClientTable(clientID)
    equityAdmin.clientStatementsPage.getNumberOfRecordsDisplayed()

    // By Participant Name
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements(participantName)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    equityAdmin.clientParticipantStatementsPage.assertAmountOfRecordsTable(1)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    // By Internal Id
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantID)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    equityAdmin.clientParticipantStatementsPage.assertAmountOfRecordsTable(1)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    // By External Id
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', -1, '', participantExternalId)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    equityAdmin.clientParticipantStatementsPage.assertAmountOfRecordsTable(1)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    // By Status
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', -1, participantStatus)
    equityAdmin.clientParticipantStatementsPage.assertAmountOfRecordsTable(15)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    // By Name and Internal Id
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements(participantName, participantID)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    equityAdmin.clientParticipantStatementsPage.assertAmountOfRecordsTable(1)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    // By Name External Id
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements(participantName, -1, '', participantExternalId)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    equityAdmin.clientParticipantStatementsPage.assertAmountOfRecordsTable(1)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    // By Name and Status
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements(participantName, -1, participantStatus)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    equityAdmin.clientParticipantStatementsPage.assertAmountOfRecordsTable(1)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    // By Internal Id and External Id
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantID, '', participantExternalId)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    equityAdmin.clientParticipantStatementsPage.assertAmountOfRecordsTable(1)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    // By Internal Id and Status
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantID, participantStatus)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    equityAdmin.clientParticipantStatementsPage.assertAmountOfRecordsTable(1)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    // By External Id and Status
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', -1, participantStatus, participantExternalId)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    equityAdmin.clientParticipantStatementsPage.assertAmountOfRecordsTable(1)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    // By Name, Internal Id, Status, and External Id
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements(participantName, participantID, participantStatus, participantExternalId)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    equityAdmin.clientParticipantStatementsPage.assertAmountOfRecordsTable(1)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()
  })

  /**
   * ! @firefox_limited because Firefox does not save the downloaded file in the default cypress download folder.
   * * It works only in the pipeline with Linux machines. You will face an issue (running this test locally.) while this issue is not resolved by the Cypress team.
   * * Issue open in https://github.com/cypress-io/cypress/issues/17896
   *
   * * SKIPPED because this test will have a different behavior
   *
   */
  it.skip('C7395183_download_PDF_File_From_Participant', () => {
    const clientName = 'Interxion'
    const clientID = 76
    const participantID = 32512
    const participantName = 'Pacheco'

    equityAdmin.clientStatementsPage.filterClientStatements(clientName)
    equityAdmin.clientStatementsPage.clickClientTable(clientID)
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantID)
    equityAdmin.clientParticipantStatementsPage.clickDownloadPDFFromParticipantStatement(participantID)
    equityAdmin.clientParticipantStatementsPage.assertFileWasDownloadedSuccessfully(participantName + '_Summary.pdf')
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

    equityAdmin.clientStatementsPage.waitForClientStatementsToBeLoaded() // First make sure the clients were loaded before testing that the bulk actions are not displayed
    equityAdmin.clientStatementsPage.assertBulkOptionsDisplayed(false)

    // Client status PUBLISHED
    equityAdmin.clientStatementsPage.filterClientStatements(clientPublished)
    equityAdmin.clientStatementsPage.assertReconcileButtonDisplayedForClient(clientPublishedId, false)
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Client status PARTIALLY PUBLISHED
    equityAdmin.clientStatementsPage.filterClientStatements(clientPartiallyPublished)
    equityAdmin.clientStatementsPage.assertReconcileButtonDisplayedForClient(clientPartiallyPublishedId, false)
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Client status RECONCILED
    equityAdmin.clientStatementsPage.filterClientStatements(clientReconciled)
    equityAdmin.clientStatementsPage.assertReconcileButtonDisplayedForClient(clientReconciledId, false)
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Client status PENDING VALIDATION
    equityAdmin.clientStatementsPage.filterClientStatements(clientPendingValidation)
    equityAdmin.clientStatementsPage.assertReconcileButtonDisplayedForClient(clientPendingValidationId, false)
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Client status INITIATED
    equityAdmin.clientStatementsPage.filterClientStatements(clientInitiated)
    equityAdmin.clientStatementsPage.assertReconcileButtonDisplayedForClient(clientInitiatedId)
  })

  /**
   *
   * @missing_data Need to have one client Initiated to be able to Reconcile it
   *
   * * SKIPPING DUE TO https://globalshares.atlassian.net/browse/PB-912
   *
   */
  it.skip('C9281170_Statements_L4_Window', () => {
    const clientInitiated = 'Santen Pharmaceutical'
    const clientInitiatedId = 140
    const securityIds = [795]

    equityAdmin.clientStatementsPage.filterClientStatements(clientInitiated)
    equityAdmin.clientStatementsPage.clickToReconcileClient(clientInitiatedId)
    equityAdmin.clientStatementsPage.assertReconcileStatementRightWindowDisplaysElementsAsExpected(securityIds)
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

    equityAdmin.clientStatementsPage.filterClientStatements(clientName)
    equityAdmin.clientStatementsPage.clickClientTable(clientId)

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantIDs[0])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantIDs[0])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantIDs[0], participantStatusBefore)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantIDs[1])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantIDs[1])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantIDs[1], participantStatusBefore)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantIDs[2])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantIDs[2])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantIDs[2], participantStatusBefore)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantIDs[3])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantIDs[3])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantIDs[3], participantStatusBefore)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.clickInTableHeaderToPerformActions('on hold', participantIDs.length)

    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantIDs[0], participantStatusAfter)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantIDs[1], participantStatusAfter)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantIDs[2], participantStatusAfter)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantIDs[3], participantStatusAfter)
    equityAdmin.clientParticipantStatementsPage.assertToastNotificationMessageIsDisplayed('Success')
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

    equityAdmin.clientStatementsPage.filterClientStatements(clientName)
    equityAdmin.clientStatementsPage.clickClientTable(clientId)

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldIDs[0])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantOnHoldIDs[0])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldIDs[0], participantStatusAfter)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldIDs[1])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantOnHoldIDs[1])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldIDs[1], participantStatusAfter)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldIDs[2])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantOnHoldIDs[2])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldIDs[2], participantStatusAfter)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantPendingValidationIDs[0])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantPendingValidationIDs[0])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantPendingValidationIDs[0], participantStatusBefore)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.clickInTableHeaderToPerformActions('on hold', participantPendingValidationIDs.length)

    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldIDs[0], participantStatusAfter)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldIDs[1], participantStatusAfter)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldIDs[2], participantStatusAfter)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantPendingValidationIDs[0], participantStatusAfter)
    equityAdmin.clientParticipantStatementsPage.assertToastNotificationMessageIsDisplayed('Success')
  })

  /**
   * @missing_data Need to have one client with any status but Pending Validation nor Published.
   */
  it.skip('C9324997_Try_To_Recall_Single_Participant_Statement_Not_In_Published_Status', () => {
    const clientReconciledName = 'Veloxis Pharmaceuticals'
    const clientReconciledId = 80
    const participantOnHoldId = 251656
    const participantPendingValidationId = 251654

    equityAdmin.clientStatementsPage.filterClientStatements(clientReconciledName)
    equityAdmin.clientStatementsPage.clickClientTable(clientReconciledId)

    // Participant with On Hold status
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldId)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldId, 'On Hold')
    equityAdmin.clientParticipantStatementsPage.assertRecallButtonDisplayedForParticipant(participantOnHoldId, false)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    //Participant with Pending Validation status
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantPendingValidationId)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantPendingValidationId, 'Pending Validation')
    equityAdmin.clientParticipantStatementsPage.assertRecallButtonDisplayedForParticipant(participantPendingValidationId, false)
  })

  /**
   *
   * @missing_data Need to have one client with PARTIALLY PUBLISHED status and at least 3 participants into it with ON HOLD status and 3 with other statuses
   *
   * TODO: @missing_steps
   *
   */
  it.skip('C9324992_Publish_Participant_Statements_Not_On_Hold', () => {
    const clientPartiallyPublished = 'Veloxis'
    const clientPartiallyPublishedId = 80
    const participantOnHoldIds = [251656, 251597, 251654]
    const participantOtherStatusesIds = [251593, 251613, 251629]

    equityAdmin.clientStatementsPage.filterClientStatements(clientPartiallyPublished)
    equityAdmin.clientStatementsPage.clickClientTable(clientPartiallyPublishedId)

    // Assert approve button displayed only for specific participants
    equityAdmin.clientParticipantStatementsPage.assertApproveButtonDisplayedForParticipant(participantOnHoldIds[0])
    equityAdmin.clientParticipantStatementsPage.assertApproveButtonDisplayedForParticipant(participantOnHoldIds[1])
    equityAdmin.clientParticipantStatementsPage.assertApproveButtonDisplayedForParticipant(participantOnHoldIds[2])
    equityAdmin.clientParticipantStatementsPage.assertApproveButtonDisplayedForParticipant(participantOtherStatusesIds[0], false)
    equityAdmin.clientParticipantStatementsPage.assertApproveButtonDisplayedForParticipant(participantOtherStatusesIds[1], false)
    equityAdmin.clientParticipantStatementsPage.assertApproveButtonDisplayedForParticipant(participantOtherStatusesIds[2], false)

    // Select participants to approve
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldIds[0])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantOnHoldIds[0])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldIds[0], 'On Hold')
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldIds[1])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantOnHoldIds[1])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldIds[1], 'On Hold')
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldIds[2])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantOnHoldIds[2])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldIds[2], 'On Hold')
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()
  })

  /**
   * @missing_data We need a client with at least one participant with Pending Validation status
   */
  it.skip('C7592120_Statements_Rerun_Button_Behavior_Over_On_Hold_Status', () => {
    const clientPendingValidation = 'Keywords Studios plc'
    const clientPendingValidationId = 87
    const participantPendingValidationId = 226084

    // Pick client
    equityAdmin.clientStatementsPage.filterClientStatements(clientPendingValidation)
    equityAdmin.clientStatementsPage.clickClientTable(clientPendingValidationId)

    // Pick participant and ensure correct status
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantPendingValidationId)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantPendingValidationId, 'Pending Validation')

    // On Hold behavior
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantPendingValidationId)
    equityAdmin.clientParticipantStatementsPage.assertActionButtonDisplayedInTableHeader('on hold')
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantPendingValidationId)
    equityAdmin.clientParticipantStatementsPage.assertActionButtonDisplayedInTableHeader('on hold', false)

    // On hold participant
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantPendingValidationId)
    equityAdmin.clientParticipantStatementsPage.clickInTableHeaderToPerformActions('on hold', 1)

    // Verify rerun button
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantPendingValidationId, 'On Hold')
    equityAdmin.clientParticipantStatementsPage.assertButtonIsDisplayedInParticipantActions(participantPendingValidationId, 'rerun')
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantPendingValidationId)
    equityAdmin.clientParticipantStatementsPage.clickInTableHeaderToPerformActions('rerun', 1)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantPendingValidationId, 'Pending Validation')
  })

  /**
   * @missing_data We need a client with at least 3 participants with On Hold status
   */
  it.skip('C7592122_Statements_Rerun_Multiple_Statements', () => {
    const clientPendingValidation = 'Keywords Studios plc'
    const clientPendingValidationId = 87
    const participantOnHoldId = [226084, 226072, 2260865]

    // Pick client
    equityAdmin.clientStatementsPage.filterClientStatements(clientPendingValidation)
    equityAdmin.clientStatementsPage.clickClientTable(clientPendingValidationId)

    // Select participant 1
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldId[0])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldId[0], 'On Hold')
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantOnHoldId[0])
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    // Select participant 2
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldId[1])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldId[1], 'On Hold')
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantOnHoldId[1])
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    // Select participant 3
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldId[2])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldId[2], 'On Hold')
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantOnHoldId[2])
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    // Rerun participants
    equityAdmin.clientParticipantStatementsPage.clickInTableHeaderToPerformActions('rerun', participantOnHoldId.length)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldId[0], 'Pending Validation')
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldId[1], 'Pending Validation')
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldId[2], 'Pending Validation')
  })

  /**
   * @missing_data We need a client that has participants with all statuses, such as Initiated, Pending Validation, On Hold, Approved, Published, Recalled...
   *
   * TODO: @missing_steps This one is made only for On Hold status. Need to do it for the others statuses as well when proper new data is provided
   */
  it.skip('C7592123_Audit_Log_Initiated,_Pending_Validation,_On_Hold,_Approved,_Published,_Recalled,_and_Viewed_Statuses', () => {
    const clientPendingValidation = 'Keywords Studios plc'
    const clientPendingValidationId = 87

    // On Hold data
    const participantOnHoldId = 229042
    const participantOnHoldName = 'Ramirez'
    const participantOnHoldAsOfDate = '2020'
    const participantOnHoldCurrentStatus = 'On Hold'
    const participantOnHoldAuditTrailStatuses = [participantOnHoldCurrentStatus, ' Pending Validation', 'On Hold', 'Initiated']
    const participantOnHoldAuditTrailUsers = ['lmello@globalshares.com', 'UK_311_44b4e03f-7c57-4c65-aa53-e63604d57775', 'UK_148_812dcf25-2f02-4400-a563-6692bd440b84', 'system']
    const participantOnHoldAuditTrailTimestamps = ['17/11/2021 • 08:54:05', '09/11/2021 • 02:54:04', '07/09/2021 • 10:24:42', '11/05/2021 • 05:13:30']

    equityAdmin.clientStatementsPage.filterClientStatements(clientPendingValidation)
    equityAdmin.clientStatementsPage.clickClientTable(clientPendingValidationId)

    // On Hold
    equityAdmin.clientParticipantStatementsPage.clickOnParticipant(participantOnHoldId)
    equityAdmin.clientParticipantStatementsPage.assertRightL4BarIsDisplayed()
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatementDetailsOnL4Bar(
      participantOnHoldName,
      participantOnHoldAsOfDate,
      participantOnHoldCurrentStatus,
      participantOnHoldAuditTrailStatuses,
      participantOnHoldAuditTrailUsers,
      participantOnHoldAuditTrailTimestamps
    )
    equityAdmin.clientParticipantStatementsPage.clickOutsideToCloseL4RightBar()
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
    equityAdmin.clientStatementsPage.filterClientStatements(clientPendingValidation)
    equityAdmin.clientStatementsPage.clickClientTable(clientPendingValidationId)
    equityAdmin.clientParticipantStatementsPage.checkPageUrl()
    equityAdmin.clientParticipantStatementsPage.assertRejectButtonDisplayed()
    equityAdmin.clientParticipantStatementsPage.clickBackToManageStatements()
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Initiated
    equityAdmin.clientStatementsPage.filterClientStatements(clientInitiated)
    equityAdmin.clientStatementsPage.clickClientTable(clientInitiatedId)
    equityAdmin.clientParticipantStatementsPage.checkPageUrl()
    equityAdmin.clientParticipantStatementsPage.waitForClientParticipantStatementsToBeLoaded() // wait until the page is loaded to avoid a false positive
    equityAdmin.clientParticipantStatementsPage.assertRejectButtonDisplayed(false)
    equityAdmin.clientParticipantStatementsPage.clickBackToManageStatements()
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Reconciling
    equityAdmin.clientStatementsPage.filterClientStatements(clientReconciling)
    equityAdmin.clientStatementsPage.clickClientTable(clientReconcilingId)
    equityAdmin.clientParticipantStatementsPage.checkPageUrl()
    equityAdmin.clientParticipantStatementsPage.waitForClientParticipantStatementsToBeLoaded() // wait until the page is loaded to avoid a false positive
    equityAdmin.clientParticipantStatementsPage.assertRejectButtonDisplayed(false)
    equityAdmin.clientParticipantStatementsPage.clickBackToManageStatements()
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Partially Published
    equityAdmin.clientStatementsPage.filterClientStatements(clientPartiallyPublished)
    equityAdmin.clientStatementsPage.clickClientTable(clientPartiallyPublishedId)
    equityAdmin.clientParticipantStatementsPage.checkPageUrl()
    equityAdmin.clientParticipantStatementsPage.waitForClientParticipantStatementsToBeLoaded() // wait until the page is loaded to avoid a false positive
    equityAdmin.clientParticipantStatementsPage.assertRejectButtonDisplayed(false)
    equityAdmin.clientParticipantStatementsPage.clickBackToManageStatements()
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Published
    equityAdmin.clientStatementsPage.filterClientStatements(clientPublished)
    equityAdmin.clientStatementsPage.clickClientTable(clientPublishedId)
    equityAdmin.clientParticipantStatementsPage.checkPageUrl()
    equityAdmin.clientParticipantStatementsPage.waitForClientParticipantStatementsToBeLoaded() // wait until the page is loaded to avoid a false positive
    equityAdmin.clientParticipantStatementsPage.assertRejectButtonDisplayed(false)
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

    equityAdmin.clientStatementsPage.filterClientStatements(clientPendingValidation)
    equityAdmin.clientStatementsPage.clickClientTable(clientPendingValidationId)
    equityAdmin.clientParticipantStatementsPage.assertClientStatus(clientStatus)
    equityAdmin.clientParticipantStatementsPage.clickToRejectStatement()
    equityAdmin.clientParticipantStatementsPage.assertClientStatus(clientNewStatus)
    equityAdmin.clientParticipantStatementsPage.assertRejectButtonDisplayed(false)
  })

  /**
   * @missing_data We need clients with all statuses available, such as Initiated, Pending Validation, On Hold, Approved, Published, Recalled...
   *
   * TODO: @missing_steps Waiting for https://globalshares.atlassian.net/browse/PB-954
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
    equityAdmin.clientStatementsPage.filterClientStatements(clientPublished)
    equityAdmin.clientStatementsPage.clickClientTable(clientPublishedId)
    equityAdmin.clientParticipantStatementsPage.checkPageUrl()
    equityAdmin.clientParticipantStatementsPage.waitForClientParticipantStatementsToBeLoaded() // wait until the page is loaded to avoid a false positive
    equityAdmin.clientParticipantStatementsPage.assertRecallButtonDisplayed()
    equityAdmin.clientParticipantStatementsPage.clickToRecallStatement()
    equityAdmin.clientParticipantStatementsPage.assertClientStatus('Initiated')
    // *** Missing steps in here to validate what the recall does to the participants***
    equityAdmin.clientParticipantStatementsPage.clickBackToManageStatements()
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Partially Published
    equityAdmin.clientStatementsPage.filterClientStatements(clientPartiallyPublished)
    equityAdmin.clientStatementsPage.clickClientTable(clientPartiallyPublishedId)
    equityAdmin.clientParticipantStatementsPage.checkPageUrl()
    equityAdmin.clientParticipantStatementsPage.waitForClientParticipantStatementsToBeLoaded() // wait until the page is loaded to avoid a false positive
    equityAdmin.clientParticipantStatementsPage.assertRecallButtonDisplayed()
    equityAdmin.clientParticipantStatementsPage.clickBackToManageStatements()
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Pending Validation
    equityAdmin.clientStatementsPage.filterClientStatements(clientPendingValidation)
    equityAdmin.clientStatementsPage.clickClientTable(clientPendingValidationId)
    equityAdmin.clientParticipantStatementsPage.checkPageUrl()
    equityAdmin.clientParticipantStatementsPage.assertRecallButtonDisplayed(false)
    equityAdmin.clientParticipantStatementsPage.clickBackToManageStatements()
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Initiated
    equityAdmin.clientStatementsPage.filterClientStatements(clientInitiated)
    equityAdmin.clientStatementsPage.clickClientTable(clientInitiatedId)
    equityAdmin.clientParticipantStatementsPage.checkPageUrl()
    equityAdmin.clientParticipantStatementsPage.waitForClientParticipantStatementsToBeLoaded() // wait until the page is loaded to avoid a false positive
    equityAdmin.clientParticipantStatementsPage.assertRecallButtonDisplayed(false)
    equityAdmin.clientParticipantStatementsPage.clickBackToManageStatements()
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Reconciling
    equityAdmin.clientStatementsPage.filterClientStatements(clientReconciling)
    equityAdmin.clientStatementsPage.clickClientTable(clientReconcilingId)
    equityAdmin.clientParticipantStatementsPage.checkPageUrl()
    equityAdmin.clientParticipantStatementsPage.waitForClientParticipantStatementsToBeLoaded() // wait until the page is loaded to avoid a false positive
    equityAdmin.clientParticipantStatementsPage.assertRecallButtonDisplayed(false)
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

    equityAdmin.clientStatementsPage.filterClientStatements(clientPendingValidation)
    equityAdmin.clientStatementsPage.clickClientTable(clientPendingValidationId)

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantsPendingValidationIds[0])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantsPendingValidationIds[0])
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantsPendingValidationIds[1])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantsPendingValidationIds[1])
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantsPendingValidationIds[2])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantsPendingValidationIds[2])
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantsOtherStatusIds[0])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantsOtherStatusIds[0])
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantsOtherStatusIds[1])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantsOtherStatusIds[1])
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.clickInTableHeaderToPerformActions('on hold', 3)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantsPendingValidationIds[0], 'On Hold')
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantsPendingValidationIds[1], 'On Hold')
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantsPendingValidationIds[2], 'On Hold')
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantsOtherStatusIds[0], 'On Hold')
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantsOtherStatusIds[1], 'On Hold')
  })

  /**
   * @missing_data Client statement with status Initiated
   */
  it.skip('C7627258_Statements_Reconcile_Single_Client_Statement', () => {
    const clientInitiated = 'Legal and General'
    const clientInitiatedId = 148

    equityAdmin.clientStatementsPage.filterClientStatements(clientInitiated)
    equityAdmin.clientStatementsPage.assertClientStatus(clientInitiatedId, 'Initiated')
    equityAdmin.clientStatementsPage.assertReconcileButtonDisplayedForClient(clientInitiatedId)
    equityAdmin.clientStatementsPage.reconcileClient(clientInitiatedId, true)
    equityAdmin.clientStatementsPage.assertToastNotificationMessageIsDisplayed('Success')
    equityAdmin.clientStatementsPage.assertClientStatus(clientInitiatedId, 'Reconciling')
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
    equityAdmin.clientStatementsPage.filterClientStatements(clientReconciled)
    equityAdmin.clientStatementsPage.assertClientStatus(clientReconciledId, 'Reconciling')
    equityAdmin.clientStatementsPage.assertReconcileButtonDisplayedForClient(clientReconciledId, false)
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Pending Validation
    equityAdmin.clientStatementsPage.filterClientStatements(clientPendingValidation)
    equityAdmin.clientStatementsPage.assertClientStatus(clientPendingValidationId, 'Pending Validation')
    equityAdmin.clientStatementsPage.assertReconcileButtonDisplayedForClient(clientPendingValidationId, false)
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Partially Published
    equityAdmin.clientStatementsPage.filterClientStatements(clientPartiallyPublished)
    equityAdmin.clientStatementsPage.assertClientStatus(clientPartiallyPublishedId, 'Partially Published')
    equityAdmin.clientStatementsPage.assertReconcileButtonDisplayedForClient(clientPartiallyPublishedId, false)
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Published
    equityAdmin.clientStatementsPage.filterClientStatements(clientPublished)
    equityAdmin.clientStatementsPage.assertClientStatus(clientPublishedId, 'Published')
    equityAdmin.clientStatementsPage.assertReconcileButtonDisplayedForClient(clientPublishedId, false)
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
  const equityAdmin = new EquityAdmin()

  beforeEach(() => {
    equityAdmin.loginPage.login(Cypress.env('VIEW_ONLY_USER_2_AUTH'))
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('statement')
    equityAdmin.clientStatementsPage.checkPageUrl()
  })

  /**
   * @missing_data Need to have one user associated with a group without permissions to see any User Management settings (including users, groups, roles, and DAPs (access filters))
   */
  it.skip('C7544061_User_Does_Not_Have_View_Permissions_For_Users,_Groups,_Roles,_And_Access_Filters', () => {
    equityAdmin.applicationLeftMenuBar.openSettingsMenuBar()
    equityAdmin.settingsMenuNavBar.assertGlobalSettingsMenuOpen()
    equityAdmin.settingsMenuNavBar.assertUserManagementMenuDisplayed(false)
  })
})
