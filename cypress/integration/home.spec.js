import EquityAdmin from '../support/pages/equityAdmin'

describe('Home page tests', () => {
  const equityAdmin = new EquityAdmin()

  beforeEach(() => {
    equityAdmin.loginPage.login()
  })

  it('C10728360_Select_Specific_Client_From_The_List_Using_The_Search_Engine', () => {
    const clientName = 'Allianz'

    equityAdmin.homePage.selectClientFromTheListBySearch(clientName)
    equityAdmin.equityClientPeoplePage.checkUrlByRegex(/.?client.*[0-9].?people$/)
    equityAdmin.equityClientPeoplePage.assertClientNameInTheHeader(clientName)
  })

  it('C10735651_Check_GroupBy_Displays_Correct_Order_For_AllCompanies_Alphabetical_Status_Country_Sector', () => {
    // All Companies (default)
    equityAdmin.homePage.SelectGroupByOptionForCompanies()
    equityAdmin.homePage.assertCompaniesGroupByOrderIsCorrect()

    // Alphabetical
    equityAdmin.homePage.SelectGroupByOptionForCompanies('alphabetical')
    equityAdmin.homePage.assertCompaniesGroupByOrderIsCorrect('alphabetical')

    // Status
    equityAdmin.homePage.SelectGroupByOptionForCompanies('status')
    equityAdmin.homePage.assertCompaniesGroupByOrderIsCorrect('status')

    // Country
    equityAdmin.homePage.SelectGroupByOptionForCompanies('country')
    equityAdmin.homePage.assertCompaniesGroupByOrderIsCorrect('country')

    // Sector
    equityAdmin.homePage.SelectGroupByOptionForCompanies('sector')
    equityAdmin.homePage.assertCompaniesGroupByOrderIsCorrect('sector')
  })

  it('C10735652_Favorite_And_Unfavorite_Client', () => {
    // Favorite
    equityAdmin.homePage.favoriteUnfavoriteClient(146)
    equityAdmin.homePage.assertClientIsFavorite(146)

    // Unfavorite
    equityAdmin.homePage.favoriteUnfavoriteClient(146)
    equityAdmin.homePage.assertClientIsFavorite(146, false)
  })

  it('C10735680_Check_Client_Summary_Information_On_Cards', () => {
    equityAdmin.homePage.assertClientCardSummaryInformation(144, '7digital', 'GBR', 'Regulated', 'Active').should('be.visible')
    equityAdmin.homePage.assertClientCardSummaryInformation(337, '9F Group', 'CHN', 'Not Regulated', 'NOT SET').should('be.visible')
    equityAdmin.homePage.assertClientCardSummaryInformation(361, 'Alliance Bernstein', 'USA', 'Regulated', 'Terminated').should('be.visible')
    equityAdmin.homePage.assertClientCardSummaryInformation(445, 'Umicore', 'BEL', 'Not Regulated', 'Implementation').should('be.visible')
    equityAdmin.homePage.assertClientCardSummaryInformation(281, 'BOCI SSO', 'HKG', 'Not Regulated', 'Demo').should('be.visible')
  })

  it('C10772388_Validate_Quick_Client_Switch_Behavior', () => {
    const clientName = '7digital'
    const clientId = 144

    // Search for a client behavior
    equityAdmin.applicationLeftMenuBar.openSettingsMenuBar()
    equityAdmin.settingsMenuNavBar.clickClientSwitchButton()
    equityAdmin.clientSwitchMenu.searchClientInSwitchClient('ClientNameThatDoesNotExists')
    equityAdmin.clientSwitchMenu.assertNoClientsFoundInClientSwitch()
    equityAdmin.clientSwitchMenu.searchClientInSwitchClient(clientName)
    equityAdmin.clientSwitchMenu.clickInClientInSwitchClientMenu(clientId)
    equityAdmin.clientSwitchMenu.closeSwitchClientMenuBar()
    equityAdmin.equityClientPeoplePage.checkUrlByRegex(/.?client.*[0-9].?people$/)
    equityAdmin.equityClientPeoplePage.assertClientNameInTheHeader(clientName)

    // View all clients behavior
    equityAdmin.applicationLeftMenuBar.openSettingsMenuBar()
    equityAdmin.settingsMenuNavBar.clickClientSwitchButton()
    equityAdmin.clientSwitchMenu.clickViewAllClients()
    equityAdmin.homePage.checkPageUrl()
    equityAdmin.homePage.assertCompaniesHeaderIsDisplayed()
  })

  it('C10772389_Favorite_And_Unfavorite_A_client_In_The_Switch_Client_Menu', () => {
    const clientId = 144

    // Favorite
    equityAdmin.applicationLeftMenuBar.openSettingsMenuBar()
    equityAdmin.settingsMenuNavBar.clickClientSwitchButton()
    equityAdmin.clientSwitchMenu.clickToFavoriteClientInSwitchClientMenu(clientId)
    equityAdmin.clientSwitchMenu.assertClientIsFavorite(clientId)
    equityAdmin.clientSwitchMenu.closeSwitchClientMenuBar()

    equityAdmin.homePage.reloadPage()
    cy.loginSuccessfulXHRWaits()
    equityAdmin.homePage.assertClientIsFavorite(clientId)

    // Unfavorite
    equityAdmin.applicationLeftMenuBar.openSettingsMenuBar()
    equityAdmin.settingsMenuNavBar.clickClientSwitchButton()
    equityAdmin.clientSwitchMenu.clickToFavoriteClientInSwitchClientMenu(clientId)
    equityAdmin.clientSwitchMenu.assertClientIsFavorite(clientId, false)
    equityAdmin.clientSwitchMenu.closeSwitchClientMenuBar()

    equityAdmin.homePage.reloadPage()
    cy.loginSuccessfulXHRWaits()
    equityAdmin.homePage.assertClientIsFavorite(clientId, false)
  })
})
