import BasePage from '../../basePage'

const properties = {
  pageURL: '/settings/role-management'
}

const apiInterceptions = {
  pageLoadedRequest: 'https://stonly.com/api/v2/widget/integration?*'
}

class RoleManagementPage extends BasePage {
  /**
   * Checks if the current pageLoad is Role management URL
   */
  checkRoleManagementUrl() {
    this.checkUrl(properties.pageURL)
    this.waitUntilPageIsLoaded()
  }

  // ---------------------------------------  INTERCEPTIONS --------------------------------------------- //
  waitUntilPageIsLoaded() {
    cy.intercept('GET', apiInterceptions.pageLoadedRequest).as('pageLoaded')
    cy.wait('@pageLoaded', { requestTimeout: 10000 })
  }
}

export default RoleManagementPage
