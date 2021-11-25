import BasePage from '../../../../basePage'

const properties = {
  pageURL: '/primary-settings'
}

class PrimarySettingsSalesPage extends BasePage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }
}

export default PrimarySettingsSalesPage
