import BasePage from '../../basePage'

const properties = {
  pageURL: '/statement/participants'
}

// @ts-ignore
// eslint-disable-next-line no-unused-vars
const selectors = {
  clientFilterStatementInput: '#clientSelect input',
  participantStatementId: '#participantStatement-',
  participantNameFilterStatementInput: '.input > .ng-untouched',
  participantIdFilterStatementInput: '#participantIdSelect input',
  regulatorFilterStatementInput: '#regulatorSelect > .select > input',
  partnerFilterStatementInput: '#partnerSelect input',
  clearAllFiltersButton: '#clearButton',
  numberOfRecordsAfterFiltering: '//div[@class="grid-count ng-star-inserted"]',
  noDataFoundMessage: '#emptyContainer',
  summaryDownloadButton: '(//gs-button)[1]'
}

class ParticipantRegulatoryLinkagePage extends BasePage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkParticipantRegulatoryLinkageManagementUrl() {
    this.checkUrl(properties.pageURL)
  }
}

export default ParticipantRegulatoryLinkagePage
