import EquityAdmin from '../../../support/pages/equityAdmin'
import Utils from '../../../support/utils'

describe('Group Management tests over User Management settings', () => {
  const equityAdmin = new EquityAdmin()
  const utils = new Utils()

  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'group')
    equityAdmin.groupManagementPage.checkGroupManagementUrl()
  })

  // ************************************************ TESTS AS ADMIN TENANT ************************************************** //

  /**
   * Verify if the settings send the user back to the home screen when the user closes the settings menu
   *
   */
  it('C7412690_Group_Check_The_System_Behavior_When_Closing_The_Settings_Nav_Bar', () => {
    equityAdmin.settingsMenuNavBar.closeGlobalSettingsNavBar()
    equityAdmin.groupManagementPage.checkGroupManagementUrl()
  })

  /**
   * @missing_data Need to have some 1 group the active tab and 2 groups in inactive tabs
   */
  it.skip('C7412691_Search_Engine_Search_for_Groups_With_Different_Combinations_In_Active_And_Inactive_Tabs', () => {
    const groupsIdActiveTab = [1]
    const groupsIdInactiveTab = [1099, 1100]

    equityAdmin.groupManagementPage.assertNoGroupSelectedMessageDisplayed()

    let group = 'GLOBAL'
    equityAdmin.searchEngine.search(group)
    equityAdmin.groupManagementPage.assertAmountOfSearchResultsInTheList(1)
    equityAdmin.groupManagementPage.assertSearchResultListAccuracy(groupsIdActiveTab)
    equityAdmin.groupManagementPage.assertOtherGroupListDisplayed()
    equityAdmin.groupManagementPage.assertAllSearchResultItensAreDisplayedInHighlightedMode()

    group = 'global'
    equityAdmin.searchEngine.search(group)
    equityAdmin.groupManagementPage.assertAmountOfSearchResultsInTheList(1)
    equityAdmin.groupManagementPage.assertSearchResultListAccuracy(groupsIdActiveTab)
    equityAdmin.groupManagementPage.assertOtherGroupListDisplayed()
    equityAdmin.groupManagementPage.assertAllSearchResultItensAreDisplayedInHighlightedMode()

    group = 'GLObal'
    equityAdmin.searchEngine.search(group)
    equityAdmin.groupManagementPage.assertAmountOfSearchResultsInTheList(1)
    equityAdmin.groupManagementPage.assertSearchResultListAccuracy(groupsIdActiveTab)
    equityAdmin.groupManagementPage.assertOtherGroupListDisplayed()
    equityAdmin.groupManagementPage.assertAllSearchResultItensAreDisplayedInHighlightedMode()

    group = 'randomName'
    equityAdmin.searchEngine.search(group)
    equityAdmin.groupManagementPage.assertNoResultFoundIsVisible()
    equityAdmin.groupManagementPage.assertOtherGroupListDisplayed()

    group = 'SELECT * FROM groups'
    equityAdmin.searchEngine.search(group)
    equityAdmin.groupManagementPage.assertNoResultFoundIsVisible()
    equityAdmin.groupManagementPage.assertOtherGroupListDisplayed()

    // Now on Inactive TAB
    equityAdmin.groupManagementPage.clickTab('Inactive')

    group = 'ABC'
    equityAdmin.searchEngine.search(group)
    equityAdmin.groupManagementPage.assertAmountOfSearchResultsInTheList(2)
    equityAdmin.groupManagementPage.assertSearchResultListAccuracy(groupsIdInactiveTab)
    equityAdmin.groupManagementPage.assertOtherGroupListDisplayed()
    equityAdmin.groupManagementPage.assertAllSearchResultItensAreDisplayedInHighlightedMode()

    group = 'abc'
    equityAdmin.searchEngine.search(group)
    equityAdmin.groupManagementPage.assertAmountOfSearchResultsInTheList(2)
    equityAdmin.groupManagementPage.assertSearchResultListAccuracy(groupsIdInactiveTab)
    equityAdmin.groupManagementPage.assertOtherGroupListDisplayed()
    equityAdmin.groupManagementPage.assertAllSearchResultItensAreDisplayedInHighlightedMode()

    group = 'AbC'
    equityAdmin.searchEngine.search(group)
    equityAdmin.groupManagementPage.assertAmountOfSearchResultsInTheList(2)
    equityAdmin.groupManagementPage.assertSearchResultListAccuracy(groupsIdInactiveTab)
    equityAdmin.groupManagementPage.assertOtherGroupListDisplayed()
    equityAdmin.groupManagementPage.assertAllSearchResultItensAreDisplayedInHighlightedMode()

    group = 'randomName'
    equityAdmin.searchEngine.search(group)
    equityAdmin.groupManagementPage.assertNoResultFoundIsVisible()
    equityAdmin.groupManagementPage.assertOtherGroupListDisplayed()

    group = 'SELECT * FROM groups'
    equityAdmin.searchEngine.search(group)
    equityAdmin.groupManagementPage.assertNoResultFoundIsVisible()
    equityAdmin.groupManagementPage.assertOtherGroupListDisplayed()
  })

  /**
   * @missing_data Need to have one group with 1 role, 2 daps, 3 users and 2 companies added. Name the group, role, and daps with something that includes the searchTerm "To be searched"
   * Attention the searchTerm "To be searched" needs to have at least one letter in uppercase mode, so we can catch the bug raised in PB-962
   *
   *
   * SkIPPING due to https://globalshares.atlassian.net/browse/PB-962
   */
  it.skip('C9277663_Groups_Happy_Path_For_Searching_Behavior_In_Groups_Roles_Daps_Clients_And_Users_Over_The_Groups_Page', () => {
    const groupId = 1066
    const roleId = 1468
    const dapsId = [10, 12]
    const searchTerm = 'To be searched'
    const user = 'amulcahyNE'
    const userId = [454292]
    const client = '7Digital'
    const clientId = [144]

    equityAdmin.groupManagementPage.clickGroupById(groupId)
    equityAdmin.searchEngine.search(searchTerm)
    equityAdmin.groupManagementPage.assertSearchResultListAccuracy([groupId])
    equityAdmin.groupManagementPage.assertOtherGroupListDisplayed()
    equityAdmin.searchEngine.search(searchTerm)

    // Roles and DAPs to be found in the search
    cy.log('------ Find Roles and DAPs ------')
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('roles', 1)
    equityAdmin.groupManagementPage.assertNumberOfSearchResultsInASection('roles', 1)
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 2)
    equityAdmin.groupManagementPage.assertNumberOfSearchResultsInASection('daps', 2)
    equityAdmin.groupManagementPage.assertNumberOfSearchResultsInASection('users', 'No')
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('users', 3)
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('companies', 2)
    equityAdmin.groupManagementPage.assertNumberOfSearchResultsInASection('companies', 'No')
    equityAdmin.groupManagementPage.assertCardsDisplayedInHighlightedMode([roleId], 'role')
    equityAdmin.groupManagementPage.assertCardsDisplayedInHighlightedMode(dapsId, 'daps')

    // Users to be found in the search
    cy.log('------ Find Users ------')
    equityAdmin.searchEngine.search(user)
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('roles', 1)
    equityAdmin.groupManagementPage.assertNumberOfSearchResultsInASection('roles', 'No')
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 2)
    equityAdmin.groupManagementPage.assertNumberOfSearchResultsInASection('daps', 'No')
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('users', 3)
    equityAdmin.groupManagementPage.assertNumberOfSearchResultsInASection('users', 1)
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('companies', 2)
    equityAdmin.groupManagementPage.assertNumberOfSearchResultsInASection('companies', 'No')
    equityAdmin.groupManagementPage.assertCardsDisplayedInHighlightedMode(userId, 'daps')

    // Clients to be found in the search
    cy.log('------ Find Clients ------')
    equityAdmin.searchEngine.search(client)
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('roles', 1)
    equityAdmin.groupManagementPage.assertNumberOfSearchResultsInASection('roles', 'No')
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 2)
    equityAdmin.groupManagementPage.assertNumberOfSearchResultsInASection('daps', 'No')
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('users', 3)
    equityAdmin.groupManagementPage.assertNumberOfSearchResultsInASection('users', 'No')
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('companies', 2)
    equityAdmin.groupManagementPage.assertNumberOfSearchResultsInASection('companies', 1)
    equityAdmin.groupManagementPage.assertCardsDisplayedInHighlightedMode(clientId, 'daps')

    // Search for text without returning any result
    cy.log('------ No matching text ------')
    equityAdmin.searchEngine.search('textDoesNotReturnNothingAtAll')
    equityAdmin.groupManagementPage.assertNumberOfSearchResultsInASection('roles', 'No')
    equityAdmin.groupManagementPage.assertNumberOfSearchResultsInASection('daps', 'No')
    equityAdmin.groupManagementPage.assertNumberOfSearchResultsInASection('users', 'No')
    equityAdmin.groupManagementPage.assertNumberOfSearchResultsInASection('companies', 'No')
  })

  /**
   * @missing_data Need to have some groups in both active and inactive tabs
   */
  it.skip('C7499684_Groups_Happy_Path_List_Active_And_Inactive_Groups', () => {
    equityAdmin.groupManagementPage.assertActiveGroupsAreDisplayed()
    equityAdmin.groupManagementPage.clickTab('Inactive')
    equityAdmin.groupManagementPage.assertInactiveGroupsAreDisplayed()
  })

  /**
   * @missing_data Need to have a group created in the active tab
   */
  it.skip('C7499679_Groups_Deactivate_And_Activate_A_Group', () => {
    const groupId = 1122
    const groupName = 'Active and Inactive'

    // Inactivating a group
    equityAdmin.groupManagementPage.clickGroupById(groupId)
    equityAdmin.groupManagementPage.clickToDeactivateEntity()
    equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Deactivated')
    equityAdmin.groupManagementPage.assertInactiveGroupsAreDisplayed()
    equityAdmin.groupManagementPage.assertEntityIsDisplayedInTheList(groupName)

    // Activating a group
    equityAdmin.groupManagementPage.clickTab('Inactive')
    equityAdmin.groupManagementPage.activateGroup()
    equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Activated')
    equityAdmin.groupManagementPage.assertActiveGroupsAreDisplayed()
    equityAdmin.groupManagementPage.assertEntityIsDisplayedInTheList(groupName)
  })

  /**
   * @missing_data Need to have at least one active group called 'Duplicate this group'
   */
  it.skip('C7493036_Groups_Duplicate_A_Group', () => {
    const groupId = 1125
    const groupName = 'Duplicate this group'
    const newNameForDuplicatedGroup = 'Duplicated Group ' + utils.getRandomNumber()

    equityAdmin.groupManagementPage.clickGroupById(groupId)
    equityAdmin.groupManagementPage.clickToDuplicateEntity()
    equityAdmin.groupManagementPage.assertEntityHeaderIsDisplayedAsExpected('Copy of ' + groupName)
    equityAdmin.groupManagementPage.modifyEntityName(newNameForDuplicatedGroup)
    equityAdmin.groupManagementPage.saveEntityInformation()

    equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(newNameForDuplicatedGroup + ' Saved')
    equityAdmin.groupManagementPage.assertInactiveGroupsAreDisplayed()
    equityAdmin.groupManagementPage.assertEntityIsDisplayedInTheList(newNameForDuplicatedGroup)
  })

  /**
   * @missing_data Need to have at least one group and roles, daps, users, and companies to associate
   */
  it.skip('C7493034_Groups_Create_A_New_Group', () => {
    const groupName = 'Created Group ' + utils.getRandomNumber()
    const roleName = 'View Only'
    const roleId = 1397
    const dapNames = ['Test', 'View']
    const dapIds = [60, 12]
    const userNames = ['carolyn', 'igor']
    const userIds = [754546, 754556]
    const companyName = ['7Digital', '9F Group']
    const companyIds = [144, 337]

    equityAdmin.groupManagementPage.createGroup(groupName, roleName, roleId, dapNames, dapIds, userNames, userIds, companyName, companyIds)
  })

  /**
   * @missing_data Need to have a group with NO role associated. Also, it needs to have at least on role created in the environment.
   */
  it.skip('C7419661_Groups_Add_A_Role_To_A_Group', () => {
    const groupId = 1059
    const groupName = 'Add Role'
    const roleName = 'View Only'
    const roleId = 1655

    equityAdmin.groupManagementPage.clickGroupById(groupId)
    equityAdmin.groupManagementPage.selectRoleToGroup(roleName, roleId)
    equityAdmin.groupManagementPage.saveEntityInformation()
    equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')

    equityAdmin.groupManagementPage.assertRoleAssociatedWithGroup(roleId)
  })

  /**
   * @missing_data Need to have a group with an associated role created. Also, it needs to have at least two roles created in the environment.
   */
  it.skip('C7419662_Groups_Change_The_Role_Associated_With_A_Group', () => {
    const groupId = 1230
    const groupName = 'Change this role'
    const roleName = 'View Only'
    const roleId = 1397

    equityAdmin.groupManagementPage.clickGroupById(groupId)
    equityAdmin.groupManagementPage.selectRoleToGroup(roleName, roleId)
    equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')

    equityAdmin.groupManagementPage.assertRoleAssociatedWithGroup(roleId)
  })

  /**
   * @missing_data Need to have a group. Also, it needs to have at least on role created in the environment.
   */
  it.skip('C7419664_Groups_Discard_Without_Saving_The_Role', () => {
    const groupId = 1317
    const roleName = 'View Only'
    const roleId = 1397

    equityAdmin.groupManagementPage.clickGroupById(groupId)
    equityAdmin.groupManagementPage.selectRoleToGroup(roleName, roleId)
    equityAdmin.groupManagementPage.discardEntityInformation()

    equityAdmin.groupManagementPage.assertRoleAssociatedWithGroup(1397, false)
  })

  /**
   * @missing_data Need to have a group. Also, it needs to have at least one user created in the environment.
   */
  it.skip('C7419658_Groups_Add_Users_To_A_Group', () => {
    const groupId = 1042
    const groupName = 'Add Users Group'
    const userName = ['dfonsecaNE', 'amulcahyNE']
    const userIds = [454293, 454292]

    equityAdmin.groupManagementPage.clickGroupById(groupId)
    equityAdmin.groupManagementPage.addUsersToGroup(userName, userIds)
    equityAdmin.groupManagementPage.saveEntityInformation()
    equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')

    equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userIds[0])
    equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userIds[1])

    // Validates user 1 is linked to the group over User Management settings
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('', 'user', false)
    equityAdmin.searchEngine.search(userName[0])
    equityAdmin.userManagementPage.clickUserTable(userIds[0])
    equityAdmin.userManagementPage.clickLinkToAccessUserInfoDetailsOnRightNavBar()
    equityAdmin.userManagementPage.assertUserInfoContentInRightNavBar([groupName])
    equityAdmin.userManagementPage.clickOutsideToCloseL4RightBar()

    // Validates user 2 is linked to the group over User Management settings
    equityAdmin.searchEngine.search(userName[1])
    equityAdmin.userManagementPage.clickUserTable(userIds[1])
    equityAdmin.userManagementPage.clickLinkToAccessUserInfoDetailsOnRightNavBar()
    equityAdmin.userManagementPage.assertUserInfoContentInRightNavBar([groupName])
  })

  /**
   * @missing_data Need to have a group. Also, it needs to have at least one user created in the environment.
   */
  it.skip('C7419660_Groups_Discard_Without_Saving_The_User', () => {
    const groupId = 1256
    const userName = ['carolyn_giles', 'amulcahyNE']
    const userIds = [754546, 454292]

    equityAdmin.groupManagementPage.clickGroupById(groupId)
    equityAdmin.groupManagementPage.addUsersToGroup(userName, userIds)
    equityAdmin.groupManagementPage.discardEntityInformation()

    equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userIds[0], false)
    equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userIds[1], false)
  })

  /**
   * @missing_data Need to have a group. Also, it needs to have at least one client created in the environment.
   */
  it.skip('C7462559_Groups_Add_A_Client_To_A_Group', () => {
    const groupId = 1084
    const groupName = 'Add Clients'
    const companyNames = ['7Digital', '9F Group', 'Allianz']
    const companyIds = [144, 337, 55]

    equityAdmin.groupManagementPage.clickGroupById(groupId)
    equityAdmin.groupManagementPage.addCompaniesToGroup(companyNames, companyIds)
    equityAdmin.groupManagementPage.saveEntityInformation()
    equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')

    equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[0])
    equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[1])
    equityAdmin.groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[2])
  })

  /**
   * @missing_data Need to have a group. Also, it needs to have at least one client created in the environment.
   */
  it.skip('C7462561_Groups_Discard_Without_Saving_The_Company', () => {
    const groupId = 1220
    const companyNames = ['7Digital', '9F Group', 'Allianz']
    const companyIds = [144, 337, 55]

    equityAdmin.groupManagementPage.clickGroupById(groupId)
    equityAdmin.groupManagementPage.addCompaniesToGroup(companyNames, companyIds)
    equityAdmin.groupManagementPage.discardEntityInformation()

    equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(companyIds[0], false)
    equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(companyIds[1], false)
  })

  /**
   * @missing_data Need to have a group with 1 role at least 8 DAPs, 8 Users, and 8 Clients linked to a this group
   */
  it.skip('C7462614_Groups_Show_High_Level_Content_Of_A_Group', () => {
    const groupId = 1219
    const roleId = 1397

    equityAdmin.groupManagementPage.clickGroupById(groupId)

    equityAdmin.groupManagementPage.assertRoleAssociatedWithGroup(roleId)

    // roles
    equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('roles', 1)
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('roles', 1)

    // daps
    equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('daps', 8)
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 9)

    // users
    equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('users', 8)
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('users', 17)

    // companies
    equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('companies', 8)
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('companies', 18)

    // CHANGE RESOLUTION
    equityAdmin.groupManagementPage.changeBrowserResolution(1500, 1080)

    // roles
    equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('roles', 1)
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('roles', 1)

    // daps
    equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('daps', 4)
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 9)

    // users
    equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('users', 4)
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('users', 17)

    // companies
    equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('companies', 4)
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('companies', 18)

    // CHANGE RESOLUTION
    equityAdmin.groupManagementPage.changeBrowserResolution(1200, 960)

    // roles
    equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('roles', 1)
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('roles', 1)

    // daps
    equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('daps', 2)
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('daps', 9)

    // users
    equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('users', 2)
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('users', 17)

    // companies
    equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('companies', 2)
    equityAdmin.groupManagementPage.assertNumberOfRecordsInASection('companies', 18)
  })

  /**
   * @missing_data Need to have a group with 1 role at least 8 DAPs, 8 Users, and 8 Clients linked to a this group
   */
  it.skip('C7462615_Groups_Expand_DAPs_Users_And_Clients', () => {
    const groupId = 964

    equityAdmin.groupManagementPage.clickGroupById(groupId)

    // daps
    equityAdmin.groupManagementPage.clickShowAll('daps')
    equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('daps', 13)
    equityAdmin.groupManagementPage.clickHide('daps')
    equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('daps', 8)

    // users
    equityAdmin.groupManagementPage.clickShowAll('users')
    equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('users', 11)
    equityAdmin.groupManagementPage.clickHide('users')
    equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('users', 8)

    // clients
    equityAdmin.groupManagementPage.clickShowAll('companies')
    equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('companies', 15)
    equityAdmin.groupManagementPage.clickHide('companies')
    equityAdmin.groupManagementPage.assertNumberOfCardsDisplayedInASection('companies', 8)
  })

  /**
   * @missing_data Need to have a group with 1 company registered
   */
  it.skip('C7462619_Groups_Client_Is_Removed_From_The_Group', () => {
    const groupId = 1223
    const groupName = 'Remove company'
    const companyIds = [144]

    equityAdmin.groupManagementPage.clickGroupById(groupId)

    equityAdmin.groupManagementPage.removeCompaniesFromGroup(companyIds)
    equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')
    equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(companyIds[0], false)
  })

  /**
   * @missing_data Need to have a group with 1 DAP registered
   */
  it.skip('C7493030_Groups_DAP_Is_Removed_From_The_Group', () => {
    const groupId = 1222
    const groupName = 'Remove dap'
    const dapIds = [60]

    equityAdmin.groupManagementPage.clickGroupById(groupId)

    equityAdmin.groupManagementPage.removeDapsFromGroup(dapIds)
    equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')
    equityAdmin.groupManagementPage.assertDapAssociatedWithGroup(dapIds[0], false)
  })

  /**
   * @missing_data Need to have a group. Also, it needs to have 3 daps created in the environment.
   */
  it.skip('C7412692_Groups_Add_A_Data_Access_Profile_To_A_Group', () => {
    const groupId = 1022
    const groupName = 'ADD daps'
    const dapNames = ['DAP 1', 'DAP 2', 'DAP 3']
    const dapIds = [41, 42, 43]

    equityAdmin.groupManagementPage.clickGroupById(groupId)
    equityAdmin.groupManagementPage.addDapsToGroup(dapNames, dapIds)
    equityAdmin.groupManagementPage.saveEntityInformation()
    equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')

    equityAdmin.groupManagementPage.assertDapAssociatedWithGroup(dapIds[0])
    equityAdmin.groupManagementPage.assertDapAssociatedWithGroup(dapIds[1])
    equityAdmin.groupManagementPage.assertDapAssociatedWithGroup(dapIds[2])

    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('', 'dap', false)
    equityAdmin.dapManagementPage.checkDapManagementUrl()

    equityAdmin.dapManagementPage.clickDapById(dapIds[0])
    equityAdmin.dapManagementPage.assertGroupAssociatedWithDap(groupId)
    equityAdmin.dapManagementPage.clickDapById(dapIds[1])
    equityAdmin.dapManagementPage.assertGroupAssociatedWithDap(groupId)
    equityAdmin.dapManagementPage.clickDapById(dapIds[2])
    equityAdmin.dapManagementPage.assertGroupAssociatedWithDap(groupId)
  })

  /**
   * @missing_data Need to have a group. Also, it needs to have at least one DAP created in the environment.
   */
  it.skip('C7412694_Groups_Discard_Without_Saving_DAPs', () => {
    const groupId = 1281
    const dapNames = ['Test', 'Test', 'Test3']
    const dapIds = [60, 77, 78]

    equityAdmin.groupManagementPage.clickGroupById(groupId)
    equityAdmin.groupManagementPage.addDapsToGroup(dapNames, dapIds)
    equityAdmin.groupManagementPage.discardEntityInformation()

    equityAdmin.groupManagementPage.assertDapAssociatedWithGroup(dapIds[0], false)
    equityAdmin.groupManagementPage.assertDapAssociatedWithGroup(dapIds[1], false)
    equityAdmin.groupManagementPage.assertDapAssociatedWithGroup(dapIds[2], false)
  })

  /**
   * @missing_data Need to have a group with 1 User registered
   */
  it.skip('C7493032_Groups_User_Is_Removed_From_The_Group', () => {
    const groupId = 1282
    const groupName = 'Remove user'
    const userIds = [754546, 754556]

    equityAdmin.groupManagementPage.clickGroupById(groupId)
    equityAdmin.groupManagementPage.scrollToTop() // strategy used just to move the scroll up

    equityAdmin.groupManagementPage.removeUsersFromGroup(userIds)
    equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')

    equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userIds[0], false)
    equityAdmin.groupManagementPage.assertUserAssociatedWithGroup(userIds[1], false)
  })

  /**
   * @missing_data Need to have a group with 1 Role registered
   */
  it.skip('C8161539_Groups_Role_Is_Removed_From_The_Group', () => {
    const groupId = 1424
    const groupName = 'Remove role'
    const roleId = 1854

    equityAdmin.groupManagementPage.clickGroupById(groupId)

    equityAdmin.groupManagementPage.removeRoleFromGroup(roleId)
    equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')

    equityAdmin.groupManagementPage.assertRoleAssociatedWithGroup(1854, false)
  })

  /**
   * @missing_data No active and inactive groups exist
   */
  it.skip('C7499685_Groups_Empty_State_Active_and_Inactive_Groups', () => {
    // Active Tab
    equityAdmin.groupManagementPage.clickTab('Active')
    equityAdmin.groupManagementPage.assertActiveGroupsAreDisplayed(false)
    equityAdmin.groupManagementPage.assertNoGroupExistMessageIsDisplayed()

    // Inactive Tab
    equityAdmin.groupManagementPage.clickTab('Inactive')
    equityAdmin.groupManagementPage.assertInactiveGroupsAreDisplayed(false)
    equityAdmin.groupManagementPage.assertNoGroupExistMessageIsDisplayed()
  })
})

// ************************************************ TESTS AS VIEW ONLY USER ************************************************** //
describe('Group Management tests over User Management settings - View Only User', () => {
  const equityAdmin = new EquityAdmin()

  beforeEach(() => {
    equityAdmin.loginPage.login(Cypress.env('VIEW_ONLY_USER_2_AUTH'))
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'group')
    equityAdmin.groupManagementPage.checkGroupManagementUrl()
  })

  /**
   * @missing_data Need to have a group with 1 Role with a "view only" access and a user with "view only" access as well.
   */
  it.skip('C7422807_Groups_User_Does_Not_Have_Group_Update_Permission_To_Add_DAPs_Users_Role_And_Clients', () => {
    const groupId = 1017

    equityAdmin.groupManagementPage.clickGroupById(groupId)
    equityAdmin.groupManagementPage.assertChangeRoleButtonDisplayed(false)
    equityAdmin.groupManagementPage.assertAddDapsButtonDisplayed(false)
    equityAdmin.groupManagementPage.assertAddUsersButtonDisplayed(false)
    equityAdmin.groupManagementPage.assertAddCompaniesButtonDisplayed(false)
  })

  /**
   * @missing_data Need to have a group linked with 1 Role ("view only" access given) and a user ("view only" access as well). Also, this group needs to have 2 DAPs and 2 companies associated
   */
  it.skip('C7493031_Groups_User_Does_Not_Have_Group_Permission_To_Remove_Entities', () => {
    const groupId = 1017
    const roleId = 1466
    const dapIds = [6, 8]
    const userId = 794873
    const companiesIds = [144, 337]

    equityAdmin.groupManagementPage.clickGroupById(groupId)
    equityAdmin.groupManagementPage.assertRemoveRoleOptionIsDisplayed(roleId, false)
    equityAdmin.groupManagementPage.assertRemoveDapOptionIsDisplayed(dapIds[0], false)
    equityAdmin.groupManagementPage.assertRemoveDapOptionIsDisplayed(dapIds[1], false)
    equityAdmin.groupManagementPage.assertRemoveUserOptionIsDisplayed(userId, false)
    equityAdmin.groupManagementPage.assertRemoveCompanyOptionIsDisplayed(companiesIds[0], false)
    equityAdmin.groupManagementPage.assertRemoveCompanyOptionIsDisplayed(companiesIds[1], false)
  })

  /**
   * @missing_data Need to have a group linked with a user that has all Group permissions but Delete
   */
  it.skip('C7499680_Groups_User_Does_Not_Have_Group_Permission_To_Deactivate_Group', () => {
    const groupId = 1017

    equityAdmin.groupManagementPage.clickGroupById(groupId)
    equityAdmin.groupManagementPage.assertThreeDotButtonDisplayed()
    equityAdmin.groupManagementPage.clickThreeDotOptionButton()
    equityAdmin.groupManagementPage.assertDuplicateEntityButtonDisplayed(true)
    equityAdmin.groupManagementPage.assertNewGroupButtonDisplayed(true)
    equityAdmin.groupManagementPage.assertDeactivateEntityButtonDisplayed(false)
  })

  /**
   * @missing_data Need to have a group linked with a user that has all Group permissions but Create
   */
  it.skip('C7493037_Groups_User_Does_Not_Have_Group_Permission_To_Duplicate_Group', () => {
    const groupId = 1017

    equityAdmin.groupManagementPage.clickGroupById(groupId)
    equityAdmin.groupManagementPage.assertThreeDotButtonDisplayed()
    equityAdmin.groupManagementPage.clickThreeDotOptionButton()
    equityAdmin.groupManagementPage.assertDeactivateEntityButtonDisplayed(true)
    equityAdmin.groupManagementPage.assertNewGroupButtonDisplayed(false)
    equityAdmin.groupManagementPage.assertDuplicateEntityButtonDisplayed(false)
  })

  /**
   * @missing_data Need to have a group linked with a user that has all Group permissions but Create
   *
   * SkIPPING due to https://globalshares.atlassian.net/browse/PB-979
   */
  it.skip('C7493035_Groups_User_Does_Not_Have_Group_Permission_To_Create_Group', () => {
    equityAdmin.groupManagementPage.assertNewGroupButtonDisplayed(false)
    equityAdmin.groupManagementPage.addPathToUrlAndVisitIt('/0')
    // Need to wait for PB-979 to know what are going to be the next steps
  })
})

describe('Group Management tests over User Management settings - Other specific tests without before each hook', () => {
  const equityAdmin = new EquityAdmin()

  /**
   * @missing_data Need to have a user with view permissions for all the settings but Group
   */
  it.skip('C9277665_User_Does_Not_Have_View_Permission_For_Groups_Only', () => {
    equityAdmin.loginPage.login(Cypress.env('VIEW_ONLY_USER_2_AUTH'))

    equityAdmin.applicationLeftMenuBar.openSettingsMenuBar()
    equityAdmin.settingsMenuNavBar.assertGlobalSettingsMenuOpen()
    equityAdmin.settingsMenuNavBar.assertUserManagementMenuDisplayed()
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', '', false)
    equityAdmin.settingsMenuNavBar.assertBackButtonDisplayed() // Assert it just to make sure we are in the correct menu
    equityAdmin.settingsMenuNavBar.assertGroupSubMenuItemDisplayed(false)
  })
})

// ************************************************ TESTS AS CLIENTS ************************************************** //
