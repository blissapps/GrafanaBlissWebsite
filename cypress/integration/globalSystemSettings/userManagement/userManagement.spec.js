import EquityAdmin from '../../../support/pages/equityAdmin'

describe('User Management tests over User Management settings', () => {
  const equityAdmin = new EquityAdmin()

  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'user')
    equityAdmin.userManagementPage.checkPageUrl()
  })

  // ************************************************ TESTS AS ADMIN TENANT ************************************************** //

  /**
   * @missing_data We need to make sure about the current total of clients that has the same userEmail
   */
  it.skip('C7592116_Users_Search_For_Username_/_Email_And_Check_Highlighted_Data', () => {
    const username = 'amulcahyNE'
    const userEmail = 'test@globalshares.com'
    const userStatus = 'Active'

    cy.log('EMAIL')
    equityAdmin.searchEngine.search(userEmail)
    equityAdmin.userManagementPage.assertAmountOfSearchResults(11)
    equityAdmin.userManagementPage.assertDataDisplayedOnGsGridTableIsHighlighted(userEmail)

    cy.log('USERNAME')
    equityAdmin.searchEngine.search(username)
    equityAdmin.userManagementPage.assertAmountOfSearchResults(1)
    equityAdmin.userManagementPage.assertDataDisplayedOnGsGridTableIsHighlighted(username)

    equityAdmin.userManagementPage.assertDataDisplayedOnGsGridTable([username, userEmail, userStatus])
  })

  it('C7353826_List_User_Happy_Path_Contains_Expected_Columns_On_Users_Table', () => {
    const columnsToValidate = ['username', 'email', 'status']

    equityAdmin.userManagementPage.assertTableContainsExpectedColumnsInOrder(columnsToValidate)
  })

  /**
   * @missing_data Need to have a user with proper groups and data registered
   */
  it.skip('C7592114_Users_Happy_Path_View_User_Details_L4', () => {
    const username = 'amulcahyNE'
    const userId = 454292
    const publicName = 'Gage Gilbert'
    const status = 'active'
    const email = 'test@globalshares.com'
    const groups = ['Global Admin Group']
    const firstName = 'Reagan'
    const lastName = 'Jerry'
    const jobTitle = 'Writer'
    const qualifications = 'Reading'
    const organization = 'Global Shares'
    const phone = '99123'

    equityAdmin.searchEngine.search(username, 500)
    equityAdmin.userManagementPage.clickUserTable(userId)

    equityAdmin.userManagementPage.assertRightL4BarIsDisplayed()
    equityAdmin.userManagementPage.assertUserDetailContentInRightNavBar(publicName, username, status, email)
    equityAdmin.userManagementPage.clickLinkToAccessUserInfoDetailsOnRightNavBar()
    equityAdmin.userManagementPage.assertUserInfoContentInRightNavBar(groups, firstName, lastName, publicName, jobTitle, qualifications, organization, phone, email, username)
  })

  it('C7592117_Users_No_Users_Match_Search', () => {
    equityAdmin.searchEngine.search('test_empty_state')
    equityAdmin.userManagementPage.assertNoUserMsgIdDisplayed()
  })

  it('C7592119_User_pastes_SQL_Code_Into_The_Search_Box', () => {
    equityAdmin.searchEngine.search('SELECT * FROM users')
    equityAdmin.userManagementPage.assertNoUserMsgIdDisplayed()
  })

  /**
   * @missing_data Need to have the exactly same users registered in order to validate this load behavior
   */
  it.skip('C7353827_List User - Lazy Load Test', () => {
    const usersIdListToCheckLoading = [454295, 941741, 454300, 941765, 836495]

    equityAdmin.userManagementPage.interceptUsersLoadingRequest()

    // eoindeasyNE
    equityAdmin.userManagementPage.getUserInTable(usersIdListToCheckLoading[0])
    cy.forcedWait(500) // The UI takes a time to load, so this wait is really necessary

    // jachas@globalshares.com
    equityAdmin.userManagementPage.getUserInTable(usersIdListToCheckLoading[1])
    cy.forcedWait(500) // The UI takes a time to load, so this wait is really necessary
    equityAdmin.userManagementPage.waitForUsersLoadingRequest()

    // mpurcellNE
    equityAdmin.userManagementPage.getUserInTable(usersIdListToCheckLoading[2])
    cy.forcedWait(500) // The UI takes a time to load, so this wait is really necessary
    equityAdmin.userManagementPage.waitForUsersLoadingRequest()

    // Piotr Litwinski
    equityAdmin.userManagementPage.getUserInTable(usersIdListToCheckLoading[3])
    cy.forcedWait(500) // The UI takes a time to load, so this wait is really necessary

    // ZoeLewis_NE - Last User in the table
    equityAdmin.userManagementPage.getUserInTable(usersIdListToCheckLoading[4])
    equityAdmin.userManagementPage.assertUserIsVisibleOnTable(usersIdListToCheckLoading[4])
  })
})
