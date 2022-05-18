import EquityAdmin from '../../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Data Access Profiles tests over User Management settings', () => {
  context('Default user', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login()
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'dap')
      equityAdmin.dapManagementPage.checkPageUrl()
    })

    // ************************************************ TESTS AS ADMIN TENANT ************************************************** //

    /**
     * @missing_data Need to have at least 2 active and 2 inactive DAP created
     */
    it.skip('C7544057_DAP_Happy_Path_Alphabetically_List_Active_And_Inactive_Data_Access_Profile(s)', () => {
      // Active tab
      equityAdmin.dapManagementPage.assertActiveDapsAreDisplayed()
      equityAdmin.dapManagementPage.assertDapsInAlphabeticalOrder()

      // Inactive tab
      equityAdmin.dapManagementPage.clickTab('Inactive')
      equityAdmin.dapManagementPage.assertInactiveDapsAreDisplayed()
      equityAdmin.dapManagementPage.assertDapsInAlphabeticalOrder()
    })

    /**
     * @missing_data There are no DAPs neither in active nor inactive status
     */
    it.skip('C7544059_DAP_Empty_State_Active_And_Inactive_Data_Access_Profile(s)', () => {
      // Active tab
      equityAdmin.dapManagementPage.assertActiveDapsAreDisplayed(false)
      equityAdmin.dapManagementPage.assertNoDapsExistMessageIsDisplayed()

      //Inactive tab
      equityAdmin.dapManagementPage.clickTab('Inactive')
      equityAdmin.dapManagementPage.assertInactiveDapsAreDisplayed(false)
      equityAdmin.dapManagementPage.assertNoDapsExistMessageIsDisplayed()
    })

    // ************************************************ TESTS AS CLIENTS ************************************************** //
  })

  context('View Only User', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login(Cypress.env('VIEW_ONLY_USER_2_AUTH'))
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'dap')
      equityAdmin.dapManagementPage.checkPageUrl()
    })

    /**
     * @missing_data Need to have a user with only View permissions to see DAPS. Also, need to have 1 DAP available to use in the active tab, and another 1 in the inactive tab
     *
     */
    it.skip('C8981128_DAP_User_Does_Not_Have_Create_Permission_For_AccessFilters', () => {
      const dapActiveId = 7
      const dapInactiveId = 9

      // Active tab
      equityAdmin.dapManagementPage.clickTab('active')
      equityAdmin.dapManagementPage.clickDapById(dapActiveId)
      equityAdmin.dapManagementPage.assertThreeDotButtonDisplayed(false)
      equityAdmin.dapManagementPage.assertCreateNewDapButtonDisplayed(false)

      // Inactive tab
      equityAdmin.dapManagementPage.clickTab('inactive')
      equityAdmin.dapManagementPage.clickDapById(dapInactiveId)
      equityAdmin.dapManagementPage.assertThreeDotButtonDisplayed(false)
      equityAdmin.dapManagementPage.assertCreateNewDapButtonDisplayed(false)
    })

    /**
     * @missing_data Need to have an active DAP created, so we can try to duplicate it
     *
     */
    it.skip('C7568170 - Data Access Profile - User does not have the AccessFilters -> Create Permission', () => {
      const dapId = 7

      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.assertThreeDotButtonDisplayed(false)
    })
  })
})
