import BaseFrameworkByClientLinkedPage from './baseFrameworkByClientPage'

const properties = {
  pageURL: '/regulatory/clients/not-linked'
}

class FrameworkByClientNotLinkedPage extends BaseFrameworkByClientLinkedPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }
}

export default FrameworkByClientNotLinkedPage
