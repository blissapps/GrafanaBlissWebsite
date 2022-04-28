import EquityAdmin from '../../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('User Management tests over User Management settings', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'user')
    equityAdmin.userManagementPage.checkPageUrl()
  })

  /**
   * @missing_data Need to have a user with proper groups and data registered
   */
  it.skip('C7592114_Users_Happy_Path_View_User_Details_L4', () => {
    const username = 'amulcahyNE'
    const userId = 454292
    const publicName = 'Gage Gilbert'
    const status = 'active'
    const email = 'test@globalshares.com'
    const groups = ['Global Admin Group']
    const firstName = 'Reagan'
    const lastName = 'Jerry'
    const jobTitle = 'Writer'
    const qualifications = 'Reading'
    const organization = 'Global Shares'
    const phone = '99123'

    equityAdmin.searchEngine.search(username, 500)
    equityAdmin.userManagementPage.clickUserTable(userId)

    equityAdmin.userDetailL4Page.assertRightL4BarIsDisplayed()
    equityAdmin.userDetailL4Page.checkPageUrl()
    equityAdmin.userDetailL4Page.assertUserDetailContent(publicName, username, status, email)
    equityAdmin.userDetailL4Page.clickToAccessUserInfoDetails()
    equityAdmin.userInfoL4Page.assertGroupsDisplayed(groups)
    equityAdmin.userInfoL4Page.assertPersonalDataContent(firstName, lastName, publicName, jobTitle, qualifications, organization)
    equityAdmin.userInfoL4Page.assertContactDataContent(phone, email)
    equityAdmin.userInfoL4Page.assertAccountDetailsDataContent(username)
  })

  it('C7592117_Users_No_Users_Match_Search', () => {
    equityAdmin.searchEngine.search('test_empty_state')
    equityAdmin.userManagementPage.assertNoUserExistsMessageIsDisplayed()
  })

  it('C7592119_User_pastes_SQL_Code_Into_The_Search_Box', () => {
    equityAdmin.searchEngine.search('SELECT * FROM users')
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
