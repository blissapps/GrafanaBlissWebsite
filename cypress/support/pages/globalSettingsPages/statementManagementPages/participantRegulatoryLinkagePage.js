import BasePage from '../../basePage'

const properties = {
  pageURL: '/statement/participants'
}

// @ts-ignore
const selectors = {
  clientFilterStatementInput: '#clientSelect input',
  participantNameFilterStatementInput: '#pptName input',
  participantIdFilterStatementInput: '#participantIdSelect input',
  regulatorFilterStatementInput: '#regulatorSelect > .select > input',
  partnerFilterStatementInput: '#partnerSelect input',
  clearAllFiltersButton: '#clearButton',
  participantStatementId: '#participantStatement-',
  numberOfRecords: '#gridCount',
  noDataFoundMessage: '#emptyContainer'
}

const apiInterceptions = {
  tableReloadedAfterFiltering: 'https://stonly.com/api/v2/widget/integration**',
  linkagesParticipants: '/api/v1.0/Clients/**/ParticipantStatements/Linkages**'
}

class ParticipantRegulatoryLinkagePage extends BasePage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkParticipantRegulatoryLinkageManagementUrl() {
    this.checkUrl(properties.pageURL)
  }

  // --------------------------------------- GETS --------------------------------------------- //

  /**
   * Get no data found message when displayed
   *
   * @returns no data message
   */
  getNoDataFoundMessage() {
    return cy.get(selectors.noDataFoundMessage)
  }

  // --------------------------------------- ASSERTIONS AND OTHERS --------------------------------------------- //

  /**
   * Filter data from participant regulatory linkage
   *
   * @param {String} clientName client name to be filtered in the client input field
   * @param {String} participantName participant name to be filtered in the Participant Name input field
   * @param {Number} participantId participant id to be filtered in the Participant Id input field
   * @param {String} regulator regulator name to be filtered in the Regulator input field
   * @param {String} partner partner name to be filtered in the Partner input field
   *
   * @example ('Acacia Pharma', '', '', 'FINRA', '') for Acacia Pharma client with regulator as FINRA
   */
  filterParticipantsStatements(clientName, participantName = '', participantId = -1, regulator = '', partner = '') {
    if (clientName != '') {
      cy.get(selectors.clientFilterStatementInput)
        .type(clientName + '{enter}')
        .then(() => {
          this.waitForStatementsToReloadAfterFiltering()
        })
    }

    if (participantName != '') {
      cy.get(selectors.participantNameFilterStatementInput)
        .type(participantName + '{enter}')
        .then(() => {
          this.waitForStatementsToReloadAfterFiltering()
        })
    }

    if (participantId != -1) {
      cy.get(selectors.participantIdFilterStatementInput)
        .type(participantId + '{enter}')
        .then(() => {
          this.waitForStatementsToReloadAfterFiltering()
          this.waitForTableToReloadAfterFiltering()
        })
    }

    if (regulator != '') {
      cy.get(selectors.regulatorFilterStatementInput)
        .type(regulator + '{enter}')
        .then(() => {
          this.waitForStatementsToReloadAfterFiltering()
          this.waitForTableToReloadAfterFiltering()
        })
    }

    if (partner != '') {
      cy.get(selectors.partnerFilterStatementInput)
        .type(partner + '{enter}')
        .then(() => {
          this.waitForStatementsToReloadAfterFiltering()
          this.waitForTableToReloadAfterFiltering()
        })
    }

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(700) // Angular is taking more time than expected, so even using intercept, it is not being sufficient.
  }

  /**
   * Checks the amount of records displayed in the table
   *
   * @param {Number} records amount of people you want to check in the records
   *
   * @example 'records = 1 for '1 record(s)' being displayed in the table
   */
  checkAmountOfRecordsTable(records) {
    this.AssertNumberOfRecordsTable(selectors.numberOfRecords, records)
  }

  // ---------------------------------------  INTERCEPTIONS --------------------------------------------- //

  /**
   * This method waits until the table in reloaded after filtering something in filter statements.
   * It intercepts the call that is being made in the backend, avoiding unnecessary waits.
   */
  waitForTableToReloadAfterFiltering() {
    cy.intercept('GET', apiInterceptions.tableReloadedAfterFiltering).as('tableReloads')
    cy.wait('@tableReloads', { timeout: 10000 })
  }

  /**
   * This method will wait until a XHR request, that brings all statements after filtering, is reloaded
   */
  waitForStatementsToReloadAfterFiltering() {
    cy.intercept('GET', apiInterceptions.linkagesParticipants).as('linkagesReloads')
    cy.wait('@linkagesReloads', { timeout: 10000 })
  }
}

export default ParticipantRegulatoryLinkagePage
