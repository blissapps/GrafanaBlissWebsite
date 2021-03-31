import BasePage from '../basePage'

const properties = {
  pageURL: '/settings/role-management'
}

class RoleManagement extends BasePage {
  /**
   * Checks if the current page is Role management URL
   */
  checkRoleManagementUrl() {
    this.checkUrl(properties.pageURL)
  }
}

export default RoleManagement
