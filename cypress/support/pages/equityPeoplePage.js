import BasePage from './basePage'

const properties = {
  pageURL: '/people'
}

const selectors = {
  peopleNavBar: '#peopleItem',
  numberOfRecordsOnTable: '#peopleRecordCount',
  hoverActionsIcons: '#hover-actions-',
  noTrustsOrParticipantsCreatedMessage: 'gs-empty-container .content > div',
  customizeColumnsIcon: '#pptOpenColumn',
  numberOfRecordsInTable: '#peopleRecordCount',
  clientNameHeader: 'gs-container-l2 #navBarHeader > span',
  participant: '#participant-',
  participantsTab: '.tabs-bar #Participants',
  trustsTab: '.tabs-bar #Trusts',
  overviewTab: '.tabs-bar #Overview'
}

const quickEditNavBarSelectors = {
  editIconButton: '#quickEditEditPpt',
  participantDetailTitle: '#quickEditHeader',
  participantDetailName: '#quickEditPptName',
  participantDetailCountry: '.participant-country',
  participantDetailStatus: '.participant-status',
  quickActionPanelIcon: '#quickEditActionPanel'
}

class EquityPeoplePage extends BasePage {
  /**
   * Checks if the current page is Participants/People URL
   */
  checkPeopleUrl() {
    this.checkUrl(properties.pageURL)
  }

  // --------------------------------------- GETS --------------------------------------------- //

  /**
   * Get a participant by Id - Directly from the table list
   *
   * @param {Number} participantId Participant id to be searched
   *
   * @example 12345 as the participantId
   */
  getParticipantFromTheList(participantId) {
    return cy.get(selectors.participant + participantId)
  }

  // --------------------------------------- CLICKS --------------------------------------------- //

  /**
   * Click in a Participant by Id - Directly from the table list
   *
   * @param {Number} participantId Participant id to be searched
   *
   * @example 12345 as the participantId
   */
  clickParticipantFromTheList(participantId) {
    this.getParticipantFromTheList(participantId)
      .scrollIntoView()
      .click({ force: true })
  }

  /**
   * Click in the Participants, Trusts, or Overview tabs
   *
   * @param {String} tabName Tab name to click. It can be 'participants', 'trusts', or 'overview'
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

  // -------------------------------- ASSERTIONS ------------------------------------- //

  /**
   * Assert the amount of records displayed in the People table
   *
   * @param {Number} amount amount of people you want to check in the records
   *
   * @example 'amount = 1 for '1 record(s)' being displayed in the table
   */
  assertAmountOfPeopleTable(amount) {
    cy.get(selectors.numberOfRecordsInTable).should('contain.text', amount)
  }

  /**
   * Assert the participant is displayed in the participants list
   *
   * @param {Number} participantId Participant id to be asserted
   * @param {Boolean} displayed True is the default value to validate the participant is displayed in the list. False to otherwise validation
   */
  assertParticipantDisplayed(participantId, displayed = true) {
    displayed ? this.getParticipantFromTheList(participantId).should('be.visible') : cy.get(selectors.participant + participantId).should('not.exist')
  }

  /**
   * Check the data listed in a participant [Id, name, email, and residency] over the Participants table
   *
   * @param {Array} data Array with the data needed to be validated. The correct order is the ORDER displayed in the UI,
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
   * @param {Number} columnToVerify this is the column name you want to verity the content of this cell
   * @param {any} value This is the value supposed to be in the cell you choose
   */
  assertParticipantCellContent(columnToVerify, value) {
    cy.xpath(`//div[@class='data']//gs-grid-cell[${columnToVerify}]//span[@class='subtitled-cell-title']`).each($el => {
      cy.wrap($el).should('contain.text', value)
    })
  }

  /**
   * Verify if the data displayed in Participant Detail container (right menu bar after clicking in a participant) is correct
   *
   * @param {String} name participant name
   * @param {String} country participant country
   * @param {String} status participant status
   */
  assertParticipantDetailContent(name, country, status) {
    cy.get(quickEditNavBarSelectors.participantDetailTitle).should('be.visible')
    cy.get(quickEditNavBarSelectors.participantDetailName).contains(name)
    cy.get(quickEditNavBarSelectors.participantDetailCountry).contains(country)
    cy.get(quickEditNavBarSelectors.participantDetailStatus).contains(status)
  }

  /**
   * Assert the name of the current client. It is located in the top left, right after the GS logo
   *
   * @param {String} clientName Client name to be verified
   */
  assertClientNameInTheHeader(clientName) {
    cy.get(selectors.clientNameHeader).should('have.text', clientName)
  }

  /**
   * Assert the message 'There are no participants/trusts created' is displayed or not
   *
   * @param {Boolean} displayed True is the default value to validate the message is displayed. False to otherwise validation
   */
  assertNoParticipantsOrTrustsAvailableDisplayed(displayed = true) {
    displayed ? cy.get(selectors.noTrustsOrParticipantsCreatedMessage).should('be.visible') : cy.get(selectors.noTrustsOrParticipantsCreatedMessage).should('not.exist')
  }

  // ------------------------------------- OTHERS ------------------------------------- //

  /**
   * Edit a participant from the list and go to Peoples page details >> Cypress/support/pages/peoplePages
   *
   * @param {Number} participantId Participant id to be searched
   */
  openEditParticipantDetails(participantId) {
    this.getParticipantFromTheList(participantId).click()
    cy.get(quickEditNavBarSelectors.editIconButton).click()
  }
}

export default EquityPeoplePage
