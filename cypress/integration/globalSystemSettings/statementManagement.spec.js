import ClientStatementsPage from '../../support/pages/globalSettingsPages/statementManagementPages/clientStatementsPage'
import ParticipantRegulatoryLinkagePage from '../../support/pages/globalSettingsPages/statementManagementPages/participantRegulatoryLinkagePage'
import Utils from '../../support/utils'

import LeftMenuBar from '../../support/components/leftMenuBar'

describe('Statement Management tests', () => {
  const clientStatementsPage = new ClientStatementsPage()
  const participantRegulatoryLinkagePage = new ParticipantRegulatoryLinkagePage()

  const leftMenuBar = new LeftMenuBar()
  const utils = new Utils()

  beforeEach(() => {
    // @ts-ignore
    cy.login() && cy.loginSuccessfulXHRWaits()
    leftMenuBar.accessGlobalSettingsMenu('Statement Management')
  })

  /**
   * Test a client search with client name and dates
   */
  it('C1234567_Check_Client_Search_With_Name_And_Dates', () => {
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
  it('C1234567_Filter_Without_Results_Check_Message', { browser: '!firefox' }, () => {
    const clientName = 'None'
    const yesterdayDate = utils.getDateInFutureOrPast(-1, 0, 0, 'YYYY/MM/DD').join()
    const todayDate = utils.getDateInFutureOrPast(0, 0, 0, 'YYYY/MM/DD').join()

    clientStatementsPage.filterClientStatements(clientName, yesterdayDate, todayDate)
    clientStatementsPage.getNoDataFoundMessage().should('be.visible')
  })

  /**
   * Select a client without participants, and verify if a message is displayed> Then. go back to statement management initial page
   */
  it('C1234567_select_Client_Without_Participants', () => {
    clientStatementsPage.filterClientStatements('Cavotec')
    clientStatementsPage.clickClientTable(78)
    clientStatementsPage.getNoDataFoundMessage().should('be.visible')
    clientStatementsPage.clickBackToManageStatements()
    clientStatementsPage.checkClientStatementsUrl()
  })

  /**
   * Filter a client with participants and Check search with participant name, id and status with a variety of combination, such as
   * nameXid, name vs date, id vs date, name vs id vs date.. (USE TomTom)
   *
   * missing @IDS
   */

  /**
   * Select a client from the list with the status INITIATED , and verify that the summary button is not available.
   * And, select a client from the list with the status RECONCILED , and verify that the summary button is not available
   */
  it('C1234567_select_Client_With_Status_That_Does_Not_Have_Any_Download_Report', () => {
    clientStatementsPage.filterClientStatements('Cavotec')
    clientStatementsPage.clickClientTable(78)
    clientStatementsPage.getSummaryButton().should('not.exist')
    clientStatementsPage.clickBackToManageStatements()

    clientStatementsPage.clearAllFilters()
    clientStatementsPage.filterClientStatements('Amadeus')
    clientStatementsPage.clickClientTable(81)
    clientStatementsPage.getSummaryButton().should('not.exist')
  })

  /**
   * Select a client from the list with status PUBLISHED, and click to get the summary and check if a csv file was downloaded with name clientName_Summary.csv
   */
  it('C1234567_Download_Summary_File_For_Client_With_Status_Published', { browser: '!firefox' }, () => {
    const clientName = 'Interxion'
    const clientID = 76

    clientStatementsPage.filterClientStatements(clientName)
    clientStatementsPage.clickClientTable(clientID)
    clientStatementsPage.getSummaryButton().should('be.visible')
    clientStatementsPage.clickSummaryDownloadButtonToDownloadCSVFile()
    clientStatementsPage.AssertFileWasDownloadedSuccessfully(clientName + '_Summary.csv')
  })

  /**
   * Select a client from the list with status PARTIALLY PUBLISHED, and click to get the summary and check if a csv file was downloaded with name clientName_Summary.csv
   */
  it('C1234567_Download_Summary_File_For_Client_With_Status_Partially_Published', { browser: '!firefox' }, () => {
    const clientName = 'Kin and Carta PLC'
    const clientID = 79

    clientStatementsPage.filterClientStatements(clientName)
    clientStatementsPage.clickClientTable(clientID)
    clientStatementsPage.getSummaryButton().should('be.visible')
    clientStatementsPage.clickSummaryDownloadButtonToDownloadCSVFile()
    clientStatementsPage.AssertFileWasDownloadedSuccessfully(clientName.split(' ').join('_') + '_Summary.csv')
  })

  /**
   * Select a client from the list after a search or not with participants published (ex Interxion), and click on a participant from the list with status published, and click to view pdf, and check if a pdf file was downloaded with name participant_Summary.pdf
   *
   * @Only_Chrome because Firefox does not allow do download pdf files without the confirmation popup
   */
  it('C1234567_download_PDF_File_From_Participant', { browser: '!firefox' }, () => {
    const clientID = 76
    const participantID = 32512
    const participantName = 'Pacheco'

    clientStatementsPage.clickClientTable(clientID)
    clientStatementsPage.clickDownloadPDFFromParticipantStatement(participantID)
    clientStatementsPage.AssertFileWasDownloadedSuccessfully(participantName + '_Summary.pdf')
  })

  /**
   * In participants tab, check the behavior of the filter by doing all combinations (Participant name only working for last name)
   */
  it.only('C1234567_TEST', () => {
    const clientName = 'Acacia Pharma'
    const participantName = 'Serrano'
    const participantId = '544545'
    const regulator = 'FINRA'
    const partner = 'Global Shares Execution Services Ltd.'

    clientStatementsPage.selectTabByName('Participant Regulatory Linkage')
    participantRegulatoryLinkagePage.checkParticipantRegulatoryLinkageManagementUrl()

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
  })
})
