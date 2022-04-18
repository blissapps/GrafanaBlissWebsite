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
})
