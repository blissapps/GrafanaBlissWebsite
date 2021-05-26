import BasePage from '../../basePage'

const properties = {
  pageURL: '/statement/participants'
}

// @ts-ignore
// eslint-disable-next-line no-unused-vars
const selectors = {
  clientFilterStatementInput: '#clientSelect input',
  participantNameFilterStatementInput: '#pptName input',
  participantIdFilterStatementInput: '#participantIdSelect input',
  regulatorFilterStatementInput: '#regulatorSelect > .select > input',
  partnerFilterStatementInput: '#partnerSelect input',
  clearAllFiltersButton: '#clearButton',
  participantStatementId: '#participantStatement-',
  numberOfRecordsAfterFiltering: '#gridCount',
  noDataFoundMessage: '#emptyContainer'
}

class ParticipantRegulatoryLinkagePage extends BasePage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkParticipantRegulatoryLinkageManagementUrl() {
    this.checkUrl(properties.pageURL)
  }

  /**
   * Filter data from participant regulatory linkage
   *
   * @param {String} clientName client name to be filtered in the client input field
   * @param {String} participantName participant name to be filtered in the Participant Name input field
   * @param {String} participantId participant id to be filtered in the Participant Id input field
   * @param {String} regulator regulator name to be filtered in the Regulator input field
   * @param {String} partner partner name to be filtered in the Partner input field
   *
   * @example ('Acacia Pharma', '', '', 'FINRA', '') for Acacia Pharma client with regulator as FINRA
   */
  filterParticipantsStatements(clientName = '', participantName = '', participantId = '', regulator = '', partner = '') {
    this.clearAllFilters()

    if (clientName != '') {
      cy.get(selectors.clientFilterStatementInput).type(clientName + '{enter}')
    }

    if (participantName != '') {
      cy.get(selectors.participantNameFilterStatementInput).type(participantName + '{enter}')
    }

    if (participantId != '') {
      cy.get(selectors.participantIdFilterStatementInput).type(participantId + '{enter}')
    }

    if (regulator != '') {
      cy.get(selectors.regulatorFilterStatementInput).type(regulator + '{enter}')
    }

    if (partner != '') {
      cy.get(selectors.partnerFilterStatementInput).type(partner + '{enter}')
    }

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(200) // we could use cy.intercept, but they are changing a lot the requests at this point, and the amount of time is really low
  }

  /**
   * Get no data found message when displayed
   *
   * @returns no data message
   */
  getNoDataFoundMessage() {
    return cy.get(selectors.noDataFoundMessage)
  }

  /**
   * Checks the amount of records displayed in the table
   *
   * @param {Number} records amount of people you want to check in the records
   *
   * @example 'records = 1 for '1 record(s)' being displayed in the table
   */
  checkAmountOfRecordsTable(records) {
    cy.get(selectors.numberOfRecordsAfterFiltering)
      .invoke('text')
      .should('contain', records)
  }
}

export default ParticipantRegulatoryLinkagePage
