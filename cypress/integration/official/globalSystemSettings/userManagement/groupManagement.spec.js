import EquityAdmin from '../../../../support/pages/equityAdmin'
import Utils from '../../../../support/utils'

const equityAdmin = new EquityAdmin()
const utils = new Utils()

describe('Group Management tests over User Management settings', () => {
  context('Tenant 1 settings over direct navigation (navigateToUrl)', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login()
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/group-management')
      equityAdmin.groupManagementPage.checkPageUrl()
    })

    it('C16587445 List All Active and Inactive Groups', () => {
      equityAdmin.groupManagementPage.assertActiveGroupsAreDisplayed()
      equityAdmin.groupManagementPage.clickTab('Inactive')
      equityAdmin.groupManagementPage.assertInactiveGroupsAreDisplayed()
    })

    it('C16801711 Expand DAPs, Users, and Companies of a group', () => {
      const groupId = 955

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.assertActiveGroupsAreDisplayed()

      // Assert number of records
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('roles', 1)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 12)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('users', 10)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('companies', 10)

      // Assert number of cards BEFORE clicking in 'Show All'
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('roles', 1)
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('daps', 8)
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('users', 8)
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('companies', 8)

      // Assert number of cards AFTER clicking in 'Show All'
      equityAdmin.groupManagementPage.clickShowAll('daps')
      equityAdmin.groupManagementPage.clickShowAll('users')
      equityAdmin.groupManagementPage.clickShowAll('companies')
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('roles', 1)
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('daps', 12)
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('users', 10)
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('companies', 10)

      // Assert number of cards AFTER clicking in 'Hide'
      equityAdmin.groupManagementPage.clickHide('daps')
      equityAdmin.groupManagementPage.clickHide('users')
      equityAdmin.groupManagementPage.clickHide('companies')
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('roles', 1)
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('daps', 8)
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('users', 8)
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('companies', 8)
    })

    /**
     * @chrome_only Hover events only works on Chrome based browsers
     */
    it('C17223608 Remove entity tooltip', { browser: '!firefox' }, () => {
      const groupId = 961
      const roleId = 1505
      const dapId = 44
      const userId = 5189
      const companyId = 579

      equityAdmin.groupManagementPage.assertActiveGroupsAreDisplayed()
      equityAdmin.groupManagementPage.clickGroupById(groupId)

      // Role
      equityAdmin.groupManagementPage.hoverMouseOverRemoveIcon(roleId)
      equityAdmin.groupManagementPage.assertToolTipDisplayedWithText('Remove Role')

      // DAP
      equityAdmin.groupManagementPage.hoverMouseOverRemoveIcon(dapId)
      equityAdmin.groupManagementPage.assertToolTipDisplayedWithText('Remove Data Access Profile')

      // User
      equityAdmin.groupManagementPage.hoverMouseOverRemoveIcon(userId)
      equityAdmin.groupManagementPage.assertToolTipDisplayedWithText('Remove User')

      // Company
      equityAdmin.groupManagementPage.hoverMouseOverRemoveIcon(companyId)
      equityAdmin.groupManagementPage.assertToolTipDisplayedWithText('Remove Client')

      // Group
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('', 'dap')
      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.groupManagementPage.hoverMouseOverRemoveIcon(groupId)
      equityAdmin.groupManagementPage.assertToolTipDisplayedWithText('Remove group')
    })

    it('C17181558 Remove a Role from a Group', () => {
      const groupId = 956
      const groupName = 'Delete Components Test'
      const roleId = 1493

      equityAdmin.groupManagementPage.assertActiveGroupsAreDisplayed()
      equityAdmin.groupManagementPage.clickGroupById(groupId)

      equityAdmin.groupManagementPage.removeRoleFromGroup(roleId)
      equityAdmin.groupManagementPage.saveEntityInformation()

      equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')
      equityAdmin.groupManagementPage.assertRoleAssociatedWithGroup(roleId, false)
    })

    it('C17223611 Remove a Single and Multiple DAPs from a Group', () => {
      const groupId = 956
      const groupName = 'Delete Components Test'
      const dapIdSingle = [6]
      const dapIdsMultiple = [7, 8, 9]

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.assertDapAssociatedWithGroup(dapIdSingle[0])
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 5)

      // Single removal
      equityAdmin.groupManagementPage.removeDapsFromGroup([dapIdSingle[0]])
      equityAdmin.groupManagementPage.saveEntityInformation()

      equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')
      equityAdmin.groupManagementPage.assertDapAssociatedWithGroup(dapIdSingle[0], false)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 4)

      // Multiple removal
      equityAdmin.groupManagementPage.removeDapsFromGroup(dapIdsMultiple)
      equityAdmin.groupManagementPage.saveEntityInformation()

      equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')
      equityAdmin.groupManagementPage.assertDapAssociatedWithGroup(dapIdsMultiple[1], false)
      equityAdmin.groupManagementPage.assertDapAssociatedWithGroup(dapIdsMultiple[2], false)
      equityAdmin.groupManagementPage.assertDapAssociatedWithGroup(dapIdsMultiple[3], false)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 1)
    })

    /**
     * @bug_raised  https://globalshares.atlassian.net/browse/PB-1315 https://globalshares.atlassian.net/browse/PB-1316
     */
    it('C17316996 Add a User to a Group and Verify the User Info', () => {
      const groupId = 968
      const groupName = ['Group_Remove']
      const userName = ['csouto']
      const userId = [5186]

      // Remove user from group
      equityAdmin.groupManagementPage.clickGroupById(groupId)

      equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userId[0], false)
      equityAdmin.groupManagementPage.addUsersToGroup(userName, userId)
      equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userId[0])

      equityAdmin.groupManagementPage.saveEntityInformation()
      equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')

      // Validates user is linked to the group over User Management settings - L4 page
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('', 'user')
      equityAdmin.searchEngine.search(userName[0])
      equityAdmin.userManagementPage.clickUserTable(userId[0])
      equityAdmin.userDetailL4Page.clickToAccessUserInfoDetails()

      // Validates in the userInfoL4Page
      equityAdmin.userInfoL4Page.checkPageUrl()
      equityAdmin.userInfoL4Page.assertGroupsDisplayed(groupName)
    })

    it('C17316992 Remove a Single User from a Group', () => {
      const groupId = 966
      const groupName = ['Remove_User']
      const userId = [5161] // cgiles@globalshares.com

      // Remove user from group
      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userId[0], true, true)

      equityAdmin.groupManagementPage.removeUsersFromGroup(userId)
      equityAdmin.groupManagementPage.saveEntityInformation()
      equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userId[0], false)
      equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')
    })

    it('C17316993 Remove Multiple Users from a Group', () => {
      const groupId = 967
      const groupName = ['Remove_Multiple_Users']
      const userId = [5187, 5198, 5171]

      // Remove user from group
      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.clickShowAll('users')
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('users', 12)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('users', 12)
      equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userId[0])
      equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userId[1])
      equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userId[2])

      equityAdmin.groupManagementPage.removeUsersFromGroup(userId)
      equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userId[0], false)
      equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userId[1], false)
      equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userId[2], false)

      equityAdmin.groupManagementPage.saveEntityInformation()
      equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('users', 9)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('users', 9)

      equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userId[0], false)
      equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userId[0], false)
      equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userId[1], false)
      equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userId[2], false)
    })

    it('C17316995 Remove a User from a Group and Verify the User Info', () => {
      const groupId = 968
      const groupName = ['Group_Remove']
      const userName = ['bleduc@globalshares.com']
      const userId = [5178]

      // Remove user from group
      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.removeUsersFromGroup(userId)
      equityAdmin.groupManagementPage.saveEntityInformation()
      equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userId[0], false)
      equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved', true, true)

      // Validates user is NOT linked to the group over User Management settings - L4 page
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('', 'user')
      equityAdmin.searchEngine.search(userName[0])
      equityAdmin.userManagementPage.clickUserTable(userId[0])
      equityAdmin.userDetailL4Page.clickToAccessUserInfoDetails()

      // Validates in the userInfoL4Page
      equityAdmin.userInfoL4Page.checkPageUrl()
      equityAdmin.userInfoL4Page.assertGroupsDisplayed(groupName, false)
    })

    it('C17833366 List Groups - Show high level content of a group', () => {
      const groupId = 974
      const roleId = 1517

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.assertRoleAssociatedWithGroup(roleId)

      // roles
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('roles', 1)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('roles', 1)

      // daps
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('daps', 8)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 10)

      // users
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('users', 8)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('users', 9)

      // companies
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('companies', 8)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('companies', 10)

      // CHANGE RESOLUTION
      equityAdmin.groupManagementPage.changeBrowserResolution(1500, 1080)

      // roles
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('roles', 1)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('roles', 1)

      // daps
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('daps', 4)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 10)

      // users
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('users', 4)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('users', 9)

      // companies
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('companies', 4)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('companies', 10)

      // CHANGE RESOLUTION
      equityAdmin.groupManagementPage.changeBrowserResolution(1200, 960)

      // roles
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('roles', 1)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('roles', 1)

      // daps
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('daps', 2)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 10)

      // users
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('users', 2)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('users', 9)

      // companies
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('companies', 2)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('companies', 10)
    })

    it('C18116628 Create a New Group - Name length limit > 250 characters', () => {
      const groupName250Chars = utils.generateRandomString(250)

      equityAdmin.groupManagementPage.createGroup(utils.generateRandomString(251))
      equityAdmin.groupManagementPage.saveEntityInformation()
      equityAdmin.groupManagementPage.assertNotificationErrorDisplayed('Name length must be 250 characters or fewer.')

      equityAdmin.groupManagementPage.modifyEntityName(groupName250Chars)
      equityAdmin.groupManagementPage.saveEntityInformation()
      equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName250Chars + ' Saved')
    })
  })

  context('Different users for login', () => {
    it('C16587446 List All Active Groups - Empty state', () => {
      equityAdmin.loginPage.login('jachas@globalshares.com')
      equityAdmin.homePage.navigateToUrl('/tenant/546/settings/group-management') //cargill1

      equityAdmin.groupManagementPage.assertNoGroupExistMessageIsDisplayed()
    })

    it('C16587447 List All Inactive Groups - Empty state', () => {
      equityAdmin.loginPage.login('jachas@globalshares.com')
      equityAdmin.homePage.navigateToUrl('/tenant/548/settings/group-management') // cargill3

      equityAdmin.groupManagementPage.assertNoGroupExistMessageIsDisplayed()
    })

    it('C16587448 List All Groups - No access to Group Management area', () => {
      equityAdmin.loginPage.login('DPikurs@globalshares.com')
      equityAdmin.applicationLeftMenuBar.openSettingsMenuBar()
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', '')

      equityAdmin.settingsMenuNavBar.assertGroupSubMenuItemDisplayed(false)

      equityAdmin.settingsMenuNavBar.navigateToUrl('/tenant/1/settings/group-management')
      equityAdmin.unauthorizedPage.checkPageUrl()

      equityAdmin.unauthorizedPage.assertYouAreRestrictedToAccessMessageIsDisplayed()
    })

    /**
     * @bug_raised https://globalshares.atlassian.net/browse/PB-1212
     */
    it('C16661662 Create a New Group - User does not have Create permission', () => {
      equityAdmin.loginPage.login('tlaw@globalshares.com')
      equityAdmin.homePage.navigateToUrl('/tenant/260/settings/group-management') // cashgen024

      equityAdmin.groupManagementPage.assertGroupPageHeaderIsDisplayed()
      equityAdmin.groupManagementPage.assertCreateNewGroupButtonDisplayed(false)
      equityAdmin.groupManagementPage.addPathToUrlAndVisitIt('/0')
      // Need to wait for PB-1212 to know what are going to be the next steps
    })

    it('C16661659 Not able to duplicate group', () => {
      const groupId = 946

      equityAdmin.loginPage.login('tlaw@globalshares.com')
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/group-management')
      equityAdmin.groupManagementPage.checkPageUrl()
      equityAdmin.groupManagementPage.assertGroupPageHeaderIsDisplayed()

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.clickThreeDotOptionButton()
      equityAdmin.groupManagementPage.assertDuplicateEntityButtonDisplayed(false)
      equityAdmin.groupManagementPage.assertCreateNewGroupButtonDisplayed(false)
    })

    it('C16767340 Not able to Deactivate a group', () => {
      const groupId = 941 // Cannot Update & Delete Group

      equityAdmin.loginPage.login('jachas@globalshares.com')
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/group-management')
      equityAdmin.groupManagementPage.checkPageUrl()

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.assertThreeDotButtonDisplayed()
      equityAdmin.groupManagementPage.clickThreeDotOptionButton()
      equityAdmin.groupManagementPage.assertDuplicateEntityButtonDisplayed(true)
      equityAdmin.groupManagementPage.assertCreateNewGroupButtonDisplayed(true)
      equityAdmin.groupManagementPage.assertDeactivateEntityButtonDisplayed(false)
    })

    it('C16767341 User is not able to add or change role', () => {
      const groupId = 941 // Cannot Update & Delete Group

      equityAdmin.loginPage.login('jachas@globalshares.com')
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/group-management')
      equityAdmin.groupManagementPage.checkPageUrl()

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.assertEntityHeaderIsDisplayedAsExpected()
      equityAdmin.groupManagementPage.assertChangeRoleButtonDisplayed(false)
      equityAdmin.groupManagementPage.assertAddDapsButtonDisplayed(false)
      equityAdmin.groupManagementPage.assertAddUsersButtonDisplayed(false)
      equityAdmin.groupManagementPage.assertAddCompaniesButtonDisplayed(false)
    })

    it('C16767327 Unable to Add User to the Group', () => {
      const groupId = 941 // Cannot Update & Delete Group

      equityAdmin.loginPage.login('jachas@globalshares.com')
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/group-management')
      equityAdmin.groupManagementPage.checkPageUrl()

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.assertEntityHeaderIsDisplayedAsExpected()
      equityAdmin.groupManagementPage.assertAddUsersButtonDisplayed(false)
    })

    it('C17181557 Unable to Remove a Company', () => {
      const groupId = 941 // Cannot Update & Delete Group
      const companyId = 123 // Cash Management Payment

      equityAdmin.loginPage.login('jachas@globalshares.com')
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/group-management')
      equityAdmin.groupManagementPage.checkPageUrl()

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.assertEntityHeaderIsDisplayedAsExpected()
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyId, true, true)
      equityAdmin.groupManagementPage.assertRemoveCompanyOptionIsDisplayed(companyId, false)
    })

    it('C17181559 Unable to Remove a Role of a Group', () => {
      const groupId = 941 // Cannot Update & Delete Group
      const roleId = 1496 // Cannot Update & Delete Group

      equityAdmin.loginPage.login('jachas@globalshares.com')
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/group-management')
      equityAdmin.groupManagementPage.checkPageUrl()

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.assertEntityHeaderIsDisplayedAsExpected()
      equityAdmin.groupManagementPage.assertRoleAssociatedWithGroup(roleId)
      equityAdmin.groupManagementPage.assertRemoveRoleOptionIsDisplayed(roleId, false)
    })

    it('C17181562 Unable to Remove DAPs from a Group', () => {
      const groupId = 941 // Cannot Update & Delete Group
      const dapId = 3 // Test 1

      equityAdmin.loginPage.login('jachas@globalshares.com')
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/group-management')
      equityAdmin.groupManagementPage.checkPageUrl()

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.assertEntityHeaderIsDisplayedAsExpected()
      equityAdmin.groupManagementPage.assertDapAssociatedWithGroup(dapId)
      equityAdmin.groupManagementPage.assertRemoveDapOptionIsDisplayed(dapId, false)
    })

    it('C17316994 Unable to Remove Users from a Group', () => {
      const groupId = 941 // Cannot Update & Delete Group
      const userId = 5166 // jachas@globalshares.com

      equityAdmin.loginPage.login('jachas@globalshares.com')
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/group-management')
      equityAdmin.groupManagementPage.checkPageUrl()

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.assertEntityHeaderIsDisplayedAsExpected()
      equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userId)
      equityAdmin.groupManagementPage.assertRemoveUserOptionIsDisplayed(userId, false)
    })
  })

  context('Admin user over direct setting navigation (navigateToUrl) - CLIENT tenant perspective', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login()
    })

    it('C16587449 Activate a Group', () => {
      const groupId = 939
      const groupName = 'Contractors'

      equityAdmin.homePage.navigateToUrl('/tenant/547/settings/group-management') // cargill2

      // Activating a group
      equityAdmin.groupManagementPage.clickTab('Inactive')
      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.activateGroup()
      equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Activated')
      equityAdmin.groupManagementPage.assertActiveGroupsAreDisplayed()
      equityAdmin.groupManagementPage.assertEntityIsDisplayedInTheList(groupName)
    })

    it('C16587450 Deactivate a Group', () => {
      const groupId = 354
      const groupName = 'cash_gen_001'

      equityAdmin.homePage.navigateToUrl('/tenant/74/settings/group-management') // cashgen001

      // Inactivating a group
      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.clickToDeactivateEntity()
      equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Deactivated')
      equityAdmin.groupManagementPage.assertInactiveGroupsAreDisplayed()
      equityAdmin.groupManagementPage.assertEntityIsDisplayedInTheList(groupName)
    })

    it('C16661660 Create a New Group', () => {
      const groupName = 'Created Group ' + utils.getRandomNumber()
      const roleName = 'cash_gen_008'
      const roleId = 444
      const dapNames = ['DAP Teste']
      const dapIds = [2]
      const userNames = ['cashgen008']
      const userIds = [636]
      const companyName = ['cashgen008']
      const companyIds = [265]

      equityAdmin.homePage.navigateToUrl('/tenant/160/settings/group-management') // cashgen008

      equityAdmin.groupManagementPage.createGroup(groupName, roleName, roleId, dapNames, dapIds, userNames, userIds, companyName, companyIds)
      equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')
      equityAdmin.groupManagementPage.assertEntityIsDisplayedInTheList(groupName)
    })

    it('C16661661 Create a New Group without entities associated', () => {
      const groupName = 'Created Group ' + utils.getRandomNumber()

      equityAdmin.homePage.navigateToUrl('/tenant/162/settings/group-management') // cashgen009

      equityAdmin.groupManagementPage.createGroup(groupName)
      equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')
      equityAdmin.groupManagementPage.assertEntityIsDisplayedInTheList(groupName)

      equityAdmin.groupManagementPage.clickEntityByName(groupName)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('roles', 0)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 0)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('users', 0)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('companies', 0)
    })

    it('C16661663 Create a New Group - Empty name', () => {
      equityAdmin.homePage.navigateToUrl('/tenant/168/settings/group-management') // cashgen011

      equityAdmin.groupManagementPage.createGroup('')
      equityAdmin.groupManagementPage.assertNotificationErrorDisplayed('Name should not be empty.')
    })

    it('C16661657 Duplicate a Group', () => {
      const groupId = 434
      const groupName = 'cash_gen_006'
      const newNameForDuplicatedGroup = 'Duplicated Group ' + utils.getRandomNumber()

      equityAdmin.homePage.navigateToUrl('/tenant/154/settings/group-management') // cashgen006

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.clickToDuplicateEntity()
      equityAdmin.groupManagementPage.assertEntityHeaderIsDisplayedAsExpected('Copy Of ' + groupName)
      equityAdmin.groupManagementPage.assertBadgeContainsText('INACTIVE')
      equityAdmin.groupManagementPage.modifyEntityName(newNameForDuplicatedGroup)
      equityAdmin.groupManagementPage.saveEntityInformation()

      equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(newNameForDuplicatedGroup + ' Saved')
      equityAdmin.groupManagementPage.assertInactiveGroupsAreDisplayed()
      equityAdmin.groupManagementPage.assertEntityIsDisplayedInTheList(newNameForDuplicatedGroup)
    })

    it('C16661658 Duplicate a Group - Empty name', () => {
      const groupId = 434
      const groupName = 'cash_gen_006'

      equityAdmin.homePage.navigateToUrl('/tenant/154/settings/group-management') // cashgen006

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.clickToDuplicateEntity()
      equityAdmin.groupManagementPage.assertEntityHeaderIsDisplayedAsExpected('Copy Of ' + groupName)
      equityAdmin.groupManagementPage.assertBadgeContainsText('INACTIVE')
      equityAdmin.groupManagementPage.modifyEntityName('')
      equityAdmin.groupManagementPage.saveEntityInformation()

      equityAdmin.groupManagementPage.assertNotificationErrorDisplayed('Name should not be empty.')
    })

    it('C16661664 Add a Role to a Group', () => {
      const groupName = 'Created Group ' + utils.getRandomNumber()
      const roleName = 'cash_gen_013 Participants'
      const roleId = 738

      equityAdmin.homePage.navigateToUrl('/tenant/175/settings/group-management') // cashgen013

      equityAdmin.groupManagementPage.createGroup(groupName, roleName, roleId)
      equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')
      equityAdmin.groupManagementPage.assertEntityIsDisplayedInTheList(groupName)
      equityAdmin.groupManagementPage.clickEntityByName(groupName)
      equityAdmin.groupManagementPage.assertRoleAssociatedWithGroup(roleId)
    })

    it('C16661665 Dismiss adding a Role to a group', () => {
      const groupName = 'Dismissed role name - C16661665'
      const roleName = 'cash_gen_014 Participants'
      const roleId = 740

      equityAdmin.homePage.navigateToUrl('/tenant/177/settings/group-management') // cashgen014

      equityAdmin.groupManagementPage.createGroup(groupName, roleName, roleId, [], [], [], [], [], [], false)
      equityAdmin.groupManagementPage.assertRoleAssociatedWithGroup(roleId)
      equityAdmin.groupManagementPage.discardEntityInformation()
      equityAdmin.groupManagementPage.assertEntityIsDisplayedInTheList(groupName, false)
    })

    it('C16661666 Do Not Save the Role Added to a group', () => {
      const groupId = 459
      const roleName = 'cash_gen_015 Participants'
      const roleId = 742

      equityAdmin.homePage.navigateToUrl('/tenant/179/settings/group-management') // cashgen015

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.selectRoleToGroup(roleName, roleId)
      equityAdmin.groupManagementPage.assertRoleAssociatedWithGroup(roleId)
      equityAdmin.groupManagementPage.discardEntityInformation()
      equityAdmin.groupManagementPage.assertRoleAssociatedWithGroup(roleId, false)
    })

    it('C16661667 Add a User to a Group', () => {
      const groupId = 459
      const groupName = 'cash_gen_015'
      const userId = [678]
      const userName = ['cashgen015']

      equityAdmin.homePage.navigateToUrl('/tenant/179/settings/group-management') // cashgen015

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.addUsersToGroup(userName, userId)
      equityAdmin.groupManagementPage.saveEntityInformation()
      equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')
      equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userId[0])
    })

    it('C16767329 Add a Single Company to a Group', () => {
      const groupId = 516
      const groupName = 'cash_gen_021'
      const companyNames = ['cashgen020']
      const companyIds = [339]

      equityAdmin.homePage.navigateToUrl('/tenant/236/settings/group-management') // cashgen021

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.addCompaniesToGroup(companyNames, companyIds)
      equityAdmin.groupManagementPage.saveEntityInformation()
      equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')

      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[0])
    })

    it('C16767330 Dismiss Adding a Company to a Group', () => {
      const groupId = 531
      const companyNames = ['cashgen020']
      const companyIds = [339]

      equityAdmin.homePage.navigateToUrl('/tenant/251/settings/group-management') // cashgen022

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.addCompaniesToGroup(companyNames, companyIds)
      equityAdmin.groupManagementPage.discardEntityInformation()

      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[0], false)
    })

    it('C16767331 Adding more than one company to a group', () => {
      const groupId = 534
      const groupName = 'cash_gen_023'
      const companyNames = ['cashgen001', 'cashgen002', 'cashgen003', 'cashgen004', 'cashgen005', 'cashgen006', 'cashgen007', 'cashgen008', 'cashgen009']
      const companyIds = [179, 181, 202, 255, 258, 259, 264, 265, 267]

      equityAdmin.homePage.navigateToUrl('/tenant/254/settings/group-management') // cashgen023

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.addCompaniesToGroup(companyNames, companyIds)
      equityAdmin.groupManagementPage.saveEntityInformation()
      equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')

      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[0], true, true)
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[1])
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[2])
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[3])
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[4])
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[5])
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[6])
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[7])
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[8])
    })

    it('C16767332 Do Not Save Adding Company to a group', () => {
      const groupId = 540
      const companyNames = ['cashgen020', 'cashgen021', 'cashgen022', 'cashgen023', 'cashgen025']
      const companyIds = [339, 341, 356, 359, 366]

      equityAdmin.homePage.navigateToUrl('/tenant/260/settings/group-management') // cashgen024

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.addCompaniesToGroup(companyNames, companyIds)
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[0])
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[1])
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[2])
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[3])
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[4])
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('companies', companyIds.length + 1)

      equityAdmin.groupManagementPage.discardEntityInformation()

      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('companies', 1)
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[0], false)
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[1], false)
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[2], false)
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[3], false)
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[4], false)
    })

    it('C16767326 Dismiss Adding a User to a Group', () => {
      const groupId = 514
      const userName = ['cashgen020']
      const userIds = [825]

      equityAdmin.homePage.navigateToUrl('/tenant/234/settings/group-management') // cashgen020

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.addUsersToGroup(userName, userIds)
      equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userIds[0])
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('users', userIds.length)

      equityAdmin.groupManagementPage.discardEntityInformation()

      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('users', 0)
      equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userIds[0], false)
    })

    it('C16767328 Adding more than one user to a group', () => {
      const groupId = 541
      const groupName = 'cash_gen_025'
      const userName = ['cashgen025_1', 'cashgen025_2', 'cashgen025_3', 'cashgen025_4']
      const userIds = [954, 956, 958, 960]

      equityAdmin.homePage.navigateToUrl('/tenant/261/settings/group-management') // cashgen025

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.addUsersToGroup(userName, userIds)
      equityAdmin.groupManagementPage.saveEntityInformation()

      equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('users', userIds.length)
      equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userIds[0])
      equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userIds[1])
      equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userIds[2])
      equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userIds[3])
    })

    it('C16767333 Show Content of a Group', () => {
      const groupId = 951

      equityAdmin.homePage.navigateToUrl('/tenant/263/settings/group-management') // cashgen026

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.assertActiveGroupsAreDisplayed()
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('roles', 1)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 10)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('users', 7)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('companies', 10)
    })
    it('C16805474 Search Groups behavior', () => {
      const groupsSearchedIds = [549, 270]

      equityAdmin.homePage.navigateToUrl('/tenant/269/settings/group-management') // cashgen027

      cy.log('Basic searching behavior')

      equityAdmin.searchEngine.search('cash')
      equityAdmin.groupManagementPage.assertAmountOfSearchResultsInTheList(2)
      equityAdmin.groupManagementPage.assertSearchResultListAccuracy(groupsSearchedIds)
      equityAdmin.groupManagementPage.assertOtherGroupListDisplayed()
      equityAdmin.groupManagementPage.assertAllSearchResultItemsAreDisplayedInHighlightedMode()

      equityAdmin.searchEngine.clearSearchBoxByXIcon()
      equityAdmin.groupManagementPage.clickGroupById(groupsSearchedIds[0])
      equityAdmin.groupManagementPage.assertEntityHeaderIsDisplayedAsExpected()
      equityAdmin.searchEngine.search('cash')

      // Roles validations
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('roles', 1)
      equityAdmin.groupManagementPage.assertNumberOfSearchResultsInASection('roles', 1)
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('roles', 1)

      // DAPS validations
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 3)
      equityAdmin.groupManagementPage.assertNumberOfSearchResultsInASection('daps', 2)
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('daps', 2)

      // Users validations
      equityAdmin.groupManagementPage.assertNumberOfSearchResultsInASection('users', 4)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('users', 4)
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('users', 4)

      // Companies validations
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('companies', 6)
      equityAdmin.groupManagementPage.assertNumberOfSearchResultsInASection('companies', 6)
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('companies', 6)

      cy.log('No Groups found behavior')
      equityAdmin.searchEngine.search('lunes')
      equityAdmin.groupManagementPage.assertNoResultFoundIsVisible()

      cy.log('No Roles, DAPs, Users and Companies match the search term')
      // Roles validations
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('roles', 1)
      equityAdmin.groupManagementPage.assertNumberOfSearchResultsInASection('roles', 'No')
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('roles', 0)

      // DAPS validations
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 3)
      equityAdmin.groupManagementPage.assertNumberOfSearchResultsInASection('daps', 'No')
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('daps', 0)

      // Users validations
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('users', 4)
      equityAdmin.groupManagementPage.assertNumberOfSearchResultsInASection('users', 'No')
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('users', 0)

      // Companies validations
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('companies', 6)
      equityAdmin.groupManagementPage.assertNumberOfSearchResultsInASection('companies', 'No')
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('companies', 0)
    })

    it('C17181554 Remove a Single Company from a Group', () => {
      const groupId = 551
      const groupName = 'cash_gen_029'
      const companyIds = [580]

      equityAdmin.homePage.navigateToUrl('/tenant/271/settings/group-management') // cashgen029

      equityAdmin.groupManagementPage.clickGroupById(groupId)

      equityAdmin.groupManagementPage.removeCompaniesFromGroup(companyIds, true)
      equityAdmin.groupManagementPage.saveEntityInformation()
      equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')

      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[0], false)
    })

    it('C17181555 Remove Multiple Companies from a Group', () => {
      const groupId = 560
      const groupName = 'cash_gen_031'
      const companyIdsToRemove = [281, 286, 349, 579, 580]
      const companyIdsRemained = [385]

      equityAdmin.homePage.navigateToUrl('/tenant/280/settings/group-management') // cashgen031

      equityAdmin.groupManagementPage.clickGroupById(groupId)

      equityAdmin.groupManagementPage.removeCompaniesFromGroup(companyIdsToRemove)
      equityAdmin.groupManagementPage.saveEntityInformation()
      equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')

      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIdsRemained[0])
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIdsToRemove[0], false)
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIdsToRemove[1], false)
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIdsToRemove[2], false)
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIdsToRemove[3], false)
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIdsToRemove[4], false)
    })

    it('C17181556 Discard Removing Companies from a Group', () => {
      const groupId = 948
      const groupName = 'cash_gen_032_viewers'
      const companyIdsToRemove = [579, 580, 581]

      equityAdmin.homePage.navigateToUrl('/tenant/347/settings/group-management') // cashgen031

      equityAdmin.groupManagementPage.clickGroupById(groupId)

      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('companies', 15)
      equityAdmin.groupManagementPage.removeCompaniesFromGroup(companyIdsToRemove, true)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('companies', 12)

      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIdsToRemove[0], false)
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIdsToRemove[1], false)
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIdsToRemove[2], false)

      equityAdmin.groupManagementPage.discardEntityInformation()
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('companies', 15)
      equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved', false)

      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIdsToRemove[0])
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIdsToRemove[1])
      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIdsToRemove[2])
    })

    it('C17181563 Add a Single DAP to a Group', () => {
      const groupId = 959
      const groupName = 'cash_gen_034'
      const dapName = ['DAP02_cashgen034']
      const dapId = [37]

      equityAdmin.homePage.navigateToUrl('/tenant/353/settings/group-management') // cashgen034

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 0)

      equityAdmin.groupManagementPage.addDapsToGroup(dapName, dapId)
      equityAdmin.groupManagementPage.saveEntityInformation()
      equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')

      equityAdmin.groupManagementPage.assertDapAssociatedWithGroup(dapId[0])
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 1)
    })

    it('C17181564 Add Multiple DAPs to a Group', () => {
      const groupId = 960
      const groupName = 'cash_gen_036'
      const dapNames = ['DAP01', 'DAP02', 'DAP03', 'DAP04']
      const dapIds = [39, 40, 41, 42]

      equityAdmin.homePage.navigateToUrl('/tenant/362/settings/group-management') // cashgen036

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 0)

      equityAdmin.groupManagementPage.addDapsToGroup(dapNames, dapIds)
      equityAdmin.groupManagementPage.saveEntityInformation()
      equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')

      equityAdmin.groupManagementPage.assertDapAssociatedWithGroup(dapIds[0])
      equityAdmin.groupManagementPage.assertDapAssociatedWithGroup(dapIds[1])
      equityAdmin.groupManagementPage.assertDapAssociatedWithGroup(dapIds[2])
      equityAdmin.groupManagementPage.assertDapAssociatedWithGroup(dapIds[3])
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 4)
    })

    it('C17181565 Dismiss Adding DAP to a Group', () => {
      const groupId = 962
      const dapNames = ['DAP01', 'DAP02']
      const dapIds = [39, 40]

      equityAdmin.homePage.navigateToUrl('/tenant/362/settings/group-management') // cashgen036

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.clickAddDapsToGroup()
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 0)

      equityAdmin.selectSettingsL4Page.selectSettings('dap', dapNames, dapIds)
      equityAdmin.selectSettingsL4Page.clickToDismissTheSelections()

      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 0)
    })

    it('C17181566 Discard Adding DAP to a Group - Not Save', () => {
      const groupId = 962
      const dapNames = ['DAP01', 'DAP02']
      const dapIds = [39, 40]

      equityAdmin.homePage.navigateToUrl('/tenant/362/settings/group-management') // cashgen036

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 0)

      equityAdmin.groupManagementPage.addDapsToGroup(dapNames, dapIds)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 2)
      equityAdmin.groupManagementPage.assertDapAssociatedWithGroup(dapIds[0])
      equityAdmin.groupManagementPage.assertDapAssociatedWithGroup(dapIds[1])

      equityAdmin.groupManagementPage.discardEntityInformation()

      equityAdmin.groupManagementPage.assertDapAssociatedWithGroup(dapIds[0], false)
      equityAdmin.groupManagementPage.assertDapAssociatedWithGroup(dapIds[1], false)
    })
  })
})
