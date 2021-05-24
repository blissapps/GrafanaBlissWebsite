import BasePage from '../pages/basePage'

const selectors = {
  logo: 'li > a[href="/home"]',
  settingsButton: '#settingsLink',
  closeBarX: '//h2//gs-svg-icon',
  closeBarArrow: 'div .close-icon',
  profileAvatar: '#profile-item',
  signOut: 'a.logout',
  profilePersonalInformation: '(//li[@class="ng-star-inserted"])[1]',
  profileSecurity: '(//li[@class="ng-star-inserted"])[2]',
  profilePreferences: '(//li[@class="ng-star-inserted"])[3]',
  leftMenuOpen: '//*[@class= "ng-tns-c115-1 open"]'
}

class LeftMenuBar extends BasePage {
  /**
   * Click in the logo to go to the home page
   */
  clickLogoToGoToHomePage() {
    cy.get(selectors.logo).click()
  }

  /**
   * Closes the Global Setting menu located in the left menu
   */
  closeGlobalSettingsLeftBar() {
    cy.xpath(selectors.closeBarX).click()
  }

  /**
   * Closes the Profile menu located in the left menu
   */
  closeProfileLeftBar() {
    cy.get(selectors.closeBarArrow).click()
  }

  /**
   * Check if the leftBar is closed
   *
   * @returns True if the left menu is closed
   */
  isLeftMenuClosed() {
    return cy.xpath(selectors.leftMenuOpen).should('not.exist')
  }

  /**
   * Opens the settings menu left bar
   */
  openSettingsMenuBar() {
    cy.get(selectors.settingsButton).as('settingsBtn') // using alias in this case to avoid element to get too attached
    cy.get('@settingsBtn').click()
  }

  /**
   * Opens profile menu left bar
   */
  openProfileMenuBar() {
    cy.get(selectors.profileAvatar).as('profileBtn') // using alias in this case to avoid element to get too attached
    cy.get('@profileBtn').click()
  }

  /**
   * Navigation menu
   *
   * @param {string} item Main menu item
   * @param {string} subItem Submenu item if available. If not, passes nothing like: accessMenuItem("Statement Management")
   *
   * @ID missing and this methods needs to be refactored to remove the waits when the element removed from the DOM be resolved
   */
  accessGlobalSettingsMenu(item, subItem = '') {
    this.openSettingsMenuBar()

    cy.xpath(`(//a[normalize-space(text()) = '${item}'])[1]`).as('btnMenu')
    cy.get('@btnMenu').click()

    if (subItem != '') {
      cy.xpath(`//a[normalize-space(text()) = '${subItem}' and @href]`).as('btnSubMenu')
      cy.get('@btnSubMenu').click()
    }
  }

  /**
   * Open Personal Information page through left bar menu
   */
  openProfilePersonalInformationPage() {
    this.openProfileMenuBar()
    cy.xpath(selectors.profilePersonalInformation).as('btnPersonalInformation')
    cy.get('@btnPersonalInformation').click()
  }

  /**
   * Open Security page through left bar menu
   */
  openProfileSecurityPage() {
    this.openProfileMenuBar()
    cy.xpath(selectors.profileSecurity).as('btnSecurity')
    cy.get('@btnSecurity').click()
  }

  /**
   * Open Preferences page through left bar menu
   */
  openProfilePreferencesPage() {
    this.openProfileMenuBar()
    cy.xpath(selectors.profilePreferences).as('btnPreferences')
    cy.get('@btnPreferences').click()
  }
}

export default LeftMenuBar
