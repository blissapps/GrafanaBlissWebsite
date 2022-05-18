import EquityAdmin from '../../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Data Access Profiles tests over User Management settings', () => {
  context('Default user', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login()
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'dap')
      equityAdmin.dapManagementPage.checkPageUrl()
    })

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
  })

  context('View Only User', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login(Cypress.env('VIEW_ONLY_USER_2_AUTH'))
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'dap')
      equityAdmin.dapManagementPage.checkPageUrl()
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
