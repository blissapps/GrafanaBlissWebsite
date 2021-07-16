import BasePage from '../../basePage'

const properties = {
  pageURL: '/settings/user-management'
}

const selectors = {
  numberOfSearchResultsInTable: '#recordCount .search-results-count',
  user: '#user-',
  noUserMsg: '#noUsersMsg'
}

// These selectors are the ones from the l4 nav bar (right nav bar)
const userDetailNavBarSelectors = {
  headerTitle: 'gs-container-l4 div.record-title',
  editIconButton: 'gs-container-l4 gs-button.icon',
  publicName: '#public-name',
  username: 'gs-container-l4 div.small',
  status: 'gs-container-l4 gs-badge',
  userInfoTitle: 'gs-container-l4 div.info-col h5',
  userInfoEmail: 'gs-container-l4 div.info-col div',
  userInfoButtonAccess: 'gs-container-l4 a gs-svg-icon'
}

// These selectors are the ones from the l4 nav bar (right nav bar)
const userInfoNavBarSelectors = {
  userInfoHeader: 'gs-container-l4 h4',
  groups: 'gs-container-l4 section.user-groups',
  showAllGroupsBtn: 'gs-button[data-test-id=show-all]',
  showLessGroupsBtn: 'gs-button[data-test-id=hide]',
  personalFirstName: 'gs-container-l4 gs-input-field[formcontrolname=firstName] div.input input',
  personalLastName: 'gs-container-l4 gs-input-field[formcontrolname=lastName] div.input input',
  personalPublicName: 'gs-container-l4 gs-input-field[formcontrolname=publicName] div.input input',
  personalJobTitle: 'gs-container-l4 gs-input-field[formcontrolname=jobTitle] div.input input',
  personalQualifications: 'gs-container-l4 gs-input-field[formcontrolname=qualifications] div.input input',
  personalOrganization: 'gs-container-l4 gs-input-field[formcontrolname=organization] div.input input',
  contactPhone: 'gs-container-l4 gs-input-field[formcontrolname=contactNumber] div.input input',
  contactPreferredEmail: 'gs-container-l4 gs-input-field[formcontrolname=emailAddress] div.input input',
  AccountDetailsUsername: 'gs-container-l4 gs-input-field[formcontrolname=username] div.input input'
}

class UserManagementPage extends BasePage {
  /**
   * Checks if the current page is User settings URL
   */
  checkUserManagementUrl() {
    this.checkUrl(properties.pageURL)
  }

  // --------------------------------------- GETS --------------------------------------------- //

  /**
   * Get a user from the table of users
   *
   * @param {Number} userId User id for the user to be searched
   *
   * @example send userId = 454292 to select this user from the table
   */
  getUserTable(userId) {
    return cy.get(selectors.user + userId).first()
  }

  getNoUserMessage() {
    return cy.get(selectors.noUserMsg)
  }

  // --------------------------------------- CLICKS --------------------------------------------- //

  /**
   * Select a user from the table of users
   *
   * @param {Number} userId User id for the user to be searched
   *
   */
  clickUserTable(userId) {
    this.getUserTable(userId).click('left')
  }

  /**
   * Click in the '>' link button to access User Info details inside the right nav bar (L4)
   */
  clickLinkToAccessUserInfoDetailsOnRightNavBar() {
    cy.get(userDetailNavBarSelectors.userInfoButtonAccess).click()
  }

  // --------------------------------------- ASSERTIONS AND OTHERS --------------------------------------------- //

  /**
   * Assert the msg about empty user state is visible or not
   *
   * @param {Boolean} visible True to check if the state is visible, false otherwise
   */
  assertNoUserMsgIdDisplayed(visible = true) {
    if (visible) {
      this.getNoUserMessage().should('be.visible')
    } else {
      this.getNoUserMessage().should('not.exist')
    }
  }

  /**
   * Checks the amount of results displayed in the Users table after using the search engine
   *
   * @param {Number} results amount of people you want to check after a search
   *
   * @example 'results = 2 for '2 SEARCH RESULT(S)' being displayed in the table
   */
  assertAmountOfSearchResults(results) {
    this.assertNumberOfRecordsTable(selectors.numberOfSearchResultsInTable, results)
  }

  /**
   * Verify if the data displayed in User Detail container is correct
   *
   * @param {String} publicName User public name
   * @param {String} username Username
   * @param {String} status User status
   * @param {String} email User email
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
  }

  /**
   * Assert information contained in the User Info panel in the right nav bar (L4)
   *
   * @param {Array} groups Array of groups to be validated, example: ['View Only', 'Global Admin Group']. Send an empty array to skip groups validation
   * @param {String} firstName User first name under Personal section
   * @param {String} lastName User last name under Personal section
   * @param {String} publicName User public name under Personal section
   * @param {String} jobTitle User job title under Personal section
   * @param {String} qualifications User qualifications under Personal section
   * @param {String} organization User organization under Personal section
   * @param {String} phone User phone under Contact section
   * @param {String} email User email under Contact section
   * @param {String} username User username under Account Details section
   * @param {Boolean} showAll True to click in the show all button to display all the groups in case there are lots of groups registered
   */
  assertUserInfoContentInRightNavBar(groups, firstName, lastName, publicName, jobTitle, qualifications, organization, phone, email, username, showAll = false) {
    // Assert User Info Header
    cy.get(userInfoNavBarSelectors.userInfoHeader).should('be.visible')

    // Make all groups visible in order that are lots of groups registered
    if (showAll) {
      cy.get(userInfoNavBarSelectors.showAllGroupsBtn).click()
    }

    // Assert groups if groups list is not empty
    if (groups.length > 0) {
      for (let i = 0; i < groups.length; i++) {
        cy.get(userInfoNavBarSelectors.groups)
          .invoke('text')
          .should('contain', groups[i])
      }
    }

    // Assert User Info Header
    cy.get(userInfoNavBarSelectors.personalFirstName).should('have.value', firstName)
    cy.get(userInfoNavBarSelectors.personalLastName).should('have.value', lastName)
    cy.get(userInfoNavBarSelectors.personalPublicName).should('have.value', publicName)
    cy.get(userInfoNavBarSelectors.personalJobTitle).should('have.value', jobTitle)
    cy.get(userInfoNavBarSelectors.personalQualifications).should('have.value', qualifications)
    cy.get(userInfoNavBarSelectors.personalOrganization).should('have.value', organization)
    cy.get(userInfoNavBarSelectors.contactPhone).should('have.value', phone)
    cy.get(userInfoNavBarSelectors.contactPreferredEmail).should('have.value', email)
    cy.get(userInfoNavBarSelectors.AccountDetailsUsername).should('have.value', username)
  }
}

export default UserManagementPage
