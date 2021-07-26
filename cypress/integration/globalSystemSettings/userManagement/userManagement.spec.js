import UserManagementPage from '../../../support/pages/globalSettingsPages/userManagementPages/userManagementPage'
import LeftMenuNavBar from '../../../support/components/leftMenuNavBar'
import SearchBar from '../../../support/components/searchBar'

describe('User Management tests over User Management settings', () => {
  const userManagementPage = new UserManagementPage()

  const leftMenuNavBar = new LeftMenuNavBar()
  const searchBar = new SearchBar()

  beforeEach(() => {
    // @ts-ignore
    cy.login() && cy.loginSuccessfulXHRWaits()
    leftMenuNavBar.accessGlobalSettingsMenu('user', 'user')
  })

  // ************************************************ TESTS AS ADMIN TENANT ************************************************** //

  it('C7405960_User_Check_Behavior_When_Closing_The_Settings', () => {
    userManagementPage.checkUserManagementUrl()
    leftMenuNavBar.closeGlobalSettingsLeftBar()
    userManagementPage.checkUserManagementUrl()
  })

  it('C7592116_Users_Search_For_Username_/_Email_And_Check_Highlighted_Data', () => {
    const username = 'amulcahyNE'
    const userEmail = 'test@globalshares.com'
    const userStatus = 'Active'
    userManagementPage.checkUserManagementUrl() // Check we are getting the correct search input in the correct page

    cy.log('EMAIL')
    searchBar.search(userEmail)
    userManagementPage.assertAmountOfSearchResults(10)
    userManagementPage.assertDataDisplayedOnGsGridTableIsHighlighted(userEmail)

    cy.log('USERNAME')
    searchBar.search(username)
    userManagementPage.assertAmountOfSearchResults(1)
    userManagementPage.assertDataDisplayedOnGsGridTableIsHighlighted(username)

    userManagementPage.assertDataDisplayedOnGsGridTable([username, userEmail, userStatus])
  })

  it('C7353826_List_User_Happy_Path_Contains_Expected_Columns_On_Users_Table', () => {
    userManagementPage.assertTableContainsExpectedColumns(['username', 'email', 'status'])
  })

  /**
   * @missing_data Need to have proper groups registered
   */
  it.skip('C7592114_Users_Happy_Path_View_User_Details_L4', () => {
    const username = 'amulcahyNE'
    const userId = 454292
    const publicName = 'Gage Gilbert'
    const status = 'active'
    const email = 'test@globalshares.com'
    const groups = ['View Only', 'Global Admin Group']
    const firstName = 'Reagan'
    const lastName = 'Jerry'
    const jobTitle = 'Writer'
    const qualifications = 'Reading'
    const organization = 'Global Shares'
    const phone = '99123'

    userManagementPage.checkUserManagementUrl() // Check we are getting the correct search input in the correct page

    searchBar.search(username, 500)
    userManagementPage.clickUserTable(userId)

    userManagementPage.assertRightNavBarIsDisplayed()
    userManagementPage.assertUserDetailContentInRightNavBar(publicName, username, status, email)
    userManagementPage.clickLinkToAccessUserInfoDetailsOnRightNavBar()
    userManagementPage.assertUserInfoContentInRightNavBar(groups, firstName, lastName, publicName, jobTitle, qualifications, organization, phone, email, username)
  })

  it('C7592117_Users_No_Users_Match_Search', () => {
    userManagementPage.checkUserManagementUrl() // Check we are getting the correct search input in the correct page

    searchBar.search('test_empty_state')
    userManagementPage.assertNoUserMsgIdDisplayed()
  })

  it('C7592119_User_pastes_SQL_Code_Into_The_Search_Box', () => {
    userManagementPage.checkUserManagementUrl() // Check we are getting the correct search input in the correct page

    searchBar.search('SELECT * FROM users')
    userManagementPage.assertNoUserMsgIdDisplayed()
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
