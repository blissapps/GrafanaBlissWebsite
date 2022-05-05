import EquityAdmin from '../../../../support/pages/equityAdmin'
import Utils from '../../../../support/utils'

const equityAdmin = new EquityAdmin()
const utils = new Utils()

describe('Role Management tests over User Management settings', () => {
  context('Default User', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login()
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'role')
      equityAdmin.roleManagementPage.checkPageUrl()
    })

    // ************************************************ TESTS AS ADMIN TENANT ************************************************** //

    /**
     * @missing_data Need to have some roles in both active and inactive tabs
     */
    it.skip('C7499688_List Roles_Happy_Path_Active_And_Inactive_Roles', () => {
      equityAdmin.roleManagementPage.assertActiveRolesAreDisplayed()
      equityAdmin.roleManagementPage.assertRolesInAlphabeticalOrder()

      equityAdmin.roleManagementPage.clickTab('Inactive')
      equityAdmin.roleManagementPage.assertInactiveRolesAreDisplayed()
      equityAdmin.roleManagementPage.assertRolesInAlphabeticalOrder()
    })

    /**
     * @missing_data For test this scenario there should be no Active nor Inactive roles.
     */
    it.skip('C7499690_Empty_State_Active_And_Inactive_Roles)', () => {
      equityAdmin.roleManagementPage.assertEmptyStateMessageIsVisible()
      equityAdmin.roleManagementPage.clickTab('Inactive')
      equityAdmin.roleManagementPage.assertEmptyStateMessageIsVisible()
    })

    /**
     * @mocks_used
     */
    it('C7499693_List_Roles_Navigation_Issues', () => {
      // Create mocked roles to guarantee we will always have at least one role displayed
      equityAdmin.roleManagementPage.interceptAndMockRolesLoadingRequest('rolesManagement_BasicRolesList.json')

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

    it('C7499704_Create_A_New_Role_Name_Character_Limit_When_Creating', () => {
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

    /**
     * @missing_data Need to have a role created in order to edit it
     */
    it.skip('C7499705_Create_A_New_Role_Name_Character_Limit_When_Editing', () => {
      const roleId = 1494
      let newRoleName = utils.generateRandomString(51)

      // 51 chars
      equityAdmin.roleManagementPage.clickRoleById(roleId)
      equityAdmin.roleManagementPage.modifyEntityName(newRoleName)
      equityAdmin.roleManagementPage.saveEntityInformation()

      equityAdmin.roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully', false)
      equityAdmin.roleManagementPage.assertNotificationErrorDisplayed('Name length must be 50 characters or fewer.')
      equityAdmin.roleManagementPage.assertEntityIsDisplayedInTheList(newRoleName, false)

      // 50 chars
      newRoleName = utils.generateRandomString(50)
      equityAdmin.roleManagementPage.modifyEntityName(newRoleName)
      equityAdmin.roleManagementPage.saveEntityInformation()

      equityAdmin.roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully')
      equityAdmin.roleManagementPage.assertNotificationErrorDisplayed('Name length must be 50 characters or fewer.', false)
      equityAdmin.roleManagementPage.assertEntityIsDisplayedInTheList(newRoleName)
    })

    /**
     * @missing_data For this scenario we need to have a role called 'Add Permissions To Role' with no permissions selected
     */
    it.skip('C7499830_View/Update_Role_Permissions_Add_Permission_To_Role', () => {
      const roleId = 1515

      equityAdmin.roleManagementPage.clickRoleById(roleId)

      equityAdmin.roleManagementPage.addOrRemovePermissions('accessfilters', ['view', 'update', 'create'])
      equityAdmin.roleManagementPage.addOrRemovePermissions('api', ['view'])
      equityAdmin.roleManagementPage.addOrRemovePermissions('settings', ['update', 'delete'])
      equityAdmin.roleManagementPage.addOrRemovePermissions('groups', ['view', 'delete'])
      equityAdmin.roleManagementPage.addOrRemoveAllPermissions('delete')
      equityAdmin.roleManagementPage.saveEntityInformation()
      equityAdmin.roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully', true)

      equityAdmin.roleManagementPage.reloadPage()
      equityAdmin.roleManagementPage.clickRoleById(roleId)

      // Assert permissions given
      equityAdmin.roleManagementPage.assertPermissionState('accessfilters', ['view', 'update', 'create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('api', ['view'], true)
      equityAdmin.roleManagementPage.assertPermissionState('bi', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('clients', ['update'], false)
      equityAdmin.roleManagementPage.assertPermissionState('settings', ['update'], true)
      equityAdmin.roleManagementPage.assertPermissionState('settings', ['view', 'create'], false)
      equityAdmin.roleManagementPage.assertPermissionState('groups', ['view'], true)
      equityAdmin.roleManagementPage.assertPermissionState('groups', ['update', 'create'], false)

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
      equityAdmin.roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully', true)
    })

    /**
     * @missing_data For this scenario we need to have a role called 'Remove permission' with some permissions selected
     *               The permissions are: access filters [view and update], categories [view], users [create], and DELETE in all permissions
     */
    it.skip('C7499831_View/Update_Role_Permissions_Remove_Permission_From_Role', () => {
      const roleId = 1423

      equityAdmin.roleManagementPage.clickRoleById(roleId)

      equityAdmin.roleManagementPage.addOrRemovePermissions('accessfilters', ['view', 'update'], false)
      equityAdmin.roleManagementPage.addOrRemovePermissions('categories', ['view'], false)
      equityAdmin.roleManagementPage.addOrRemovePermissions('users', ['create'], false)
      equityAdmin.roleManagementPage.addOrRemoveAllPermissions('delete')
      equityAdmin.roleManagementPage.saveEntityInformation()
      equityAdmin.roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully', true)

      equityAdmin.roleManagementPage.reloadPage()
      equityAdmin.roleManagementPage.clickRoleById(roleId)

      // Assert permissions removed
      equityAdmin.roleManagementPage.assertPermissionState('accessfilters', ['view', 'update'], false)
      equityAdmin.roleManagementPage.assertPermissionState('categories', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('users', ['create'], false)

      // Assert Delete permissions type removed from all permissions
      equityAdmin.roleManagementPage.assertPermissionState('accessfilters', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('categories', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('companysecurity', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('contents', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('contributions', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('emails', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('grants', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('groups', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants_bankaccounts', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants_compliance', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants_dividends', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants_financialreporting', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants_gateway', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants_linkage', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants_partners', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants_restrictions', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants_sharemanagement', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants_sharetransactions', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants_tax', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('participants_trading', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('payrollschedules', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('plans', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('purchaseplans', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('roles', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('settings', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('shareissuances', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('tags', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('tenants', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('transactions', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('transactionwindows', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('users', ['delete'], false)
      equityAdmin.roleManagementPage.assertPermissionState('vestingschedules', ['delete'], false)

      //teardown - Add permissions removed
      cy.log('--- TEARDOWN ---')
      equityAdmin.roleManagementPage.addOrRemoveAllPermissions('delete')
      equityAdmin.roleManagementPage.addOrRemovePermissions('accessfilters', ['view', 'update'], true)
      equityAdmin.roleManagementPage.addOrRemovePermissions('categories', ['view'], true)
      equityAdmin.roleManagementPage.addOrRemovePermissions('users', ['create'], true)
      equityAdmin.roleManagementPage.saveEntityInformation()
      equityAdmin.roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully', true)
    })

    /**
     * @missing_data For this scenario we need to have a role called 'Discard changes' with some permissions selected
     *               The permissions are: access filters [all], api [view], groups [view and delete], settings [delete] and CREATE in all permissions
     */
    it.skip('C7499832_View/Update_Role_Permissions_Discard_Unsaved_Changes', () => {
      const roleId = 1403

      equityAdmin.roleManagementPage.clickRoleById(roleId)

      equityAdmin.roleManagementPage.addOrRemovePermissions('accessfilters', ['update'], false)
      equityAdmin.roleManagementPage.addOrRemovePermissions('api', ['view'], false)
      equityAdmin.roleManagementPage.addOrRemovePermissions('groups', ['delete'], false)
      equityAdmin.roleManagementPage.addOrRemovePermissions('settings', ['delete'], false)
      equityAdmin.roleManagementPage.addOrRemovePermissions('bi', ['view'], true)
      equityAdmin.roleManagementPage.addOrRemovePermissions('categories', ['update', 'delete'], true)
      equityAdmin.roleManagementPage.addOrRemoveAllPermissions('create')
      equityAdmin.roleManagementPage.discardEntityInformation()
      equityAdmin.roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully', false)

      equityAdmin.roleManagementPage.reloadPage()
      equityAdmin.roleManagementPage.clickRoleById(roleId)

      // Assert permissions not changed
      equityAdmin.roleManagementPage.assertPermissionState('accessfilters', ['view', 'update', 'delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('api', ['view'], true)
      equityAdmin.roleManagementPage.assertPermissionState('groups', ['view', 'delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('settings', ['delete'], true)
      equityAdmin.roleManagementPage.assertPermissionState('bi', ['view'], false)
      equityAdmin.roleManagementPage.assertPermissionState('categories', ['update', 'delete'], false)

      // Assert CREATE permissions type removed from all permissions
      equityAdmin.roleManagementPage.assertPermissionState('accessfilters', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('categories', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('clients', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('clients_modules', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('companysecurity', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('contents', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('contributions', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('emails', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('grants', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('groups', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants_account', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants_bankaccounts', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants_compliance', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants_dividends', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants_financialreporting', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants_gateway', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants_linkage', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants_partners', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants_restrictions', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants_sharemanagement', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants_sharetransactions', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants_tax', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('participants_trading', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('partner_account', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('partner_custodyaccountmovement', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('payrollschedules', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('plans', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('purchaseplans', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('roles', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('settings', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('shareissuances', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('tags', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('terminationrequests', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('transactions', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('transactionwindows', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('users', ['create'], true)
      equityAdmin.roleManagementPage.assertPermissionState('vestingschedules', ['create'], true)
    })

    /**
     * @missing_data Need to have a role with 50 characters in the name
     */
    it.skip('C7544054_Duplicate_Role_Maximum_Characters_In_Name_Field', () => {
      const roleId = 1495
      const newRoleNameLessThan50Characters = 'Role ' + utils.getRandomNumber()

      equityAdmin.roleManagementPage.clickRoleById(roleId)
      equityAdmin.roleManagementPage.clickToDuplicateEntity()
      equityAdmin.roleManagementPage.saveEntityInformation()
      equityAdmin.roleManagementPage.assertNotificationErrorDisplayed('Name length must be 50 characters or fewer.')
      equityAdmin.roleManagementPage.modifyEntityName(newRoleNameLessThan50Characters)
      equityAdmin.roleManagementPage.saveEntityInformation()
      equityAdmin.roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully')
      equityAdmin.roleManagementPage.assertNotificationErrorDisplayed('Name length must be 50 characters or fewer.', false)
      equityAdmin.roleManagementPage.assertEntityIsDisplayedInTheList(newRoleNameLessThan50Characters)
    })

    /**
     * @missing_data Need to have a role registered
     *
     */
    it.skip('C9281161_CRUD_Permissions_Are_Visible_While_Scrolling_Down', () => {
      const roleId = 1468

      equityAdmin.roleManagementPage.clickRoleById(roleId)
      equityAdmin.roleManagementPage.addOrRemovePermissions('vestingschedules', ['delete']) //strategy to easily scroll until the bottom
      equityAdmin.roleManagementPage.assertCRUDColumnsDisplayed()
    })
  })

  // ************************************************ TESTS AS VIEW ONLY ************************************************** //

  context('View Only User 2', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login(Cypress.env('VIEW_ONLY_USER_2_AUTH'))
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'role')
      equityAdmin.roleManagementPage.checkPageUrl()
    })

    /**
     * @missing_data For test this scenario there should be no "Create Role" permission for the user.
     *
     * @bug_raised
     * SKIPPING DUE TO https://globalshares.atlassian.net/browse/PB-979
     *
     * TODO: @missing_steps What happens when the user tries do access this by the URL? Some error message?
     */
    it.skip('C7499703_User_Does_Not_Have_Permissions_To_Create_New_Role', () => {
      equityAdmin.roleManagementPage.clickTab('Active')
      equityAdmin.roleManagementPage.getNewRoleButton().should('not.exist')

      equityAdmin.roleManagementPage.navigateToUrl('/0')
      // Assert in here some error message that will appears
    })

    /**
     * @missing_data Need to have a user with view only access to roles. Also, this user must have access to a group that contains this role linked, so the user can see the role
     *
     * TODO: @missing_steps
     *
     * @bug_raised
     * SKIPPING also due to https://globalshares.atlassian.net/browse/PB-963, https://globalshares.atlassian.net/browse/PB-975 and https://globalshares.atlassian.net/browse/PB-1001
     */
    it.skip('C7544053_Duplicate_Role_No_Permission', () => {
      const roleId = 1475

      equityAdmin.roleManagementPage.clickRoleById(roleId)
      equityAdmin.roleManagementPage.assertThreeDotButtonDisplayed(false)
      equityAdmin.roleManagementPage.addPathToUrlAndVisitIt(';action=duplicate')
      // missing step to validate the user was not redirect to any ;action=duplicate panel and so the panel to duplicate the role is not displayed (waiting for PB-975)
    })
  })

  context('View Only User 2 - Shorter login mode', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login(Cypress.env('VIEW_ONLY_USER_2_AUTH'))
    })

    /**
     * @missing_data Need to have a user with view permissions for all the settings but Role
     */
    it.skip('C9281160_User_Does_Not_Have_View_Permissions_For_Groups_Only', () => {
      equityAdmin.applicationLeftMenuBar.openSettingsMenuBar()
      equityAdmin.settingsMenuNavBar.assertGlobalSettingsMenuOpen()
      equityAdmin.settingsMenuNavBar.assertUserManagementMenuDisplayed()
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', '', false)
      equityAdmin.settingsMenuNavBar.assertBackButtonDisplayed() // Assert it just to make sure we are in the correct menu
      equityAdmin.settingsMenuNavBar.assertRoleSubMenuItemDisplayed(false)
    })
  })
})
