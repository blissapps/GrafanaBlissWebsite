import EquityAdmin from '../../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('User Management tests over User Management settings', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'user')
    equityAdmin.userManagementPage.checkPageUrl()
  })
})

/**
 * @mocks_used
 */
describe('More User Management tests - Empty state', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.userManagementPage.interceptAndMockUsersLoadingRequest('usersManagement_EmptyUserList.json')
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'user')
    equityAdmin.userManagementPage.checkPageUrl()
  })

  context('Mocked data tests', () => {
    it('C7353828_List User - Empty State', () => {
      equityAdmin.userManagementPage.assertNoUserExistsMessageIsDisplayed()
    })
  })
})
