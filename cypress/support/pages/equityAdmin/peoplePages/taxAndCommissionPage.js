import BasePage from '../../basePage'

const properties = {
  pageURL: '/tax-and-commission'
}

class TaxAndCommissionPage extends BasePage {
  /**
   * Checks if the current page is the Tax & Commission URL, which is accessed through Equity People page
   */
  checkPeopleAndCommissionURL() {
    this.checkUrl(properties.pageURL)
  }
}

export default TaxAndCommissionPage
