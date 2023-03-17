import EquityAdmin from '../../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('User Management settings - User, Group, Role, and DAP', () => {
  context('Standard User', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login()
    })

    it('C18116624 Check the system behavior when closing the settings nav bar', () => {
      equityAdmin.applicationLeftMenuBar.openSettingsMenuBar()
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'user')
      equityAdmin.userManagementPage.checkPageUrl()
      equityAdmin.settingsMenuNavBar.closeGlobalSettingsNavBar()
      equityAdmin.userManagementPage.checkPageUrl()
    })
  })

  context('View Only User', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login('viewonlyuser@globalshares.com')
    })

    it('C18116625 Assert View Only Status Badge Displayed Next To Settings Titles', () => {
      // User
      equityAdmin.applicationLeftMenuBar.openSettingsMenuBar()
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'user')
      equityAdmin.userManagementPage.checkPageUrl()
      equityAdmin.userManagementPage.assertUsersPageHeaderDisplayed('Users')
      equityAdmin.userManagementPage.assertViewOnlyBadgeDisplayed('View Only')

      // Group
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('', 'group')
      equityAdmin.groupManagementPage.checkPageUrl()
      equityAdmin.groupManagementPage.assertGroupPageHeaderIsDisplayed('Groups')
      equityAdmin.groupManagementPage.assertViewOnlyBadgeDisplayed('View Only')

      // Role
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('', 'role')
      equityAdmin.roleManagementPage.checkPageUrl()
      equityAdmin.roleManagementPage.assertRolePageHeaderIsDisplayed('Roles')
      equityAdmin.roleManagementPage.assertViewOnlyBadgeDisplayed('View Only')

      // DAP
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('', 'dap')
      equityAdmin.dapManagementPage.checkPageUrl()
      equityAdmin.dapManagementPage.assertDapPageHeaderIsDisplayed('Profiles')
      equityAdmin.dapManagementPage.assertViewOnlyBadgeDisplayed('View Only')
    })
  })

  context('Using mocks', () => {
    /**
     * @mocks_used
     */
    it('C18116626 User does not have View Permissions for Users, Groups, Roles, and Access Filters', () => {
      equityAdmin.loginPage.loginWithMockedPermissions('noPermissionsForSettings.json')

      equityAdmin.applicationLeftMenuBar.openSettingsMenuBar()
      equityAdmin.settingsMenuNavBar.assertGlobalSettingsMenuOpen()
      equityAdmin.settingsMenuNavBar.assertClientNameInTheHeader('Global Settings')
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
