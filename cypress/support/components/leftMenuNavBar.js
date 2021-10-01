import BasePage from '../pages/basePage'

const selectors = {
  logo: '#clientsLink',
  userEnvironment: 'div .user-environment',
  settingsButton: '#settingsLink',
  profileAvatar: '#profile-item #profileLink',
  leftMenuOpen: 'hearth-settings-navigation-bar[class*=open]',

  navBarHeaderClientName: '#navBarHeader',
  closeNavBarIcon: '#collapse',

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

const clientSwitchSelectors = {
  clientSwitchButton: '#clientSwitchClick',
  switchClientHeader: 'hearth-client-switch-navigation-bar h2 > span',
  closeXButton: 'hearth-client-switch-navigation-bar gs-svg-icon',
  viewAllClientsButton: 'hearth-client-switch-navigation-bar gs-button',
  searchClientsInput: 'hearth-client-switch-navigation-bar input',
  clientsListed: 'hearth-client-switch-navigation-bar gs-list *[id*=client_',
  noClientsFoundMsg: '#noClientsFound',
  favoriteIcon: '.favorite-icon',
  favoriteClient: '#favoriteClient_'
}

class LeftMenuNavBar extends BasePage {
  // --------------------------------------- CLICKS  --------------------------------------------- //

  /**
   * Click in the logo to go to the home page
   */
  clickLogoToGoToHomePage() {
    cy.get(selectors.logo).click()
    this.checkUrl(Cypress.env('HOME_PAGE_URL'))
  }

  /**
   * Click in the client switch button located in the bottom of the menu bar
   *
   * @param defaultDelay Delay because the element can be detached from the DOM and there is no XHR to intercept at this point
   */
  clickClientSwitchButton(defaultDelay = 200) {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(defaultDelay)
    cy.get(clientSwitchSelectors.clientSwitchButton).click()
  }

  /**
   * Click in View All Clients in the Switch Client area
   */
  clickViewAllClients() {
    cy.get(clientSwitchSelectors.viewAllClientsButton).click()
  }

  /**
   * Click in a client in the Switch Client list
   *
   * @param {Number} clientId Client id number to be searched
   */
  clickInClientInSwitchClientMenu(clientId) {
    cy.get(clientSwitchSelectors.clientsListed + clientId).click()
  }

  /**
   * Click to favorite a client in the Switch Client list
   *
   * @param {Number} clientId Client id number to be favorite
   */
  clickToFavoriteClientInSwitchClientMenu(clientId) {
    cy.get(clientSwitchSelectors.clientsListed + clientId + ']+' + clientSwitchSelectors.favoriteIcon)
      .invoke('hover')
      .click({ force: true })
  }

  // --------------------------------------- ASSERTIONS  --------------------------------------------- //

  /**
   * Check if the leftBar is open in the Global Settings menu
   *
   * @param {Boolean} open True to assert the menu is open, false otherwise
   */
  assertGlobalSettingsMenuOpen(open = true) {
    open ? cy.get(selectors.leftMenuOpen).should('be.visible') : cy.get(selectors.leftMenuOpen).should('not.exist')
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

  /**
   * Assert the User Management menu is displayed in the left menu bar
   *
   * @param {Boolean} displayed True to validate the User Management menu is available. False, otherwise.
   */
  assertUserManagementDisplayed(displayed = true) {
    displayed ? cy.get(globalSettingsMenuSelectors.userManagementMenuItem).should('be.visible') : cy.get(globalSettingsMenuSelectors.userManagementMenuItem).should('not.exist')
  }

  /**
   * Assert if a client is favorite in Client Switch
   *
   * @param {Number} clientId Client add to be verified
   * @param {Boolean} favorite True to validate if the client is favorite, false otherwise.
   */
  assertClientIsFavorite(clientId, favorite = true) {
    favorite ? cy.get(clientSwitchSelectors.favoriteClient + clientId).should('be.visible') : cy.get(clientSwitchSelectors.favoriteClient + clientId).should('not.exist')
  }

  /**
   * Validate the "No clients found" message is displayed after the user searches for a client that does not exists
   *
   * @param {Boolean} displayed True to validate the 'No Clients found' message is displayed. False, otherwise.
   */
  assertNoClientsFoundInClientSwitch(displayed = true) {
    displayed ? cy.get(clientSwitchSelectors.noClientsFoundMsg).should('be.visible') : cy.get(clientSwitchSelectors.noClientsFoundMsg).should('not.exist')
  }
  // --------------------------------------- OTHERS  --------------------------------------------- //

  /**
   * Closes the Global Setting menu located in the left menu
   *
   * @missing_ids
   */
  closeGlobalSettingsLeftBar() {
    cy.get(selectors.closeNavBarIcon).click()
  }

  /**
   * Closes the Profile menu located in the left menu
   */
  closeProfileLeftBar() {
    cy.get(selectors.closeBarArrow).click()
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
   * @param {String} item Main menu item, available options are: user, statement
   * @param {String} subItem Submenu item if available. If not, passes nothing like the examples provided
   * @param {Boolean} openLeftBar True is the default value to open the left bar. Send False in case it is already open
   *
   * @example: accessGlobalSettingsMenu("user", "dap")
   * @example: accessGlobalSettingsMenu("statement")
   *
   */
  accessGlobalSettingsMenu(item, subItem = '', openLeftBar = true) {
    item = item.toLowerCase()
    subItem = subItem.toLowerCase()

    openLeftBar ? this.openSettingsMenuBar() : true

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
    cy.get(selectors.profilePersonalInformation).as('btnPersonalInformation')
    cy.get('@btnPersonalInformation').click()
  }

  /**
   * Open Security page through left nav bar
   */
  openProfileSecurityPage() {
    cy.get(selectors.profileSecurity).as('btnSecurity')
    cy.get('@btnSecurity').click()
  }

  /**
   * Open Preferences page through left nav bar
   */
  openProfilePreferencesPage() {
    cy.get(selectors.profilePreferences).as('btnPreferences')
    cy.get('@btnPreferences').click()
  }

  /**
   * Search for a client in the Switch Client menu bar
   *
   * @param {String} clientName Client name to be searched
   */
  searchClientInSwitchClient(clientName) {
    cy.get(clientSwitchSelectors.searchClientsInput)
      .clear()
      .type(clientName)
  }

  /**
   * Close the Switch Client menu bar by clicking on the X button
   */
  closeSwitchClientMenuBar() {
    cy.get(clientSwitchSelectors.closeXButton)
      .eq(0)
      .click()
  }
}

export default LeftMenuNavBar
