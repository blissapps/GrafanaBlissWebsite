import BaseManagementPage from './baseManagementPage'

const properties = {
  pageURL: '/settings/user-management'
}

const selectors = {
  numberOfSearchResultsInTable: '#recordCount span',
  user: '#user-',
  noUserExistsMessage: '#noUsersMsg'
}

// These selectors are the ones from the l4 nav bar (right nav bar)
const userDetailNavBarSelectors = {
  headerTitle: '#quickEditHeader',
  publicName: '#userHeaderPublicName',
  username: '#userHeaderUserName',
  status: '#userHeaderStatusBadge > gs-badge',
  userInfoTitle: '#quickEditUserInfo',
  userInfoEmail: '#userInfoEmailAddress',
  userLastLoginInfo: '#userInfoLastLogin',
  userInfoButtonAccess: '#userInfoLink'
}

// These selectors are the ones from the l4 nav bar (right nav bar)
const userInfoNavBarSelectors = {
  groups: '#quickEditGroupInfo',
  showAllGroupsBtn: 'gs-button[data-test-id=show-all]',
  showLessGroupsBtn: 'gs-button[data-test-id=hide]',
  personalFirstName: '#personalFirstName input',
  personalLastName: '#personalLastName input',
  personalPublicName: '#personalPublicName input',
  personalJobTitle: '#personalJobTitle input',
  personalQualifications: '#personalQualifications input',
  personalOrganization: '#personalOrganization input',
  contactPhone: '#contactPhone input',
  contactPreferredEmail: '#contactEmailAddress input',
  AccountDetailsUsername: '#accountDetailsUsername input'
}

const apiInterceptions = {
  usersLoading: '/api/Users?**'
}

class UserManagementPage extends BaseManagementPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }

  // --------------------------------------- GETS --------------------------------------------- //

  /**
   * Get a user from the table of users
   *
   * @param {number} userId User id for the user to be searched
   *
   * @example send userId = 454292 to select this user from the table
   */
  getUserInTable(userId) {
    return cy
      .get(selectors.user + userId + ' gs-grid-cell')
      .first()
      .scrollIntoView()
  }

  // --------------------------------------- CLICKS --------------------------------------------- //

  /**
   * Select a user from the table of users
   *
   * @param {number} userId User id for the user to be searched
   *
   */
  clickUserTable(userId) {
    this.getUserInTable(userId).click('left')
  }

  /**
   * Click in the '>' link button to access User Info details inside the right nav bar (L4)
   */
  clickLinkToAccessUserInfoDetailsOnRightNavBar() {
    cy.get(userDetailNavBarSelectors.userInfoButtonAccess).click()
  }

  // --------------------------------------- ASSERTIONS AND OTHERS --------------------------------------------- //

  /**
   * Assert if a given user is visible in the table of Users
   *
   * @param {number} userId user id to validate its visibility
   * @param {boolean} displayed True is the default value to see if the user is visible. Send false to validate the contrary
   */
  assertUserIsVisibleOnTable(userId, displayed = true) {
    displayed ? this.getUserInTable(userId).should('be.visible') : this.getUserInTable(userId).should('not.be.visible')
  }

  /**
   * Assert if the message informing that "There are no users" is displayed or not.
   *
   * @param {boolean} displayed True to check if the empty state message is visible, false otherwise
   */
  assertNoUserExistsMessageIsDisplayed(displayed = true) {
    displayed ? cy.get(selectors.noUserExistsMessage).should('be.visible') : cy.get(selectors.noUserExistsMessage).should('not.exist')
  }

  /**
   * Checks the amount of results displayed in the Users table after using the search engine
   *
   * @param {number} results amount of people you want to check after a search
   *
   * @example 'results = 2 for '2 SEARCH RESULT(S)' being displayed in the table
   */
  assertAmountOfSearchResults(results) {
    this.assertNumberOfRecordsDisplayed(selectors.numberOfSearchResultsInTable, results)
  }

  /**
   * Verify if the data displayed in User Detail container is correct
   *
   * @param {string} publicName User public name
   * @param {string} username Username
   * @param {string} status User status
   * @param {string} email User email
   */
  assertUserDetailContentInRightNavBar(publicName, username, status, email) {
    // General User Details assertions
    cy.get(userDetailNavBarSelectors.headerTitle).should('be.visible')
    cy.get(userDetailNavBarSelectors.publicName).should('contain.text', publicName)
    cy.get(userDetailNavBarSelectors.username).should('contain.text', username)
    cy.get(userDetailNavBarSelectors.status).should('contain.text', status)

    // General User Info assertions
    cy.get(userDetailNavBarSelectors.userInfoTitle).should('be.visible')
    cy.get(userDetailNavBarSelectors.userInfoEmail).should('contain.text', email)
    cy.get(userDetailNavBarSelectors.userLastLoginInfo).should('be.visible')
  }

  /**
   * Assert information contained in the User Info panel in the right nav bar (L4)
   *
   * @param {array} groupNames Array of groups to be validated, example: ['View Only', 'Global Admin Group']. Send an empty array to skip groups validation
   * @param {string} firstName User first name under Personal section
   * @param {string} lastName User last name under Personal section
   * @param {string} publicName User public name under Personal section
   * @param {string} jobTitle User job title under Personal section
   * @param {string} qualifications User qualifications under Personal section
   * @param {string} organization User organization under Personal section
   * @param {string} phone User phone under Contact section
   * @param {string} email User email under Contact section
   * @param {string} username User username under Account Details section
   * @param {boolean} showAll True to click in the show all button to display all the groups in case there are lots of groups registered
   */
  assertUserInfoContentInRightNavBar(
    groupNames = [],
    firstName = '',
    lastName = '',
    publicName = '',
    jobTitle = '',
    qualifications = '',
    organization = '',
    phone = '',
    email = '',
    username = '',
    showAll = false
  ) {
    // Assert User Info Header
    cy.get(userDetailNavBarSelectors.headerTitle).should('be.visible')

    // Make all groups visible in order that are lots of groups registered
    if (showAll) {
      cy.get(userInfoNavBarSelectors.showAllGroupsBtn).click()
    }

    // Assert groups if groups list is not empty
    if (groupNames.length > 0) {
      for (let i = 0; i < groupNames.length; i++) {
        cy.get(userInfoNavBarSelectors.groups).should('contain.text', groupNames[i])
      }
    }

    // Assert User Info Header information
    if (firstName != '') {
      cy.get(userInfoNavBarSelectors.personalFirstName).should('have.value', firstName)
    }

    if (lastName != '') {
      cy.get(userInfoNavBarSelectors.personalLastName).should('have.value', lastName)
    }

    if (publicName != '') {
      cy.get(userInfoNavBarSelectors.personalPublicName).should('have.value', publicName)
    }

    if (jobTitle != '') {
      cy.get(userInfoNavBarSelectors.personalJobTitle).should('have.value', jobTitle)
    }

    if (qualifications != '') {
      cy.get(userInfoNavBarSelectors.personalQualifications).should('have.value', qualifications)
    }

    if (organization != '') {
      cy.get(userInfoNavBarSelectors.personalOrganization).should('have.value', organization)
    }

    if (phone != '') {
      cy.get(userInfoNavBarSelectors.contactPhone).should('have.value', phone)
    }

    if (email != '') {
      cy.get(userInfoNavBarSelectors.contactPreferredEmail).should('have.value', email)
    }

    if (username != '') {
      cy.get(userInfoNavBarSelectors.AccountDetailsUsername).should('have.value', username)
    }
  }

  // -----------------------------------------------------------------------------------------  INTERCEPTIONS ------------------------------------------------------------------------------ //

  /**
   * Intercept the usersLoading request located in the object apiInterceptions. You need to user the method waitForUsersToBeLoaded to wait for this interception
   */
  interceptUsersLoadingRequest() {
    cy.intercept('GET', apiInterceptions.usersLoading).as('waitsUsersToBeLoaded')
  }

  /**
   * Intercept the usersLoading request located in the object apiInterceptions and mock the data with a given fixture file.
   *
   * @param {string} fixtureFile name or path for the fixture file located inside the fixtures folder
   */
  interceptAndMockUsersLoadingRequest(fixtureFile) {
    cy.intercept('GET', apiInterceptions.usersLoading, { fixture: fixtureFile }).as('emptyUserList')
  }

  /**
   * This method waits for the interception in the interceptUsersLoadingRequest method
   */
  waitForUsersLoadingRequest() {
    cy.wait('@waitsUsersToBeLoaded', { timeout: 5000 })
  }
}

export default UserManagementPage
