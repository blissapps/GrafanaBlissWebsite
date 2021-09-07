import GroupManagementPage from '../../../support/pages/globalSettingsPages/userManagementPages/groupManagementPage'
import DapManagementPage from '../../../support/pages/globalSettingsPages/userManagementPages/dapManagementPage'
import UserManagementPage from '../../../support/pages/globalSettingsPages/userManagementPages/userManagementPage'

import LeftMenuNavBar from '../../../support/components/leftMenuNavBar'
import SearchBar from '../../../support/components/searchBar'

import Utils from '../../../support/utils'

describe('Group Management tests over User Management settings', () => {
  // Pages
  const groupManagementPage = new GroupManagementPage()
  const dapManagementPage = new DapManagementPage()
  const userManagementPage = new UserManagementPage()

  // Components
  const leftMenuNavBar = new LeftMenuNavBar()
  const searchBar = new SearchBar()

  // Others
  const utils = new Utils()

  beforeEach(() => {
    cy.login() && cy.loginSuccessfulXHRWaits()
    leftMenuNavBar.accessGlobalSettingsMenu('user', 'group')
    groupManagementPage.checkGroupManagementUrl()
  })

  // ************************************************ TESTS AS ADMIN TENANT ************************************************** //

  /**
   * Verify if the settings send the user back to the home screen when the user closes the settings menu
   *
   */
  it('C7412690_Group_Check_The_System_Behavior_When_Closing_The_Settings_Nav_Bar', () => {
    leftMenuNavBar.closeGlobalSettingsLeftBar()
    groupManagementPage.checkGroupManagementUrl()
  })

  /**
   *
   * SkIPPING due to https://globalshares.atlassian.net/browse/PB-873
   *
   * @missing_data Need to have some groups in both active and inactive tabs
   */
  it.skip('C7412691_Search_Engine_Search_for_Groups_With_Different_Combinations_In_Active_And_Inactive_Tabs', () => {
    const groupsIdActiveTab = [1]
    const groupsIdInactiveTab = [1055, 1056]
    groupManagementPage.assertNoGroupSelectedMessageState()

    let group = 'GLOBAL'
    searchBar.search(group)
    groupManagementPage.assertAmountOfSearchResultsInTheList(1)
    groupManagementPage.assertSearchResultListAccuracy(groupsIdActiveTab)
    groupManagementPage.assertOtherGroupListDisplayed()
    groupManagementPage.assertAllSearchResultItensAreDisplayedInHighlightedMode()

    group = 'global'
    searchBar.search(group)
    groupManagementPage.assertAmountOfSearchResultsInTheList(1)
    groupManagementPage.assertSearchResultListAccuracy(groupsIdActiveTab)
    groupManagementPage.assertOtherGroupListDisplayed()
    groupManagementPage.assertAllSearchResultItensAreDisplayedInHighlightedMode()

    group = 'GLObal'
    searchBar.search(group)
    groupManagementPage.assertAmountOfSearchResultsInTheList(1)
    groupManagementPage.assertSearchResultListAccuracy(groupsIdActiveTab)
    groupManagementPage.assertOtherGroupListDisplayed()
    groupManagementPage.assertAllSearchResultItensAreDisplayedInHighlightedMode()

    group = 'randomName'
    searchBar.search(group)
    groupManagementPage.assertNoResultFoundIsVisible()
    groupManagementPage.assertOtherGroupListDisplayed()

    group = 'SELECT * FROM groups'
    searchBar.search(group)
    groupManagementPage.assertNoResultFoundIsVisible()
    groupManagementPage.assertOtherGroupListDisplayed()

    // Now on Inactive TAB
    groupManagementPage.clickTabByTitle('Inactive')

    group = 'ABC'
    searchBar.search(group)
    groupManagementPage.assertAmountOfSearchResultsInTheList(2)
    groupManagementPage.assertSearchResultListAccuracy(groupsIdInactiveTab)
    groupManagementPage.assertOtherGroupListDisplayed()
    groupManagementPage.assertAllSearchResultItensAreDisplayedInHighlightedMode()

    group = 'abc'
    searchBar.search(group)
    groupManagementPage.assertAmountOfSearchResultsInTheList(2)
    groupManagementPage.assertSearchResultListAccuracy(groupsIdInactiveTab)
    groupManagementPage.assertOtherGroupListDisplayed()
    groupManagementPage.assertAllSearchResultItensAreDisplayedInHighlightedMode()

    group = 'AbC'
    searchBar.search(group)
    groupManagementPage.assertAmountOfSearchResultsInTheList(2)
    groupManagementPage.assertSearchResultListAccuracy(groupsIdInactiveTab)
    groupManagementPage.assertOtherGroupListDisplayed()
    groupManagementPage.assertAllSearchResultItensAreDisplayedInHighlightedMode()

    group = 'randomName'
    searchBar.search(group)
    groupManagementPage.assertNoResultFoundIsVisible()
    groupManagementPage.assertOtherGroupListDisplayed()

    group = 'SELECT * FROM groups'
    searchBar.search(group)
    groupManagementPage.assertNoResultFoundIsVisible()
    groupManagementPage.assertOtherGroupListDisplayed()
  })

  /**
   * @missing_data Need to have a group with 1 roles, 2 daps, 3 users and 2 companies added.
   *
   * * SkIPPING due to https://globalshares.atlassian.net/browse/PB-873
   */
  it.skip('C9277663_Groups_Happy_Path_For_Searching_Behavior_In_Groups_Roles_Daps_Clients_And_Users_Over_The_Groups_Page', () => {
    const groupId = 940
    const roleId = [1385]
    const dapsId = [2, 3]
    const searchTerm = 'To be searched'
    const user = 'amulcahyNE'
    const userId = [454292]
    const client = '7Digital'
    const clientId = [144]

    groupManagementPage.clickGroupById(groupId)
    searchBar.search(searchTerm)
    groupManagementPage.assertSearchResultListAccuracy([groupId])
    groupManagementPage.assertOtherGroupListDisplayed()

    // Roles and DAPs to be found in the search
    groupManagementPage.assertNumberOfRecordsInASection('roles', 1)
    groupManagementPage.assertNumberOfSearchResultsInASection('roles', 1)
    groupManagementPage.assertNumberOfRecordsInASection('daps', 2)
    groupManagementPage.assertNumberOfSearchResultsInASection('daps', 2)
    groupManagementPage.assertNumberOfRecordsInASection('users', 3)
    groupManagementPage.assertNumberOfSearchResultsInASection('users', 'No')
    groupManagementPage.assertNumberOfRecordsInASection('companies', 2)
    groupManagementPage.assertNumberOfSearchResultsInASection('companies', 'No')
    groupManagementPage.assertCardsDisplayedInHighlightedMode(roleId, 'role')
    groupManagementPage.assertCardsDisplayedInHighlightedMode(dapsId, 'daps')

    // Users to be found in the search
    searchBar.search(user)
    groupManagementPage.assertNumberOfRecordsInASection('roles', 1)
    groupManagementPage.assertNumberOfSearchResultsInASection('roles', 'No')
    groupManagementPage.assertNumberOfRecordsInASection('daps', 2)
    groupManagementPage.assertNumberOfSearchResultsInASection('daps', 'No')
    groupManagementPage.assertNumberOfRecordsInASection('users', 3)
    groupManagementPage.assertNumberOfSearchResultsInASection('users', 1)
    groupManagementPage.assertNumberOfRecordsInASection('companies', 2)
    groupManagementPage.assertNumberOfSearchResultsInASection('companies', 'No')
    groupManagementPage.assertCardsDisplayedInHighlightedMode(userId, 'daps')

    // Clients to be found in the search
    searchBar.search(client)
    groupManagementPage.assertNumberOfRecordsInASection('roles', 1)
    groupManagementPage.assertNumberOfSearchResultsInASection('roles', 'No')
    groupManagementPage.assertNumberOfRecordsInASection('daps', 2)
    groupManagementPage.assertNumberOfSearchResultsInASection('daps', 'No')
    groupManagementPage.assertNumberOfRecordsInASection('users', 3)
    groupManagementPage.assertNumberOfSearchResultsInASection('users', 'No')
    groupManagementPage.assertNumberOfRecordsInASection('companies', 2)
    groupManagementPage.assertNumberOfSearchResultsInASection('companies', 1)
    groupManagementPage.assertCardsDisplayedInHighlightedMode(clientId, 'daps')
  })

  /**
   * @missing_data Need to have some groups in both active and inactive tabs
   */
  it.skip('C7499684_Groups_Happy_Path_List_Active_And_Inactive_Groups', () => {
    groupManagementPage.assertActiveGroupsAreDisplayed()
    groupManagementPage.clickTabByTitle('Inactive')
    groupManagementPage.assertInactiveGroupsAreDisplayed()
  })

  /**
   * @missing_data Need to have a group created in the Inactive tab
   */
  it.skip('C7499679_Groups_Deactivate_And_Activate_A_Group', () => {
    const groupId = 1122
    const groupName = 'Active and Inactive'

    // Inactivating a group
    groupManagementPage.clickGroupById(groupId)
    groupManagementPage.clickToDeactivateEntity()
    groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Deactivated')
    groupManagementPage.assertInactiveGroupsAreDisplayed()
    groupManagementPage.assertEntityIsDisplayedInTheList(groupName)

    // Activating a group
    groupManagementPage.clickTabByTitle('Inactive')
    groupManagementPage.activateGroup()
    groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Activated')
    groupManagementPage.assertActiveGroupsAreDisplayed()
    groupManagementPage.assertEntityIsDisplayedInTheList(groupName)
  })

  /**
   * SKIPPING DUE TO https://globalshares.atlassian.net/browse/PB-875
   *
   * @missing_data Need to have at least one active group called 'Duplicate this group'
   */
  it.skip('C7493036_Groups_Duplicate_A_Group', () => {
    const groupId = 957
    const groupName = 'Duplicate this group'
    const newNameForDuplicatedGroup = 'Duplicated Group' + utils.getRandomNumber()

    groupManagementPage.clickGroupById(groupId)
    groupManagementPage.clickToDuplicateEntity()
    groupManagementPage.assertEntityHeaderIsDisplayedAsExpected('Copy of ' + groupName)
    groupManagementPage.modifyEntityName(newNameForDuplicatedGroup)
    groupManagementPage.saveEntityInformation()

    groupManagementPage.assertToastNotificationMessageIsDisplayed(newNameForDuplicatedGroup + ' Saved')
    groupManagementPage.assertInactiveGroupsAreDisplayed()
    groupManagementPage.assertEntityIsDisplayedInTheList(newNameForDuplicatedGroup)
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

    groupManagementPage.createGroup(groupName, roleName, roleId, dapNames, dapIds, userNames, userIds, companyName, companyIds)
  })

  /**
   * @missing_data Need to have a group with NO role associated. Also, it needs to have at least on role created in the environment.
   */
  it.skip('C7419661_Groups_Add_A_Role_To_A_Group', () => {
    const groupId = 1059
    const groupName = 'Add Role'
    const roleName = 'View Only'
    const roleId = 1655

    groupManagementPage.clickGroupById(groupId)
    groupManagementPage.selectRoleToGroup(roleName, roleId)
    groupManagementPage.saveEntityInformation()
    groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')

    groupManagementPage.assertRoleAssociatedWithGroup(roleId)
  })

  /**
   * @missing_data Need to have a group with an associated role created. Also, it needs to have at least two roles created in the environment.
   */
  it.skip('C7419662_Groups_Change_The_Role_Associated_With_A_Group', () => {
    const groupId = 1230
    const groupName = 'Change this role'
    const roleName = 'View Only'
    const roleId = 1397

    groupManagementPage.clickGroupById(groupId)
    groupManagementPage.selectRoleToGroup(roleName, roleId)
    groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')

    groupManagementPage.assertRoleAssociatedWithGroup(roleId)
  })

  /**
   * @missing_data Need to have a group. Also, it needs to have at least on role created in the environment.
   */
  it.skip('C7419664_Groups_Discard_Without_Saving_The_Role', () => {
    const groupId = 1317
    const roleName = 'View Only'
    const roleId = 1397

    groupManagementPage.clickGroupById(groupId)
    groupManagementPage.selectRoleToGroup(roleName, roleId)
    groupManagementPage.discardEntityInformation()

    groupManagementPage.assertRoleAssociatedWithGroup(1397, false)
  })

  /**
   * @missing_data Need to have a group. Also, it needs to have at least one user created in the environment.
   */
  it.skip('C7419658_Groups_Add_Users_To_A_Group', () => {
    const groupId = 1042
    const groupName = 'Add Users Group'
    const userName = ['dfonsecaNE', 'amulcahyNE']
    const userIds = [454293, 454292]

    groupManagementPage.clickGroupById(groupId)
    groupManagementPage.addUsersToGroup(userName, userIds)
    groupManagementPage.saveEntityInformation()
    groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')

    groupManagementPage.assertUserAssociatedWithGroup(userIds[0])
    groupManagementPage.assertUserAssociatedWithGroup(userIds[1])

    // Validates user 1 is linked to the group over User Management settings
    leftMenuNavBar.accessGlobalSettingsMenu('', 'user', false)
    searchBar.search(userName[0])
    userManagementPage.clickUserTable(userIds[0])
    userManagementPage.clickLinkToAccessUserInfoDetailsOnRightNavBar()
    userManagementPage.assertUserInfoContentInRightNavBar([groupName])
    userManagementPage.clickOutsideToCloseL4RightWindow()

    // Validates user 2 is linked to the group over User Management settings
    searchBar.search(userName[1])
    userManagementPage.clickUserTable(userIds[1])
    userManagementPage.clickLinkToAccessUserInfoDetailsOnRightNavBar()
    userManagementPage.assertUserInfoContentInRightNavBar([groupName])
  })

  /**
   * @missing_data Need to have a group. Also, it needs to have at least one user created in the environment.
   */
  it.skip('C7419660_Groups_Discard_Without_Saving_The_User', () => {
    const groupId = 1256
    const userName = ['carolyn_giles', 'amulcahyNE']
    const userIds = [754546, 454292]

    groupManagementPage.clickGroupById(groupId)
    groupManagementPage.addUsersToGroup(userName, userIds)
    groupManagementPage.discardEntityInformation()

    groupManagementPage.assertUserAssociatedWithGroup(userIds[0], false)
    groupManagementPage.assertUserAssociatedWithGroup(userIds[1], false)
  })

  /**
   * @missing_data Need to have a group. Also, it needs to have at least one client created in the environment.
   */
  it.skip('C7462559_Groups_Add_A_Client_To_A_Group', () => {
    const groupId = 1084
    const groupName = 'Add Clients'
    const companyNames = ['7Digital', '9F Group', 'Allianz']
    const companyIds = [144, 337, 55]

    groupManagementPage.clickGroupById(groupId)
    groupManagementPage.addCompaniesToGroup(companyNames, companyIds)
    groupManagementPage.saveEntityInformation()
    groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')

    groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[0])
    groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[1])
    groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[2])
  })

  /**
   * @missing_data Need to have a group. Also, it needs to have at least one client created in the environment.
   */
  it.skip('C7462561_Groups_Discard_Without_Saving_The_Company', () => {
    const groupId = 1220
    const companyNames = ['7Digital', '9F Group', 'Allianz']
    const companyIds = [144, 337, 55]

    groupManagementPage.clickGroupById(groupId)
    groupManagementPage.addCompaniesToGroup(companyNames, companyIds)
    groupManagementPage.discardEntityInformation()

    groupManagementPage.assertUserAssociatedWithGroup(companyIds[0], false)
    groupManagementPage.assertUserAssociatedWithGroup(companyIds[1], false)
  })

  /**
   * @missing_data Need to have a group with 1 role at least 8 DAPs, 8 Users, and 8 Clients linked to a this group
   */
  it.skip('C7462614_Groups_Show_High_Level_Content_Of_A_Group', () => {
    const groupId = 1219
    const roleId = 1397

    groupManagementPage.clickGroupById(groupId)
    groupManagementPage.scrollToTop() // strategy used just to move the scroll up

    groupManagementPage.assertRoleAssociatedWithGroup(roleId)

    // roles
    groupManagementPage.assertNumberOfCardsDisplayedInASection('roles', 1)
    groupManagementPage.assertNumberOfRecordsInASection('roles', 1)

    // daps
    groupManagementPage.assertNumberOfCardsDisplayedInASection('daps', 8)
    groupManagementPage.assertNumberOfRecordsInASection('daps', 9)

    // users
    groupManagementPage.assertNumberOfCardsDisplayedInASection('users', 8)
    groupManagementPage.assertNumberOfRecordsInASection('users', 17)

    // companies
    groupManagementPage.assertNumberOfCardsDisplayedInASection('companies', 8)
    groupManagementPage.assertNumberOfRecordsInASection('companies', 18)

    // CHANGE RESOLUTION
    groupManagementPage.changeBrowserResolution(1500, 1080)

    // roles
    groupManagementPage.assertNumberOfCardsDisplayedInASection('roles', 1)
    groupManagementPage.assertNumberOfRecordsInASection('roles', 1)

    // daps
    groupManagementPage.assertNumberOfCardsDisplayedInASection('daps', 4)
    groupManagementPage.assertNumberOfRecordsInASection('daps', 9)

    // users
    groupManagementPage.assertNumberOfCardsDisplayedInASection('users', 4)
    groupManagementPage.assertNumberOfRecordsInASection('users', 17)

    // companies
    groupManagementPage.assertNumberOfCardsDisplayedInASection('companies', 4)
    groupManagementPage.assertNumberOfRecordsInASection('companies', 18)

    // CHANGE RESOLUTION
    groupManagementPage.changeBrowserResolution(1200, 960)

    // roles
    groupManagementPage.assertNumberOfCardsDisplayedInASection('roles', 1)
    groupManagementPage.assertNumberOfRecordsInASection('roles', 1)

    // daps
    groupManagementPage.assertNumberOfCardsDisplayedInASection('daps', 2)
    groupManagementPage.assertNumberOfRecordsInASection('daps', 9)

    // users
    groupManagementPage.assertNumberOfCardsDisplayedInASection('users', 2)
    groupManagementPage.assertNumberOfRecordsInASection('users', 17)

    // companies
    groupManagementPage.assertNumberOfCardsDisplayedInASection('companies', 2)
    groupManagementPage.assertNumberOfRecordsInASection('companies', 18)
  })

  /**
   * @missing_data Need to have a group with 1 role at least 8 DAPs, 8 Users, and 8 Clients linked to a this group
   */
  it.skip('C7462615_Groups_Expand_DAPs_Users_And_Clients', () => {
    const groupId = 964

    groupManagementPage.clickGroupById(groupId)
    groupManagementPage.scrollToTop() // strategy used just to move the scroll up

    // daps
    groupManagementPage.clickShowAll('daps')
    groupManagementPage.assertNumberOfCardsDisplayedInASection('daps', 13)
    groupManagementPage.clickHide('daps')
    groupManagementPage.assertNumberOfCardsDisplayedInASection('daps', 8)

    // users
    groupManagementPage.clickShowAll('users')
    groupManagementPage.assertNumberOfCardsDisplayedInASection('users', 11)
    groupManagementPage.clickHide('users')
    groupManagementPage.assertNumberOfCardsDisplayedInASection('users', 8)

    // clients
    groupManagementPage.clickShowAll('companies')
    groupManagementPage.assertNumberOfCardsDisplayedInASection('companies', 15)
    groupManagementPage.clickHide('companies')
    groupManagementPage.assertNumberOfCardsDisplayedInASection('companies', 8)
  })

  /**
   * @missing_data Need to have a group with 1 company registered
   */
  it.skip('C7462619_Groups_Client_Is_Removed_From_The_Group', () => {
    const groupId = 1223
    const groupName = 'Remove company'
    const companyIds = [144]

    groupManagementPage.clickGroupById(groupId)
    groupManagementPage.scrollToTop() // strategy used just to move the scroll up

    groupManagementPage.removeCompaniesFromGroup(companyIds)
    groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')
    groupManagementPage.assertUserAssociatedWithGroup(companyIds[0], false)
  })

  /**
   * @missing_data Need to have a group with 1 DAP registered
   */
  it.skip('C7493030_Groups_DAP_Is_Removed_From_The_Group', () => {
    const groupId = 1222
    const groupName = 'Remove dap'
    const dapIds = [60]

    groupManagementPage.clickGroupById(groupId)
    groupManagementPage.scrollToTop() // strategy used just to move the scroll up

    groupManagementPage.removeDapsFromGroup(dapIds)
    groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')
    groupManagementPage.assertDapAssociatedWithGroup(dapIds[0], false)
  })

  /**
   * @missing_data Need to have a group. Also, it needs to have 3 daps created in the environment.
   */
  it.skip('C7412692_Groups_Add_A_Data_Access_Profile_To_A_Group', () => {
    const groupId = 1022
    const groupName = 'ADD daps'
    const dapNames = ['DAP 1', 'DAP 2', 'DAP 3']
    const dapIds = [41, 42, 43]

    groupManagementPage.clickGroupById(groupId)
    groupManagementPage.addDapsToGroup(dapNames, dapIds)
    groupManagementPage.saveEntityInformation()
    groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')

    groupManagementPage.assertDapAssociatedWithGroup(dapIds[0])
    groupManagementPage.assertDapAssociatedWithGroup(dapIds[1])
    groupManagementPage.assertDapAssociatedWithGroup(dapIds[2])

    leftMenuNavBar.accessGlobalSettingsMenu('', 'dap', false)
    dapManagementPage.checkDapManagementUrl()

    dapManagementPage.clickDapById(dapIds[0])
    dapManagementPage.assertGroupAssociatedWithDap(groupId)
    dapManagementPage.clickDapById(dapIds[1])
    dapManagementPage.assertGroupAssociatedWithDap(groupId)
    dapManagementPage.clickDapById(dapIds[2])
    dapManagementPage.assertGroupAssociatedWithDap(groupId)
  })

  /**
   * @missing_data Need to have a group. Also, it needs to have at least one DAP created in the environment.
   */
  it.skip('C7412694_Groups_Discard_Without_Saving_DAPs', () => {
    const groupId = 1281
    const dapNames = ['Test', 'Test', 'Test3']
    const dapIds = [60, 77, 78]

    groupManagementPage.clickGroupById(groupId)
    groupManagementPage.addDapsToGroup(dapNames, dapIds)
    groupManagementPage.discardEntityInformation()

    groupManagementPage.assertDapAssociatedWithGroup(dapIds[0], false)
    groupManagementPage.assertDapAssociatedWithGroup(dapIds[1], false)
    groupManagementPage.assertDapAssociatedWithGroup(dapIds[2], false)
  })

  /**
   * @missing_data Need to have a group with 1 User registered
   */
  it.skip('C7493032_Groups_User_Is_Removed_From_The_Group', () => {
    const groupId = 1282
    const groupName = 'Remove user'
    const userIds = [754546, 754556]

    groupManagementPage.clickGroupById(groupId)
    groupManagementPage.scrollToTop() // strategy used just to move the scroll up

    groupManagementPage.removeUsersFromGroup(userIds)
    groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')

    groupManagementPage.assertUserAssociatedWithGroup(userIds[0], false)
    groupManagementPage.assertUserAssociatedWithGroup(userIds[1], false)
  })

  /**
   * @missing_data Need to have a group with 1 Role registered
   */
  it.skip('C8161539_Groups_Role_Is_Removed_From_The_Group', () => {
    const groupId = 1424
    const groupName = 'Remove role'
    const roleId = 1854

    groupManagementPage.clickGroupById(groupId)
    groupManagementPage.scrollToTop() // strategy used just to move the scroll up

    groupManagementPage.removeRoleFromGroup(roleId)
    groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')

    groupManagementPage.assertRoleAssociatedWithGroup(1854, false)
  })

  // ************************************************ TESTS AS CLIENTS ************************************************** //
})
