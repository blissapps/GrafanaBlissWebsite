import HomePage from '../../../support/pages/homePage'
import RoleManagementPage from '../../../support/pages/globalSettingsPages/userManagementPages/roleManagementPage'

import LeftMenuNavBar from '../../../support/components/leftMenuNavBar'

describe('Role Management tests over User Management settings', () => {
  const homePage = new HomePage()
  const roleManagementPage = new RoleManagementPage()

  const leftMenuNavBar = new LeftMenuNavBar()

  beforeEach(() => {
    // @ts-ignore
    cy.login() && cy.loginSuccessfulXHRWaits()
    leftMenuNavBar.accessGlobalSettingsMenu('user', 'role')
  })

  // ************************************************ TESTS AS ADMIN TENANT ************************************************** //

  /**
   * Verify if the settings send the user back to the home screen when the user closes the settings
   *
   * Waiting for @IDS
   */
  it('C1234567_Check_Behavior_When_Closing_The_Settings', () => {
    roleManagementPage.checkRoleManagementUrl()
    leftMenuNavBar.closeGlobalSettingsLeftBar()
    homePage.checkHomeUrl()
  })

  //  ************** TESTS BELLOW MODIFY DATA DEFINITELY ***************

  // ************************************************ TESTS AS CLIENTS ************************************************** //
})
