import DapManagementPage from '../../../support/pages/globalSettingsPages/userManagementPages/dapManagementPage'
import LeftMenuNavBar from '../../../support/components/leftMenuNavBar'

describe('Data Access Profiles tests over User Management settings', () => {
  const dapManagementPage = new DapManagementPage()

  const leftMenuNavBar = new LeftMenuNavBar()

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
    leftMenuNavBar.accessGlobalSettingsMenu('user', 'dap')
    dapManagementPage.checkDapManagementUrl()
    leftMenuNavBar.closeGlobalSettingsLeftBar()
    dapManagementPage.checkDapManagementUrl()
  })

  //  ************** TESTS BELLOW MODIFY DATA DEFINITELY ***************

  // ************************************************ TESTS AS CLIENTS ************************************************** //
})
