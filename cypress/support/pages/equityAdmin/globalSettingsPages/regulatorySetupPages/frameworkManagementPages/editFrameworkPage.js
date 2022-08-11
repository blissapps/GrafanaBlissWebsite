import BaseFrameworkManagementPage from './baseFrameworkManagementPage'

const properties = {
  pageURL: '/regulatory/frameworks/edit/'
}

class EditFrameworkPage extends BaseFrameworkManagementPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }
}

export default EditFrameworkPage
