import BasePeopleParticipantPage from './basePeopleParticipantPage'

const properties = {
  pageURL: '/sale-and-dividend'
}

class SaleAndDividendPage extends BasePeopleParticipantPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }
}

export default SaleAndDividendPage
