import HomePage from '../../../support/pages/homePage'
import GroupManagementPage from '../../../support/pages/globalSettingsPages/userManagementPages/groupManagementPage'

import LeftMenuNavBar from '../../../support/components/leftMenuNavBar'
import SearchBar from '../../../support/components/searchBar'

describe('Group Management tests over User Management settings', () => {
  const homePage = new HomePage()
  const groupManagementPage = new GroupManagementPage()

  const leftMenuNavBar = new LeftMenuNavBar()
  const searchBar = new SearchBar()

  beforeEach(() => {
    // @ts-ignore
    cy.login() && cy.loginSuccessfulXHRWaits()
    leftMenuNavBar.accessGlobalSettingsMenu('user', 'group')
  })

  // ************************************************ TESTS AS ADMIN TENANT ************************************************** //

  /**
   * Verify if the settings send the user back to the home screen when the user closes the settings menu
   *
   */
  it('C7412690_Check_The_System_Behavior_When_Closing_The_Settings_Nav_Bar', () => {
    groupManagementPage.checkGroupManagementUrl()
    leftMenuNavBar.closeGlobalSettingsLeftBar()
    homePage.checkHomeUrl()
  })

  /**
   *TODO: Steps for Inactive groups (waiting for data to be available).
   *
   * SkIPPING due to https://globalshares.atlassian.net/browse/PB-873
   *
   * @missing_data Need to have some groups in both active and inactive tabs
   */
  it('C7412691_Search_Engine_Search_for_Groups_With_Different_Combinations_In_Active_And_Inactive_Tabs', () => {
    groupManagementPage.assertNoGroupSelectedMessageState()

    let group = 'GLOBAL'
    searchBar.search(group)
    groupManagementPage.assertAmountOfSearchResults(1)
    groupManagementPage.assertSearchResultGroups([1])

    group = 'global'
    searchBar.search(group)
    groupManagementPage.assertAmountOfSearchResults(1)
    groupManagementPage.assertSearchResultGroups([1])

    group = 'GLObal'
    searchBar.search(group)
    groupManagementPage.assertAmountOfSearchResults(1)
    groupManagementPage.assertSearchResultGroups([1])

    group = 'randomName'
    searchBar.search(group)
    groupManagementPage.assertNoGroupsFoundIsVisible()

    group = 'SELECT * FROM groups'
    searchBar.search(group)
    groupManagementPage.assertNoGroupsFoundIsVisible()

    // Once data is given, uncomment the code with the new data
    /**
    groupManagementPage.selectTabByName('Inactive') // Inactive TAB

    group = 'ABC'
    searchBar.search(group)
    groupManagementPage.assertAmountOfSearchResults(2)
    groupManagementPage.assertSearchResultGroups([1122, 1125])

    group = 'abc'
    searchBar.search(group)
    groupManagementPage.assertAmountOfSearchResults(2)
    groupManagementPage.assertSearchResultGroups([1122, 1125])

    group = 'AbC'
    searchBar.search(group)
    groupManagementPage.assertAmountOfSearchResults(2)
    groupManagementPage.assertSearchResultGroups([1122, 1125])

    group = 'randomName'
    searchBar.search(group)
    groupManagementPage.assertNoGroupsFoundIsVisible()

    group = 'SELECT * FROM groups'
    searchBar.search(group)
    groupManagementPage.assertNoGroupsFoundIsVisible()
     */
  })

  it('C7499684_Groups_Happy_Path_Active_And_Inactive_Groups', () => {
    groupManagementPage.assertActiveGroupsAreDisplayed()
    groupManagementPage.selectTabByName('Inactive')
    groupManagementPage.assertInactiveGroupsAreDisplayed()
  })

  /**
   * @missing_data
   */
  it('C7499679_Groups_Deactivate_And_Activate_A_Group', () => {
    const groupId = 1122
    const groupName = 'Active and Inactive'

    groupManagementPage.deactivateGroup(groupId, groupName)
    groupManagementPage.activateGroup(groupId, groupName)
  })

  /**
   * SKIPPING DUE TO https://globalshares.atlassian.net/browse/PB-875
   *
   * @missing_data Need to have at least one group created and activated
   */
  it.skip('C7493036_Groups_Duplicate_A_Group', () => {
    const groupId = 1122
    const groupName = 'Active and Inactive'
    const newNameForDuplicatedGroup = 'Duplicated Group'

    groupManagementPage.duplicateGroup(groupId, groupName, newNameForDuplicatedGroup)
  })

  it('C7493034_Groups_Create_A_New_Group', () => {
    const groupName = 'Created Group From Automation'
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
    const groupId = 1229
    const groupName = 'Add Role'
    const roleName = 'View Only'
    const roleId = 1397

    groupManagementPage.clickGroup(groupId)
    groupManagementPage.selectRoleToGroup(roleName, roleId)
    groupManagementPage.saveGroupInformation(groupName + ' Saved')

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

    groupManagementPage.clickGroup(groupId)
    groupManagementPage.selectRoleToGroup(roleName, roleId)
    groupManagementPage.saveGroupInformation(groupName + ' Saved')

    groupManagementPage.assertRoleAssociatedWithGroup(roleId)
  })

  /**
   * @missing_data Need to have a group. Also, it needs to have at least on role created in the environment.
   */
  it.skip('C7419664_Groups_Discard_Without_Saving_The_Role', () => {
    const groupId = 1317
    const roleName = 'View Only'
    const roleId = 1397

    groupManagementPage.clickGroup(groupId)
    groupManagementPage.selectRoleToGroup(roleName, roleId)
    groupManagementPage.discardGroupInformation()

    groupManagementPage.assertRoleAssociatedWithGroup(1397, false)
  })

  /**
   * @missing_data Need to have a group. Also, it needs to have at least one user created in the environment.
   */
  it.skip('C7419658_Groups_Add_A_User_To_A_Group', () => {
    const groupId = 1231
    const groupName = 'Add User'
    const userName = ['carolyn_giles', 'amulcahyNE']
    const userIds = [754546, 454292]

    groupManagementPage.clickGroup(groupId)
    groupManagementPage.addUsersToGroup(userName, userIds)
    groupManagementPage.saveGroupInformation(groupName + ' Saved')

    groupManagementPage.assertUserAssociatedWithGroup(userIds[0])
    groupManagementPage.assertUserAssociatedWithGroup(userIds[1])
  })

  /**
   * @missing_data Need to have a group. Also, it needs to have at least one user created in the environment.
   */
  it.skip('C7419660_Groups_Discard_Without_Saving_The_User', () => {
    const groupId = 1256
    const userName = ['carolyn_giles', 'amulcahyNE']
    const userIds = [754546, 454292]

    groupManagementPage.clickGroup(groupId)
    groupManagementPage.addUsersToGroup(userName, userIds)
    groupManagementPage.discardGroupInformation()

    groupManagementPage.assertUserAssociatedWithGroup(userIds[0], false)
    groupManagementPage.assertUserAssociatedWithGroup(userIds[1], false)
  })

  /**
   * @missing_data Need to have a group. Also, it needs to have at least one client created in the environment.
   */
  it.skip('C7462559_Groups_Add_A_Client_To_A_Group', () => {
    const groupId = 1257
    const groupName = 'Add Clients'
    const companyNames = ['7Digital', '9F Group', 'Allianz']
    const companyIds = [144, 337, 55]

    groupManagementPage.clickGroup(groupId)
    groupManagementPage.addCompaniesToGroup(companyNames, companyIds)
    groupManagementPage.saveGroupInformation(groupName + ' Saved')

    groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[0])
    groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[1])
    groupManagementPage.assertCompanyAssociatedWithGroup(companyIds[2])
  })

  /**
   * @missing_data Need to have a group. Also, it needs to have at least one client created in the environment.
   */
  it.skip('C7462561_Groups_Discard_Without_Saving_The_Company', () => {
    const groupId = 1257
    const companyNames = ['7Digital', '9F Group', 'Allianz']
    const companyIds = [144, 337, 55]

    groupManagementPage.clickGroup(groupId)
    groupManagementPage.addCompaniesToGroup(companyNames, companyIds)
    groupManagementPage.discardGroupInformation()

    groupManagementPage.assertUserAssociatedWithGroup(companyIds[0], false)
    groupManagementPage.assertUserAssociatedWithGroup(companyIds[1], false)
  })

  /**
   * @missing_data Need to have a group with 1 role at least 8 DAPs, 8 Users, and 8 Clients linked to a this group
   */
  it.skip('C7462614_Groups_Show_High_Level_Content_Of_A_Group', () => {
    const groupId = 1219
    const roleId = 1397

    groupManagementPage.clickGroup(groupId)
    groupManagementPage.getGroupHeader() // strategy used just to move the scroll up

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
    const groupId = 1219

    groupManagementPage.clickGroup(groupId)
    groupManagementPage.getGroupHeader() // strategy used just to move the scroll up

    // daps
    groupManagementPage.clickShowAll('daps')
    groupManagementPage.assertNumberOfCardsDisplayedInASection('daps', 9)
    groupManagementPage.clickHide('daps')
    groupManagementPage.assertNumberOfCardsDisplayedInASection('daps', 8)

    // users
    groupManagementPage.clickShowAll('users')
    groupManagementPage.assertNumberOfCardsDisplayedInASection('users', 17)
    groupManagementPage.clickHide('users')
    groupManagementPage.assertNumberOfCardsDisplayedInASection('users', 8)

    // clients
    groupManagementPage.clickShowAll('companies')
    groupManagementPage.assertNumberOfCardsDisplayedInASection('companies', 18)
    groupManagementPage.clickHide('companies')
    groupManagementPage.assertNumberOfCardsDisplayedInASection('companies', 8)
  })

  // ************************************************ TESTS AS CLIENTS ************************************************** //
})
