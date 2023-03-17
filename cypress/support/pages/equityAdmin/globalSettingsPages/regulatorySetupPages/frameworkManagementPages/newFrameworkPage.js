import BaseNewOrEditFrameworkPage from './baseNewOrEditFrameworkPage'

const properties = {
  pageURL: '/regulatory/regulatory-framework/new'
}

class NewFrameworkPage extends BaseNewOrEditFrameworkPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }
}

export default NewFrameworkPage
