import BasePage from '../../basePage'

const properties = {
  pageURL: /.?client.*[0-9].?people$/
}

const selectors = {
  peopleNavBar: '#peopleItem',
  numberOfRecordsOnTable: '#peopleRecordCount',
  hoverActionsIcons: '#hover-actions-',
  noTrustsOrParticipantsCreatedMessage: 'gs-empty-container .content > div',
  customizeColumnsIcon: '#pptOpenColumn',
  numberOfRecordsInTable: '#peopleRecordCount',
  participant: '#participant-',
  participantsTab: '.tabs-bar #Participants',
  trustsTab: '.tabs-bar #Trusts',
  overviewTab: '.tabs-bar #Overview',
  editButton: '#cell-actions-',
  editActionButton: '*[id*=cdk-overlay-] gs-action-panel-option:nth-child(1)'
}

class ClientPeoplePage extends BasePage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrlByRegex(properties.pageURL)
  }

  // -------------------------------------------------------------------------- GETS ----------------------------------------------------------------------------- //

  /**
   * Get a participant by Id - Directly from the table list
   *
   * @param {number} participantId Participant id to be searched
   *
   * @example 12345 as the participantId
   */
  getParticipantById(participantId) {
    return cy.get(selectors.participant + participantId)
  }

  // ---------------------------------------------------------------------- CLICKS ----------------------------------------------------------------------------- //

  /**
   * Click in a Participant by Id - Directly from the table list
   *
   * @param {number} participantId Participant id to be searched
   *
   * @example 12345 as the participantId
   */
  clickParticipantById(participantId) {
    this.getParticipantById(participantId).scrollIntoView().click({ force: true })
  }

  /**
   * Click in the Participants, Trusts, or Overview tabs
   *
   * @param {string} tabName Tab name to click. It can be 'participants', 'trusts', or 'overview'
   */
  clickTab(tabName) {
    tabName = tabName.toLowerCase()

    switch (tabName) {
      case 'participants':
        cy.get(selectors.participantsTab).click()
        break

      case 'trusts':
        cy.get(selectors.trustsTab).click()
        break

      case 'overview':
        cy.get(selectors.overviewTab).click()
        break

      default:
        throw new Error('Option invalid. Tabs can be "participants", "trusts", or "overview"')
    }
  }

  /**
   * Click to edit a participant from the list by clicking in the edit button
   * The subsequent pages are located in Cypress/support/pages/peoplePages
   *
   * @param {number} participantId Participant id to be searched
   * @param {boolean} actionButton True is the default value to click in an action button before click in the edit button. Send false in case the edit button is directly available
   */
  clickToEditParticipant(participantId, actionButton = true) {
    if (actionButton) {
      cy.get(selectors.participant + participantId + ' gs-button').click()
      cy.get(selectors.editActionButton).click()
    } else {
      cy.get(selectors.editButton + participantId + ' gs-button').click()
    }
  }

  // ------------------------------------------------------------------------------ ASSERTIONS ------------------------------------------------------------------------ //

  /**
   * Assert the amount of records displayed in the People table
   *
   * @param {number} amount amount of people you want to check in the records
   *
   * @example 'amount = 1 for '1 record(s)' being displayed in the table
   */
  assertAmountOfPeopleTable(amount) {
    cy.get(selectors.numberOfRecordsInTable).should('contain.text', amount)
  }

  /**
   * Assert the participant is displayed in the participants list
   *
   * @param {number} participantId Participant id to be asserted
   * @param {boolean} displayed True is the default value to validate the participant is displayed in the list. False to otherwise validation
   */
  assertParticipantDisplayed(participantId, displayed = true) {
    displayed ? this.getParticipantById(participantId).should('be.visible') : cy.get(selectors.participant + participantId).should('not.exist')
  }

  /**
   * Check the data listed in a participant [Id, name, email, and residency] over the Participants table
   *
   * @param {array} data Array with the data needed to be validated. The correct order is the ORDER displayed in the UI,
   * which actually is [id, name, email, residency]
   *
   * @example: send [123456, 'Bryan', 'SuppliedEmailAddress_169769_112967@myglobalshares.com', 'LUX'] to validate the participant 12345 data is
   * displayed correctly in the Participants table list
   */
  assertParticipantDataDisplayedOnTheParticipantsList(data) {
    for (let i = 1; i <= data.length; i++) {
      cy.xpath(`(//*[@id='participant-${data[0]}']//gs-grid-cell)[${i}]`).should('contain.text', data[i - 1])
    }
  }

  /**
   * Verify the value of a cell in the table. This method was tested only for ID, NAME, and EMAIL.
   * columnToVerify must be: 1 - ID;
   *                         2 - NAME;
   *                         3 - EMAIL;
   *
   * @param {number} columnToVerify this is the column name you want to verity the content of this cell
   * @param {any} value This is the value supposed to be in the cell you choose
   */
  assertParticipantCellContent(columnToVerify, value) {
    cy.xpath(`//div[@class='data']//gs-grid-cell[${columnToVerify}]//span[@class='subtitled-cell-title']`).each(($el) => {
      cy.wrap($el).should('contain.text', value)
    })
  }

  /**
   * Assert the message 'There are no participants/trusts created' is displayed or not
   *
   * @param {boolean} displayed True is the default value to validate the message is displayed. False to otherwise validation
   */
  assertNoParticipantsOrTrustsAvailableDisplayed(displayed = true) {
    displayed ? cy.get(selectors.noTrustsOrParticipantsCreatedMessage).should('be.visible') : cy.get(selectors.noTrustsOrParticipantsCreatedMessage).should('not.exist')
  }

  // -------------------------------------------------------------------------- OTHERS ------------------------------------------------------------------------- //
}

export default ClientPeoplePage
