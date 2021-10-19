import HomePage from '../../support/pages/homePage'
import EquityPeoplePage from '../../support/pages/equityPeoplePage'
import SearchBar from '../../support/components/searchBar'

/**
 * Skipping until this one starts to be considered stable
 */
describe('Participants tests', () => {
  const homePage = new HomePage()
  const equityPeoplePage = new EquityPeoplePage()
  const searchBar = new SearchBar()

  beforeEach(() => {
    cy.login()
  })

  it('C11069829_SearchEngine_Search_For_ID_Name_Email', () => {
    const participantId = 112967
    const participantName = 'Bryan'
    const participantLastName = 'Branch'
    const participantEmail = 'SuppliedEmailAddress_'
    const participantResidency = 'LUX'

    homePage.selectClientById(144)
    equityPeoplePage.checkPeopleUrl() // needed to use the search engine in the correct page

    // Id
    searchBar.search(participantId)
    equityPeoplePage.assertAmountOfPeopleTable(1)
    equityPeoplePage.assertParticipantDisplayed(participantId)
    equityPeoplePage.assertDataDisplayedOnGsGridTableIsHighlighted(participantId.toString())

    // Email
    searchBar.search(participantEmail)
    equityPeoplePage.assertAmountOfPeopleTable(233)
    equityPeoplePage.assertDataDisplayedOnGsGridTableIsHighlighted(participantEmail)

    // Name
    searchBar.search(participantName)
    equityPeoplePage.assertAmountOfPeopleTable(2)
    equityPeoplePage.assertParticipantDisplayed(participantId)
    equityPeoplePage.assertDataDisplayedOnGsGridTableIsHighlighted(participantName)

    // Last name
    searchBar.search(participantLastName)
    equityPeoplePage.assertAmountOfPeopleTable(1)
    equityPeoplePage.assertParticipantDisplayed(participantId)
    equityPeoplePage.assertDataDisplayedOnGsGridTableIsHighlighted(participantName + ' ' + participantLastName)

    equityPeoplePage.assertParticipantDataDisplayedOnTheParticipantsList([participantId, participantName, participantEmail, participantResidency])
  })

  it('C11069830_SearchEngine_Search_Without_Returned_Values', () => {
    const participantId = 113026

    homePage.selectClientById(144)
    equityPeoplePage.checkPeopleUrl() // needed to use the search engine in the correct page

    searchBar.search('thereIsNoOneLikeThisTEST')
    equityPeoplePage.assertNoParticipantsOrTrustsAvailableDisplayed()
    searchBar.search(participantId)
    equityPeoplePage.getParticipantFromTheList(participantId).should('be.visible')
  })

  /**
   * Verify client without Participants and Trusts informs correctly that there are no participants/trusts
   *
   * @missing_data Need to have one client without participants and trusts
   *
   */

  it.skip('C1234567_Client_Without_Participants_And_Trusts', () => {
    homePage.selectClientById(420)

    equityPeoplePage.assertNoParticipantsOrTrustsAvailableDisplayed()
    equityPeoplePage.clickTabByTitle('Trusts')
    equityPeoplePage.assertNoParticipantsOrTrustsAvailableDisplayed()
  })

  /**
   * Verify PARTICIPANT DETAIL container data when picking a participant from the Participants table
   */
  it('C1234567_Verify_Participant_Detail_Container_Data', () => {
    const participantId = 113026
    homePage.selectClientById(144)

    equityPeoplePage.clickParticipantFromTheList(participantId)
    equityPeoplePage.assertParticipantDetailContent('Abel Lewis', 'New Zealand', 'ACTIVE')
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
