import BasePage from '../../pages/basePage'

const selectors = {
  profileLargeAvatar: '#profileLargeAvatar',
  profileName: '#profileFullName',
  profileEmail: '#profileEmail',
  profilePersonalInformation: '#navBarLinkList #personalInformationItem',
  profileSecurity: '#navBarLinkList #securityItem',
  profilePreferences: '#navBarLinkList #preferencesItem',
  closeBarArrow: '#closeProfileMenuButton',
  signOut: '#logoutButton'
}

class ProfileMenuNavBar extends BasePage {
  // --------------------------------------- ASSERTIONS  --------------------------------------------- //

  /**
   * This method can be used to assert the Sign Out button is always visible across the menus in the profile nav bar
   * @param {boolean} visible True (Default) to be visible and false to not visible
   */
  assertSignOutButtonIsVisible(visible = true) {
    if (visible) {
      cy.get(selectors.signOut).should('be.visible')
    } else {
      cy.get(selectors.signOut).should('not.exist')
    }
  }

  // --------------------------------------- OTHERS  --------------------------------------------- //

  /**
   * Logout command through the application UI
   */
  logout() {
    cy.get('#profile-item').as('avatarBtn')
    cy.get('@avatarBtn').click()
    cy.forcedWait(500) // avoid element detached from the DOM. See https://github.com/cypress-io/cypress/issues/7306
    cy.get('#logoutButton').click()
  }

  /**
   * Closes the Profile menu by clicking in the '<' button
   */
  closeProfileMenuNavBar() {
    cy.get(selectors.closeBarArrow).click()
  }

  /**
   * Open Personal Information page through profile nav bar
   */
  openProfilePersonalInformationPage() {
    cy.get(selectors.profilePersonalInformation).as('btnPersonalInformation')
    cy.get('@btnPersonalInformation').click()
  }

  /**
   * Open Security page through profile nav bar
   */
  openProfileSecurityPage() {
    cy.get(selectors.profileSecurity).as('btnSecurity')
    cy.get('@btnSecurity').click()
  }

  /**
   * Open Preferences page through profile nav bar
   */
  openProfilePreferencesPage() {
    cy.get(selectors.profilePreferences).as('btnPreferences')
    cy.get('@btnPreferences').click()
  }
}

export default ProfileMenuNavBar
