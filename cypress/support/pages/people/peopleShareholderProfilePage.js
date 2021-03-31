import BasePage from '../basePage'

const properties = {
  pageURL: '/shareholder-profile'
}

class PeopleShareholderProfilePage extends BasePage {
  /**
   * Checks if the current page is the Shareholder Profile URL, which is accessed through Equity People page
   */
  checkPeopleShareholderProfileURL() {
    this.checkUrl(properties.pageURL)
  }
}

export default PeopleShareholderProfilePage
