import HomePage from '../support/pages/homePage'
import EquityPeoplePage from '../support/pages/equityPeoplePage'
import LeftMenuNavBar from '../support/components/leftMenuNavBar'
import SettingsMenuNavBar from '../support/components/settingsMenuNavBar'
import ClientSwitchMenu from '../support/components/clientSwitchMenu'

describe('Home page tests', () => {
  const homePage = new HomePage()
  const equityPeoplePage = new EquityPeoplePage()
  const leftMenuNavBar = new LeftMenuNavBar()
  const settingsMenuNavBar = new SettingsMenuNavBar()
  const clientSwitchMenu = new ClientSwitchMenu()

  beforeEach(() => {
    cy.login()
  })

  it('C10728360_Select_Specific_Client_From_The_List_Using_The_Search_Engine', () => {
    const clientName = 'Allianz'

    homePage.selectClientFromTheListBySearch(clientName)
    equityPeoplePage.checkUrlByRegex(/.?client.*[0-9].?people$/)
    equityPeoplePage.assertClientNameInTheHeader(clientName)
  })

  it('C10735651_Check_GroupBy_Displays_Correct_Order_For_AllCompanies_Alphabetical_Status_Country_Sector', () => {
    // All Companies (default)
    homePage.SelectGroupByOptionForCompanies()
    homePage.assertCompaniesGroupByOrderIsCorrect()

    // Alphabetical
    homePage.SelectGroupByOptionForCompanies('alphabetical')
    homePage.assertCompaniesGroupByOrderIsCorrect('alphabetical')

    // Status
    homePage.SelectGroupByOptionForCompanies('status')
    homePage.assertCompaniesGroupByOrderIsCorrect('status')

    // Country
    homePage.SelectGroupByOptionForCompanies('country')
    homePage.assertCompaniesGroupByOrderIsCorrect('country')

    // Sector
    homePage.SelectGroupByOptionForCompanies('sector')
    homePage.assertCompaniesGroupByOrderIsCorrect('sector')
  })

  it('C10735652_Favorite_And_Unfavorite_Client', () => {
    // Favorite
    homePage.favoriteUnfavoriteClient(146)
    homePage.assertClientIsFavorite(146)

    // Unfavorite
    homePage.favoriteUnfavoriteClient(146)
    homePage.assertClientIsFavorite(146, false)
  })

  it('C10735680_Check_Client_Summary_Information_On_Cards', () => {
    homePage.assertClientCardSummaryInformation(144, '7digital', 'GBR', 'Regulated', 'Active').should('be.visible')
    homePage.assertClientCardSummaryInformation(337, '9F Group', 'CHN', 'Not Regulated', 'NOT SET').should('be.visible')
    homePage.assertClientCardSummaryInformation(361, 'Alliance Bernstein', 'USA', 'Regulated', 'Terminated').should('be.visible')
    homePage.assertClientCardSummaryInformation(234, 'Janus Henderson', 'GBR', 'Regulated', 'Terminated').should('be.visible')
    homePage.assertClientCardSummaryInformation(343, 'Vista Global', 'ARE', 'Not Regulated', 'Implementation').should('be.visible')
  })

  it('C10772388_Validate_Quick_Client_Switch_Behavior', () => {
    const clientName = '7digital'
    const clientId = 144

    // Search for a client behavior
    leftMenuNavBar.openSettingsMenuBar()
    settingsMenuNavBar.clickClientSwitchButton()
    clientSwitchMenu.searchClientInSwitchClient('ClientNameThatDoesNotExists')
    clientSwitchMenu.assertNoClientsFoundInClientSwitch()
    clientSwitchMenu.searchClientInSwitchClient(clientName)
    clientSwitchMenu.clickInClientInSwitchClientMenu(clientId)
    clientSwitchMenu.closeSwitchClientMenuBar()
    equityPeoplePage.checkUrlByRegex(/.?client.*[0-9].?people$/)
    equityPeoplePage.assertClientNameInTheHeader(clientName)

    // View all clients behavior
    leftMenuNavBar.openSettingsMenuBar()
    settingsMenuNavBar.clickClientSwitchButton()
    clientSwitchMenu.clickViewAllClients()
    homePage.checkHomePageUrl()
    homePage.assertCompaniesHeaderIsDisplayed()
  })

  it('C10772389_Favorite_And_Unfavorite_A_client_In_The_Switch_Client_Menu', () => {
    const clientId = 144

    // Favorite
    leftMenuNavBar.openSettingsMenuBar()
    settingsMenuNavBar.clickClientSwitchButton()
    clientSwitchMenu.clickToFavoriteClientInSwitchClientMenu(clientId)
    clientSwitchMenu.assertClientIsFavorite(clientId)
    clientSwitchMenu.closeSwitchClientMenuBar()

    homePage.reloadPage()
    cy.loginSuccessfulXHRWaits()
    homePage.assertClientIsFavorite(clientId)

    // Unfavorite
    leftMenuNavBar.openSettingsMenuBar()
    settingsMenuNavBar.clickClientSwitchButton()
    clientSwitchMenu.clickToFavoriteClientInSwitchClientMenu(clientId)
    clientSwitchMenu.assertClientIsFavorite(clientId, false)
    clientSwitchMenu.closeSwitchClientMenuBar()

    homePage.reloadPage()
    cy.loginSuccessfulXHRWaits()
    homePage.assertClientIsFavorite(clientId, false)
  })
})
