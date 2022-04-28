import EquityAdmin from '../../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Group Management tests over User Management settings', () => {
  context('Default User', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login()
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'group')
      equityAdmin.groupManagementPage.checkPageUrl()
    })

    /**
     * @missing_data Need to have a group with one user associated with it. This user should has the total max of 2 or 3 groups associated with it (So we don't need to click in showAll)
     */
    it.skip('C15256021_Delete a user from the group', () => {
      const groupId = 1136
      const groupName = ['Remove user']
      const userName = 'dfonsecaNE'
      const userId = 454293

      // Remove user from group
      equityAdmin.groupManagementPage.clickGroupById(groupId)
      equityAdmin.groupManagementPage.removeUsersFromGroup([userId])
      equityAdmin.groupManagementPage.saveEntityInformation()
      equityAdmin.groupManagementPage.assertToastNotificationMessageIsDisplayed(groupName + ' Saved', true, true)

      // Validates user is NOT linked to the group over User Management settings - L4 page
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('', 'user', false)
      equityAdmin.searchEngine.search(userName)
      equityAdmin.userManagementPage.clickUserTable(userId)
      equityAdmin.userDetailL4Page.clickToAccessUserInfoDetails()

      // Validates in the userInfoL4Page
      equityAdmin.userInfoL4Page.checkPageUrl()
      equityAdmin.userInfoL4Page.assertGroupsDisplayed(groupName, false)
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
      equityAdmin.dapManagementPage.checkPageUrl()

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
      equityAdmin.groupManagementPage.scrollToEntityTop() // strategy used just to move the scroll up

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
  })

  context('View Only User', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login(Cypress.env('VIEW_ONLY_USER_2_AUTH'))
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'group')
      equityAdmin.groupManagementPage.checkPageUrl()
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
  })

  context('View Only User 2 - Shorter login mode', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login(Cypress.env('VIEW_ONLY_USER_2_AUTH'))
    })
    /**
     * @missing_data Need to have a user with view permissions for all the settings but Group
     */
    it.skip('C9277665_User_Does_Not_Have_View_Permission_For_Groups_Only', () => {
      equityAdmin.applicationLeftMenuBar.openSettingsMenuBar()
      equityAdmin.settingsMenuNavBar.assertGlobalSettingsMenuOpen()
      equityAdmin.settingsMenuNavBar.assertUserManagementMenuDisplayed()
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', '', false)
      equityAdmin.settingsMenuNavBar.assertBackButtonDisplayed() // Assert it just to make sure we are in the correct menu
      equityAdmin.settingsMenuNavBar.assertGroupSubMenuItemDisplayed(false)

      // missing url access
    })
  })
})
