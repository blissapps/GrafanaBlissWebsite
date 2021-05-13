import HomePage from '../support/pages/homePage'
import EquityPeoplePage from '../support/pages/equityPeoplePage'
import SearchBar from '../support/components/searchBar'

describe('Home page tests', () => {
  const homePage = new HomePage()
  const equityPeoplePage = new EquityPeoplePage()
  const searchBar = new SearchBar()

  beforeEach(() => {
    // @ts-ignore
    cy.login()
  })

  // ******************************************************* PARTICIPANTS ****************************************************************** //

  /**
   * Search Engine - Search for a participant using the search engine and Look for ID, name, and email to check the expected data is correct
   */
  it('C1234567_SearchEngine_Search_For_ID_Name_Email', () => {
    const participantId = 112967
    const participantName = 'Bryan'
    const participantEmail = 'SuppliedEmailAddress_169761_112967@myglobalshares.com'
    const participantResidency = 'LUX'

    homePage.selectClientById(144)
    equityPeoplePage.checkPeopleUrl() // needed to use the search engine in the correct page

    searchBar.search(participantId) // by id
    equityPeoplePage.checkAmountOfPeopleTable(1)
    equityPeoplePage.getParticipantFromTheList(participantId).should('be.visible')

    searchBar.search(participantName) // by name
    equityPeoplePage.checkAmountOfPeopleTable(1)
    equityPeoplePage.getParticipantFromTheList(participantId).should('be.visible')

    searchBar.search(participantEmail) // by e-mail
    equityPeoplePage.checkAmountOfPeopleTable(1)
    equityPeoplePage.getParticipantFromTheList(participantId).should('be.visible')

    equityPeoplePage.validateParticipantDataDisplayedOnTheParticipantsList([participantId, participantName, participantEmail, participantResidency])
  })

  /**
   * Search Engine - Check the behavior of a search without returned values from Participants
   */
  it('C1234567_SearchEngine_Search_Without_Returned_Values', () => {
    homePage.selectClientById(144)
    equityPeoplePage.checkPeopleUrl() // needed to use the search engine in the correct page

    searchBar.search('thereIsNoOneLikeThisTEST')
    equityPeoplePage.getNoParticipantsOrTrustsCreatedMessage().should('be.visible')
  })

  /**
   * Search Engine - Search for a participant with full name, example: Abel Lewis
   *
   * @BUG
   */
  it.skip('C1234567_SearchEngine_Search_ParticipantByFullName', () => {
    const participantId = 113026

    homePage.selectClientById(144)
    equityPeoplePage.checkPeopleUrl() // needed to use the search engine in the correct page

    searchBar.search('Abel Lewis')
    equityPeoplePage.checkAmountOfPeopleTable(1)
    equityPeoplePage.getParticipantFromTheList(participantId).should('be.visible')
  })

  /**
   * Search Engine - Search for a participant by last name; Example: Lewis should only return names with Lewis
   *
   * @BUG
   */
  it.skip('C1234567_SearchEngine_Search_ParticipantByLastName', () => {
    const participantId = 113026
    const participantLastName = 'Lewis'

    homePage.selectClientById(144)
    equityPeoplePage.checkPeopleUrl() // needed to use the search engine in the correct page

    searchBar.search(participantLastName)
    equityPeoplePage.getParticipantFromTheList(participantId).should('be.visible')
    equityPeoplePage.checkParticipantCellContent(2, participantLastName)
  })

  /**
   * Search Engine - Test ability to reuse the search engine after a search that does not bring any values
   *
   * @BUG
   */
  it.skip('C1234567_SearchEngine_Search_Again_After_Search_That_Does_Not_Bring_Anything', () => {
    const participantId = 113026

    homePage.selectClientById(144)
    equityPeoplePage.checkPeopleUrl() // needed to use the search engine in the correct page

    searchBar.search('thereIsNoOneLikeThisTEST')
    equityPeoplePage.getNoParticipantsOrTrustsCreatedMessage().should('be.visible')
    searchBar.search(participantId)
    equityPeoplePage.getParticipantFromTheList(participantId).should('be.visible')
  })

  /**
   * Verify client without Participants and Trusts informs correctly that there are no participants/trusts (API Automation Tests)
   */
  it('C1234567_Client_Without_Participants_And_Trusts', () => {
    homePage.selectClientById(419)

    equityPeoplePage.getNoParticipantsOrTrustsCreatedMessage().should('be.visible')
    equityPeoplePage.selectTab('Trusts')
    equityPeoplePage.getNoParticipantsOrTrustsCreatedMessage().should('be.visible')
  })

  // CONTINUE FROM HERE ***************************************************

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

  // Terminate a participant ???

  // Edit participant - Personal - Check mandatory fields and behavior over all the tabs (Overview, Address and Contact, and Bank Accounts)

  // Edit participant - Company - Check mandatory fields and behavior over all the tabs (Overview, and Payroll Information)

  // Edit participant - Tax & Commission - Check mandatory fields and behavior.

  // Edit participant - Sale & Dividend - Check mandatory fields and behavior.

  // Edit participant - Primary Settings - Check mandatory fields and behavior over all the tabs (Sales, Transfers, Dividends, Financial Reporting, Exchange, and Adjustments)

  // ******************************************************* TRUSTS ****************************************************************** //
  // RBC Trust Account Jersey client!!!
})
