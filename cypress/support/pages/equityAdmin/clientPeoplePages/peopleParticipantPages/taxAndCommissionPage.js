import BasePeopleParticipantPage from './basePeopleParticipantPage'

const properties = {
  pageURL: '/tax-and-commission'
}

class TaxAndCommissionPage extends BasePeopleParticipantPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }
}

export default TaxAndCommissionPage
