import EquityAdmin from '../../../support/pages/equityAdmin'

describe('User Management tests over User Management settings - View Only User', () => {
  const equityAdmin = new EquityAdmin()

  beforeEach(() => {
    equityAdmin.loginPage.login(Cypress.env('VIEW_ONLY_USER_2_AUTH'))
  })

  /**
   * * SKIPPING DUE TO https://globalshares.atlassian.net/browse/PB-1005
   */
  it.skip('C11649850_Assert_View_Only_Status_Badge_Displayed_Next_To_Settings_Titles', () => {
    // User
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'user')
    equityAdmin.userManagementPage.checkPageUrl()
    // userManagementPage.assertViewOnlyBadgeDisplayed()

    // Group
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('', 'group', false)
    equityAdmin.groupManagementPage.checkPageUrl()
    equityAdmin.groupManagementPage.assertViewOnlyBadgeDisplayed()

    // Role
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('', 'role', false)
    equityAdmin.roleManagementPage.checkPageUrl()
    equityAdmin.roleManagementPage.assertViewOnlyBadgeDisplayed()

    // DAP
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('', 'dap', false)
    equityAdmin.dapManagementPage.checkPageUrl()
    equityAdmin.dapManagementPage.assertViewOnlyBadgeDisplayed()
  })

  it('C12324915_Create_New_Group/role/dap_Button_Should_Not_Be_Available_In_The_Ui_For_A_User_With_Only_View_Permissions', () => {
    // Group
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'group')
    equityAdmin.groupManagementPage.checkPageUrl()
    cy.forcedWait(1000)
    equityAdmin.groupManagementPage.assertCreateNewGroupButtonDisplayed(false)

    // Role
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('', 'role', false)
    equityAdmin.roleManagementPage.checkPageUrl()
    cy.forcedWait(1000)
    equityAdmin.roleManagementPage.assertCreateNewRoleButtonDisplayed(false)

    // DAP
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('', 'dap', false)
    equityAdmin.dapManagementPage.checkPageUrl()
    cy.forcedWait(1000)
    equityAdmin.dapManagementPage.assertCreateNewDapButtonDisplayed(false)
  })

  describe('Statement Management tests - View Only User', () => {
    // Pages
    const equityAdmin = new EquityAdmin()

    beforeEach(() => {
      equityAdmin.loginPage.login(Cypress.env('VIEW_ONLY_USER_2_AUTH'))
    })

    /**
     * @missing_data Need to have one user associated with a group without permissions to see any User Management settings (including users, groups, roles, and DAPs (access filters))
     */
    it.skip('C7544061_User_Does_Not_Have_View_Permissions_For_Users,_Groups,_Roles,_And_Access_Filters', () => {
      equityAdmin.applicationLeftMenuBar.openSettingsMenuBar()
      equityAdmin.settingsMenuNavBar.assertGlobalSettingsMenuOpen()
      equityAdmin.settingsMenuNavBar.assertUserManagementMenuDisplayed(false)
    })
  })
})
