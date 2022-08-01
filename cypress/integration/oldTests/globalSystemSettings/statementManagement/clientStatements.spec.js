import EquityAdmin from '../../../../support/pages/equityAdmin'
import Utils from '../../../../support/utils'

const equityAdmin = new EquityAdmin()
const utils = new Utils()

describe('Statement Management - Client Statements tests', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.applicationLeftMenuBar.openSettingsMenuBar()
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('statement', '')
    equityAdmin.clientStatementsPage.checkPageUrl()
  })

  it('C7394715_Happy_Path_To_View_Statements_Accordingly', () => {
    equityAdmin.clientStatementsPage.assertClientStatementsTableContainsExpectedColumnsInOrder()
    equityAdmin.clientStatementsPage.assertClientStatementsTableInOrderById()

    // Test scroll not possible because of the Angular page that does not scroll correctly with JS commands.
  })

  it('C7353833_Use_Filter_To_Search_For_Client_Statements', () => {
    // name and date
    const clientStatementName = 'TomTom'
    const dateFrom = '20190301'
    const dateTo = '20210519'
    const clientId = 77

    // Initial verification
    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementName, dateFrom, dateTo)
    equityAdmin.clientStatementsPage.assertClientDisplayedOnClientStatementsTable(clientId)
    equityAdmin.clientStatementsPage.assertNumberOfRecordsDisplayedTable(1)
    equityAdmin.clientStatementsPage.clearAllFilters()
    equityAdmin.clientStatementsPage.assertClientStatementsTableInOrderById()

    // By Name
    equityAdmin.clientStatementsPage.filterClientStatements('TomTom')
    equityAdmin.clientStatementsPage.assertClientDisplayedOnClientStatementsTable(clientId)
    equityAdmin.clientStatementsPage.assertNumberOfRecordsDisplayedTable(1)

    // By Regulator
    equityAdmin.clientStatementsPage.filterClientStatements('', '', '', 'Form 1099')
    equityAdmin.clientStatementsPage.assertClientDisplayedOnClientStatementsTable(clientId)
    equityAdmin.clientStatementsPage.assertNumberOfRecordsDisplayedTable(1)

    // By Status
    equityAdmin.clientStatementsPage.filterClientStatements('', '', '', '', 'Published')
    equityAdmin.clientStatementsPage.assertClientDisplayedOnClientStatementsTable(clientId)
    equityAdmin.clientStatementsPage.assertNumberOfRecordsDisplayedTable(3)
  })

  it('C7353834_Filter_To_Check_Empty_State', () => {
    const clientName = 'None'
    const yesterdayDate = utils.getDateInFutureOrPast(-1, 0, 0, 'YYYY/MM/DD').join()
    const todayDate = utils.getDateInFutureOrPast(0, 0, 0, 'YYYY/MM/DD').join()

    equityAdmin.clientStatementsPage.filterClientStatements(clientName, yesterdayDate, todayDate)
    equityAdmin.clientStatementsPage.assertNoDataMessageFoundDisplayed()
  })

  /**
   *
   * @missing_data Need to have at least one client for each possible state {Published, Partially Publish, Reconciled, Pending Validation, and Initiated}
   *
   */
  it.skip('C9281169_Statements_Reconcile_Button', () => {
    const clientStatementPublishedName = 'Interxion'
    const clientStatementPublishedId = 76
    const clientStatementPartiallyPublishedName = 'Cavotec'
    const clientStatementPartiallyPublishedId = 78
    const clientStatementReconciledName = 'Veloxis'
    const clientStatementReconciledId = 80
    const clientStatementPendingValidationName = 'Arcadis'
    const clientStatementPendingValidationId = 136
    const clientStatementInitiatedName = 'Dimension Data'
    const clientStatementInitiatedId = 117

    equityAdmin.clientStatementsPage.waitForClientStatementsToBeLoaded() // First make sure the clients were loaded before testing that the bulk actions are not displayed
    equityAdmin.clientStatementsPage.assertBulkOptionsDisplayed(false)

    // Client status PUBLISHED
    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementPublishedName)
    equityAdmin.clientStatementsPage.assertReconcileButtonDisplayedForClient(clientStatementPublishedId, false)
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Client status PARTIALLY PUBLISHED
    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementPartiallyPublishedName)
    equityAdmin.clientStatementsPage.assertReconcileButtonDisplayedForClient(clientStatementPartiallyPublishedId, false)
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Client status RECONCILED
    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementReconciledName)
    equityAdmin.clientStatementsPage.assertReconcileButtonDisplayedForClient(clientStatementReconciledId, false)
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Client status PENDING VALIDATION
    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementPendingValidationName)
    equityAdmin.clientStatementsPage.assertReconcileButtonDisplayedForClient(clientStatementPendingValidationId, false)
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Client status INITIATED
    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementInitiatedName)
    equityAdmin.clientStatementsPage.assertReconcileButtonDisplayedForClient(clientStatementInitiatedId)
  })

  /**
   *
   * @missing_data Need to have one client Initiated to be able to Reconcile it
   *
   */
  it.skip('C9281170_Statements_L4_Window', () => {
    const clientStatementInitiatedName = 'Santen Pharmaceutical'
    const clientStatementInitiatedId = 140
    const securityIds = [795]

    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementInitiatedName)
    equityAdmin.clientStatementsPage.clickToReconcileClient(clientStatementInitiatedId)
    equityAdmin.clientStatementsPage.assertReconcileStatementRightWindowDisplaysElementsAsExpected(securityIds)
  })

  /**
   *
   * @missing_data Need to have 2 clients Initiated to be able to Reconcile it
   *
   */
  it.skip('C9281171 - Statement - Reconciling a statement', () => {
    const clientStatementInitiatedName = 'EQT AB'
    const clientStatementInitiatedId = 1244
    const clientStatementInitiatedName2 = 'GSK'
    const clientStatementInitiatedId2 = 1252
    const securityIdsClient2 = [250]

    // Client 1 - No security
    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementInitiatedName)
    equityAdmin.clientStatementsPage.reconcileClient(clientStatementInitiatedId, true)
    equityAdmin.clientStatementsPage.assertClientStatus(clientStatementInitiatedId, 'Reconciling')
    equityAdmin.clientStatementsPage.assertReconcileButtonDisplayedForClient(clientStatementInitiatedId, false)
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Client 2 - Security selected
    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementInitiatedName2)
    equityAdmin.clientStatementsPage.reconcileClient(clientStatementInitiatedId2, false, securityIdsClient2)
    equityAdmin.clientStatementsPage.assertClientStatus(clientStatementInitiatedId2, 'Reconciling')
    equityAdmin.clientStatementsPage.assertReconcileButtonDisplayedForClient(clientStatementInitiatedId2, false)
  })

  /**
   * @missing_data Client statement with status Initiated
   */
  it.skip('C7627258_Statements_Reconcile_Single_Client_Statement', () => {
    const clientStatementInitiatedName = 'Legal and General'
    const clientStatementInitiatedId = 148

    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementInitiatedName)
    equityAdmin.clientStatementsPage.assertClientStatus(clientStatementInitiatedId, 'Initiated')
    equityAdmin.clientStatementsPage.assertReconcileButtonDisplayedForClient(clientStatementInitiatedId)
    equityAdmin.clientStatementsPage.reconcileClient(clientStatementInitiatedId, true)
    equityAdmin.clientStatementsPage.assertToastNotificationMessageIsDisplayed('Success')
    equityAdmin.clientStatementsPage.assertClientStatus(clientStatementInitiatedId, 'Reconciling')
  })

  /**
   * @missing_data Clients statements with all statuses but Initiated
   */
  it.skip('C7627260_Statements_Try_To_Reconcile_Single_Client_Statement_Not_In_Initiated_Status', () => {
    const clientStatementReconciledName = 'Alfa Systems'
    const clientStatementReconciledId = 203
    const clientStatementPendingValidationName = 'SJP Partners'
    const clientStatementPendingValidationId = 93
    const clientStatementPartiallyPublishedName = 'Lenovo'
    const clientStatementPartiallyPublishedId = 108
    const clientStatementPublishedName = 'Repsol'
    const clientStatementPublishedId = 107

    // Reconciling
    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementReconciledName)
    equityAdmin.clientStatementsPage.assertClientStatus(clientStatementReconciledId, 'Reconciling')
    equityAdmin.clientStatementsPage.assertReconcileButtonDisplayedForClient(clientStatementReconciledId, false)
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Pending Validation
    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementPendingValidationName)
    equityAdmin.clientStatementsPage.assertClientStatus(clientStatementPendingValidationId, 'Pending Validation')
    equityAdmin.clientStatementsPage.assertReconcileButtonDisplayedForClient(clientStatementPendingValidationId, false)
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Partially Published
    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementPartiallyPublishedName)
    equityAdmin.clientStatementsPage.assertClientStatus(clientStatementPartiallyPublishedId, 'Partially Published')
    equityAdmin.clientStatementsPage.assertReconcileButtonDisplayedForClient(clientStatementPartiallyPublishedId, false)
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Published
    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementPublishedName)
    equityAdmin.clientStatementsPage.assertClientStatus(clientStatementPublishedId, 'Published')
    equityAdmin.clientStatementsPage.assertReconcileButtonDisplayedForClient(clientStatementPublishedId, false)
  })
})
