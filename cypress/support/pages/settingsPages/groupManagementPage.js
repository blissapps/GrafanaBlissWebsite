import BasePage from '../basePage'

const properties = {
  pageURL: '/settings/group-management'
}

class GroupManagement extends BasePage {
  /**
   * Checks if the current page is Group management URL
   */
  checkGroupManagementUrl() {
    this.checkUrl(properties.pageURL)
  }
}

export default GroupManagement
