import EquityAdmin from '../../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('User Management tests over User Management settings', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'user')
    equityAdmin.userManagementPage.checkPageUrl()
  })

  it('C7592117_Users_No_Users_Match_Search', () => {
    equityAdmin.searchEngine.search('test_empty_state')
    equityAdmin.userManagementPage.assertNoUserExistsMessageIsDisplayed()
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
