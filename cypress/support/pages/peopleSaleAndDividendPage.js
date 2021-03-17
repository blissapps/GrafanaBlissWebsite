import BasePage from './basePage'

const properties = {
  pageURL: '/sale-and-dividend'
}

class PeopleSaleAndDividendPage extends BasePage {
  /**
   * Checks if the current page is the Sale & Dividend URL, which is accessed through Equity People page
   */
  checkPeopleSaleAndDividendURL() {
    this.checkUrl(properties.pageURL)
  }
}

export default PeopleSaleAndDividendPage
