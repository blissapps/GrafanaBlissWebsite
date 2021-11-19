import BasePage from '../../basePage'

const properties = {
  pageURL: '/sale-and-dividend'
}

class SaleAndDividendPage extends BasePage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }
}

export default SaleAndDividendPage
