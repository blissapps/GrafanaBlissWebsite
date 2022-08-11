import BaseFrameworkManagementPage from './baseFrameworkManagementPage'

const properties = {
  pageURL: '/regulatory/regulatory-framework/new'
}

class NewFrameworkPage extends BaseFrameworkManagementPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }

  // ----------------------------------------------------------------- ASSERTIONS -------------------------------------------------------------------- //
}

export default NewFrameworkPage
