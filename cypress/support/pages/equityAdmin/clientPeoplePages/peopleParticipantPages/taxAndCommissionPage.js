import BasePage from '../../../basePage'

const properties = {
  pageURL: '/tax-and-commission'
}

class TaxAndCommissionPage extends BasePage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }
}

export default TaxAndCommissionPage
