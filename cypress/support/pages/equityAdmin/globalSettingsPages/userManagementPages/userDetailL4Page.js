import BaseManagementPage from './baseManagementPage'

const properties = {
  pageURL: /.?settings\/*user-management\/.*[0-9]$/
}

const selectors = {
  headerTitle: '#quickEditHeader',
  publicName: '#userHeaderPublicName',
  username: '#userHeaderUserName',
  status: '#userHeaderStatusBadge > gs-badge',
  userInfoTitle: '#quickEditUserInfo',
  userInfoEmail: '#userInfoEmailAddress',
  userLastLoginInfo: '#userInfoLastLogin',
  userInfoButtonAccess: '#userInfoLink'
}

/**
 * This class is built to implement the page of the USER DETAIL page that is displayed as a container/"popup" in the right side of the page when the user click in an user to get details
 */
class UserDetailL4Page extends BaseManagementPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrlByRegex(properties.pageURL)
  }

  // -------------------------------------------------------------------------- CLICKS --------------------------------------------------------------------------------- //

  /**
   * Click in the '>' link button to access User Info details inside the right nav bar (L4)
   */
  clickToAccessUserInfoDetails() {
    cy.get(selectors.userInfoButtonAccess).click()
  }

  // --------------------------------------------------------------------------- ASSERTIONS  ----------------------------------------------------------------------------- //

  /**
   * Verify if the data displayed in User Detail container is correct
   *
   * @param {string} publicName User public name
   * @param {string} username Username
   * @param {string} status User status
   * @param {string} email User email
   */
  assertUserDetailContent(publicName, username, status, email) {
    // General User Details assertions
    cy.get(selectors.headerTitle).should('be.visible')
    cy.get(selectors.publicName).should('contain.text', publicName)
    cy.get(selectors.username).should('contain.text', username)
    cy.get(selectors.status).should('contain.text', status)

    // General User Info assertions
    cy.get(selectors.userInfoTitle).should('be.visible')
    cy.get(selectors.userInfoEmail).should('contain.text', email)
    cy.get(selectors.userLastLoginInfo).should('be.visible')
  }
}

export default UserDetailL4Page
