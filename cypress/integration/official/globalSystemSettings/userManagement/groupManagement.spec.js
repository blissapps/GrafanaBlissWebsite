import EquityAdmin from '../../../../support/pages/equityAdmin'
import Utils from '../../../../support/utils'

const equityAdmin = new EquityAdmin()
const utils = new Utils()

describe('Group Management tests over User Management settings - Admin tenant user over menu settings', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.homePage.navigateToUrl('/tenant/1/settings/group-management')
    equityAdmin.groupManagementPage.checkPageUrl()
  })

  it('C16587445_List All Active and Inactive Groups', () => {
    equityAdmin.groupManagementPage.assertActiveGroupsAreDisplayed()
    equityAdmin.groupManagementPage.clickTab('Inactive')
    equityAdmin.groupManagementPage.assertInactiveGroupsAreDisplayed()
  })
})

describe('Group Management tests over User Management settings - Different users for login', () => {
  it('C16587446_List All Active Groups - Empty state', () => {
    equityAdmin.loginPage.login('jachas@globalshares.com')
    equityAdmin.homePage.navigateToUrl('/tenant/546/settings/group-management') //cargill1

    equityAdmin.groupManagementPage.assertNoGroupExistMessageIsDisplayed()
  })

  it('C16587447_List All Inactive Groups - Empty state', () => {
    equityAdmin.loginPage.login('jachas@globalshares.com')
    equityAdmin.homePage.navigateToUrl('/tenant/548/settings/group-management') // cargill3

    equityAdmin.groupManagementPage.assertNoGroupExistMessageIsDisplayed()
  })

  it('C16587448_List All Groups - No access to Group Management area', () => {
    equityAdmin.loginPage.login('DPikurs@globalshares.com')

    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user')
    equityAdmin.settingsMenuNavBar.assertGroupSubMenuItemDisplayed(false)

    equityAdmin.settingsMenuNavBar.navigateToUrl('/tenant/1/settings/group-management')
    equityAdmin.unauthorizedPage.checkPageUrl()
    equityAdmin.unauthorizedPage.assertYouAreRestrictedToAccessMessageIsDisplayed()
  })

  /**
   * @bug_raised https://globalshares.atlassian.net/browse/PB-979
   */
  it('C16661662_Create a New Group - User does not have Create permission', () => {
    equityAdmin.loginPage.login('tlaw@globalshares.com')
    equityAdmin.homePage.navigateToUrl('/tenant/260/settings/group-management') // cashgen024

    equityAdmin.groupManagementPage.assertGroupPageHeaderIsDisplayed()
    equityAdmin.groupManagementPage.assertCreateNewGroupButtonDisplayed(false)
    equityAdmin.groupManagementPage.addPathToUrlAndVisitIt('/0')
    // Need to wait for PB-979 to know what are going to be the next steps
  })

  it('C16661659_Not able to duplicate group', () => {
    equityAdmin.loginPage.login('tlaw@globalshares.com')
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'group')
    equityAdmin.groupManagementPage.checkPageUrl()
    equityAdmin.groupManagementPage.assertGroupPageHeaderIsDisplayed()

    equityAdmin.groupManagementPage.clickGroupById(946)
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('roles', 1)
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 1)
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('users', 1)
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('companies', 2)

    equityAdmin.groupManagementPage.clickThreeDotOptionButton()
    equityAdmin.groupManagementPage.assertDuplicateEntityButtonDisplayed(false)
  })
})

describe('Group Management tests over User Management settings - Admin tenant user direct setting navigation (navigateToUrl)', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
  })

  it('C16587449_Activate a Group', () => {
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

  it('C16587450_Deactivate a Group', () => {
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

  it('C16661660_Create a New Group', () => {
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

  it('C16661661_Create a New Group without entities associated', () => {
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

  it('C16661663_Create a New Group - Empty name', () => {
    equityAdmin.homePage.navigateToUrl('/tenant/168/settings/group-management') // cashgen011

    equityAdmin.groupManagementPage.createGroup('')
    equityAdmin.groupManagementPage.assertNotificationErrorDisplayed('Name should not be empty.')
  })

  it('C16661657_Duplicate a Group', () => {
    const groupId = 434
    const groupName = 'cash_gen_006'
    const newNameForDuplicatedGroup = 'Duplicated Group ' + utils.getRandomNumber()

    equityAdmin.homePage.navigateToUrl('/tenant/154/settings/group-management') // cashgen006

    equityAdmin.groupManagementPage.clickGroupById(groupId)
    equityAdmin.groupManagementPage.clickToDuplicateEntity()
    equityAdmin.groupManagementPage.assertEntityHeaderIsDisplayedAsExpected('Copy Of ' + groupName)
    equityAdmin.groupManagementPage.assertGSBadgeContainsText('INACTIVE')
    equityAdmin.groupManagementPage.modifyEntityName(newNameForDuplicatedGroup)
    equityAdmin.groupManagementPage.saveEntityInformation()

    equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(newNameForDuplicatedGroup + ' Saved')
    equityAdmin.groupManagementPage.assertInactiveGroupsAreDisplayed()
    equityAdmin.groupManagementPage.assertEntityIsDisplayedInTheList(newNameForDuplicatedGroup)
  })

  it('C16661658_Duplicate a Group - Empty name', () => {
    const groupId = 434
    const groupName = 'cash_gen_006'

    equityAdmin.homePage.navigateToUrl('/tenant/154/settings/group-management') // cashgen006

    equityAdmin.groupManagementPage.clickGroupById(groupId)
    equityAdmin.groupManagementPage.clickToDuplicateEntity()
    equityAdmin.groupManagementPage.assertEntityHeaderIsDisplayedAsExpected('Copy Of ' + groupName)
    equityAdmin.groupManagementPage.assertGSBadgeContainsText('INACTIVE')
    equityAdmin.groupManagementPage.modifyEntityName('')
    equityAdmin.groupManagementPage.saveEntityInformation()

    equityAdmin.groupManagementPage.assertNotificationErrorDisplayed('Name should not be empty.')
  })

  it('C16661664_Add a Role to a Group', () => {
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

  it('C16661665_Dismiss adding a Role to a group', () => {
    const groupName = 'Dismissed role name - C16661665'
    const roleName = 'cash_gen_014 Participants'
    const roleId = 740

    equityAdmin.homePage.navigateToUrl('/tenant/177/settings/group-management') // cashgen014

    equityAdmin.groupManagementPage.createGroup(groupName, roleName, roleId, [], [], [], [], [], [], false)
    equityAdmin.groupManagementPage.assertRoleAssociatedWithGroup(roleId)
    equityAdmin.groupManagementPage.discardEntityInformation()
    equityAdmin.groupManagementPage.assertEntityIsDisplayedInTheList(groupName, false)
  })

  it('C16661666_Do Not Save the Role Added to a group', () => {
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

  it('C16661667_Add a User to a Group', () => {
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
})
