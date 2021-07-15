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
    // @ts-ignore
    cy.login() && cy.loginSuccessfulXHRWaits()
    leftMenuNavBar.accessGlobalSettingsMenu('statement')
  })

  it('C7394715_Happy_Path_To_View_Statements_Accordingly', () => {
    clientStatementsPage.AssertClientStatementsTableContainsExpectedColumns()
    clientStatementsPage.assertClientStatementsTableInOrderById()
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

  it('C7394242_Download_Functionality', { browser: '!firefox' }, () => {
    // Pending Validation
    const clientName = 'Interxion'
    const clientID = 76

    clientStatementsPage.filterClientStatements(clientName)
    clientStatementsPage.clickClientTable(clientID)
    clientStatementsPage.getSummaryButton().should('be.visible')
    clientStatementsPage.clickSummaryDownloadButtonToDownloadCSVFile()
    clientStatementsPage.assertFileWasDownloadedSuccessfully(clientName + '_Summary.csv')
  })

  it('C7353833_Use_Filter_To_Search_For_Client_Statements', () => {
    // name and date
    const clientName = 'TomTom'
    const dateFrom = '20190301'
    const dateTo = '20210519'
    const clientId = 77

    clientStatementsPage.filterClientStatements(clientName, dateFrom, dateTo)
    clientStatementsPage.getClientFromTable(clientId).should('be.visible')
    clientStatementsPage.checkAmountOfRecordsTable(1)
    clientStatementsPage.clearAllFilters()
    clientStatementsPage.assertClientStatementsTableInOrderById()

    // only name
    clientStatementsPage.filterClientStatements('TomTom')
    clientStatementsPage.getClientFromTable(clientId).should('be.visible')
    clientStatementsPage.checkAmountOfRecordsTable(1)
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

  it('C7394266_Filter_Behavior_of_Participant_Regulatory_Linkage', () => {
    const clientName = 'Acacia Pharma'
    const participantName = 'Serrano'
    const participantId = 544545
    const regulator = 'FINRA'
    const partner = 'Global Shares Execution Services Ltd.'

    clientStatementsPage.selectTabByName('Participant Regulatory Linkage')
    participantRegulatoryLinkagePage.checkParticipantRegulatoryLinkageManagementUrl()
    participantRegulatoryLinkagePage.getNoDataFoundMessage().should('be.visible')

    // Not working yet for first name, so lets verify this until it is fixed
    cy.log('Filter 0')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, 'Paisley')
    participantRegulatoryLinkagePage.getNoDataFoundMessage().should('be.visible')
    participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('Filter 1')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName)
    participantRegulatoryLinkagePage.checkAmountOfRecordsTable(125)
    participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('Filter 2')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName)
    participantRegulatoryLinkagePage.checkAmountOfRecordsTable(2)
    participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('Filter 3')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, participantId)
    participantRegulatoryLinkagePage.checkAmountOfRecordsTable(2)
    participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('Filter 4')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, participantId, regulator)
    participantRegulatoryLinkagePage.checkAmountOfRecordsTable(1)
    participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('Filter 5')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, participantId, regulator, partner)
    participantRegulatoryLinkagePage.checkAmountOfRecordsTable(1)
    participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('Filter 6')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, '', participantId, '', '')
    participantRegulatoryLinkagePage.checkAmountOfRecordsTable(2)
    participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('Filter 7')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, '', -1, regulator, '')
    participantRegulatoryLinkagePage.checkAmountOfRecordsTable(42)
    participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('Filter 8')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, '', -1, '', partner)
    participantRegulatoryLinkagePage.checkAmountOfRecordsTable(97)
    participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('Filter 9')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, '', -1, regulator, partner)
    participantRegulatoryLinkagePage.checkAmountOfRecordsTable(42)
    participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('Filter 10')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, -1, regulator, partner)
    participantRegulatoryLinkagePage.checkAmountOfRecordsTable(1)
    participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('Filter 11')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, participantId, '', partner)
    participantRegulatoryLinkagePage.checkAmountOfRecordsTable(2)
    participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('Filter 12')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, participantId, '', partner)
    participantRegulatoryLinkagePage.checkAmountOfRecordsTable(2)
    participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('Filter 13 - Empty State')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, 'emptyStateTest')
    participantRegulatoryLinkagePage.getNoDataFoundMessage().should('be.visible')
  })

  /**
   * @MISSING_DATA
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
   * @MISSING_STEPS
   */
  it('C7394265_View_Statements', () => {
    clientStatementsPage.filterClientStatements('Repsol')
    clientStatementsPage.clickClientTable(107)
    clientStatementsPage.checkUrl('/participants')
    clientStatementsPage.assertParticipantsStatementsTableContainsExpectedColumns()
  })

  it('C7395182_Select_Client_Without_Participants_To_Check_Empty_State', () => {
    clientStatementsPage.filterClientStatements('Mizuho International plc')
    clientStatementsPage.clickClientTable(141)
    clientStatementsPage.getNoDataFoundMessage().should('be.visible')
    clientStatementsPage.clickBackToManageStatements()
    clientStatementsPage.checkClientStatementsUrl()
  })

  /**
   * SPIKED DUE TO https://globalshares.atlassian.net/browse/PB-898
   */
  it.skip('C7394707_Participant_Filter_Behavior', () => {
    const clientName = 'Interxion'
    const clientID = 76
    const participantID = 406750
    const participantName = 'Rangel'
    const participantStatus = 'Published'

    clientStatementsPage.filterClientStatements(clientName)
    clientStatementsPage.clickClientTable(clientID)
    clientStatementsPage.getNumberOfRecordsDisplayed().should('be.visible')

    // By Id
    clientStatementsPage.filterParticipantStatements('', participantID)
    clientStatementsPage.getClientParticipantStatement(participantID)
    clientStatementsPage.checkAmountOfRecordsTable(1)
    clientStatementsPage.clearAllFilters()

    // By Name
    clientStatementsPage.filterParticipantStatements(participantName)
    clientStatementsPage.getClientParticipantStatement(participantID)
    clientStatementsPage.checkAmountOfRecordsTable(1)
    clientStatementsPage.clearAllFilters()

    // By Status
    clientStatementsPage.filterParticipantStatements('', -1, participantStatus)
    clientStatementsPage.checkAmountOfRecordsTable(15)
    clientStatementsPage.clearAllFilters()

    // By Id and Status
    clientStatementsPage.filterParticipantStatements('', participantID, participantStatus)
    clientStatementsPage.getClientParticipantStatement(participantID)
    clientStatementsPage.checkAmountOfRecordsTable(1)
    clientStatementsPage.clearAllFilters()

    // By Name and Id
    clientStatementsPage.filterParticipantStatements(participantName, participantID)
    clientStatementsPage.getClientParticipantStatement(participantID)
    clientStatementsPage.checkAmountOfRecordsTable(1)
    clientStatementsPage.clearAllFilters()

    // By Name and Status
    clientStatementsPage.filterParticipantStatements(participantName, -1, participantStatus)
    clientStatementsPage.getClientParticipantStatement(participantID)
    clientStatementsPage.checkAmountOfRecordsTable(1)
    clientStatementsPage.clearAllFilters()

    // By Name, Id, and Status
    clientStatementsPage.filterParticipantStatements(participantName, participantID, participantStatus)
    clientStatementsPage.getClientParticipantStatement(participantID)
    clientStatementsPage.checkAmountOfRecordsTable(1)
    clientStatementsPage.clearAllFilters()
  })

  /**
   * @chrome_only because Firefox does not allow do download pdf files without the confirmation popup
   */
  it('C7395183_download_PDF_File_From_Participant', { browser: '!firefox' }, () => {
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
