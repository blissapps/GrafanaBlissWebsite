import HomePage from '../../../support/pages/homePage'
import DapManagementPage from '../../../support/pages/globalSettingsPages/userManagementPages/dapManagementPage'

import LeftMenuBar from '../../../support/components/leftMenuBar'
describe('Data Access Profiles tests over User Management settings', () => {
  const homePage = new HomePage()
  const dapManagementPage = new DapManagementPage()

  const leftMenuBar = new LeftMenuBar()

  beforeEach(() => {
    // @ts-ignore
    cy.login() && cy.loginSuccessfulXHRWaits()
  })

  // ************************************************ TESTS AS ADMIN TENANT ************************************************** //

  /**
   * Verify if the settings send the user back to the home screen when the user closes the settings
   *
   * Waiting for @IDS
   */
  it('C1234567_Check_Behavior_When_Closing_The_Settings', () => {
    leftMenuBar.accessGlobalSettingsMenu('User Management', 'Data Access Profiles')
    dapManagementPage.checkDapManagementUrl()
    leftMenuBar.closeGlobalSettingsLeftBar()
    homePage.checkUrl('home')
  })

  //  ************** TESTS BELLOW MODIFY DATA DEFINITELY ***************

  // ************************************************ TESTS AS CLIENTS ************************************************** //
})
