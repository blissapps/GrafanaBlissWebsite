import EquityAdmin from '../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('User Management settings - User, Group, Role, and DAP', () => {
  context('Standard User', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login()
    })

    it('C7405960_User_Check_Behavior_When_Closing_The_Settings', () => {
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'user')
      equityAdmin.userManagementPage.checkPageUrl()
      equityAdmin.settingsMenuNavBar.closeGlobalSettingsNavBar()
      equityAdmin.userManagementPage.checkPageUrl()
    })
  })

  context('View Only User', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login(Cypress.env('VIEW_ONLY_USER_2_AUTH'))
    })

    /**
     * @bug_raised
     * SKIPPING DUE TO https://globalshares.atlassian.net/browse/PB-1005
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

    /**
     * @missing_data need a user for that
     */
    it.skip('C12324915_Create_New_Group/role/dap_Button_Should_Not_Be_Available_In_The_Ui_For_A_User_With_Only_View_Permissions', () => {
      // Group
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'group')
      equityAdmin.groupManagementPage.checkPageUrl()
      equityAdmin.groupManagementPage.waitSpecificTime(1000) // Needs to wait to the UI to reload
      equityAdmin.groupManagementPage.assertCreateNewGroupButtonDisplayed(false)

      // Role
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('', 'role', false)
      equityAdmin.roleManagementPage.checkPageUrl()
      equityAdmin.roleManagementPage.waitSpecificTime(1000) // Needs to wait to the UI to reload
      equityAdmin.roleManagementPage.assertCreateNewRoleButtonDisplayed(false)

      // DAP
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('', 'dap', false)
      equityAdmin.dapManagementPage.checkPageUrl()
      equityAdmin.dapManagementPage.waitSpecificTime(1000) // Needs to wait to the UI to reload
      equityAdmin.dapManagementPage.assertCreateNewDapButtonDisplayed(false)
    })

    /**
     * @missing_data Need to have one user associated with a group without permissions to see any User Management settings (including users, groups, roles, and DAPs (access filters))
     */
    it.skip('C7544061_User_Does_Not_Have_View_Permissions_For_Users,_Groups,_Roles,_And_Access_Filters', () => {
      equityAdmin.applicationLeftMenuBar.openSettingsMenuBar()
      equityAdmin.settingsMenuNavBar.assertGlobalSettingsMenuOpen()
      equityAdmin.settingsMenuNavBar.assertUserManagementMenuDisplayed(false)

      // User Management tentative access
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/user-management')
      equityAdmin.unauthorizedPage.checkPageUrl()
      equityAdmin.unauthorizedPage.assertYouAreRestrictedToAccessMessageIsDisplayed('Unfortunately, you are restricted to access this page.')

      // Group Management tentative access
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/group-management')
      equityAdmin.unauthorizedPage.checkPageUrl()
      equityAdmin.unauthorizedPage.assertYouAreRestrictedToAccessMessageIsDisplayed('Unfortunately, you are restricted to access this page.')

      // Role Management tentative access
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/role-management')
      equityAdmin.unauthorizedPage.checkPageUrl()
      equityAdmin.unauthorizedPage.assertYouAreRestrictedToAccessMessageIsDisplayed('Unfortunately, you are restricted to access this page.')

      // Data Access Profiles tentative access
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/dap-management')
      equityAdmin.unauthorizedPage.checkPageUrl()
      equityAdmin.unauthorizedPage.assertYouAreRestrictedToAccessMessageIsDisplayed('Unfortunately, you are restricted to access this page.')
    })
  })
})
