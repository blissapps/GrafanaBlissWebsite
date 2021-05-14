import BasePage from '../basePage'

const properties = {
  pageURL: '/settings/dap-management'
}

class DapManagementPage extends BasePage {
  /**
   * Checks if the current page is Data Access Profile management URL
   */
  checkDapManagementUrl() {
    this.checkUrl(properties.pageURL)
  }
}

export default DapManagementPage
