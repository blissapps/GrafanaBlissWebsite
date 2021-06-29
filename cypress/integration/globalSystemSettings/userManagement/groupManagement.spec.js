import HomePage from '../../../support/pages/homePage'
import GroupManagementPage from '../../../support/pages/globalSettingsPages/userManagementPages/groupManagementPage'

import LeftMenuNavBar from '../../../support/components/leftMenuNavBar'

describe('Group Management tests over User Management settings', () => {
  const homePage = new HomePage()
  const groupManagementPage = new GroupManagementPage()

  const leftMenuNavBar = new LeftMenuNavBar()

  beforeEach(() => {
    // @ts-ignore
    cy.login() && cy.loginSuccessfulXHRWaits()
    leftMenuNavBar.accessGlobalSettingsMenu('user', 'group')
  })

  // ************************************************ TESTS AS ADMIN TENANT ************************************************** //

  /**
   * Verify if the settings send the user back to the home screen when the user closes the settings menu
   *
   * Waiting for @IDS
   */
  it('C7412690_Check_Behavior_When_Closing_The_Settings', () => {
    groupManagementPage.checkGroupManagementUrl()
    leftMenuNavBar.closeGlobalSettingsLeftBar()
    homePage.checkHomeUrl()
  })

  //  ************** TESTS BELLOW MODIFY DATA DEFINITELY ***************

  // ************************************************ TESTS AS CLIENTS ************************************************** //
})
