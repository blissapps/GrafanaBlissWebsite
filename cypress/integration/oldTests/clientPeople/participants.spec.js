import EquityAdmin from '../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Participants tests', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
  })

  /**
   * @missing_data The number of records needs to be known, so we can assert the search results
   */
  it.skip('C11069829_SearchEngine_Search_For_ID_Name_Email_And_Numbers', () => {
    const clientId = 144
    const participantId = 112967
    const participantName = 'Bryan'
    const participantLastName = 'Branch'
    const participantEmail = 'SuppliedEmailAddress_'
    const participantResidency = 'LUX'
    const numberToSearch = 113067

    equityAdmin.homePage.clickClientById(clientId)
    equityAdmin.clientPeoplePage.checkPageUrl() // needed to use the search engine in the correct page

    // Id
    equityAdmin.searchEngine.search(participantId)
    equityAdmin.clientPeoplePage.assertAmountOfPeopleTable(1)
    equityAdmin.clientPeoplePage.assertParticipantDisplayed(participantId)
    equityAdmin.clientPeoplePage.assertDataDisplayedOnGsGridTableIsHighlighted(participantId.toString())

    // Email
    equityAdmin.searchEngine.search(participantEmail)
    equityAdmin.clientPeoplePage.assertAmountOfPeopleTable(233)
    equityAdmin.clientPeoplePage.assertDataDisplayedOnGsGridTableIsHighlighted(participantEmail)

    // Name
    equityAdmin.searchEngine.search(participantName)
    equityAdmin.clientPeoplePage.assertAmountOfPeopleTable(2)
    equityAdmin.clientPeoplePage.assertParticipantDisplayed(participantId)
    equityAdmin.clientPeoplePage.assertDataDisplayedOnGsGridTableIsHighlighted(participantName)

    // Last name
    equityAdmin.searchEngine.search(participantLastName)
    equityAdmin.clientPeoplePage.assertAmountOfPeopleTable(1)
    equityAdmin.clientPeoplePage.assertParticipantDisplayed(participantId)
    equityAdmin.clientPeoplePage.assertDataDisplayedOnGsGridTableIsHighlighted(participantName + ' ' + participantLastName)

    // Test with numbers
    equityAdmin.searchEngine.search(numberToSearch)
    equityAdmin.clientPeoplePage.assertAmountOfPeopleTable(1)
    equityAdmin.clientPeoplePage.assertParticipantDisplayed(participantId)
    equityAdmin.clientPeoplePage.assertDataDisplayedOnGsGridTableIsHighlighted(participantName + ' ' + participantLastName)

    equityAdmin.clientPeoplePage.assertParticipantDataDisplayedOnTheParticipantsList([participantId, participantName, participantEmail, participantResidency])
  })

  /**
   * @missing_data Need to have a proper client and a proper participant to be searched
   */
  it.skip('C11069830_SearchEngine_Search_Without_Returned_Values', () => {
    const clientId = 144
    const participantId = 113026 // Abel Lewis

    equityAdmin.homePage.clickClientById(clientId)
    equityAdmin.clientPeoplePage.checkPageUrl() // needed to use the search engine in the correct page

    equityAdmin.searchEngine.search('thereIsNoOneLikeThisTEST')
    equityAdmin.clientPeoplePage.assertNoParticipantsOrTrustsAvailableDisplayed()
    equityAdmin.searchEngine.search(participantId)
    equityAdmin.clientPeoplePage.assertParticipantDisplayed(participantId)
  })

  /**
   * Verify client without Participants and Trusts informs correctly that there are no participants/trusts
   *
   * @missing_data Need to have one client without participants and trusts
   *
   */
  it.skip('C1234567_Client_Without_Participants_And_Trusts', () => {
    const clientId = 420

    equityAdmin.homePage.clickClientById(clientId)
    equityAdmin.clientPeoplePage.assertNoParticipantsOrTrustsAvailableDisplayed()
    equityAdmin.clientPeoplePage.clickTab('trusts')
    equityAdmin.clientPeoplePage.assertNoParticipantsOrTrustsAvailableDisplayed()
  })

  /**
   * Verify PARTICIPANT DETAIL container data when picking a participant from the Participants table
   *
   * @bug_raised SkIPPING DUE TO https://globalshares.atlassian.net/browse/PB-1023
   */
  it.skip('C12177200_Verify_Participant_Detail_Data_On_L4_Container', () => {
    const clientId = 144
    const participantId = 113026
    const participantName = 'Abel Lewis'
    const participantCountry = 'New Zealand'
    const participantStatus = 'ACTIVE'

    equityAdmin.homePage.clickClientById(clientId)
    equityAdmin.clientPeoplePage.clickParticipantById(participantId)
    equityAdmin.quickEditParticipantDetailL4Page.assertParticipantDetailContent(participantName, participantCountry, participantStatus)
  })

  it('C15166048_Not possible to navigate to participants page when there is no client selected', () => {
    equityAdmin.homePage.navigateToUrl('/client/people/people')
    equityAdmin.homePage.checkPageUrl()
  })
})
