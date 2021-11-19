import EquityAdmin from '../../../support/pages/equityAdmin'

describe('User Management tests over User Management settings', () => {
  const equityAdmin = new EquityAdmin()

  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'user')
    equityAdmin.userManagementPage.checkUserManagementUrl()
  })

  // ************************************************ TESTS AS ADMIN TENANT ************************************************** //

  it('C7405960_User_Check_Behavior_When_Closing_The_Settings', () => {
    equityAdmin.userManagementPage.checkUserManagementUrl()
    equityAdmin.settingsMenuNavBar.closeGlobalSettingsNavBar()
    equityAdmin.userManagementPage.checkUserManagementUrl()
  })

  it('C7592116_Users_Search_For_Username_/_Email_And_Check_Highlighted_Data', () => {
    const username = 'amulcahyNE'
    const userEmail = 'test@globalshares.com'
    const userStatus = 'Active'
    equityAdmin.userManagementPage.checkUserManagementUrl() // Check this to make sure we are getting the correct search input in the correct page

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
  it('C7592114_Users_Happy_Path_View_User_Details_L4', () => {
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

    equityAdmin.userManagementPage.checkUserManagementUrl() // Check we are getting the correct search input in the correct page

    equityAdmin.searchEngine.search(username, 500)
    equityAdmin.userManagementPage.clickUserTable(userId)

    equityAdmin.userManagementPage.assertRightL4BarIsDisplayed()
    equityAdmin.userManagementPage.assertUserDetailContentInRightNavBar(publicName, username, status, email)
    equityAdmin.userManagementPage.clickLinkToAccessUserInfoDetailsOnRightNavBar()
    equityAdmin.userManagementPage.assertUserInfoContentInRightNavBar(groups, firstName, lastName, publicName, jobTitle, qualifications, organization, phone, email, username)
  })

  it('C7592117_Users_No_Users_Match_Search', () => {
    equityAdmin.userManagementPage.checkUserManagementUrl() // Check we are getting the correct search input in the correct page

    equityAdmin.searchEngine.search('test_empty_state')
    equityAdmin.userManagementPage.assertNoUserMsgIdDisplayed()
  })

  it('C7592119_User_pastes_SQL_Code_Into_The_Search_Box', () => {
    equityAdmin.userManagementPage.checkUserManagementUrl() // Check we are getting the correct search input in the correct page

    equityAdmin.searchEngine.search('SELECT * FROM users')
    equityAdmin.userManagementPage.assertNoUserMsgIdDisplayed()
  })

  // Verify USER DETAIL container data when picking a user from the Participants table

  // Go to user management, pick a user, then User Info flow, check information over there, as well as the if the 'back button' is working

  //  ************** TESTS BELLOW MODIFY DATA DEFINITELY ***************

  // Go to user management, pick a user, then Reset Password flow

  // Go to user management, pick a user, then Reset MFA flow

  // Go to user management, pick a user, check password Reset Required behavior

  // Go to user management, pick a user, check unlock account behavior

  // ************************************************ TESTS AS CLIENTS ************************************************** //
})
