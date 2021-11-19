import BasePage from '../../../basePage'

const properties = {
  pageURL: 'company-profile/company-information'
}

class CompanyProfileOverviewPage extends BasePage {
  /**
   * Checks if the current page is the Company Profile URL, which is accessed through Equity People page
   */
  checkCompanyProfileURL() {
    this.checkUrl(properties.pageURL)
  }
}

export default CompanyProfileOverviewPage
