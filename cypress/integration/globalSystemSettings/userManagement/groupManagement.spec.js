import HomePage from '../../../support/pages/homePage'
import GroupManagementPage from '../../../support/pages/globalSettingsPages/userManagementPages/groupManagementPage'

import LeftMenuBar from '../../../support/components/leftMenuBar'

describe('Group Management tests over User Management settings', () => {
  const homePage = new HomePage()
  const groupManagementPage = new GroupManagementPage()

  const leftMenuBar = new LeftMenuBar()

  beforeEach(() => {
    // @ts-ignore
    cy.login() && cy.loginSuccessfulXHRWaits()
  })

  // ************************************************ TESTS AS ADMIN TENANT ************************************************** //

  /**
   * Verify if the settings send the user back to the home screen when the user closes the settings menu
   *
   * Waiting for @IDS
   */
  it('C1234567_Check_Behavior_When_Closing_The_Settings', () => {
    leftMenuBar.accessGlobalSettingsMenu('User Management', 'Group Management')
    groupManagementPage.checkGroupManagementUrl()
    leftMenuBar.closeGlobalSettingsLeftBar()
    homePage.checkUrl('home')
  })

  //  ************** TESTS BELLOW MODIFY DATA DEFINITELY ***************

  // ************************************************ TESTS AS CLIENTS ************************************************** //
})
