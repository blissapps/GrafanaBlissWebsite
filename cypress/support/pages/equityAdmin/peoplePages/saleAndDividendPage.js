import BasePage from '../../basePage'

const properties = {
  pageURL: '/sale-and-dividend'
}

class SaleAndDividendPage extends BasePage {
  /**
   * Checks if the current page is the Sale & Dividend URL, which is accessed through Equity People page
   */
  checkSaleAndDividendURL() {
    this.checkUrl(properties.pageURL)
  }
}

export default SaleAndDividendPage
