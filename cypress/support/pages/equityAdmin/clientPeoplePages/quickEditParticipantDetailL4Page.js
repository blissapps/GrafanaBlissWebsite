import BasePage from '../../basePage'

const properties = {
  pageURL: /.?client.*[0-9].?people\/quick-edit\/participant-.*[0-9]$/
}

const selectors = {
  editIconButton: '#quickEditEditPpt',
  participantDetailTitle: '#quickEditHeader',
  participantDetailName: '#quickEditPptName',
  participantDetailCountry: '.participant-country',
  participantDetailStatus: '.participant-status',
  quickActionPanelIcon: '#quickEditActionPanel'
}

class QuickEditParticipantDetailL4Page extends BasePage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrlByRegex(properties.pageURL)
  }

  // -------------------------------------------------------------------------- ASSERTIONS ----------------------------------------------------------------------------- //

  /**
   * Verify if the data displayed in the Quick Edit Participant Detail (L4 container) is correct
   *
   * @param {string} name participant name
   * @param {string} country participant country
   * @param {string} status participant status
   */
  assertParticipantDetailContent(name, country, status) {
    cy.get(selectors.participantDetailTitle).should('be.visible')
    cy.get(selectors.participantDetailName).contains(name)
    cy.get(selectors.participantDetailCountry).contains(country)
    cy.get(selectors.participantDetailStatus).contains(status)
  }
}

export default QuickEditParticipantDetailL4Page
