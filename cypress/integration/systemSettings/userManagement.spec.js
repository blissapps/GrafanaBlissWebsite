import HomePage from '../../support/pages/homePage'
import UserManagementPage from '../../support/pages/settingsPages/userManagementPage'

import LeftMenuBar from '../../support/components/leftMenuBar'
import SearchBar from '../../support/components/searchBar'

describe('User Management tests over User Management settings', () => {
  const homePage = new HomePage()
  const userManagementPage = new UserManagementPage()

  const leftMenuBar = new LeftMenuBar()
  const searchBar = new SearchBar()

  beforeEach(() => {
    // @ts-ignore
    cy.login()
    leftMenuBar.accessGlobalSettingsMenu('User Management', 'User Management')
  })

  // ************************************************ TESTS AS ADMIN TENANT ************************************************** //

  /**
   * Verify if the settings send the user back to the home screen when the user closes the settings menu
   *
   * Waiting for @IDS
   */
  it('C1234567_Check_Behavior_When_Closing_The_Settings', () => {
    userManagementPage.checkUserManagementUrl()
    leftMenuBar.closeMenuLeftBar()
    homePage.checkUrl('home')
  })

  // Test search engine for username and email
  it.only('C1234567_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', () => {
    searchBar.search('amulcahyNE')
    userManagementPage.clickUserTable('amulcahyNE')
    // userManagementPage.checkAmountOfPeopleTable(53, 2)
    // check elements in table, we have something like this in Equity People Pages

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
