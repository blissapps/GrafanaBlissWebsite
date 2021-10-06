import BasePage from '../pages/basePage'
import LeftMenuNavBar from './leftMenuNavBar'

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
  dapSubMenuItem: '#dapManagementChild'
}

const leftMenuNavBar = new LeftMenuNavBar()

class SettingsMenuNavBar extends BasePage {
  // --------------------------------------- CLICKS  --------------------------------------------- //

  /**
   * Click in the client switch button located in the bottom of the settings menu bar (It goes to the clientSwitchMenu.js component)
   *
   * @param defaultDelay Delay because the element can be detached from the DOM and there is no XHR to intercept at this point
   */
  clickClientSwitchButton(defaultDelay = 200) {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(defaultDelay)
    cy.get(selectors.clientSwitchButton).click()
  }

  // --------------------------------------- ASSERTIONS  --------------------------------------------- //

  /**
   * Check if the Settings Menu Nav Bar is open
   *
   * @param {Boolean} open True to assert the menu is open, false otherwise
   */
  assertGlobalSettingsMenuOpen(open = true) {
    open ? cy.get(selectors.settingsMenuOpen).should('be.visible') : cy.get(selectors.settingsMenuOpen).should('not.exist')
  }

  /**
   * Assert the User Management menu is displayed in the Settings menu bar
   *
   * @param {Boolean} displayed True to validate the User Management menu is available. False, otherwise.
   */
  assertUserManagementDisplayed(displayed = true) {
    displayed ? cy.get(globalSettingsMenuSelectors.userManagementMenuItem).should('be.visible') : cy.get(globalSettingsMenuSelectors.userManagementMenuItem).should('not.exist')
  }

  // --------------------------------------- OTHERS  --------------------------------------------- //

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

    openLeftBar ? leftMenuNavBar.openSettingsMenuBar() : true

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
