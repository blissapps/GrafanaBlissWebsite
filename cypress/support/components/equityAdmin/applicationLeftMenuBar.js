import BasePage from '../../pages/basePage'

const selectors = {
  logo: '#clientsLink',
  settingsButton: '#settingsLink',
  profileAvatar: '#profileLink'
}

/**
 * Main left nav bar that contains all the others navigation menus, such as Profile and Settings
 */
class ApplicationLeftMenuBar extends BasePage {
  /**
   * Click in the logo to go to the home page
   */
  clickLogoToGoToHomePage() {
    cy.get(selectors.logo).click()
  }

  /**
   * Opens the settings menu left bar (It goes to the settingsMenuNavBar.js component)
   */
  openSettingsMenuBar() {
    cy.get(selectors.settingsButton).as('settingsBtn') // using alias in this case to avoid element to get too attached
    cy.get('@settingsBtn').click()
  }

  /**
   * Opens profile menu bar (It goes to the profileMenuNavBar.js component)
   */
  openProfileMenuBar() {
    cy.get(selectors.profileAvatar).as('profileBtn') // using alias in this case to avoid element to get too attached
    cy.get('@profileBtn').click()
  }
}

export default ApplicationLeftMenuBar
