import EquityAdmin from '../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Client tests over the client switch functionality', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.homePage.checkPageUrl()
    equityAdmin.applicationLeftMenuBar.openSettingsMenuBar()
    equityAdmin.settingsMenuNavBar.clickClientSwitchButton()
  })

  it('C16515491_View all clients using client switch functionality', () => {
    equityAdmin.clientSwitchMenu.assertClientListDisplayed()
    equityAdmin.clientSwitchMenu.clickViewAllClients()
    equityAdmin.homePage.checkPageUrl()
    equityAdmin.homePage.assertCompaniesHeaderIsDisplayed()
  })

  it('C16515492_Search clients using client switch', () => {
    const clientName = 'Activation'
    const clientId = 151

    // Search for a client that doesn't exists
    equityAdmin.applicationLeftMenuBar.openSettingsMenuBar()
    equityAdmin.settingsMenuNavBar.clickClientSwitchButton()
    equityAdmin.clientSwitchMenu.searchClientInSwitchClient('ClientNameThatDoesNotExists')
    equityAdmin.clientSwitchMenu.assertNoClientsFoundInClientSwitch()

    // Search for a existing client
    equityAdmin.clientSwitchMenu.searchClientInSwitchClient(clientName)
    equityAdmin.clientSwitchMenu.assertClientListDisplayed()
    equityAdmin.clientSwitchMenu.clickInClientInSwitchClientMenu(clientId)
    equityAdmin.clientSwitchMenu.closeSwitchClientMenuBar()
    equityAdmin.clientPeoplePage.checkPageUrl()
    equityAdmin.clientPeoplePage.assertClientNameInTheHeader(clientName)
  })

  it('C16515493_Favorite / Unfavorite a client in the client switch menu', () => {
    const clientIds = [151, 162]
    const clientNames = ['Activation', 'Ambev']

    // Favorite
    equityAdmin.clientSwitchMenu.searchClientInSwitchClient(clientNames[0])
    equityAdmin.clientSwitchMenu.clickToFavoriteClientInSwitchClientMenu(clientIds[0])
    equityAdmin.clientSwitchMenu.searchClientInSwitchClient(clientNames[1])
    equityAdmin.clientSwitchMenu.clickToFavoriteClientInSwitchClientMenu(clientIds[1])
    equityAdmin.clientSwitchMenu.clearSearchClientsContent()

    equityAdmin.clientSwitchMenu.assertClientIsFavorite(clientIds[0])
    equityAdmin.clientSwitchMenu.assertClientIsFavorite(clientIds[1])

    equityAdmin.clientSwitchMenu.closeSwitchClientMenuBar()
    equityAdmin.homePage.reloadPage()
    cy.waitForHomeSystemInitializedApiCalls()

    equityAdmin.homePage.assertClientIsFavorite(clientIds[0])
    equityAdmin.homePage.assertClientIsFavorite(clientIds[1])

    // Unfavorite
    equityAdmin.applicationLeftMenuBar.openSettingsMenuBar()
    equityAdmin.settingsMenuNavBar.clickClientSwitchButton()
    equityAdmin.clientSwitchMenu.searchClientInSwitchClient(clientNames[0])
    equityAdmin.clientSwitchMenu.clickToFavoriteClientInSwitchClientMenu(clientIds[0])
    equityAdmin.clientSwitchMenu.searchClientInSwitchClient(clientNames[1])
    equityAdmin.clientSwitchMenu.clickToFavoriteClientInSwitchClientMenu(clientIds[1])
    equityAdmin.clientSwitchMenu.clearSearchClientsContent()
    equityAdmin.clientSwitchMenu.assertClientIsFavorite(clientIds[0], false)
    equityAdmin.clientSwitchMenu.assertClientIsFavorite(clientIds[1], false)

    equityAdmin.clientSwitchMenu.closeSwitchClientMenuBar()

    equityAdmin.homePage.reloadPage()
    cy.waitForHomeSystemInitializedApiCalls()

    equityAdmin.homePage.assertClientIsFavorite(clientIds[0], false)
    equityAdmin.homePage.assertClientIsFavorite(clientIds[1], false)
  })
})
