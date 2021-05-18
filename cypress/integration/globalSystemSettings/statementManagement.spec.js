import ClientStatementsPage from '../../support/pages/globalSettingsPages/statementManagementPages/clientStatementsPage'
import Utils from '../../support/utils'

import LeftMenuBar from '../../support/components/leftMenuBar'

describe('User Management tests over User Management settings', () => {
  const statementManagementPage = new ClientStatementsPage()

  const leftMenuBar = new LeftMenuBar()
  const utils = new Utils()

  beforeEach(() => {
    // @ts-ignore
    cy.login()
    leftMenuBar.accessGlobalSettingsMenu('Statement Management')
  })

  /**
   * Test a client search with client name and dates
   */
  it('C1234567_Check_Client_Search_With_Name_And_Dates', () => {
    // name and date
    statementManagementPage.filterStatementsInClientStatements('TomTom', '20190301', '20210519')
    statementManagementPage.checkAmountOfPeopleTable(1)
    statementManagementPage.clearAllFilters()

    // only name
    statementManagementPage.filterStatementsInClientStatements('TomTom')
    statementManagementPage.checkAmountOfPeopleTable(1)
  })

  /**
   * Filter for a combination of data that does not bring any results to test if a error message is displayed
   *
   */
  it('C1234567_Filter_Without_Results_Check_Message', () => {
    const yesterdayDate = utils.getDateInFutureOrPast(-1, 0, 0, 'YYYY/MM/DD').join()
    const todayDate = utils.getDateInFutureOrPast(0, 0, 0, 'YYYY/MM/DD').join()

    statementManagementPage.filterStatementsInClientStatements('TestTestTest', yesterdayDate, todayDate)
    statementManagementPage.getNoDataFoundMessage().should('be.visible')
  })

  /**
   * Select a client without participants, and verify if a message is displayed> Then. go back to statement management initial page
   */
  it('C1234567_select_Client_Without_Participants', () => {
    statementManagementPage.filterStatementsInClientStatements('Cavotec')
    statementManagementPage.clickClientTable(78)
    statementManagementPage.getNoDataFoundMessage().should('be.visible')
    statementManagementPage.clickBackToManageStatements()
    statementManagementPage.checkClientStatementsUrl()
  })

  /**
   * Filter a client with participants and Check search with participant name, id and status with a variety of combination, such as
   * nameXid, nameXdate, idXdate, nameXidXdate.. (USE TomTom)
   *
   * missing @IDS
   */

  /**
   * Select a client from the list with the status INITIATED , and verify that the summary button is not available.
   * And, select a client from the list with the status RECONCILED , and verify that the summary button is not available
   */
  it('C1234567_select_Client_With_Status_That_Does_Not_Have_Download_Report', () => {
    statementManagementPage.filterStatementsInClientStatements('Cavotec')
    statementManagementPage.clickClientTable(78)
    statementManagementPage.getSummaryButton().should('not.exist')
    statementManagementPage.clickBackToManageStatements()

    statementManagementPage.clearAllFilters()
    statementManagementPage.filterStatementsInClientStatements('Amadeus')
    statementManagementPage.clickClientTable(81)
    statementManagementPage.getSummaryButton().should('not.exist')
  })

  // Select a client from the list with the status RECONCILED , and verify that the summary button is not available

  // Select a client from the list with status PUBLISHED , and click to get the summary and check if a csv file was downloaded with name clientName_Summary.csv

  // Select a client from the list with status PARTIALLY PUBLISHED , and click to get the summary and check if a csv file was downloaded with name clientName_Summary.csv

  // Select a client from the list after a search or not with participants published (ex Interxion), and click on a participant from the list with status published, and click to view pdf, and check if a pdf file was downloaded with name participant_Summary.pdf

  // In participant tab, check the behavior of the filter - It is probably a bug
})
