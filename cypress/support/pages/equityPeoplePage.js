import BasePage from './basePage'

const selectors = {
  peopleNavBar: '#peopleItem',
  numberOfRecordsOnTable: '#peopleRecordCount',
  hoverActionsIcons: '#hover-actions-',
  noTrustsOrParticipantsCreatedMessage: 'gs-empty-container .content > div',
  customizeColumnsIcon: '#pptOpenColumn',
  numberOfRecordsInTable: '#peopleRecordCount'
}

const quickEditSelectors = {
  editIconButton: '#quickEditEditPpt',
  participantDetailTitle: '#quickEditHeader',
  participantDetailName: '#quickEditPptName',
  participantDetailCountry: '.participant-country',
  participantDetailStatus: '.participant-status',
  quickActionPanelIcon: '#quickEditActionPanel'
}

const properties = {
  pageURL: '/people'
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
   * Search for a participant by Id - Directly from the table list
   *
   * @param {Number} participantId Participant id to be searched
   *
   * @example 12345 as the participantId
   */
  getParticipantFromTheList(participantId) {
    return cy.get(`#participant-${participantId}`).scrollIntoView()
  }

  /**
   * Get the message 'There are no participants/trusts created' if displayed
   *
   */
  getNoParticipantsOrTrustsCreatedMessage() {
    return cy.get(selectors.noTrustsOrParticipantsCreatedMessage)
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
    this.getParticipantFromTheList(participantId).click()
  }

  // -------------------------------- ASSERTIONS AND OTHERS ------------------------------------- //

  /**
   * Checks the amount of records displayed in the People table
   *
   * @param {Number} amount amount of people you want to check in the records
   *
   * @example 'amount = 1 for '1 record(s)' being displayed in the table
   */
  checkAmountOfPeopleTable(amount) {
    cy.get(selectors.numberOfRecordsInTable)
      .invoke('text')
      .should('contain', amount)
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
  validateParticipantDataDisplayedOnTheParticipantsList(data) {
    for (let i = 1; i <= data.length; i++) {
      cy.xpath(`(//*[@id='participant-${data[0]}']//gs-grid-cell)[${i}]`)
        .invoke('text')
        .should('contain', data[i - 1])
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
  checkParticipantCellContent(columnToVerify, value) {
    cy.xpath(`//div[@class='data']//gs-grid-cell[${columnToVerify}]//span[@class='subtitled-cell-title']`).each($el => {
      cy.wrap($el)
        .invoke('text')
        .should('contain', value)
    })
  }

  /**
   * Verify if the data displayed in Participant Detail container is correct
   *
   * @param {String} name participant name
   * @param {String} country participant country
   * @param {String} status participant status
   */
  checkParticipantDetailContent(name, country, status) {
    cy.get(quickEditSelectors.participantDetailTitle).should('be.visible')
    cy.get(quickEditSelectors.participantDetailName).contains(name)
    cy.get(quickEditSelectors.participantDetailCountry).contains(country)
    cy.get(quickEditSelectors.participantDetailStatus).contains(status)
  }

  /**
   * Edit a participant from the list and go to Peoples page details >> Cypress/support/pages/peoplePages
   *
   * @param {Number} participantId Participant id to be searched
   */
  openEditParticipantDetails(participantId) {
    this.getParticipantFromTheList(participantId).click()
    cy.get(quickEditSelectors.editIconButton).click()
  }
}

export default EquityPeoplePage
