import UserManagementPage from '../../../support/pages/globalSettingsPages/userManagementPages/userManagementPage'
import SettingsMenuNavBar from '../../../support/components/settingsMenuNavBar'

describe('User Management tests over User Management settings', () => {
  const userManagementPage = new UserManagementPage()

  const settingsMenuNavBar = new SettingsMenuNavBar()

  /**
   * SKIPPING DUE TO https://globalshares.atlassian.net/browse/PB-1005
   */
  it.skip('C11649850_Assert_View_Only_Status_Badge_Displayed_Next_To_Settings_Titles', () => {
    cy.login(Cypress.env('VIEW_ONLY_USER_2_AUTH'))

    // User
    settingsMenuNavBar.accessGlobalSettingsMenu('user', 'user')
    userManagementPage.checkUserManagementUrl()
    // userManagementPage.assertViewOnlyBadgeDisplayed()
    // Group
    settingsMenuNavBar.accessGlobalSettingsMenu('', 'group', false)
    userManagementPage.assertViewOnlyBadgeDisplayed()

    // Role
    settingsMenuNavBar.accessGlobalSettingsMenu('', 'role', false)
    userManagementPage.assertViewOnlyBadgeDisplayed()

    // DAP
    settingsMenuNavBar.accessGlobalSettingsMenu('', 'dap', false)
    userManagementPage.assertViewOnlyBadgeDisplayed()
  })
})
