import BasePage from '../pages/basePage'

const selectors = {
  logo: '#clientsLink',
  userEnvironment: 'div .user-environment',
  settingsButton: '#settingsLink',
  profileAvatar: '#profile-item #profileLink',
  leftMenuOpen: '//*[@class= "ng-tns-c115-1 open"]',

  navBarHeaderClientName: '#navBarHeader',
  closeNavBarX: '//h2//gs-svg-icon',

  profileLargeAvatar: '#profileLargeAvatar',
  profileName: '#profileFullName',
  profileEmail: '#profileEmail',
  profilePersonalInformation: '#navBarLinkList #personalInformationItem',
  profileSecurity: '#navBarLinkList #securityItem',
  profilePreferences: '#navBarLinkList #preferencesItem',
  signOut: '#logoutButton',
  closeBarArrow: '#closeProfileMenuButton'
}

const globalSettingsMenuSelectors = {
  userManagementMenuItem: '#userManagementItem',
  statementManagementMenuItem: '#statementManagementItem',
  userManagementSubMenuItem: '#userManagementChild',
  groupManagementSubMenuItem: '#groupManagementChild',
  roleManagementSubMenuItem: '#roleManagementChild',
  dapSubMenuItem: '#dapManagementChild'
}

class LeftMenuNavBar extends BasePage {
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
    cy.xpath(selectors.closeNavBarX).click()
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
  isLeftNavMenuClosed() {
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
   * @param {string} item Main menu item, available options are: user, statement
   * @param {string} subItem Submenu item if available. If not, passes nothing like:
   *
   * @example: accessGlobalSettingsMenu("user", "dap")
   * @example: accessGlobalSettingsMenu("statement")
   *
   */
  accessGlobalSettingsMenu(item, subItem = '') {
    item = item.toLowerCase()
    subItem = subItem.toLowerCase()

    this.openSettingsMenuBar()

    // Menus
    if (item === 'user') {
      cy.get(globalSettingsMenuSelectors.userManagementMenuItem).as('btnMenu')
      cy.get('@btnMenu').click()
    } else if (item === 'statement') {
      cy.get(globalSettingsMenuSelectors.statementManagementMenuItem).as('btnMenu')
      cy.get('@btnMenu').click()
    }

    // Submenu inside a menu
    if (subItem != '') {
      switch (subItem) {
        case 'user':
          cy.get(globalSettingsMenuSelectors.userManagementSubMenuItem).as('btnSubMenu')
          cy.get('@btnSubMenu').click()
          break

        case 'group':
          cy.get(globalSettingsMenuSelectors.groupManagementSubMenuItem).as('btnSubMenu')
          cy.get('@btnSubMenu').click()
          break

        case 'role':
          cy.get(globalSettingsMenuSelectors.roleManagementSubMenuItem).as('btnSubMenu')
          cy.get('@btnSubMenu').click()
          break

        case 'dap':
          cy.get(globalSettingsMenuSelectors.dapSubMenuItem).as('btnSubMenu')
          cy.get('@btnSubMenu').click()
          break
      }
    }
  }

  /**
   * Open Personal Information page through left nav bar
   */
  openProfilePersonalInformationPage() {
    this.openProfileMenuBar()
    cy.get(selectors.profilePersonalInformation).as('btnPersonalInformation')
    cy.get('@btnPersonalInformation').click()
  }

  /**
   * Open Security page through left nav bar
   */
  openProfileSecurityPage() {
    this.openProfileMenuBar()
    cy.get(selectors.profileSecurity).as('btnSecurity')
    cy.get('@btnSecurity').click()
  }

  /**
   * Open Preferences page through left nav bar
   */
  openProfilePreferencesPage() {
    this.openProfileMenuBar()
    cy.get(selectors.profilePreferences).as('btnPreferences')
    cy.get('@btnPreferences').click()
  }

  /**
   * This method can be used to assert the Sign Out button is always visible across the menus in the left nav bar
   * @param {Boolean} visible True (Default) to be visible and false to not visible
   */
  assertSignOutButtonIsVisible(visible = true) {
    if (visible) {
      cy.get(selectors.signOut).should('be.visible')
    } else {
      cy.get(selectors.signOut).should('not.exist')
    }
  }
}

export default LeftMenuNavBar
