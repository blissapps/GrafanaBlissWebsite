import BaseNewOrEditFrameworkPage from './baseNewOrEditFrameworkPage'

const properties = {
  pageURL: '/regulatory/regulatory-framework/edit/'
}

class EditFrameworkPage extends BaseNewOrEditFrameworkPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }
}

export default EditFrameworkPage
