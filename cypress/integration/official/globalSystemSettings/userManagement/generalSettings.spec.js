import EquityAdmin from '../../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('User Management settings - User, Group, Role, and DAP', () => {
  context('Standard User', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login()
    })

    it('C18116624 Check the system behavior when closing the settings nav bar', () => {
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

    /**
     * @bug_raised
     * SKIPPING DUE TO https://globalshares.atlassian.net/browse/PB-1005
     */
    it('C18116625 Assert View Only Status Badge Displayed Next To Settings Titles', () => {
      // User
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'user')
      equityAdmin.userManagementPage.checkPageUrl()
      // equityAdmin.userManagementPage.assertViewOnlyBadgeDisplayed() // Uncomment this line as soon as the PB-1005 is fixed

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
