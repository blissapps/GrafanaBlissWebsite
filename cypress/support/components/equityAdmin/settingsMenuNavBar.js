import BasePage from '../../pages/basePage'

const selectors = {
  clientSwitchButton: '#clientSwitchClick',
  settingsMenuOpen: 'hearth-settings-navigation-bar[class*=open]',
  closeNavBarIcon: '#collapse',
  clientNameHeader: 'h2 > span'
}

const globalSettingsMenuSelectors = {
  userManagementMenuItem: '#userManagementItem',
  statementManagementMenuItem: '#statementManagementItem',
  regulatoryManagementItem: '#regulatoryManagementItem',
  userManagementSubMenuItem: '#userManagementChild',
  groupManagementSubMenuItem: '#groupManagementChild',
  roleManagementSubMenuItem: '#roleManagementChild',
  dapSubMenuItem: '#dapManagementChild',
  frameworkManagementSubMenuItem: 'a[href="/regulatory/frameworks"]',
  frameworkByClientSubMenuItem: 'a[href="/regulatory/clients"]',
  regulatoryFrameworkSetupSubMenuItem: 'a[href="/regulatory/framework-setup"]',
  backButton: '#navBarReturn'
}

class SettingsMenuNavBar extends BasePage {
  // -------------------------------------------------------------------------------------- CLICKS  ----------------------------------------------------------------------------- //

  /**
   * Click in the client switch button located in the bottom of the settings menu bar (It goes to the clientSwitchMenu.js component)
   *
   * @param defaultDelay Delay because the element can be detached from the DOM and there is no XHR to intercept at this point
   */
  clickClientSwitchButton(defaultDelay = 200) {
    cy.forcedWait(defaultDelay)
    cy.get(selectors.clientSwitchButton).click()
  }

  // ---------------------------------------------------------------------------------- ASSERTIONS  ------------------------------------------------------------------------- //

  /**
   * Check if the Settings Menu Nav Bar is open
   *
   * @param {boolean} open True to assert the menu is open, false otherwise
   */
  assertGlobalSettingsMenuOpen(open = true) {
    open ? cy.get(selectors.settingsMenuOpen).should('be.visible') : cy.get(selectors.settingsMenuOpen).should('not.exist')
  }

  /**
   * Assert the User Management menu is displayed in the Settings menu bar
   *
   * @param {boolean} displayed True to validate the User Management menu is available. False, otherwise.
   */
  assertUserManagementMenuDisplayed(displayed = true) {
    displayed ? cy.get(globalSettingsMenuSelectors.userManagementMenuItem).should('be.visible') : cy.get(globalSettingsMenuSelectors.userManagementMenuItem).should('not.exist')
  }

  /**
   * Assert the back button is displayed within the User Management menu
   *
   * @param {boolean} displayed True to validate the User Management menu is available. False, otherwise.
   */
  assertBackButtonDisplayed(displayed = true) {
    displayed ? cy.get(globalSettingsMenuSelectors.backButton).should('be.visible') : cy.get(globalSettingsMenuSelectors.backButton).should('not.exist')
  }

  /**
   * Assert the Group Management menu item is displayed within User Management settings
   *
   * @param {boolean} displayed True to validate the Group Management menu is available. False, otherwise.
   */
  assertGroupSubMenuItemDisplayed(displayed = true) {
    displayed
      ? cy.get(globalSettingsMenuSelectors.groupManagementSubMenuItem).should('be.visible')
      : cy.get(globalSettingsMenuSelectors.groupManagementSubMenuItem).should('not.exist')
  }

  /**
   * Assert the Role Management menu item is displayed within User Management settings
   *
   * @param {boolean} displayed True to validate the Role Management menu is available. False, otherwise.
   */
  assertRoleSubMenuItemDisplayed(displayed = true) {
    displayed
      ? cy.get(globalSettingsMenuSelectors.roleManagementSubMenuItem).should('be.visible')
      : cy.get(globalSettingsMenuSelectors.roleManagementSubMenuItem).should('not.exist')
  }

  /**
   * Assert the name of the current client. It is located in the top left, right after the GS logo
   *
   * @param {string} clientName Client name to be verified
   */
  assertClientNameInTheHeader(clientName) {
    cy.get(selectors.clientNameHeader).should('contain.text', clientName)
  }

  // -------------------------------------------------------------------------------------------- OTHERS  --------------------------------------------------------------------- //

  /**
   * Navigation menu
   *
   * @param {string} item Main menu item, available options are: user, statement, or regulatory. You cam send "" in case the menu is already open.
   * @param {string} subItem Submenu item to be selected.
   *
   * @example: accessGlobalSettingsMenu("user", "dap")
   * @example: accessGlobalSettingsMenu("regulatory", "framework management")
   *
   */
  accessGlobalSettingsMenu(item, subItem) {
    item = item.toLowerCase()
    subItem = subItem.toLowerCase()

    if (item !== '') {
      switch (item) {
        case 'user':
          cy.get(globalSettingsMenuSelectors.userManagementMenuItem).as('btnMenu')
          break

        case 'statement':
          cy.get(globalSettingsMenuSelectors.statementManagementMenuItem).as('btnMenu')
          break

        case 'regulatory':
          cy.get(globalSettingsMenuSelectors.regulatoryManagementItem).as('btnMenu')
          break

        default:
          throw new Error('Option for menu is invalid. Menus can be "user", "statement", "regulatory", or "" in case the menu is already open')
      }

      cy.get('@btnMenu').click()
    } else {
      cy.log('Main menu already selected, moving on...')
    }

    // Submenus
    if (subItem !== '') {
      switch (subItem) {
        // User Management cases
        case 'user':
          cy.get(globalSettingsMenuSelectors.userManagementSubMenuItem).as('btnSubMenu')
          break

        case 'group':
          cy.get(globalSettingsMenuSelectors.groupManagementSubMenuItem).as('btnSubMenu')
          break

        case 'role':
          cy.get(globalSettingsMenuSelectors.roleManagementSubMenuItem).as('btnSubMenu')
          break

        case 'dap':
          cy.get(globalSettingsMenuSelectors.dapSubMenuItem).as('btnSubMenu')
          break

        // Regulatory Setup cases
        case 'framework management':
          cy.get(globalSettingsMenuSelectors.frameworkManagementSubMenuItem).as('btnSubMenu')
          break

        case 'framework by client':
          cy.get(globalSettingsMenuSelectors.frameworkByClientSubMenuItem).as('btnSubMenu')
          break

        case 'regulatory framework setup':
          cy.get(globalSettingsMenuSelectors.regulatoryFrameworkSetupSubMenuItem).as('btnSubMenu')
          break

        default:
          throw new Error('Option invalid for this subMenu.')
      }

      cy.get('@btnSubMenu').click()
    } else {
      cy.log('A submenu item was not given, moving on...')
    }
  }

  /**
   * Closes the Global Setting menu
   */
  closeGlobalSettingsNavBar() {
    cy.get(selectors.closeNavBarIcon).click()
  }
}

export default SettingsMenuNavBar
