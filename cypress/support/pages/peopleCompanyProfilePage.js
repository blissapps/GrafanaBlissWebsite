import basePage from './basePage'

const properties = {
  pageURL: '/company-information'
}

class PeopleCompanyProfilePage extends basePage {
  /**
   * Checks if the current page is the Company Profile URL, which is accessed through Equity People page
   */
  checkPeopleCompanyProfileURL() {
    this.checkUrl(properties.pageURL)
  }
}

export default PeopleCompanyProfilePage
