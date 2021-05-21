import BasePage from '../../basePage'

const properties = {
  pageURL: '/settings/role-management'
}

class RoleManagementPage extends BasePage {
  /**
   * Checks if the current pageLoad is Role management URL
   */
  checkRoleManagementUrl() {
    this.checkUrl(properties.pageURL)
    cy.intercept('GET', 'https://stonly.com/api/v2/widget/integration?*').as('pageLoaded')
    cy.wait('@pageLoaded', { requestTimeout: 10000 })
  }
}

export default RoleManagementPage
