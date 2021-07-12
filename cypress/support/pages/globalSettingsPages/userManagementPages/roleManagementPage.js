import BaseManagementPage from './baseManagementPage'

const properties = {
  pageURL: '/settings/role-management'
}

const selectors = {
  activeRolesList: 'gs-tab[data-test-id=activeTab] #roleList gs-list',
  inactiveRolesList: 'gs-tab[data-test-id=inactiveTab] #roleList gs-list',
  rolesDisplayed: '#roleList gs-list a[id*="role_'
}

const apiInterceptions = {
  pageLoadedRequest: 'https://api.stonly.com/api/v2/widget/integration?*'
}

class RoleManagementPage extends BaseManagementPage {
  /**
   * Checks if the current pageLoad is Role management URL
   */
  checkRoleManagementUrl() {
    this.waitUntilPageIsLoaded()
    this.checkUrl(properties.pageURL)
  }

  // --------------------------------------- ASSERTIONS --------------------------------------------- //

  /**
   * Assert a list of roles is displayed under the correlated Active tab.
   */
  assertActiveRolesAreDisplayed() {
    cy.get(selectors.activeRolesList).should('be.visible')
  }

  /**
   * Assert a list of roles is displayed under the correlated Inactive tab.
   */
  assertInactiveRolesAreDisplayed() {
    cy.get(selectors.inactiveRolesList).should('be.visible')
  }

  assertRolesInAlphabeticalOrder() {
    this.assertElementsInAlphabeticalOrder(selectors.rolesDisplayed)
  }

  // ---------------------------------------  INTERCEPTIONS --------------------------------------------- //
  waitUntilPageIsLoaded() {
    cy.intercept('GET', apiInterceptions.pageLoadedRequest).as('pageLoaded')
    cy.wait('@pageLoaded', { requestTimeout: 10000 })
  }
}

export default RoleManagementPage
