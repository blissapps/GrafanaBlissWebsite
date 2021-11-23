import BasePersonalProfilePage from './basePersonalProfilePage'

const properties = {
  pageURL: '/personal-profile/demographic'
}

class PersonalProfileOverviewPage extends BasePersonalProfilePage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }
}

export default PersonalProfileOverviewPage
