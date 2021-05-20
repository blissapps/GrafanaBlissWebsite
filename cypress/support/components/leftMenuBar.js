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
   *
   * @param {string} item Main menu item
   * @param {string} subItem Submenu item if available. If not, passes nothing like: accessMenuItem("Statement Management")
   *
   * @ID missing and this methods needs to be refactored to remove the waits when the element removed from the DOM be resolved
   */
  accessGlobalSettingsMenu(item, subItem = '') {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000)
    this.openSettingsMenuBar()
    cy.contains(item) // avoid element detached from the DOM

    cy.xpath(`(//a[normalize-space(text()) = '${item}'])[1]`).as('btnMenu')
    cy.get('@btnMenu').click()

    if (subItem != '') {
      cy.xpath(`//a[normalize-space(text()) = '${subItem}' and @href]`).as('btnSubMenu')
      cy.get('@btnSubMenu').click()
    }
  }
}

export default LeftMenuBar
