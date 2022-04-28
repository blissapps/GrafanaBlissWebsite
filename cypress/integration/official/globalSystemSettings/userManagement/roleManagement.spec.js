import EquityAdmin from '../../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Role Management tests over User Management settings', () => {
  context('Admin tenant user over menu settings', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login()
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/role-management')
      equityAdmin.roleManagementPage.checkPageUrl()
    })

    it('C17067395_Not selected role in active and inactive', () => {
      // Active tab
      equityAdmin.roleManagementPage.assertActiveRolesAreDisplayed()
      equityAdmin.roleManagementPage.assertNoRoleSelectedMessageIsDisplayed()

      // Inactive tab
      equityAdmin.roleManagementPage.clickTab('Inactive')
      equityAdmin.roleManagementPage.assertInactiveRolesAreDisplayed()
      equityAdmin.roleManagementPage.assertNoRoleSelectedMessageIsDisplayed()
    })

    it('C17067411_Successful and Unsuccessful search (Active Tab)', () => {
      const rolesIdActiveTab = [1490, 1495]

      equityAdmin.roleManagementPage.assertNoRoleSelectedMessageIsDisplayed()

      let role = 'view'
      equityAdmin.searchEngine.search(role)
      equityAdmin.roleManagementPage.assertAmountOfSearchResultsInTheList(2)
      equityAdmin.roleManagementPage.assertAndCountNumberOfSearchResults(2)
      equityAdmin.roleManagementPage.assertSearchResultListAccuracy(rolesIdActiveTab)
      equityAdmin.roleManagementPage.assertOtherGroupListDisplayed()
      equityAdmin.roleManagementPage.assertAllSearchResultItemsAreDisplayedInHighlightedMode()

      role = 'Hello'
      equityAdmin.searchEngine.search(role)
      equityAdmin.roleManagementPage.assertNoResultFoundIsVisible()
      equityAdmin.roleManagementPage.assertOtherGroupListDisplayed()
    })

    it('C17067413_Successful and Unsuccessful search (Inactive Tab)', () => {
      const rolesIdActiveTab = [1500, 1501]

      equityAdmin.roleManagementPage.assertNoRoleSelectedMessageIsDisplayed()

      equityAdmin.roleManagementPage.clickTab('Inactive')

      let role = 'role'
      equityAdmin.searchEngine.search(role)
      equityAdmin.roleManagementPage.assertAmountOfSearchResultsInTheList(2)
      equityAdmin.roleManagementPage.assertAndCountNumberOfSearchResults(2)
      equityAdmin.roleManagementPage.assertSearchResultListAccuracy(rolesIdActiveTab)
      equityAdmin.roleManagementPage.assertOtherGroupListDisplayed()
      equityAdmin.roleManagementPage.assertAllSearchResultItemsAreDisplayedInHighlightedMode()

      role = 'Hello'
      equityAdmin.searchEngine.search(role)
      equityAdmin.roleManagementPage.assertNoResultFoundIsVisible()
      equityAdmin.roleManagementPage.assertOtherGroupListDisplayed()
    })

    it('C17067414_Search permissions in active and inactive tab', () => {
      const roleId = 1494
      const roleInactive = 1500

      equityAdmin.roleManagementPage.clickRoleById(roleId, false)

      let permission = 'email'
      equityAdmin.searchEngine.search(permission)
      equityAdmin.roleManagementPage.assertNoResultFoundIsVisible()
      equityAdmin.roleManagementPage.assertOtherGroupListDisplayed()
      equityAdmin.roleManagementPage.assertNumberOfSearchResultsForPermissions(1)
      equityAdmin.roleManagementPage.assertPermissionHighlighted('Email')

      permission = 'participant'
      equityAdmin.searchEngine.search(permission)
      equityAdmin.roleManagementPage.assertNoResultFoundIsVisible()
      equityAdmin.roleManagementPage.assertOtherGroupListDisplayed()
      equityAdmin.roleManagementPage.assertNumberOfSearchResultsForPermissions(16)
      equityAdmin.roleManagementPage.assertPermissionHighlighted('Participant', 16)

      equityAdmin.searchEngine.clearSearchBoxByXIcon()
      equityAdmin.roleManagementPage.clickTab('Inactive')
      equityAdmin.roleManagementPage.clickRoleById(roleInactive, false)

      permission = 'email'
      equityAdmin.searchEngine.search(permission)
      equityAdmin.roleManagementPage.assertNoResultFoundIsVisible()
      equityAdmin.roleManagementPage.assertOtherGroupListDisplayed()
      equityAdmin.roleManagementPage.assertNumberOfSearchResultsForPermissions(1)
      equityAdmin.roleManagementPage.assertPermissionHighlighted('Email')

      permission = 'participant'
      equityAdmin.searchEngine.search(permission)
      equityAdmin.roleManagementPage.assertNoResultFoundIsVisible()
      equityAdmin.roleManagementPage.assertOtherGroupListDisplayed()
      equityAdmin.roleManagementPage.assertNumberOfSearchResultsForPermissions(16)
      equityAdmin.roleManagementPage.assertPermissionHighlighted('Participant', 16)
    })
  })
})
