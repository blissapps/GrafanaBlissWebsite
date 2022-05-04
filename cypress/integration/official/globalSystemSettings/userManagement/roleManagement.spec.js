import EquityAdmin from '../../../../support/pages/equityAdmin'
import Utils from '../../../../support/utils'

const equityAdmin = new EquityAdmin()
const utils = new Utils()

describe('Role Management tests over User Management settings', () => {
  context('Admin tenant user over direct navigation (navigateToUrl)', () => {
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

      equityAdmin.roleManagementPage.clickRoleById(roleId)

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
      equityAdmin.roleManagementPage.clickRoleById(roleInactive)

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

    it('C17253538_Creating a new Role- Happy path', () => {
      const roleName = 'Create new role ' + utils.getRandomNumber()

      equityAdmin.roleManagementPage.clickToCreateRoleWithNewName(roleName)
      equityAdmin.roleManagementPage.addOrRemoveAllPermissions('view')
      equityAdmin.roleManagementPage.addOrRemoveAllPermissions('update')
      equityAdmin.roleManagementPage.addOrRemoveAllPermissions('create')
      equityAdmin.roleManagementPage.addOrRemoveAllPermissions('delete')

      equityAdmin.roleManagementPage.saveEntityInformation()

      equityAdmin.roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully')
      equityAdmin.roleManagementPage.assertActiveRolesAreDisplayed()
      equityAdmin.roleManagementPage.assertEntityIsDisplayedInTheList(roleName)
    })

    it('C17253539_Discard creating a new Role', () => {
      const roleName = 'Create and Discard' + utils.getRandomNumber()

      equityAdmin.roleManagementPage.clickToCreateRoleWithNewName(roleName)
      equityAdmin.roleManagementPage.addOrRemovePermissions('accessfilters', ['view', 'update', 'create'])
      equityAdmin.roleManagementPage.addOrRemovePermissions('api', ['view'])
      equityAdmin.roleManagementPage.addOrRemovePermissions('groups', ['view', 'update', 'create'])
      equityAdmin.roleManagementPage.addOrRemoveAllPermissions('delete')

      equityAdmin.roleManagementPage.discardEntityInformation()
      equityAdmin.roleManagementPage.assertActiveRolesAreDisplayed()
      equityAdmin.roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully', false)
      equityAdmin.roleManagementPage.assertEntityIsDisplayedInTheList(roleName, false)
    })

    it('C7499702_Create_A_New_Role_Mandatory_Fields_Are_Not_Populated', () => {
      const roleName = 'Filling Mandatory Fields ' + utils.getRandomNumber()

      equityAdmin.roleManagementPage.clickToCreateRoleWithNewName('{backspace}') // just to save the role with empty name
      equityAdmin.roleManagementPage.saveEntityInformation()

      equityAdmin.roleManagementPage.assertActiveRolesAreDisplayed()
      equityAdmin.roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully', false)
      equityAdmin.roleManagementPage.assertNotificationErrorDisplayed('Name should not be empty.')
      equityAdmin.roleManagementPage.assertEntityIsDisplayedInTheList(roleName, false)
    })

    it('C17253541_Create a Role with the same name', () => {
      const roleName = 'View Only'

      equityAdmin.roleManagementPage.clickToCreateRoleWithNewName(roleName)
      equityAdmin.roleManagementPage.saveEntityInformation()

      equityAdmin.roleManagementPage.assertActiveRolesAreDisplayed()
      equityAdmin.roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully', false)
      equityAdmin.roleManagementPage.assertNotificationErrorDisplayed('Name value is not valid.')
      equityAdmin.roleManagementPage.assertEntityIsDisplayedInTheList(roleName)
    })

    it('C17253542_Activate a Role', () => {
      const roleId = 1503
      const roleName = 'QA 3'

      equityAdmin.roleManagementPage.clickTab('Inactive')
      equityAdmin.roleManagementPage.clickRoleById(roleId)
      equityAdmin.roleManagementPage.activateRole()

      equityAdmin.roleManagementPage.assertToastNotificationMessageIsDisplayed('Role activated')
      equityAdmin.roleManagementPage.assertActiveRolesAreDisplayed()
      equityAdmin.roleManagementPage.assertEntityIsDisplayedInTheList(roleName)
      equityAdmin.roleManagementPage.clickRoleById(roleId)
      equityAdmin.roleManagementPage.assertRoleIsEditable()
    })

    it('C17253543_Deactivate a Role', () => {
      const roleId = 1504
      const roleName = 'QA 4'

      equityAdmin.roleManagementPage.clickRoleById(roleId)
      equityAdmin.roleManagementPage.clickToDeactivateEntity()

      equityAdmin.roleManagementPage.assertToastNotificationMessageIsDisplayed('Role deactivated')
      equityAdmin.roleManagementPage.assertInactiveRolesAreDisplayed()
      equityAdmin.roleManagementPage.assertEntityIsDisplayedInTheList(roleName)
      equityAdmin.roleManagementPage.assertRoleIsEditable(false)
    })

    it('C17253544_Duplicate a Role - Happy Path', () => {
      const roleId = 1506
      const roleName = 'QA 5'
      const duplicatedRoleName = 'Duplicated role ' + utils.getRandomNumber()

      equityAdmin.roleManagementPage.clickRoleById(roleId)
      equityAdmin.roleManagementPage.clickToDuplicateEntity()
      equityAdmin.roleManagementPage.assertEntityHeaderIsDisplayedAsExpected('Copy Of ' + roleName)
      equityAdmin.roleManagementPage.assertEntityIsFocused()

      equityAdmin.roleManagementPage.modifyEntityName(duplicatedRoleName)
      equityAdmin.roleManagementPage.saveEntityInformation()
      equityAdmin.roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully')
      equityAdmin.roleManagementPage.assertEntityIsDisplayedInTheList(duplicatedRoleName)
    })

    it('C17253545_Discard duplicate a role', () => {
      const roleId = 1506
      const duplicatedRoleName = 'Duplicated role ' + utils.getRandomNumber()

      equityAdmin.roleManagementPage.clickRoleById(roleId)
      equityAdmin.roleManagementPage.clickToDuplicateEntity()
      equityAdmin.roleManagementPage.discardEntityInformation()

      equityAdmin.roleManagementPage.assertEntityIsDisplayedInTheList(duplicatedRoleName, false)
    })
  })
})
