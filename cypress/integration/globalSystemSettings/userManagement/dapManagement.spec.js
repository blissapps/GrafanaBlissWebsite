import DapManagementPage from '../../../support/pages/globalSettingsPages/userManagementPages/dapManagementPage'
import LeftMenuNavBar from '../../../support/components/leftMenuNavBar'

describe('Data Access Profiles tests over User Management settings', () => {
  const dapManagementPage = new DapManagementPage()

  const leftMenuNavBar = new LeftMenuNavBar()

  beforeEach(() => {
    // @ts-ignore
    cy.login() && cy.loginSuccessfulXHRWaits()
    leftMenuNavBar.accessGlobalSettingsMenu('user', 'dap')
    dapManagementPage.checkDapManagementUrl()
  })

  // ************************************************ TESTS AS ADMIN TENANT ************************************************** //

  /**
   * Verify if the settings send the user back to the home screen when the user closes the settings
   *
   * Waiting for @IDS
   */
  it('C7564741_Check_The_System_Behavior_When_Closing_The_Settings_Nav_Bar', () => {
    leftMenuNavBar.closeGlobalSettingsLeftBar()
    dapManagementPage.checkDapManagementUrl()
  })

  /**
   * @missing_data Need to have at least 1 active and 1 inactive DAP created
   */
  it.skip('C7544057_DAP_Happy_Path_List_Active_And_Inactive_Data_Access_Profile(s)', () => {
    dapManagementPage.assertActiveDapsAreDisplayed()
    dapManagementPage.clickTabByTitle('Inactive')
    dapManagementPage.assertInactiveDapsAreDisplayed()
  })

  /**
   * @missing_data There are no DAPs neither in active nor inactive status
   */
  it.skip('C7544059_DAP_Empty_State_Active_And_Inactive_Data_Access_Profile(s)', () => {
    // Active tab
    dapManagementPage.assertActiveDapsAreDisplayed(false)
    dapManagementPage.assertNoDapExistsMessageIsDisplayed()

    //Inactive tab
    dapManagementPage.clickTabByTitle('Inactive')
    dapManagementPage.assertInactiveDapsAreDisplayed(false)
    dapManagementPage.assertNoDapExistsMessageIsDisplayed()
  })

  // ************************************************ TESTS AS CLIENTS ************************************************** //
})
