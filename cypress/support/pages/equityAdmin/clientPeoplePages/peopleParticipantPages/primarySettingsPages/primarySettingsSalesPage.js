import BasePeopleParticipantPage from '../basePeopleParticipantPage'

const properties = {
  pageURL: '/primary-settings'
}

class PrimarySettingsSalesPage extends BasePeopleParticipantPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }
}

export default PrimarySettingsSalesPage
