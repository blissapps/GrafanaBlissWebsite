import BasePage from '../../basePage'

const properties = {
  pageURL: '/settings/group-management'
}

class GroupManagementPage extends BasePage {
  /**
   * Checks if the current page is Group management URL
   */
  checkGroupManagementUrl() {
    this.checkUrl(properties.pageURL)
  }
}

export default GroupManagementPage
