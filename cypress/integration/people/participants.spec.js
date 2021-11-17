import EquityAdmin from '../../support/pages/equityAdmin'

/**
 * * Skipping until this one starts to be considered stable
 */
describe('Participants tests', () => {
  const equityAdmin = new EquityAdmin()

  beforeEach(() => {
    equityAdmin.loginPage.login()
  })

  /**
   * TODO: @missing_steps Search for numbers is missing to cover PB-829
   */
  it('C11069829_SearchEngine_Search_For_ID_Name_Email', () => {
    const participantId = 112967
    const participantName = 'Bryan'
    const participantLastName = 'Branch'
    const participantEmail = 'SuppliedEmailAddress_'
    const participantResidency = 'LUX'

    equityAdmin.homePage.selectClientById(144)
    equityAdmin.equityClientPeoplePage.checkClientPeopleUrl() // needed to use the search engine in the correct page

    // Id
    equityAdmin.searchEngine.search(participantId)
    equityAdmin.equityClientPeoplePage.assertAmountOfPeopleTable(1)
    equityAdmin.equityClientPeoplePage.assertParticipantDisplayed(participantId)
    equityAdmin.equityClientPeoplePage.assertDataDisplayedOnGsGridTableIsHighlighted(participantId.toString())

    // Email
    equityAdmin.searchEngine.search(participantEmail)
    equityAdmin.equityClientPeoplePage.assertAmountOfPeopleTable(233)
    equityAdmin.equityClientPeoplePage.assertDataDisplayedOnGsGridTableIsHighlighted(participantEmail)

    // Name
    equityAdmin.searchEngine.search(participantName)
    equityAdmin.equityClientPeoplePage.assertAmountOfPeopleTable(2)
    equityAdmin.equityClientPeoplePage.assertParticipantDisplayed(participantId)
    equityAdmin.equityClientPeoplePage.assertDataDisplayedOnGsGridTableIsHighlighted(participantName)

    // Last name
    equityAdmin.searchEngine.search(participantLastName)
    equityAdmin.equityClientPeoplePage.assertAmountOfPeopleTable(1)
    equityAdmin.equityClientPeoplePage.assertParticipantDisplayed(participantId)
    equityAdmin.equityClientPeoplePage.assertDataDisplayedOnGsGridTableIsHighlighted(participantName + ' ' + participantLastName)

    // Test with numbers

    equityAdmin.equityClientPeoplePage.assertParticipantDataDisplayedOnTheParticipantsList([participantId, participantName, participantEmail, participantResidency])
  })

  it('C11069830_SearchEngine_Search_Without_Returned_Values', () => {
    const participantId = 113026

    equityAdmin.homePage.selectClientById(144)
    equityAdmin.equityClientPeoplePage.checkClientPeopleUrl() // needed to use the search engine in the correct page

    equityAdmin.searchEngine.search('thereIsNoOneLikeThisTEST')
    equityAdmin.equityClientPeoplePage.assertNoParticipantsOrTrustsAvailableDisplayed()
    equityAdmin.searchEngine.search(participantId)
    equityAdmin.equityClientPeoplePage.getParticipantFromTheList(participantId).should('be.visible')
  })

  /**
   * Verify client without Participants and Trusts informs correctly that there are no participants/trusts
   *
   * @missing_data Need to have one client without participants and trusts
   *
   */

  it.skip('C1234567_Client_Without_Participants_And_Trusts', () => {
    equityAdmin.homePage.selectClientById(420)

    equityAdmin.equityClientPeoplePage.assertNoParticipantsOrTrustsAvailableDisplayed()
    equityAdmin.equityClientPeoplePage.clickTab('trusts')
    equityAdmin.equityClientPeoplePage.assertNoParticipantsOrTrustsAvailableDisplayed()
  })

  /**
   * Verify PARTICIPANT DETAIL container data when picking a participant from the Participants table
   *
   * * SkIPPING DEU TO https://globalshares.atlassian.net/browse/PB-1023
   */
  it.skip('C12177200_Verify_Participant_Detail_Data_On_L4_Container', () => {
    const participantId = 113026
    equityAdmin.homePage.selectClientById(144)

    equityAdmin.equityClientPeoplePage.clickParticipantFromTheList(participantId)
    equityAdmin.equityClientPeoplePage.assertParticipantDetailContent('Abel Lewis', 'New Zealand', 'ACTIVE')
  })

  /**
   * Check if the Id, name, email, and residency are being displayed correctly and in order in the Participants tab.
   *
   * Waiting for @IDS
   */

  /**
   * Customized Columns behavior -  Verify Participants and Trusts Customized Columns behavior by adding more columns
   * Waiting for @IDS
   */

  /**
   * Customized Columns behavior -  Verify Participants and Trusts Customized Columns behavior by adding more columns and changing the order of the columns
   * Waiting for @IDS
   */

  /**
   * Accessing participant admin directly from URL https://ea-v3.myglobalshares.co.uk/client/1/people
   * Waiting for @IDS since the gs-notification message is not localized.
   */

  // ************** TESTS BELLOW MODIFY DATA DEFINITELY ***************

  // Edit participant - Personal - Check mandatory fields and behavior over all the tabs (Overview, Address and Contact, and Bank Accounts)

  // Edit participant - Company - Check mandatory fields and behavior over all the tabs (Overview, and Payroll Information)

  // Edit participant - Tax & Commission - Check mandatory fields and behavior.

  // Edit participant - Sale & Dividend - Check mandatory fields and behavior.

  // Edit participant - Primary Settings - Check mandatory fields and behavior over all the tabs (Sales, Transfers, Dividends, Financial Reporting, Exchange, and Adjustments)

  // Terminate a participant
})
