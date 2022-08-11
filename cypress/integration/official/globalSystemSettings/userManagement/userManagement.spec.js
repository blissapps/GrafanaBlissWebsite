import EquityAdmin from '../../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('User Management tests over User Management settings', () => {
  context('Tenant 1 settings over direct navigation (navigateToUrl)', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login()
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/user-management')
      equityAdmin.userManagementPage.checkPageUrl()
    })

    /**
     * @bug_raised  https://globalshares.atlassian.net/browse/PB-1315 https://globalshares.atlassian.net/browse/PB-1316
     */
    it('C16636881 Search user by username, email, no records and test search behaviors', () => {
      const username = 'RSaxena@globalshares.com'
      const userEmail = 'APSilva@globalshares.com'
      const userEmail2 = 'test1@test.com'

      // Uncomment this line as soon as the the bug is fixed
      equityAdmin.userManagementPage.assertNumberOfRecordsDisplayedInTable(Cypress.env('TOTAL_NUMBER_OF_USERS_AT10_ENV'))

      cy.log('USERNAME')
      equityAdmin.searchEngine.search(username)
      equityAdmin.userManagementPage.assertAmountOfSearchResultsInTheList(1)
      equityAdmin.userManagementPage.assertNumberOfRowsInTable(1)
      equityAdmin.userManagementPage.assertDataDisplayedOnGsGridTableIsHighlighted(username)

      cy.log('EMAIL')
      equityAdmin.searchEngine.search(userEmail)
      equityAdmin.userManagementPage.assertAmountOfSearchResultsInTheList(1)
      equityAdmin.userManagementPage.assertNumberOfRowsInTable(1)
      equityAdmin.userManagementPage.assertDataDisplayedOnGsGridTableIsHighlighted(userEmail)

      cy.log('Empty user list')
      equityAdmin.searchEngine.search('Random name for no users')
      equityAdmin.userManagementPage.assertNoUserExistsMessageIsDisplayed()

      cy.log('Counting number of search with more than 1 result')
      equityAdmin.searchEngine.search(userEmail2)
      equityAdmin.userManagementPage.assertAmountOfSearchResultsInTheList(6)
      equityAdmin.userManagementPage.assertNumberOfRowsInTable(6)
      equityAdmin.userManagementPage.assertDataDisplayedOnGsGridTableIsHighlighted(userEmail2)

      cy.log('Clear button behavior over this page')
      equityAdmin.searchEngine.clearSearchBoxByXIcon()
      equityAdmin.userManagementPage.assertNumberOfRecordsDisplayedInTable(Cypress.env('TOTAL_NUMBER_OF_USERS_AT10_ENV'))
    })

    it('C17344546 Search user with SQL query', () => {
      equityAdmin.searchEngine.search('SELECT * FROM users')
      equityAdmin.userManagementPage.assertNoUserExistsMessageIsDisplayed()
    })

    it('C17344548 User Management details and info L4', () => {
      const username = 'RSaxena@globalshares.com'
      const userId = 5183
      const publicName = 'Rishabh Saxena'
      const status = 'active'
      const email = 'RSaxena@globalshares.com'
      const groups = ['Global Admin Group']
      const firstName = 'Rishabh'
      const lastName = 'Saxena'
      const jobTitle = 'Writer'
      const qualifications = 'Reading'
      const organization = 'Global Shares'
      const phone = '000000000'

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

    it('C18105892 List User - Happy path - Contains Expected Columns on users table', () => {
      equityAdmin.userManagementPage.assertTableContainsExpectedColumnsInOrder(['username', 'email', 'status'])
    })
  })

  /**
   * @mocks_used
   */
  context('Mocked data tests', () => {
    it('C7353828_List User - Empty State', () => {
      equityAdmin.loginPage.login()
      equityAdmin.userManagementPage.interceptAndMockUsersLoadingRequest('usersManagement_EmptyUserList.json')
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/user-management')
      equityAdmin.userManagementPage.checkPageUrl()

      equityAdmin.userManagementPage.assertNoUserExistsMessageIsDisplayed()
    })
  })
})
