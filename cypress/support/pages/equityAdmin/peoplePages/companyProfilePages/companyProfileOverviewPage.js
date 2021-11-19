import BasePage from '../../../basePage'

const properties = {
  pageURL: 'company-profile/company-information'
}

class CompanyProfileOverviewPage extends BasePage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }
}

export default CompanyProfileOverviewPage
