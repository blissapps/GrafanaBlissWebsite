import BasePeopleParticipantPage from '../basePeopleParticipantPage'

const properties = {
  pageURL: '/personal-profile/demographic'
}

class PersonalProfileOverviewPage extends BasePeopleParticipantPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }
}

export default PersonalProfileOverviewPage
