import EquityAdmin from '../../../support/pages/equityAdmin'

describe('User Management tests over User Management settings', () => {
  const equityAdmin = new EquityAdmin()

  /**
   * SKIPPING DUE TO https://globalshares.atlassian.net/browse/PB-1005
   */
  it.skip('C11649850_Assert_View_Only_Status_Badge_Displayed_Next_To_Settings_Titles', () => {
    cy.login(Cypress.env('VIEW_ONLY_USER_2_AUTH'))

    // User
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'user')
    equityAdmin.userManagementPage.checkUserManagementUrl()
    // userManagementPage.assertViewOnlyBadgeDisplayed()
    // Group
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('', 'group', false)
    equityAdmin.userManagementPage.assertViewOnlyBadgeDisplayed()

    // Role
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('', 'role', false)
    equityAdmin.userManagementPage.assertViewOnlyBadgeDisplayed()

    // DAP
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('', 'dap', false)
    equityAdmin.userManagementPage.assertViewOnlyBadgeDisplayed()
  })
})
