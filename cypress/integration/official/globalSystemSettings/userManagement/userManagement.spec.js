import EquityAdmin from '../../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('User Management tests over User Management settings - Admin tenant user', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.homePage.navigateToUrl('/tenant/1/settings/user-management')
    equityAdmin.userManagementPage.checkPageUrl()
  })

  /**
   * @bug_raised  https://globalshares.atlassian.net/browse/PB-1158
   */
  it('C7353826_List_User_Happy_Path_Contains_Expected_Columns_On_Users_Table', () => {
    const username = 'RSaxena@globalshares.com'
    const userEmail = 'APSilva@globalshares.com'
    const userEmail2 = 'test1@test.com'

    // Uncomment this line as soon as the the bug is fixed
    // equityAdmin.userManagementPage.assertNumberOfRecordsDisplayedInTable(79)

    cy.log('USERNAME')
    equityAdmin.searchEngine.search(username)
    equityAdmin.userManagementPage.assertAmountOfSearchResultsInTheList(1)
    equityAdmin.userManagementPage.assertNumberOfRowsInTable(1)
    equityAdmin.userManagementPage.assertDataDisplayedOnGsGridTableIsHighlighted(username)

    cy.log('EMAIL')
    equityAdmin.searchEngine.search(userEmail)
    equityAdmin.userManagementPage.assertAmountOfSearchResultsInTheList(1)
    equityAdmin.userManagementPage.assertNumberOfRowsInTable(1)
    equityAdmin.userManagementPage.assertDataDisplayedOnGsGridTableIsHighlighted(userEmail)

    cy.log('Empty user list')
    equityAdmin.searchEngine.search('Random name for no users')
    equityAdmin.userManagementPage.assertNoUserExistsMessageIsDisplayed()

    cy.log('Counting number of search with more than 1 result')
    equityAdmin.searchEngine.search(userEmail2)
    equityAdmin.userManagementPage.assertAmountOfSearchResultsInTheList(6)
    equityAdmin.userManagementPage.assertNumberOfRowsInTable(6)
    equityAdmin.userManagementPage.assertDataDisplayedOnGsGridTableIsHighlighted(userEmail2)

    cy.log('Clear button behavior over this page')
    equityAdmin.searchEngine.clearSearchBoxByXIcon()
    equityAdmin.userManagementPage.assertNumberOfRecordsDisplayedInTable(79)
  })
})
