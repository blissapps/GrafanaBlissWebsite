import RoleManagementPage from '../../../support/pages/globalSettingsPages/userManagementPages/roleManagementPage'

import LeftMenuNavBar from '../../../support/components/leftMenuNavBar'
import SettingsMenuNavBar from '../../../support/components/settingsMenuNavBar'
import SearchBar from '../../../support/components/searchBar'

import Utils from '../../../support/utils'

describe('Role Management tests over User Management settings', () => {
  // Pages
  const roleManagementPage = new RoleManagementPage()

  // Components
  const leftMenuNavBar = new LeftMenuNavBar()
  const settingsMenuNavBar = new SettingsMenuNavBar()
  const searchBar = new SearchBar()

  // Others
  const utils = new Utils()

  beforeEach(() => {
    cy.login()
    settingsMenuNavBar.accessGlobalSettingsMenu('user', 'role')
    roleManagementPage.checkRoleManagementUrl()
  })

  // ************************************************ TESTS AS ADMIN TENANT ************************************************** //

  it('C7544080_Role_Check_Behavior_When_Closing_The_Settings', () => {
    settingsMenuNavBar.closeGlobalSettingsNavBar()
    roleManagementPage.checkRoleManagementUrl()
  })

  /**
   *
   * @missing_data Besides the roles we need to search, we need to have some roles in both active and inactive tabs to be displayed in the OTHER GROUP
   */
  it.skip('C7544081_Search_Engine_Search_For_Role_With_Different_Combinations_In_Active_And_Inactive_Tabs', () => {
    const rolesIdActiveTab = [1632, 1633, 1634]
    const rolesIdInactiveTab = [1635, 1636]

    roleManagementPage.assertNoRoleSelectedMessageIsDisplayed()

    let role = 'role to be searched'
    searchBar.search(role)
    roleManagementPage.assertAmountOfSearchResultsInTheList(3)
    roleManagementPage.assertSearchResultListAccuracy(rolesIdActiveTab)
    roleManagementPage.assertOtherGroupListDisplayed()
    roleManagementPage.assertAllSearchResultItensAreDisplayedInHighlightedMode()

    role = 'ROLE TO BE SEARCHED'
    searchBar.search(role)
    roleManagementPage.assertAmountOfSearchResultsInTheList(3)
    roleManagementPage.assertSearchResultListAccuracy(rolesIdActiveTab)
    roleManagementPage.assertOtherGroupListDisplayed()
    roleManagementPage.assertAllSearchResultItensAreDisplayedInHighlightedMode()

    role = 'role To Be searchEd'
    searchBar.search(role)
    roleManagementPage.assertAmountOfSearchResultsInTheList(3)
    roleManagementPage.assertSearchResultListAccuracy(rolesIdActiveTab)
    roleManagementPage.assertOtherGroupListDisplayed()
    roleManagementPage.assertAllSearchResultItensAreDisplayedInHighlightedMode()

    role = 'randomName'
    searchBar.search(role)
    roleManagementPage.assertNoResultFoundIsVisible()
    roleManagementPage.assertOtherGroupListDisplayed()

    role = 'SELECT * FROM groups'
    searchBar.search(role)
    roleManagementPage.assertNoResultFoundIsVisible()
    roleManagementPage.assertOtherGroupListDisplayed()

    // Now on Inactive TAB
    roleManagementPage.clickTabByTitle('Inactive')

    role = 'ZZZ'
    searchBar.search(role)
    roleManagementPage.assertAmountOfSearchResultsInTheList(2)
    roleManagementPage.assertSearchResultListAccuracy(rolesIdInactiveTab)
    roleManagementPage.assertOtherGroupListDisplayed()
    roleManagementPage.assertAllSearchResultItensAreDisplayedInHighlightedMode()

    role = 'zzz'
    searchBar.search(role)
    roleManagementPage.assertAmountOfSearchResultsInTheList(2)
    roleManagementPage.assertSearchResultListAccuracy(rolesIdInactiveTab)
    roleManagementPage.assertOtherGroupListDisplayed()
    roleManagementPage.assertAllSearchResultItensAreDisplayedInHighlightedMode()

    role = 'ZzZ'
    searchBar.search(role)
    roleManagementPage.assertAmountOfSearchResultsInTheList(2)
    roleManagementPage.assertSearchResultListAccuracy(rolesIdInactiveTab)
    roleManagementPage.assertOtherGroupListDisplayed()
    roleManagementPage.assertAllSearchResultItensAreDisplayedInHighlightedMode()

    role = 'randomName'
    searchBar.search(role)
    roleManagementPage.assertNoResultFoundIsVisible()
    roleManagementPage.assertOtherGroupListDisplayed()

    role = 'SELECT * FROM roles'
    searchBar.search(role)
    roleManagementPage.assertNoResultFoundIsVisible()
    roleManagementPage.assertOtherGroupListDisplayed()
  })

  /**
   * @missing_data Need to have at least 50 registered roles to scroll down
   */
  it.skip('C9281161_Role_CRUD_Permissions_Are_Visible', () => {
    roleManagementPage.clickLastRole()
    roleManagementPage.assertPermissionsHeadersAreDisplayed()
  })

  /**
   * @missing_data Need to have some roles in both active and inactive tabs
   */
  it.skip('C7499688_List Roles_Happy_Path_Active_And_Inactive_Roles', () => {
    roleManagementPage.assertActiveRolesAreDisplayed()
    roleManagementPage.assertRolesInAlphabeticalOrder()

    roleManagementPage.clickTabByTitle('Inactive')
    roleManagementPage.assertInactiveRolesAreDisplayed()
    roleManagementPage.assertRolesInAlphabeticalOrder()
  })

  /**
   * @missing_data For test this scenario there should be no Active nor Inactive roles.
   */
  it.skip('C7499690_Empty_State_Active_And_Inactive_Roles)', () => {
    roleManagementPage.assertEmptyStateMessageIsVisible()
    roleManagementPage.clickTabByTitle('Inactive')
    roleManagementPage.assertEmptyStateMessageIsVisible()
  })

  /**
   * @missing_data Need to have some roles in the active tab
   */
  it.skip('C7499693_List_Roles_Navigation_Issues)', () => {
    roleManagementPage.reloadPage()
    roleManagementPage.checkRoleManagementUrl()
    roleManagementPage.assertActiveRolesAreDisplayed()

    leftMenuNavBar.clickLogoToGoToHomePage()
    roleManagementPage.goBackOrForwardInBrowser('back')
    roleManagementPage.checkRoleManagementUrl()
    roleManagementPage.assertActiveRolesAreDisplayed()

    leftMenuNavBar.clickLogoToGoToHomePage()
    cy.visit('/tenant/1/settings/role-management', { failOnStatusCode: false })
    roleManagementPage.checkRoleManagementUrl()
    roleManagementPage.assertActiveRolesAreDisplayed()
  })

  it('C7499700_Create_A_New_Role_Happy_Path', () => {
    const roleName = 'Create new role ' + utils.getRandomNumber()

    roleManagementPage.clickToCreateRoleWithNewName(roleName)
    roleManagementPage.insertOrRemovePermissions('accessfilters', ['view', 'update', 'create', 'delete'])
    roleManagementPage.insertOrRemovePermissions('api', ['view'])
    roleManagementPage.insertOrRemovePermissions('settings', ['update'])
    roleManagementPage.insertOrRemovePermissions('settings', ['delete'])
    roleManagementPage.insertOrRemovePermissions('groups', ['view', 'update', 'create', 'delete'])

    roleManagementPage.saveEntityInformation()

    roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully')
    roleManagementPage.assertActiveRolesAreDisplayed()
    roleManagementPage.assertEntityIsDisplayedInTheList(roleName)
  })

  it('C7499701_Create_A_New_Role_Discard_Role', () => {
    const roleName = 'Create and Discard' + utils.getRandomNumber()

    roleManagementPage.clickToCreateRoleWithNewName(roleName)
    roleManagementPage.insertOrRemovePermissions('accessfilters', ['view', 'update', 'create', 'delete'])
    roleManagementPage.insertOrRemovePermissions('api', ['view'])
    roleManagementPage.insertOrRemovePermissions('groups', ['view', 'update', 'create', 'delete'])

    roleManagementPage.discardEntityInformation()
    roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully', false)
    roleManagementPage.assertEntityIsDisplayedInTheList(roleName, false)
  })

  /**
   * SKIPPING DUE TO https://globalshares.atlassian.net/browse/PB-922
   */
  it.skip('C7499702_Create_A_New_Role_Mandatory_Fields_Are_Not_Populated', () => {
    const roleName = 'Filling Mandatory Fields ' + utils.getRandomNumber()

    roleManagementPage.clickToCreateRoleWithNewName('{backspace}') // just to save the role with empty name
    roleManagementPage.saveEntityInformation()

    roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully', false)
    roleManagementPage.assertNotificationErrorDisplayed('Name should not be empty.')
    roleManagementPage.assertEntityIsDisplayedInTheList(roleName, false)

    roleManagementPage.modifyEntityName(roleName)
    roleManagementPage.saveEntityInformation()

    roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully')
    roleManagementPage.assertNotificationErrorDisplayed('Name should not be empty.', false)
    roleManagementPage.assertEntityIsDisplayedInTheList(roleName)
  })

  /**
   * SKIPPING DUE TO https://globalshares.atlassian.net/browse/PB-922
   */
  it.skip('C7499704_Create_A_New_Role_Name_Character_Limit_When_Creating', () => {
    let roleName = utils.generateRandomString(51)

    // 51 chars
    roleManagementPage.clickToCreateRoleWithNewName(roleName)
    roleManagementPage.saveEntityInformation()

    roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully', false)
    roleManagementPage.assertNotificationErrorDisplayed('Name length must be 50 characters or fewer.')
    roleManagementPage.assertEntityIsDisplayedInTheList(roleName, false)

    // 50 chars
    roleName = utils.generateRandomString(50)
    roleManagementPage.modifyEntityName(roleName)
    roleManagementPage.saveEntityInformation()

    roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully')
    roleManagementPage.assertNotificationErrorDisplayed('Name length must be 50 characters or fewer.', false)
    roleManagementPage.assertEntityIsDisplayedInTheList(roleName)
  })

  /**
   * @missing_data Need to have a role created
   *
   * SKIPPING DUE TO https://globalshares.atlassian.net/browse/PB-922
   */
  it.skip('C7499705_Create_A_New_Role_Name_Character_Limit_When_Editing', () => {
    const roleId = 1375
    const roleName = 'Edit me'
    let newRoleName = utils.generateRandomString(51)

    // 51 chars
    roleManagementPage.clickRoleById(roleId)
    roleManagementPage.modifyEntityName(newRoleName)
    roleManagementPage.saveEntityInformation()

    roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully', false)
    roleManagementPage.assertNotificationErrorDisplayed('Name length must be 50 characters or fewer.')
    roleManagementPage.assertEntityIsDisplayedInTheList(newRoleName, false)

    // 50 chars
    newRoleName = utils.generateRandomString(50)
    roleManagementPage.modifyEntityName(newRoleName)
    roleManagementPage.saveEntityInformation()

    roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully')
    roleManagementPage.assertNotificationErrorDisplayed('Name length must be 50 characters or fewer.', false)
    roleManagementPage.assertEntityIsDisplayedInTheList(newRoleName)

    // tearDown
    cy.log('TEARDOWN')
    roleManagementPage.modifyEntityName(roleName)
    roleManagementPage.saveEntityInformation()
  })

  /**
   * @missing_data For this scenario we need to have a role called 'Existing Role' (No permissions needed)
   *
   */
  it.skip('C7499706_Create_A_New_Role_Same_Role_Names', () => {
    const roleName = 'Existing Role'
    const roleId = 1498

    roleManagementPage.clickToCreateRoleWithNewName(roleName)
    roleManagementPage.saveEntityInformation()
    roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully', false)
    roleManagementPage.assertNotificationErrorDisplayed('Name value is not valid.')
    roleManagementPage.discardEntityInformation()

    roleManagementPage.clickRoleById(roleId, false)
    roleManagementPage.modifyEntityName(roleName)
    roleManagementPage.saveEntityInformation()
    roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully', false)
    roleManagementPage.assertNotificationErrorDisplayed('', false)
  })

  /**
   * @missing_data For this scenario we need to have a role called 'Add Permissions To Role' with no permissions selected
   */
  it.skip('C7499830_View/Update_Role_Permissions_Add_Permission_To_Role', () => {
    const roleId = 1515

    roleManagementPage.clickRoleById(roleId)

    roleManagementPage.insertOrRemovePermissions('accessfilters', ['view', 'update', 'create'])
    roleManagementPage.insertOrRemovePermissions('api', ['view'])
    roleManagementPage.insertOrRemovePermissions('settings', ['update', 'delete'])
    roleManagementPage.insertOrRemovePermissions('groups', ['view', 'delete'])
    roleManagementPage.insertOrRemoveAllPermissions('delete')
    roleManagementPage.saveEntityInformation()
    roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully', true)

    roleManagementPage.reloadPage()
    roleManagementPage.clickRoleById(roleId)

    // Assert permissions given
    roleManagementPage.assertPermissionState('accessfilters', ['view', 'update', 'create'], true)
    roleManagementPage.assertPermissionState('api', ['view'], true)
    roleManagementPage.assertPermissionState('bi', ['view'], false)
    roleManagementPage.assertPermissionState('clients', ['update'], false)
    roleManagementPage.assertPermissionState('settings', ['update'], true)
    roleManagementPage.assertPermissionState('settings', ['view', 'create'], false)
    roleManagementPage.assertPermissionState('groups', ['view'], true)
    roleManagementPage.assertPermissionState('groups', ['update', 'create'], false)

    // Assert Delete permissions type given to all permissions
    roleManagementPage.assertPermissionState('accessfilters', ['delete'], true)
    roleManagementPage.assertPermissionState('categories', ['delete'], true)
    roleManagementPage.assertPermissionState('companysecurity', ['delete'], true)
    roleManagementPage.assertPermissionState('contents', ['delete'], true)
    roleManagementPage.assertPermissionState('contributions', ['delete'], true)
    roleManagementPage.assertPermissionState('emails', ['delete'], true)
    roleManagementPage.assertPermissionState('grants', ['delete'], true)
    roleManagementPage.assertPermissionState('groups', ['delete'], true)
    roleManagementPage.assertPermissionState('participants', ['delete'], true)
    roleManagementPage.assertPermissionState('participants_bankaccounts', ['delete'], true)
    roleManagementPage.assertPermissionState('participants_compliance', ['delete'], true)
    roleManagementPage.assertPermissionState('participants_dividends', ['delete'], true)
    roleManagementPage.assertPermissionState('participants_financialreporting', ['delete'], true)
    roleManagementPage.assertPermissionState('participants_gateway', ['delete'], true)
    roleManagementPage.assertPermissionState('participants_linkage', ['delete'], true)
    roleManagementPage.assertPermissionState('participants_partners', ['delete'], true)
    roleManagementPage.assertPermissionState('participants_restrictions', ['delete'], true)
    roleManagementPage.assertPermissionState('participants_sharemanagement', ['delete'], true)
    roleManagementPage.assertPermissionState('participants_sharetransactions', ['delete'], true)
    roleManagementPage.assertPermissionState('participants_tax', ['delete'], true)
    roleManagementPage.assertPermissionState('participants_trading', ['delete'], true)
    roleManagementPage.assertPermissionState('payrollschedules', ['delete'], true)
    roleManagementPage.assertPermissionState('plans', ['delete'], true)
    roleManagementPage.assertPermissionState('purchaseplans', ['delete'], true)
    roleManagementPage.assertPermissionState('roles', ['delete'], true)
    roleManagementPage.assertPermissionState('settings', ['delete'], true)
    roleManagementPage.assertPermissionState('shareissuances', ['delete'], true)
    roleManagementPage.assertPermissionState('tags', ['delete'], true)
    roleManagementPage.assertPermissionState('tenants', ['delete'], true)
    roleManagementPage.assertPermissionState('transactions', ['delete'], true)
    roleManagementPage.assertPermissionState('transactionwindows', ['delete'], true)
    roleManagementPage.assertPermissionState('users', ['delete'], true)
    roleManagementPage.assertPermissionState('vestingschedules', ['delete'], true)

    //teardown - Remove all permissions at once
    cy.log('--- TEARDOWN ---')
    roleManagementPage.insertOrRemoveAllPermissions('view')
    roleManagementPage.insertOrRemoveAllPermissions('view')
    roleManagementPage.insertOrRemoveAllPermissions('update')
    roleManagementPage.insertOrRemoveAllPermissions('update')
    roleManagementPage.insertOrRemoveAllPermissions('create')
    roleManagementPage.insertOrRemoveAllPermissions('create')
    roleManagementPage.insertOrRemoveAllPermissions('delete')
    roleManagementPage.saveEntityInformation()
  })

  /**
   * @missing_data For this scenario we need to have a role called 'Remove permission' with some permissions selected
   *               The permissions are: access filters [view and update], categories [view], users [create], and DELETE in all permissions
   */
  it.skip('C7499831_View/Update_Role_Permissions_Remove_Permission_From_Role', () => {
    const roleId = 1423

    roleManagementPage.clickRoleById(roleId)

    roleManagementPage.insertOrRemovePermissions('accessfilters', ['view', 'update'], false)
    roleManagementPage.insertOrRemovePermissions('categories', ['view'], false)
    roleManagementPage.insertOrRemovePermissions('users', ['create'], false)
    roleManagementPage.insertOrRemoveAllPermissions('delete')
    roleManagementPage.saveEntityInformation()
    roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully', true)

    roleManagementPage.reloadPage()
    roleManagementPage.clickRoleById(roleId)

    // Assert permissions removed
    roleManagementPage.assertPermissionState('accessfilters', ['view', 'update'], false)
    roleManagementPage.assertPermissionState('categories', ['view'], false)
    roleManagementPage.assertPermissionState('users', ['create'], false)

    // Assert Delete permissions type removed from all permissions
    roleManagementPage.assertPermissionState('accessfilters', ['delete'], false)
    roleManagementPage.assertPermissionState('categories', ['delete'], false)
    roleManagementPage.assertPermissionState('companysecurity', ['delete'], false)
    roleManagementPage.assertPermissionState('contents', ['delete'], false)
    roleManagementPage.assertPermissionState('contributions', ['delete'], false)
    roleManagementPage.assertPermissionState('emails', ['delete'], false)
    roleManagementPage.assertPermissionState('grants', ['delete'], false)
    roleManagementPage.assertPermissionState('groups', ['delete'], false)
    roleManagementPage.assertPermissionState('participants', ['delete'], false)
    roleManagementPage.assertPermissionState('participants_bankaccounts', ['delete'], false)
    roleManagementPage.assertPermissionState('participants_compliance', ['delete'], false)
    roleManagementPage.assertPermissionState('participants_dividends', ['delete'], false)
    roleManagementPage.assertPermissionState('participants_financialreporting', ['delete'], false)
    roleManagementPage.assertPermissionState('participants_gateway', ['delete'], false)
    roleManagementPage.assertPermissionState('participants_linkage', ['delete'], false)
    roleManagementPage.assertPermissionState('participants_partners', ['delete'], false)
    roleManagementPage.assertPermissionState('participants_restrictions', ['delete'], false)
    roleManagementPage.assertPermissionState('participants_sharemanagement', ['delete'], false)
    roleManagementPage.assertPermissionState('participants_sharetransactions', ['delete'], false)
    roleManagementPage.assertPermissionState('participants_tax', ['delete'], false)
    roleManagementPage.assertPermissionState('participants_trading', ['delete'], false)
    roleManagementPage.assertPermissionState('payrollschedules', ['delete'], false)
    roleManagementPage.assertPermissionState('plans', ['delete'], false)
    roleManagementPage.assertPermissionState('purchaseplans', ['delete'], false)
    roleManagementPage.assertPermissionState('roles', ['delete'], false)
    roleManagementPage.assertPermissionState('settings', ['delete'], false)
    roleManagementPage.assertPermissionState('shareissuances', ['delete'], false)
    roleManagementPage.assertPermissionState('tags', ['delete'], false)
    roleManagementPage.assertPermissionState('tenants', ['delete'], false)
    roleManagementPage.assertPermissionState('transactions', ['delete'], false)
    roleManagementPage.assertPermissionState('transactionwindows', ['delete'], false)
    roleManagementPage.assertPermissionState('users', ['delete'], false)
    roleManagementPage.assertPermissionState('vestingschedules', ['delete'], false)

    //teardown - Add permissions removed
    cy.log('--- TEARDOWN ---')
    roleManagementPage.insertOrRemoveAllPermissions('delete')
    roleManagementPage.insertOrRemovePermissions('accessfilters', ['view', 'update'], true)
    roleManagementPage.insertOrRemovePermissions('categories', ['view'], true)
    roleManagementPage.insertOrRemovePermissions('users', ['create'], true)
    roleManagementPage.saveEntityInformation()
  })

  /**
   * @missing_data For this scenario we need to have a role called 'Discard changes' with some permissions selected
   *               The permissions are: access filters [all], api [view], groups [view and delete], settings [delete] and CREATE in all permissions
   */
  it.skip('C7499832_View/Update_Role_Permissions_Discard_Unsaved_Changes', () => {
    const roleId = 1403

    roleManagementPage.clickRoleById(roleId)

    roleManagementPage.insertOrRemovePermissions('accessfilters', ['update'], false)
    roleManagementPage.insertOrRemovePermissions('api', ['view'], false)
    roleManagementPage.insertOrRemovePermissions('groups', ['delete'], false)
    roleManagementPage.insertOrRemovePermissions('settings', ['delete'], false)
    roleManagementPage.insertOrRemovePermissions('bi', ['view'], true)
    roleManagementPage.insertOrRemovePermissions('categories', ['update', 'delete'], true)
    roleManagementPage.insertOrRemoveAllPermissions('create')
    roleManagementPage.discardEntityInformation()
    roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully', false)

    roleManagementPage.reloadPage()
    roleManagementPage.clickRoleById(roleId)

    // Assert permissions not changed
    roleManagementPage.assertPermissionState('accessfilters', ['view', 'update', 'delete'], true)
    roleManagementPage.assertPermissionState('api', ['view'], true)
    roleManagementPage.assertPermissionState('groups', ['view', 'delete'], true)
    roleManagementPage.assertPermissionState('settings', ['delete'], true)
    roleManagementPage.assertPermissionState('bi', ['view'], false)
    roleManagementPage.assertPermissionState('categories', ['update', 'delete'], false)

    // Assert CREATE permissions type removed from all permissions
    roleManagementPage.assertPermissionState('accessfilters', ['create'], true)
    roleManagementPage.assertPermissionState('categories', ['create'], true)
    roleManagementPage.assertPermissionState('clients', ['create'], true)
    roleManagementPage.assertPermissionState('clients_modules', ['create'], true)
    roleManagementPage.assertPermissionState('companysecurity', ['create'], true)
    roleManagementPage.assertPermissionState('contents', ['create'], true)
    roleManagementPage.assertPermissionState('contributions', ['create'], true)
    roleManagementPage.assertPermissionState('emails', ['create'], true)
    roleManagementPage.assertPermissionState('grants', ['create'], true)
    roleManagementPage.assertPermissionState('groups', ['create'], true)
    roleManagementPage.assertPermissionState('participants', ['create'], true)
    roleManagementPage.assertPermissionState('participants_account', ['create'], true)
    roleManagementPage.assertPermissionState('participants_bankaccounts', ['create'], true)
    roleManagementPage.assertPermissionState('participants_compliance', ['create'], true)
    roleManagementPage.assertPermissionState('participants_dividends', ['create'], true)
    roleManagementPage.assertPermissionState('participants_financialreporting', ['create'], true)
    roleManagementPage.assertPermissionState('participants_gateway', ['create'], true)
    roleManagementPage.assertPermissionState('participants_linkage', ['create'], true)
    roleManagementPage.assertPermissionState('participants_partners', ['create'], true)
    roleManagementPage.assertPermissionState('participants_restrictions', ['create'], true)
    roleManagementPage.assertPermissionState('participants_sharemanagement', ['create'], true)
    roleManagementPage.assertPermissionState('participants_sharetransactions', ['create'], true)
    roleManagementPage.assertPermissionState('participants_tax', ['create'], true)
    roleManagementPage.assertPermissionState('participants_trading', ['create'], true)
    roleManagementPage.assertPermissionState('partner_account', ['create'], true)
    roleManagementPage.assertPermissionState('partner_custodyaccountmovement', ['create'], true)
    roleManagementPage.assertPermissionState('payrollschedules', ['create'], true)
    roleManagementPage.assertPermissionState('plans', ['create'], true)
    roleManagementPage.assertPermissionState('purchaseplans', ['create'], true)
    roleManagementPage.assertPermissionState('roles', ['create'], true)
    roleManagementPage.assertPermissionState('settings', ['create'], true)
    roleManagementPage.assertPermissionState('shareissuances', ['create'], true)
    roleManagementPage.assertPermissionState('tags', ['create'], true)
    roleManagementPage.assertPermissionState('terminationrequests', ['create'], true)
    roleManagementPage.assertPermissionState('transactions', ['create'], true)
    roleManagementPage.assertPermissionState('transactionwindows', ['create'], true)
    roleManagementPage.assertPermissionState('users', ['create'], true)
    roleManagementPage.assertPermissionState('vestingschedules', ['create'], true)
  })

  /**
   * @missing_data For this scenario we need to have a role called 'Activate and Inactivate' in the Active tab
   *
   * SKIPPING also due to https://globalshares.atlassian.net/browse/PB-905 and https://globalshares.atlassian.net/browse/PB-963
   *
   * @missing_steps check if the role is editable or not
   */
  it.skip('C7499833_Deactivate_And_Activate_Role', () => {
    const roleId = 1677
    const roleName = 'Activate and Inactivate'

    // Inactivate role
    cy.log('Inactivate role')
    roleManagementPage.clickRoleById(roleId)
    roleManagementPage.clickToDeactivateEntity()
    roleManagementPage.assertToastNotificationMessageIsDisplayed('Role deactivated', true, true)
    roleManagementPage.assertInactiveRolesAreDisplayed()
    roleManagementPage.assertEntityIsDisplayedInTheList(roleName)
    // Missing this step to make sure that the role is non-editable while deactivated
    // roleManagementPage.assertRoleIsEditable(false)

    // Activate role
    cy.log('Activate role')
    roleManagementPage.clickRoleById(roleId, false)
    roleManagementPage.activateRole()
    roleManagementPage.assertToastNotificationMessageIsDisplayed('Role activated')
    roleManagementPage.assertActiveRolesAreDisplayed()
    roleManagementPage.assertEntityIsDisplayedInTheList(roleName)
    roleManagementPage.clickRoleById(roleId, false)
    roleManagementPage.assertRoleIsEditable()
  })

  /**
   * @missing_data Need to have a role called "Duplicate me" or something like that
   *
   * SKIPPING also due to https://globalshares.atlassian.net/browse/PB-906
   */
  it.skip('C7544052_Roles_Duplicate_A_Role', () => {
    const roleId = 1390
    const roleName = 'Duplicate me'

    roleManagementPage.clickRoleById(roleId)
    roleManagementPage.clickToDuplicateEntity()
    roleManagementPage.assertEntityHeaderIsDisplayedAsExpected('Copy of ' + roleName)
    roleManagementPage.assertEntityIsFocused()
    roleManagementPage.saveEntityInformation()
    roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully')
  })

  /**
   * @missing_data Need to have a role with 50 characters in the name
   *
   * SKIPPING also due to https://globalshares.atlassian.net/browse/PB-922
   */
  it.skip('C7544054_Duplicate_Role_Maximum_Characters_In_Name_Field', () => {
    const roleId = 1513
    const newRoleNameLessThan50Characters = 'Role ' + utils.getRandomNumber()

    roleManagementPage.clickRoleById(roleId)
    roleManagementPage.clickToDuplicateEntity()
    roleManagementPage.saveEntityInformation()
    roleManagementPage.assertNotificationErrorDisplayed('Name length must be 50 characters or fewer.')
    roleManagementPage.modifyEntityName(newRoleNameLessThan50Characters)
    roleManagementPage.saveEntityInformation()
    roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully')
    roleManagementPage.assertNotificationErrorDisplayed('Name length must be 50 characters or fewer.', false)
    roleManagementPage.assertEntityIsDisplayedInTheList(newRoleNameLessThan50Characters)
  })

  // ************************************************ TESTS AS CLIENTS ************************************************** //
})

describe('Role Management tests over User Management settings - View Only User', () => {
  // Pages
  const roleManagementPage = new RoleManagementPage()

  // Components
  const settingsMenuNavBar = new SettingsMenuNavBar()

  beforeEach(() => {
    cy.login(Cypress.env('VIEW_ONLY_DEFAULT_USER_AUTH'))
    settingsMenuNavBar.accessGlobalSettingsMenu('user', 'role')
    roleManagementPage.checkRoleManagementUrl()
  })

  /**
   * @missing_data For test this scenario there should be no "Create Role" permission for the user.
   *
   * SKIPPING DUE TO https://globalshares.atlassian.net/browse/PB-979
   *
   * @missing_step What happens when the user tries do access this by the URL? Some error message?
   */
  it.skip('C7499703_User_Does_Not_Have_Permissions_To_Create_New_Role', () => {
    roleManagementPage.clickTabByTitle('Active')
    roleManagementPage.getNewRoleButton().should('not.exist')

    roleManagementPage.addPathToUrlAndVisitIt('/0')
    // Assert in here some error message that will appears
  })

  /**
   * @missing_data For test this scenario there should be no "Update Role" permission for the user.
   * Also, two roles must be provided, one for each active and inactive states. Suggested role names: generic role active, generic role inactive
   *
   * @missing_steps Assert Deactivate and Activate button are not shown
   */
  it.skip('C7499835_Activate/Deactivate_Role_No_Permission', () => {
    const roleIdActive = 1405
    const roleIdInactive = 1407

    roleManagementPage.clickRoleById(roleIdActive)
    // Make sure that the Deactivate button is not shown

    roleManagementPage.clickTabByTitle('Inactive')
    roleManagementPage.clickRoleById(roleIdInactive)
    roleManagementPage.assertActivateButtonDisplayed(false)
  })

  /**
   * @missing_data Need to have a user with view only access to roles. Also, this user must have access to a group that contains this role linked, so the user can see the role
   *
   * @missing_steps
   * SKIPPING also due to https://globalshares.atlassian.net/browse/PB-963 and https://globalshares.atlassian.net/browse/PB-975
   */
  it.skip('C7544053_Duplicate_Role_No_Permission', () => {
    const roleId = 1454

    roleManagementPage.clickRoleById(roleId)
    roleManagementPage.assertThreeDotButtonDisplayed(false)
    cy.visit(';action=duplicate', { failOnStatusCode: false })
    // missing step to validate the user was not redirect to any ;action=duplicate panel and so the panel to duplicate the role was not displayed (waiting for PB-975)
  })
})
