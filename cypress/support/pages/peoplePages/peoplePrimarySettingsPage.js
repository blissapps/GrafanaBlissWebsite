import BasePage from '../basePage'

const properties = {
  pageURL: '/primary-settings'
}

class PeoplePrimarySettingsPage extends BasePage {
  /**
   * Checks if the current page is the Primary Settings URL, which is accessed through Equity People page
   */
  checkPeoplePrimarySettingsURL() {
    this.checkUrl(properties.pageURL)
  }
}

export default PeoplePrimarySettingsPage
