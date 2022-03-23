import BasePeopleParticipantPage from '../basePeopleParticipantPage'

const properties = {
  pageURL: 'company-profile/payroll-information'
}

class CompanyProfilePayrollInformationPage extends BasePeopleParticipantPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }
}

export default CompanyProfilePayrollInformationPage
