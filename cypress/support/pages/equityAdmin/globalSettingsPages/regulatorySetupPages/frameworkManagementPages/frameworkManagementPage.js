import BasePage from '../../../../basePage'

const properties = {
  pageURL: '/regulatory/frameworks'
}

class FrameworkManagementPage extends BasePage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }
}

export default FrameworkManagementPage
