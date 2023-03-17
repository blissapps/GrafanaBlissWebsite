import BaseManagementPage from './baseManagementPage'

const properties = {
  pageURL: /.?settings\/*user-management\/.*[0-9]\/user-info$/
}

// These selectors are the ones from the l4 nav bar (right nav bar)
const selectors = {
  headerTitle: '#quickEditHeader',
  groupsContainerPanel: '#quickEditGroupInfo',
  groupsInCards: '#quickEditGroupInfo gs-mini-card[id*=groupInfoCard',
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

/**
 * This class is built to implement the page of the USER INFO page that is displayed as a container/"popup" in the right side of the page
 */
class UserInfoL4Page extends BaseManagementPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrlByRegex(properties.pageURL)
  }

  // --------------------------------------------------------------------------- ASSERTIONS -------------------------------------------------------------------------- //

  /**
   * Assert the User Info header title is displayed correctly
   *
   * @param {string} text text to be validated in the top of the header title. "User Info" is the default value for that
   */
  assertHeaderTitleCorrectlyDisplayed(text = 'User Info') {
    cy.get(selectors.headerTitle).should('be.visible').and('contain.text', text)
  }

  /**
   * Assert if groups are displayed or not in the Groups section
   *
   * @param {string[]} groupNames Group name(s) to be validated in the cards
   * @param {boolean} displayed True is the default value to validate the group(s) are displayed. False to validate the group(s) are not visible
   * @param {boolean} showAll True to click in the show all button to display all the groups in case there are lots of groups registered
   */
  assertGroupsDisplayed(groupNames = [], displayed = true, showAll = false) {
    // Make all groups visible when there are lots of groups registered
    showAll ? cy.get(selectors.showAllGroupsBtn).click() : null

    groupNames.forEach((group) => {
      displayed ? cy.get(selectors.groupsInCards).should('include.text', group) : cy.get(selectors.groupsContainerPanel).should('not.contain.text', group)
    })
  }

  /**
   * Assert information content in the Personal section
   *
   * @param {string} firstName User first name under Personal section
   * @param {string} lastName User last name under Personal section
   * @param {string} publicName User public name under Personal section
   * @param {string} jobTitle User job title under Personal section
   * @param {string} qualifications User qualifications under Personal section
   * @param {string} organization User organization under Personal section
   */
  assertPersonalDataContent(firstName = '', lastName = '', publicName = '', jobTitle = '', qualifications = '', organization = '') {
    if (firstName !== '') {
      cy.get(selectors.personalFirstName).should('have.value', firstName)
    }

    if (lastName !== '') {
      cy.get(selectors.personalLastName).should('have.value', lastName)
    }

    if (publicName !== '') {
      cy.get(selectors.personalPublicName).should('have.value', publicName)
    }

    if (jobTitle !== '') {
      cy.get(selectors.personalJobTitle).should('have.value', jobTitle)
    }

    if (qualifications !== '') {
      cy.get(selectors.personalQualifications).should('have.value', qualifications)
    }

    if (organization !== '') {
      cy.get(selectors.personalOrganization).should('have.value', organization)
    }
  }

  /**
   * Assert information content in the Contact section
   *
   * @param {string} phone User phone under Contact section.
   * @param {string} email User email under Contact section
   */
  assertContactDataContent(phone = '', email = '') {
    if (phone !== '') {
      cy.get(selectors.contactPhone).should('have.value', phone)
    }

    if (email !== '') {
      cy.get(selectors.contactPreferredEmail).should('have.value', email)
    }
  }

  /**
   * Assert information content in the Account Details section
   *
   * @param {string} username User username under Account Details section
   */
  assertAccountDetailsDataContent(username) {
    if (username !== '') {
      cy.get(selectors.AccountDetailsUsername).should('have.value', username)
    }
  }
}

export default UserInfoL4Page
