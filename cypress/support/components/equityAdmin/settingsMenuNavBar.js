import BasePage from '../../pages/basePage'
import ApplicationLeftMenuBar from './applicationLeftMenuBar'

const selectors = {
  clientSwitchButton: '#clientSwitchClick',
  settingsMenuOpen: 'hearth-settings-navigation-bar[class*=open]',
  closeNavBarIcon: '#collapse'
}

const globalSettingsMenuSelectors = {
  userManagementMenuItem: '#userManagementItem',
  statementManagementMenuItem: '#statementManagementItem',
  userManagementSubMenuItem: '#userManagementChild',
  groupManagementSubMenuItem: '#groupManagementChild',
  roleManagementSubMenuItem: '#roleManagementChild',
  dapSubMenuItem: '#dapManagementChild',
  backButton: '#navBarReturn'
}

const applicationLeftMenuNavBar = new ApplicationLeftMenuBar()

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

  // -------------------------------------------------------------------------------------------- OTHERS  --------------------------------------------------------------------- //

  /**
   * Navigation menu
   *
   * @param {string} item Main menu item, available options are: user, statement
   * @param {string} subItem Submenu item if available. If not, passes nothing like the examples provided
   * @param {boolean} openLeftBar True is the default value to open the left bar. Send False in case it is already open
   *
   * @example: accessGlobalSettingsMenu("user", "dap")
   * @example: accessGlobalSettingsMenu("statement")
   *
   */
  accessGlobalSettingsMenu(item, subItem = '', openLeftBar = true) {
    item = item.toLowerCase()
    subItem = subItem.toLowerCase()

    openLeftBar ? applicationLeftMenuNavBar.openSettingsMenuBar() : true

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
   * Closes the Global Setting menu
   */
  closeGlobalSettingsNavBar() {
    cy.get(selectors.closeNavBarIcon).click()
  }
}

export default SettingsMenuNavBar
