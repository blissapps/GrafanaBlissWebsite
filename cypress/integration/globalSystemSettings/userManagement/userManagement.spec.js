import HomePage from '../../../support/pages/homePage'
import UserManagementPage from '../../../support/pages/globalSettingsPages/userManagementPages/userManagementPage'
import LeftMenuNavBar from '../../../support/components/leftMenuNavBar'
import SearchBar from '../../../support/components/searchBar'

describe('User Management tests over User Management settings', () => {
  const homePage = new HomePage()
  const userManagementPage = new UserManagementPage()

  const leftMenuNavBar = new LeftMenuNavBar()
  const searchBar = new SearchBar()

  beforeEach(() => {
    // @ts-ignore
    cy.login() && cy.loginSuccessfulXHRWaits()
    leftMenuNavBar.accessGlobalSettingsMenu('user', 'user')
  })

  // ************************************************ TESTS AS ADMIN TENANT ************************************************** //

  /**
   * Verify if the settings send the user back to the home screen when the user closes the settings menu
   *
   * Waiting for @IDS
   */
  it('C7405960_Check_Behavior_When_Closing_The_Settings', () => {
    userManagementPage.checkUserManagementUrl()
    leftMenuNavBar.closeGlobalSettingsLeftBar()
    homePage.checkUrl('home')
  })

  /**
   * Test search engine for a username and a email
   *
   */
  it('C7405961_Search_For_Username_And_Email', () => {
    const userName = 'amulcahyNE'
    const userEmail = 'test@globalshares.com'
    const userStatus = 'Active'
    userManagementPage.checkUserManagementUrl() // Check we are getting the correct search input in the correct page

    searchBar.search(userEmail)
    userManagementPage.checkAmountOfSearchResults(10)
    searchBar.search(userName)
    userManagementPage.checkAmountOfSearchResults(1)

    userManagementPage.AssertUsersDataDisplayedOnTheParticipantsList([userName, userEmail, userStatus])
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
