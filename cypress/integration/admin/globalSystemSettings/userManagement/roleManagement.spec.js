import EquityAdmin from '../../../../support/pages/equityAdmin'
import Utils from '../../../../support/utils'

const equityAdmin = new EquityAdmin()
const utils = new Utils()

describe('Role Management tests over User Management settings', () => {
  context('Tenant 1 settings over direct navigation (navigateToUrl)', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login()
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/role-management')
      equityAdmin.roleManagementPage.checkPageUrl()
    })

    it('C17067395 Not selected role in active and inactive', () => {
      // Active tab
      equityAdmin.roleManagementPage.assertActiveRolesAreDisplayed()
      equityAdmin.roleManagementPage.assertNoRoleSelectedMessageIsDisplayed()

      // Inactive tab
      equityAdmin.roleManagementPage.clickTab('Inactive')
      equityAdmin.roleManagementPage.assertInactiveRolesAreDisplayed()
      equityAdmin.roleManagementPage.assertNoRoleSelectedMessageIsDisplayed()
    })

    it('C17067411 Successful and Unsuccessful search (Active Tab)', () => {
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

    it('C20975190 Roles - Happy Path for searching multiple string in low and up cases', () => {
      const roleIdToBeSearched = [1522]
      const roleNamesToSearch = ['Role to be SeaRchED', 'role to be searched', 'ROLE TO BE SEARCHED', 'Role TO Be SearChED', 'role to be searcheD', 'Role to be searched']

      equityAdmin.roleManagementPage.assertNoRoleSelectedMessageIsDisplayed()

      // 1 - Without cleaning the field after each search
      roleNamesToSearch.forEach((roleName) => {
        equityAdmin.searchEngine.search(roleName)
        equityAdmin.roleManagementPage.assertAmountOfSearchResultsInTheList(1)
        equityAdmin.roleManagementPage.assertAndCountNumberOfSearchResults(1)
        equityAdmin.roleManagementPage.assertSearchResultListAccuracy(roleIdToBeSearched)
        equityAdmin.roleManagementPage.assertOtherGroupListDisplayed()
        equityAdmin.roleManagementPage.assertAllSearchResultItemsAreDisplayedInHighlightedMode()
      })

      equityAdmin.searchEngine.clearSearchBoxByXIcon()
      equityAdmin.roleManagementPage.assertCreateNewRoleButtonDisplayed() // Make sure the search is clean

      // 2 - Cleaning the field after each search
      roleNamesToSearch.forEach((roleName) => {
        equityAdmin.searchEngine.search(roleName)
        equityAdmin.roleManagementPage.assertAmountOfSearchResultsInTheList(1)
        equityAdmin.roleManagementPage.assertAndCountNumberOfSearchResults(1)
        equityAdmin.roleManagementPage.assertSearchResultListAccuracy(roleIdToBeSearched)
        equityAdmin.roleManagementPage.assertOtherGroupListDisplayed()
        equityAdmin.roleManagementPage.assertAllSearchResultItemsAreDisplayedInHighlightedMode()
        equityAdmin.searchEngine.clearSearchBoxByXIcon()
        equityAdmin.roleManagementPage.assertCreateNewRoleButtonDisplayed() // Make sure the search is clean
      })
    })

    it('C17067413 Successful and Unsuccessful search (Inactive Tab)', () => {
      const rolesIdActiveTab = [1500, 1501]

      equityAdmin.roleManagementPage.assertNoRoleSelectedMessageIsDisplayed()

      equityAdmin.roleManagementPage.clickTab('Inactive')

      let role = 'role'
      equityAdmin.searchEngine.search(role)
      equityAdmin.roleManagementPage.assertAmountOfSearchResultsInTheList(3)
      equityAdmin.roleManagementPage.assertAndCountNumberOfSearchResults(3)
      equityAdmin.roleManagementPage.assertSearchResultListAccuracy(rolesIdActiveTab)
      equityAdmin.roleManagementPage.assertOtherGroupListDisplayed()
      equityAdmin.roleManagementPage.assertAllSearchResultItemsAreDisplayedInHighlightedMode()

      role = 'Hello'
      equityAdmin.searchEngine.search(role)
      equityAdmin.roleManagementPage.assertNoResultFoundIsVisible()
      equityAdmin.roleManagementPage.assertOtherGroupListDisplayed()
    })

    it('C17067414 Search permissions in active and inactive tab', () => {
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

    it('C17253538 Creating a new Role- Happy path', () => {
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

    it('C17253539 Discard creating a new Role', () => {
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

    it('C17253540 Create a new Role without mandatory fields', () => {
      const roleName = 'Filling Mandatory Fields ' + utils.getRandomNumber()

      equityAdmin.roleManagementPage.clickToCreateRoleWithNewName('{backspace}') // just to save the role with empty name
      equityAdmin.roleManagementPage.saveEntityInformation()

      equityAdmin.roleManagementPage.assertActiveRolesAreDisplayed()
      equityAdmin.roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully', false)
      equityAdmin.roleManagementPage.assertNotificationErrorDisplayed('Name should not be empty.')
      equityAdmin.roleManagementPage.assertEntityIsDisplayedInTheList(roleName, false)
    })

    it('C17253541 Create a Role with the same name', () => {
      const roleName = 'View Only'

      equityAdmin.roleManagementPage.clickToCreateRoleWithNewName(roleName)
      equityAdmin.roleManagementPage.saveEntityInformation()

      equityAdmin.roleManagementPage.assertActiveRolesAreDisplayed()
      equityAdmin.roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully', false)
      equityAdmin.roleManagementPage.assertNotificationErrorDisplayed('Name value is not valid.')
      equityAdmin.roleManagementPage.assertEntityIsDisplayedInTheList(roleName)
    })

    it('C17253542 Activate a Role', () => {
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

    it('C17253543 Deactivate a Role', () => {
      const roleId = 1504
      const roleName = 'QA 4'

      equityAdmin.roleManagementPage.clickRoleById(roleId)
      equityAdmin.roleManagementPage.clickToDeactivateEntity()

      equityAdmin.roleManagementPage.assertToastNotificationMessageIsDisplayed('Role deactivated')
      equityAdmin.roleManagementPage.assertInactiveRolesAreDisplayed()
      equityAdmin.roleManagementPage.assertEntityIsDisplayedInTheList(roleName)
      equityAdmin.roleManagementPage.assertRoleIsEditable(false)
    })

    it('C17253544 Duplicate a Role - Happy Path', () => {
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

    it('C17253545 Discard duplicate a role', () => {
      const roleId = 1506
      const duplicatedRoleName = 'Duplicated role ' + utils.getRandomNumber()

      equityAdmin.roleManagementPage.clickRoleById(roleId)
      equityAdmin.roleManagementPage.clickToDuplicateEntity()
      equityAdmin.roleManagementPage.discardEntityInformation()

      equityAdmin.roleManagementPage.assertEntityIsDisplayedInTheList(duplicatedRoleName, false)
    })

    it('C17261309 Duplicate an inactive role', () => {
      const roleId = 1507
      const roleName = 'QA 8'
      const duplicatedRoleName = 'Copy Of ' + roleName + ' ' + utils.getRandomNumber()

      equityAdmin.roleManagementPage.clickTab('Inactive')
      equityAdmin.roleManagementPage.clickRoleById(roleId)

      // Duplication
      equityAdmin.roleManagementPage.clickToDuplicateEntity()
      equityAdmin.roleManagementPage.assertEntityHeaderIsDisplayedAsExpected('Copy Of ' + roleName)

      equityAdmin.roleManagementPage.saveEntityInformation()

      equityAdmin.roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully')
      equityAdmin.roleManagementPage.assertActiveRolesAreDisplayed()
      equityAdmin.roleManagementPage.assertEntityIsDisplayedInTheList('Copy Of ' + roleName)
      equityAdmin.roleManagementPage.modifyEntityName(duplicatedRoleName)
      equityAdmin.roleManagementPage.saveEntityInformation()
      equityAdmin.roleManagementPage.assertEntityIsDisplayedInTheList(duplicatedRoleName)

      // Permissions check
      equityAdmin.roleManagementPage.assertPermissionState('categories', ['view', 'update', 'create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('categories', ['delete'], false)

      equityAdmin.roleManagementPage.assertPermissionState('clients', ['view'], true)
      equityAdmin.roleManagementPage.assertPermissionState('clients', ['update', 'create'], false)

      equityAdmin.roleManagementPage.assertPermissionState('roles', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('roles', ['view', 'update', 'create'], false)

      equityAdmin.roleManagementPage.assertPermissionState('settings', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('settings', ['view', 'update', 'create'], false)

      equityAdmin.roleManagementPage.assertPermissionState('tenants', ['view', 'update'], true)
      equityAdmin.roleManagementPage.assertPermissionState('tenants', ['delete'], false)
    })

    it('C18154749 List Roles - Happy Path (Active and Inactive Roles)', () => {
      equityAdmin.roleManagementPage.assertActiveRolesAreDisplayed()
      equityAdmin.roleManagementPage.assertRolesInAlphabeticalOrder()

      equityAdmin.roleManagementPage.clickTab('Inactive')
      equityAdmin.roleManagementPage.assertInactiveRolesAreDisplayed()
      equityAdmin.roleManagementPage.assertRolesInAlphabeticalOrder()
    })

    it('C18154751 List Roles - Navigation issues', () => {
      equityAdmin.roleManagementPage.checkPageUrl()
      equityAdmin.roleManagementPage.reloadPage()
      equityAdmin.roleManagementPage.checkPageUrl()
      equityAdmin.roleManagementPage.assertActiveRolesAreDisplayed()

      equityAdmin.applicationLeftMenuBar.clickLogoToGoToHomePage()
      equityAdmin.homePage.checkPageUrl()
      equityAdmin.homePage.goBackOrForwardInBrowser('back')
      equityAdmin.roleManagementPage.checkPageUrl()
      equityAdmin.roleManagementPage.assertActiveRolesAreDisplayed()

      equityAdmin.applicationLeftMenuBar.clickLogoToGoToHomePage()
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/role-management')
      equityAdmin.roleManagementPage.checkPageUrl()
      equityAdmin.roleManagementPage.assertActiveRolesAreDisplayed()
    })

    it('C18154752 Duplicate a Role - Maximum characters in name field', () => {
      const roleId = 1518
      const newRoleNameLessThan50Characters = 'Role ' + utils.getRandomNumber()

      equityAdmin.roleManagementPage.clickRoleById(roleId)
      equityAdmin.roleManagementPage.clickToDuplicateEntity()
      equityAdmin.roleManagementPage.saveEntityInformation()

      equityAdmin.roleManagementPage.assertNotificationErrorDisplayed('Name length must be 50 characters or fewer.')
      equityAdmin.roleManagementPage.assertEntityHeaderIsDisplayedAsExpected('Copy Of role with the exactly 50max characters in the name')

      equityAdmin.roleManagementPage.modifyEntityName(newRoleNameLessThan50Characters)
      equityAdmin.roleManagementPage.saveEntityInformation()

      equityAdmin.roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully')
      equityAdmin.roleManagementPage.assertNotificationErrorDisplayed('Name length must be 50 characters or fewer.', false)
      equityAdmin.roleManagementPage.assertEntityIsDisplayedInTheList(newRoleNameLessThan50Characters)
    })

    it('C18176175 Create a new Role - Role Name character limit', () => {
      let roleName = utils.generateRandomString(51)

      // 51 chars
      equityAdmin.roleManagementPage.clickToCreateRoleWithNewName(roleName)
      equityAdmin.roleManagementPage.saveEntityInformation()

      equityAdmin.roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully', false)
      equityAdmin.roleManagementPage.assertNotificationErrorDisplayed('Name length must be 50 characters or fewer.')
      equityAdmin.roleManagementPage.assertEntityIsDisplayedInTheList(roleName, false)

      // 50 chars
      roleName = utils.generateRandomString(50)
      equityAdmin.roleManagementPage.modifyEntityName(roleName)
      equityAdmin.roleManagementPage.saveEntityInformation()

      equityAdmin.roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully')
      equityAdmin.roleManagementPage.assertNotificationErrorDisplayed('Name length must be 50 characters or fewer.', false)
      equityAdmin.roleManagementPage.assertEntityIsDisplayedInTheList(roleName)
    })

    it('C18176176 View/Update Role Permissions - Add permission to Role', () => {
      const roleId = 1519

      equityAdmin.roleManagementPage.clickRoleById(roleId)
      equityAdmin.roleManagementPage.waitSpecificTime(1000) // This is really necessary, otherwise the UI will be flaky

      // Give some random permissions
      equityAdmin.roleManagementPage.addOrRemovePermissions('api', ['view'])
      equityAdmin.roleManagementPage.addOrRemovePermissions('groups', ['view', 'update'])

      // Delete permission given for all types
      equityAdmin.roleManagementPage.addOrRemoveAllPermissions('delete')

      // Save and assert it was saved
      equityAdmin.roleManagementPage.saveEntityInformation()
      equityAdmin.roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully')

      // Reload
      equityAdmin.roleManagementPage.reloadPage()
      equityAdmin.roleManagementPage.clickRoleById(roleId)

      // Assert random permissions given
      equityAdmin.roleManagementPage.assertPermissionState('api', ['view'], true)
      equityAdmin.roleManagementPage.assertPermissionState('groups', ['view', 'update'], true)
      equityAdmin.roleManagementPage.assertPermissionState('groups', ['create'], false)

      // Assert Delete permissions type given to all permissions
      equityAdmin.roleManagementPage.assertPermissionState('accessfilters', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('categories', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('companysecurity', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('contents', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('contributions', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('emails', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('grants', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('groups', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants_bankaccounts', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants_compliance', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants_dividends', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants_financialreporting', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants_gateway', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants_linkage', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants_partners', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants_restrictions', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants_sharemanagement', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants_sharetransactions', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants_tax', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants_trading', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('payrollschedules', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('plans', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('purchaseplans', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('roles', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('settings', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('shareissuances', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('tags', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('tenants', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('transactions', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('transactionwindows', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('users', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('vestingschedules', ['delete'], true)

      //teardown - Remove all permissions at once
      cy.log('--- TEARDOWN ---')
      equityAdmin.roleManagementPage.addOrRemoveAllPermissions('view')
      equityAdmin.roleManagementPage.addOrRemoveAllPermissions('view')
      equityAdmin.roleManagementPage.addOrRemoveAllPermissions('update')
      equityAdmin.roleManagementPage.addOrRemoveAllPermissions('update')
      equityAdmin.roleManagementPage.addOrRemoveAllPermissions('create')
      equityAdmin.roleManagementPage.addOrRemoveAllPermissions('create')
      equityAdmin.roleManagementPage.addOrRemoveAllPermissions('delete')
      equityAdmin.roleManagementPage.saveEntityInformation()
      equityAdmin.roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully')
    })

    it('C18176177 View/Update Role Permissions - Remove permission from Role', () => {
      const roleId = 1520

      equityAdmin.roleManagementPage.clickRoleById(roleId)

      // Remove some permiossions
      equityAdmin.roleManagementPage.addOrRemovePermissions('categories', ['update'], false)
      equityAdmin.roleManagementPage.addOrRemovePermissions('participants', ['update', 'create', 'delete'], false)

      // Remove all permissions for view
      equityAdmin.roleManagementPage.addOrRemoveAllPermissions('view')

      equityAdmin.roleManagementPage.saveEntityInformation()
      equityAdmin.roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully')

      equityAdmin.roleManagementPage.reloadPage()
      equityAdmin.roleManagementPage.clickRoleById(roleId)

      // Assert permissions removed
      equityAdmin.roleManagementPage.assertPermissionState('categories', ['update'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants', ['update', 'create', 'delete'], false)

      // Assert Delete permissions type removed from all permissions
      equityAdmin.roleManagementPage.assertPermissionState('accessfilters', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('api', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('bi', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('categories', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('clients', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('clients_modules', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('companysecurity', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('contents', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('contributions', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('emails', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('exchanges', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('grants', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('groups', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('mobile', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants_bankaccounts', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants_compliance', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants_dividends', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants_events', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants_financialreporting', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants_gateway', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants_linkage', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants_onbehalf', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants_partners', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants_restrictions', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants_sharemanagement', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants_sharetransactions', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants_tax', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants_trading', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('partners', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('payrollschedules', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('plans', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('purchaseplans', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('roles', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('settings', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('shareissuances', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('sms', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('tags', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('tenants', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('terminationrequests', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('terminationtypes', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('transactions', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('transactionwindows', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('users', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('vestingschedules', ['view'], false)

      //teardown - Add permissions removed
      cy.log('--- TEARDOWN ---')
      equityAdmin.roleManagementPage.addOrRemoveAllPermissions('view')
      equityAdmin.roleManagementPage.addOrRemovePermissions('categories', ['update'], true)
      equityAdmin.roleManagementPage.addOrRemovePermissions('participants', ['update', 'create', 'delete'], true)
      equityAdmin.roleManagementPage.saveEntityInformation()
      equityAdmin.roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully')
    })

    it('C18176178 View/Update Role Permissions - Discard unsaved changes', () => {
      const roleId = 1521

      equityAdmin.roleManagementPage.clickRoleById(roleId)
      equityAdmin.roleManagementPage.waitSpecificTime(1000) // This is really necessary, otherwise the UI will be flaky

      // Give some random permissions
      equityAdmin.roleManagementPage.addOrRemovePermissions('bi', ['view'], false)
      equityAdmin.roleManagementPage.addOrRemovePermissions('exchanges', ['view'])
      equityAdmin.roleManagementPage.addOrRemovePermissions('exchanges', ['update'], false)
      equityAdmin.roleManagementPage.addOrRemovePermissions('participants', ['update'], false)
      equityAdmin.roleManagementPage.addOrRemovePermissions('roles', ['delete'])

      // Delete permission given for all types
      equityAdmin.roleManagementPage.addOrRemoveAllPermissions('create')

      // Assert random permissions state BEFORE discarding
      equityAdmin.roleManagementPage.assertPermissionState('bi', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('exchanges', ['view'], true)
      equityAdmin.roleManagementPage.assertPermissionState('exchanges', ['update', 'create'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants', ['update', 'create'], false)
      equityAdmin.roleManagementPage.assertPermissionState('roles', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('roles', ['create'], false)

      // Discarding Modifications
      equityAdmin.roleManagementPage.discardEntityInformation()

      // Assert random permissions AFTER discarding
      equityAdmin.roleManagementPage.assertPermissionState('bi', ['view'], true)
      equityAdmin.roleManagementPage.assertPermissionState('exchanges', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('exchanges', ['update', 'create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants', ['update', 'create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants', ['view', 'delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('roles', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('roles', ['view', 'update', 'create'], true)
    })
  })

  context('Tenant 1 settings over direct navigation (navigateToUrl) with different logins', () => {
    it('C17261305 Enabled view permission for view only user', () => {
      const roleId = 1490

      equityAdmin.loginPage.login('ViewOnlyUser@globalshares.com')
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/role-management')
      equityAdmin.roleManagementPage.checkPageUrl()

      equityAdmin.roleManagementPage.clickRoleById(roleId)
      equityAdmin.roleManagementPage.assertRoleIsEditable(false)
    })

    it('C17261306 Enabled create permission for a user', () => {
      const roleId = 1510

      equityAdmin.loginPage.login('ivasiljev@globalshares.com')
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/role-management')
      equityAdmin.roleManagementPage.checkPageUrl()

      equityAdmin.roleManagementPage.clickRoleById(roleId)
      equityAdmin.roleManagementPage.assertRoleIsEditable(false)
      equityAdmin.roleManagementPage.assertCreateNewRoleButtonDisplayed()
    })

    it('C17261307 Enabled Update permission for a user', () => {
      const roleId = 1513

      equityAdmin.loginPage.login('gbmeireles@globalshares.com')
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/role-management')
      equityAdmin.roleManagementPage.checkPageUrl()

      equityAdmin.roleManagementPage.clickRoleById(roleId)
      equityAdmin.roleManagementPage.addOrRemoveAllPermissions('view')
      equityAdmin.roleManagementPage.addOrRemoveAllPermissions('update')
      equityAdmin.roleManagementPage.addOrRemoveAllPermissions('create')
      equityAdmin.roleManagementPage.addOrRemoveAllPermissions('delete')
      equityAdmin.roleManagementPage.saveEntityInformation()
      equityAdmin.roleManagementPage.assertNotificationErrorDisplayed('Unfortunately, you are restricted to perform that operation')
    })

    it('C17261308 Enabled delete permission for a user', () => {
      const roleId = 1514

      equityAdmin.loginPage.login('cgiles@globalshares.com')
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/role-management')
      equityAdmin.roleManagementPage.checkPageUrl()

      equityAdmin.roleManagementPage.clickRoleById(roleId)
      equityAdmin.roleManagementPage.clickToDeactivateEntity()
      equityAdmin.roleManagementPage.assertNotificationErrorDisplayed('Unfortunately, you are restricted to perform that operation')
    })

    it('C18154753 Creating a new Role without permission', () => {
      equityAdmin.loginPage.login('ViewOnlyUser@globalshares.com')
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/role-management')
      equityAdmin.roleManagementPage.checkPageUrl()

      equityAdmin.roleManagementPage.assertActiveRolesAreDisplayed()
      equityAdmin.roleManagementPage.assertCreateNewRoleButtonDisplayed(false)
      equityAdmin.roleManagementPage.clickTab('Inactive')
      equityAdmin.roleManagementPage.assertCreateNewRoleButtonDisplayed(false)

      equityAdmin.roleManagementPage.addPathToUrlAndVisitIt('/0')
      equityAdmin.roleManagementPage.assertRoleIsEditable(false)
    })

    it('C18176179 Duplicate a Role - No permission', () => {
      const roleId = 1490
      const roleName = 'View Only'

      equityAdmin.loginPage.login('ViewOnlyUser@globalshares.com')
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/role-management')
      equityAdmin.roleManagementPage.checkPageUrl()

      equityAdmin.roleManagementPage.clickRoleById(roleId)
      equityAdmin.roleManagementPage.assertEntityHeaderIsDisplayedAsExpected(roleName)
      equityAdmin.roleManagementPage.assertThreeDotButtonDisplayed(false)
      equityAdmin.roleManagementPage.addPathToUrlAndVisitIt(';action=duplicate')
      equityAdmin.roleManagementPage.assertEntityHeaderIsDisplayedAsExpected('Copy Of ' + roleName)
      equityAdmin.roleManagementPage.assertRoleIsEditable(false)
      equityAdmin.roleManagementPage.assertEntityNameEditable(false)
      equityAdmin.roleManagementPage.assertSaveEntityButtonDisplayed(false)
    })
  })

  /**
   * @mocks_used
   */
  context('Mocked data tests', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login()
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/role-management')
      equityAdmin.roleManagementPage.checkPageUrl()
    })

    it('C18154750 List Roles - Empty State (Active and Inactive Roles))', () => {
      equityAdmin.roleManagementPage.interceptAndMockRolesLoadingRequest('rolesManagement_EmptyRoleList.json')

      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/role-management')
      equityAdmin.roleManagementPage.assertEmptyStateMessageIsVisible()
      equityAdmin.roleManagementPage.clickTab('Inactive')
      equityAdmin.roleManagementPage.assertEmptyStateMessageIsVisible()
    })
  })
})
