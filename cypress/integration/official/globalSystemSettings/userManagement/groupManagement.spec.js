import EquityAdmin from '../../../../support/pages/equityAdmin'
import Utils from '../../../../support/utils'

const equityAdmin = new EquityAdmin()
const utils = new Utils()

describe('Group Management tests over User Management settings', () => {
  context('Admin tenant user over menu settings', () => {
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

    it('C16801711_Expand DAPs, Users, and Companies of a group', () => {
      const groupId = 955

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.assertActiveGroupsAreDisplayed()

      // Assert number of records
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('roles', 1)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 10)
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
      equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('daps', 10)
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
  })

  context('Different users for login', () => {
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
      const groupId = 946

      equityAdmin.loginPage.login('tlaw@globalshares.com')
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'group')
      equityAdmin.groupManagementPage.checkPageUrl()
      equityAdmin.groupManagementPage.assertGroupPageHeaderIsDisplayed()

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.clickThreeDotOptionButton()
      equityAdmin.groupManagementPage.assertDuplicateEntityButtonDisplayed(false)
      equityAdmin.groupManagementPage.assertCreateNewGroupButtonDisplayed(false)
    })

    it('C16767340_Not able to Deactivate a group', () => {
      const groupId = 941 // Cannot Update & Delete Group

      equityAdmin.loginPage.login('jachas@globalshares.com')
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'group')
      equityAdmin.groupManagementPage.checkPageUrl()

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.assertThreeDotButtonDisplayed()
      equityAdmin.groupManagementPage.clickThreeDotOptionButton()
      equityAdmin.groupManagementPage.assertDuplicateEntityButtonDisplayed(true)
      equityAdmin.groupManagementPage.assertCreateNewGroupButtonDisplayed(true)
      equityAdmin.groupManagementPage.assertDeactivateEntityButtonDisplayed(false)
    })

    it('C16767341_User is not able to add or change role', () => {
      const groupId = 941 // Cannot Update & Delete Group

      equityAdmin.loginPage.login('jachas@globalshares.com')
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'group')
      equityAdmin.groupManagementPage.checkPageUrl()

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.assertEntityHeaderIsDisplayedAsExpected()
      equityAdmin.groupManagementPage.assertChangeRoleButtonDisplayed(false)
      equityAdmin.groupManagementPage.assertAddDapsButtonDisplayed(false)
      equityAdmin.groupManagementPage.assertAddUsersButtonDisplayed(false)
      equityAdmin.groupManagementPage.assertAddCompaniesButtonDisplayed(false)
    })

    it('C16767327_Unable to Add User to the Group', () => {
      const groupId = 941 // Cannot Update & Delete Group

      equityAdmin.loginPage.login('jachas@globalshares.com')
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'group')
      equityAdmin.groupManagementPage.checkPageUrl()

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.assertEntityHeaderIsDisplayedAsExpected()
      equityAdmin.groupManagementPage.assertAddUsersButtonDisplayed(false)
    })
  })

  context('Admin tenant user direct setting navigation (navigateToUrl)', () => {
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
      equityAdmin.groupManagementPage.assertBadgeContainsText('INACTIVE')
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
      equityAdmin.groupManagementPage.assertBadgeContainsText('INACTIVE')
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

    it('C16767329_Add a Single Company to a Group', () => {
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

    it('C16767330_Dismiss Adding a Company to a Group', () => {
      const groupId = 531
      const companyNames = ['cashgen020']
      const companyIds = [339]

      equityAdmin.homePage.navigateToUrl('/tenant/251/settings/group-management') // cashgen022

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.addCompaniesToGroup(companyNames, companyIds)
      equityAdmin.groupManagementPage.discardEntityInformation()

      equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[0], false)
    })

    it('C16767331_Adding more than one company to a group', () => {
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

    it('C16767332_Do Not Save Adding Company to a group', () => {
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

    it('C16767326_Dismiss Adding a User to a Group', () => {
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

    it('C16767328_Adding more than one user to a group', () => {
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

    it('C16767333_Show Content of a Group', () => {
      const groupId = 951

      equityAdmin.homePage.navigateToUrl('/tenant/263/settings/group-management') // cashgen026

      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.assertActiveGroupsAreDisplayed()
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('roles', 1)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 10)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('users', 7)
      equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('companies', 10)
    })
    it('C16805474_Search Groups behavior', () => {
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
  })
})
