import BasePage from '../../../basePage'

const properties = {
  pageURL: '/primary-settings'
}

class PrimarySettingsSalesPage extends BasePage {
  /**
   * Checks if the current page is the Primary Settings URL, which is accessed through Equity People page
   */
  checkPrimarySettingsSalesURL() {
    this.checkUrl(properties.pageURL)
  }
}

export default PrimarySettingsSalesPage
