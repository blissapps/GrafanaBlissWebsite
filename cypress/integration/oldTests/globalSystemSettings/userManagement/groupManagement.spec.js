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
