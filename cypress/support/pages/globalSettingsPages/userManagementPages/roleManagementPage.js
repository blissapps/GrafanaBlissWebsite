import BaseManagementPage from './baseManagementPage'

const properties = {
  pageURL: '/settings/role-management'
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

  // ---------------------------------------  INTERCEPTIONS --------------------------------------------- //
  waitUntilPageIsLoaded() {
    cy.intercept('GET', apiInterceptions.pageLoadedRequest).as('pageLoaded')
    cy.wait('@pageLoaded', { requestTimeout: 10000 })
  }
}

export default RoleManagementPage
