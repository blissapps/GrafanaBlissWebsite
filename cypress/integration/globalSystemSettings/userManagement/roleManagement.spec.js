import HomePage from '../../../support/pages/homePage'
import RoleManagementPage from '../../../support/pages/globalSettingsPages/userManagementPages/roleManagementPage'

import LeftMenuBar from '../../../support/components/leftMenuBar'

describe('Role Management tests over User Management settings', () => {
  const homePage = new HomePage()
  const roleManagementPage = new RoleManagementPage()

  const leftMenuBar = new LeftMenuBar()

  beforeEach(() => {
    // @ts-ignore
    cy.login()
  })

  // ************************************************ TESTS AS ADMIN TENANT ************************************************** //

  /**
   * Verify if the settings send the user back to the home screen when the user closes the settings
   *
   * Waiting for @IDS
   */
  it('C1234567_Check_Behavior_When_Closing_The_Settings', () => {
    leftMenuBar.accessGlobalSettingsMenu('User Management', 'Role Management')
    roleManagementPage.checkRoleManagementUrl()
    leftMenuBar.closeMenuLeftBar()
    homePage.checkUrl('home')
  })

  //  ************** TESTS BELLOW MODIFY DATA DEFINITELY ***************

  // ************************************************ TESTS AS CLIENTS ************************************************** //
})
