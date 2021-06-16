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

  /**
   * Test a client search with client name and dates
   * @MISSING_STEPS
   */
  it('C7353833_Use_Filter_To_Search_For_Client_Statements', () => {
    // name and date
    clientStatementsPage.filterClientStatements('TomTom', '20190301', '20210519')
    clientStatementsPage.checkAmountOfRecordsTable(1)
    clientStatementsPage.clearAllFilters()

    // only name
    clientStatementsPage.filterClientStatements('TomTom')
    clientStatementsPage.checkAmountOfRecordsTable(1)
  })

  /**
   * Filter for a combination of data that does not bring any results to test if a error message is displayed
   *
   * @Only_Chrome https://globalshares.atlassian.net/browse/GDP-49661
   *
   */
  it('C7353834_Filter_Without_Results_Check_Message', { browser: '!firefox' }, () => {
    const clientName = 'None'
    const yesterdayDate = utils.getDateInFutureOrPast(-1, 0, 0, 'YYYY/MM/DD').join()
    const todayDate = utils.getDateInFutureOrPast(0, 0, 0, 'YYYY/MM/DD').join()

    clientStatementsPage.filterClientStatements(clientName, yesterdayDate, todayDate)
    clientStatementsPage.getNoDataFoundMessage().should('be.visible')
  })

  /**
   * Select a client without participants, and verify if a message is displayed. Then, go back to statement management initial page
   */
  it('C7395182_Select_Client_Without_Participants_To_Check_Empty_State', () => {
    clientStatementsPage.filterClientStatements('Mizuho International plc')
    clientStatementsPage.clickClientTable(141)
    clientStatementsPage.getNoDataFoundMessage().should('be.visible')
    clientStatementsPage.clickBackToManageStatements()
    clientStatementsPage.checkClientStatementsUrl()
  })

  /**
   * Select a client to view statements
   * @MISSING_STEPS
   */
  it('C7394265_View_Statements', () => {
    clientStatementsPage.filterClientStatements('Repsol')
    clientStatementsPage.clickClientTable(107)
  })

  /**
   * Filter a client with participants and Check search with participant name, id and status with a variety of combination, such as
   * nameXid, name vs date, id vs date, name vs id vs date.. (USE TomTom)
   *
   * missing @IDS
   */

  /**
   * Ensure that the statement download button is displayed only when the statement status is "Pending Validation",  "PUBLISHED", or "PARTIALLY PUBLISHED"
   */
  it('C7394241_Statements_Download_Button_Visibility_Behavior', () => {
    // INITIATED
    clientStatementsPage.filterClientStatements('Acacia Pharma')
    clientStatementsPage.clickClientTable(96)
    clientStatementsPage.getSummaryButton().should('not.exist')
    clientStatementsPage.clickBackToManageStatements()

    // RECONCILED
    clientStatementsPage.clearAllFilters()
    clientStatementsPage.filterClientStatements('Mercari')
    clientStatementsPage.clickClientTable(84)
    clientStatementsPage.getSummaryButton().should('not.exist')

    // Pending Validation
    clientStatementsPage.filterClientStatements('Amadeus')
    clientStatementsPage.clickClientTable(81)
    clientStatementsPage.getSummaryButton().should('be.visible')
    clientStatementsPage.clickBackToManageStatements()

    // PUBLISHED
    clientStatementsPage.filterClientStatements('Interxion')
    clientStatementsPage.clickClientTable(76)
    clientStatementsPage.getSummaryButton().should('be.visible')
    clientStatementsPage.clickBackToManageStatements()

    // PARTIALLY PUBLISHED
    clientStatementsPage.filterClientStatements('Cavotec')
    clientStatementsPage.clickClientTable(78)
    clientStatementsPage.getSummaryButton().should('be.visible')
    clientStatementsPage.clickBackToManageStatements()
  })

  /**
   * Select a client from the list with status PUBLISHED, Pending Validation, or PARTIALLY PUBLISHED,
   * and click to get the summary and check if a csv file was downloaded with name clientName_Summary.csv
   */
  it('C7394242_Download_Functionality', { browser: '!firefox' }, () => {
    // Pending Validation
    const clientName = 'Interxion'
    const clientID = 76

    clientStatementsPage.filterClientStatements(clientName)
    clientStatementsPage.clickClientTable(clientID)
    clientStatementsPage.getSummaryButton().should('be.visible')
    clientStatementsPage.clickSummaryDownloadButtonToDownloadCSVFile()
    clientStatementsPage.AssertFileWasDownloadedSuccessfully(clientName + '_Summary.csv')
  })

  /**
   * Select a client from the list after a search or not with participants published (ex Interxion), and click on a participant from the list with status published, and click to view pdf, and check if a pdf file was downloaded with name participant_Summary.pdf
   *
   * @Only_Chrome because Firefox does not allow do download pdf files without the confirmation popup
   */
  it('C7395183_download_PDF_File_From_Participant', { browser: '!firefox' }, () => {
    const clientID = 76
    const participantID = 32512
    const participantName = 'Pacheco'

    clientStatementsPage.clickClientTable(clientID)
    clientStatementsPage.clickDownloadPDFFromParticipantStatement(participantID)
    clientStatementsPage.AssertFileWasDownloadedSuccessfully(participantName + '_Summary.pdf')
  })

  /**
   * Reconcile a client - cancel the reconciliation
   */

  /**
   * Reconcile a client - Successfully
   */

  /**
   * In participants tab, check the behavior of the filter by doing all combinations (Participant name only working for last name)
   */
  it('C7394266_Filter_Behavior_of_Participant_Regulatory_Linkage', () => {
    const clientName = 'Acacia Pharma'
    const participantName = 'Serrano'
    const participantId = '544545'
    const regulator = 'FINRA'
    const partner = 'Global Shares Execution Services Ltd.'

    clientStatementsPage.selectTabByName('Participant Regulatory Linkage')
    participantRegulatoryLinkagePage.checkParticipantRegulatoryLinkageManagementUrl()
    participantRegulatoryLinkagePage.getNoDataFoundMessage().should('be.visible')

    // Not working yet for first name, so lets verify this until it is fixed
    cy.log('Filter 0')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, 'Paisley')
    participantRegulatoryLinkagePage.getNoDataFoundMessage().should('be.visible')

    cy.log('Filter 1')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName)
    participantRegulatoryLinkagePage.checkAmountOfRecordsTable(125)

    cy.log('Filter 2')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName)
    participantRegulatoryLinkagePage.checkAmountOfRecordsTable(2)

    cy.log('Filter 3')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, participantId)
    participantRegulatoryLinkagePage.checkAmountOfRecordsTable(2)

    cy.log('Filter 4')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, participantId, regulator)
    participantRegulatoryLinkagePage.checkAmountOfRecordsTable(1)

    cy.log('Filter 5')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, participantId, regulator, partner)
    participantRegulatoryLinkagePage.checkAmountOfRecordsTable(1)

    cy.log('Filter 6')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, '', participantId, '', '')
    participantRegulatoryLinkagePage.checkAmountOfRecordsTable(2)

    cy.log('Filter 7')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, '', '', regulator, '')
    participantRegulatoryLinkagePage.checkAmountOfRecordsTable(42)

    cy.log('Filter 8')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, '', '', '', partner)
    participantRegulatoryLinkagePage.checkAmountOfRecordsTable(97)

    cy.log('Filter 9')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, '', '', regulator, partner)
    participantRegulatoryLinkagePage.checkAmountOfRecordsTable(42)

    cy.log('Filter 10')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, '', regulator, partner)
    participantRegulatoryLinkagePage.checkAmountOfRecordsTable(1)

    cy.log('Filter 11')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, participantId, '', partner)
    participantRegulatoryLinkagePage.checkAmountOfRecordsTable(2)

    cy.log('Filter 12')
    participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, participantId, '', partner)
    participantRegulatoryLinkagePage.checkAmountOfRecordsTable(2)
  })
})
