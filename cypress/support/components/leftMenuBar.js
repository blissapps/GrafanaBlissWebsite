const selectors = {
  logo: 'li.ng-tns-c119-1',
  settingsButton: '#settingsLink',
  closeBar: '//h2//gs-svg-icon',
  profileAvatar: '#profile-item',
  signOut: 'a.logout'
}

class LeftMenuBar {
  /**
   * Closes the menu left page
   */
  closeMenuLeftBar() {
    cy.xpath(selectors.closeBar).click()
  }

  /**
   * Opens the settings menu left bar
   */
  openSettingsMenuBar() {
    cy.get(selectors.settingsButton).as('settingsBtn') // using alias in this case to avoid element to get too attached
    cy.get('@settingsBtn').click()
  }

  /**
   * Navigation menu
   * @param {string} item Main menu item
   * @param {string} subItem Submenu item if available. If not, passes nothing like: accessMenuItem("Statement Management")
   *
   * @ID missing
   */
  accessGlobalSettingsMenu(item, subItem = '') {
    this.openSettingsMenuBar()
    cy.contains(item) // avoid element detached from the DOM
    cy.xpath(`(//a[normalize-space(text()) = '${item}'])[1]`).click()

    if (subItem != '') {
      cy.xpath(`//a[normalize-space(text()) = '${subItem}' and @href]`).click()
    }
  }
}

export default LeftMenuBar
