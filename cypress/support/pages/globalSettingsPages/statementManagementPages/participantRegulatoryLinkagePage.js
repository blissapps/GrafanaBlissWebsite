import BaseStatementManagementPage from './baseStatementsManagementPage'

const properties = {
  pageURL: '/statement/participants'
}

const selectors = {
  clientFilterStatementInput: '#clientSelect input',
  participantNameFilterStatementInput: '#pptName input',
  participantIdFilterStatementInput: '#participantIdSelect input',
  regulatorFilterStatementInput: '#regulatorSelect > .select > input',
  partnerFilterStatementInput: '#partnerSelect input'
}

const apiInterceptions = {
  linkagesParticipants: '/api/v1.0/Clients/**/ParticipantStatements/Linkages**'
}

class ParticipantRegulatoryLinkagePage extends BaseStatementManagementPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkParticipantRegulatoryLinkageManagementUrl() {
    this.checkUrl(properties.pageURL)
  }

  // --------------------------------------- ASSERTIONS AND OTHERS --------------------------------------------- //

  /**
   * Filter data from participant regulatory linkage
   *
   * @param {String} clientName client name to be filtered in the client input field
   * @param {String} participantName participant name to be filtered in the Participant Name input field
   * @param {any} participantId participant id to be filtered in the Participant Id input field
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
        })
    }

    if (regulator != '') {
      cy.get(selectors.regulatorFilterStatementInput)
        .type(regulator + '{enter}')
        .then(() => {
          this.waitForStatementsToReloadAfterFiltering()
        })
    }

    if (partner != '') {
      cy.get(selectors.partnerFilterStatementInput)
        .type(partner + '{enter}')
        .then(() => {
          this.waitForStatementsToReloadAfterFiltering()
        })
    }

    // Angular is taking more time than expected to render elements. So, even using intercept, it is not sufficient and we need to add this explicity waiting.
    cy.forcedWait(850)
  }

  // ---------------------------------------  INTERCEPTIONS --------------------------------------------- //

  /**
   * This method will wait until a XHR request, that brings all statements after filtering, is reloaded
   */
  waitForStatementsToReloadAfterFiltering() {
    cy.intercept('GET', apiInterceptions.linkagesParticipants).as('linkagesReloads')
    cy.wait('@linkagesReloads', { timeout: 10000 })
  }
}

export default ParticipantRegulatoryLinkagePage
