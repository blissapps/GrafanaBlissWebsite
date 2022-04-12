import EquityAdmin from '../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Group Management tests over User Management settings', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'group')
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

  it('C16587449_Activate a Group', () => {
    const groupId = 939
    const groupName = 'Contractors'

    equityAdmin.loginPage.login()
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

    equityAdmin.loginPage.login()
    equityAdmin.homePage.navigateToUrl('/tenant/74/settings/group-management') // cashgen001

    // Inactivating a group
    equityAdmin.groupManagementPage.clickGroupById(groupId)
    equityAdmin.groupManagementPage.clickToDeactivateEntity()
    equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Deactivated')
    equityAdmin.groupManagementPage.assertInactiveGroupsAreDisplayed()
    equityAdmin.groupManagementPage.assertEntityIsDisplayedInTheList(groupName)
  })
})
