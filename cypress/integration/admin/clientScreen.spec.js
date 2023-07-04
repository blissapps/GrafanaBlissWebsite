import EquityAdmin from '../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Client search tests related with the search bar functionally in the home screen', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.homePage.checkPageUrl()
  })

  /**
   * @bug_raised https://globalshares.atlassian.net/browse/PB-1185
   */
  it.skip('C16515489 Search client', () => {
    const clientName = 'label'

    equityAdmin.searchEngine.search(clientName)
    equityAdmin.homePage.assertNumberOfClientCardsCounted(6)
    equityAdmin.homePage.assertNumberOfClientsDisplayedOnThePageHeader(6)
    equityAdmin.homePage.assertNumberOfClientsByGroupSection('All Companies', 6)

    // Add the status as a parameter in the assertClientCardSummaryInformation as soon as the PB-1185 is fixed, like this:
    // equityAdmin.homePage.assertClientCardSummaryInformation(463, 'Gateway Labels 1', 'GBR', 'Not Regulated', 'NOT SET')
    equityAdmin.homePage.assertClientCardSummaryInformation(463, 'Gateway Labels 1', 'GBR', 'Not Regulated')
    equityAdmin.homePage.assertClientCardSummaryInformation(410, 'Label Checks', 'IRL', 'Regulated')
    equityAdmin.homePage.assertClientCardSummaryInformation(287, 'Labels', 'GBR', 'Not Regulated')
    equityAdmin.homePage.assertClientCardSummaryInformation(495, 'WhiteLabell', 'IRL', 'Regulated')
    equityAdmin.homePage.assertClientCardSummaryInformation(413, 'WhiteLabel', 'KHM', 'Not Regulated')
    equityAdmin.homePage.assertClientCardSummaryInformation(506, 'WhiteLabel1', 'ITA', 'Regulated')
  })

  /**
   * @bug_raised https://globalshares.atlassian.net/browse/PB-1185
   */
  it.skip('C16524713 Group clients by alphabets', () => {
    // All Companies (default)
    equityAdmin.homePage.selectGroupByOptionForCompanies()
    equityAdmin.homePage.assertCompaniesAreOrdered()

    // Alphabetical
    equityAdmin.homePage.selectGroupByOptionForCompanies('alphabetical')
    equityAdmin.homePage.assertCompaniesAreOrdered()

    // Status
    equityAdmin.homePage.selectGroupByOptionForCompanies('status')
    equityAdmin.homePage.assertCompaniesAreOrdered()

    // Country
    equityAdmin.homePage.selectGroupByOptionForCompanies('country')
    equityAdmin.homePage.assertCompaniesAreOrdered()

    // Sector
    equityAdmin.homePage.selectGroupByOptionForCompanies('sector')
    equityAdmin.homePage.assertCompaniesAreOrdered()
  })

  it('C16515490 Clear client search', () => {
    const clientName = 'label'
    const firstClientCardId = 472

    equityAdmin.homePage.assertClientCardSummaryInformation(firstClientCardId, 'ActivateLang')
    equityAdmin.searchEngine.search(clientName)
    equityAdmin.homePage.assertNumberOfClientsDisplayedOnThePageHeader(6)
    equityAdmin.searchEngine.clearSearchBoxByXIcon()
    equityAdmin.homePage.assertClientCardSummaryInformation(firstClientCardId, 'ActivateLang')
  })

  it('C16524712 Favorite/Unfavorite Client', () => {
    const clientName = 'Revertdata1'
    const clientId = 516

    equityAdmin.searchEngine.search(clientName)

    // Favorite
    equityAdmin.homePage.favoriteUnfavoriteClient(clientId)
    equityAdmin.homePage.assertToastNotificationMessageIsDisplayed('Client added to favorites')
    equityAdmin.homePage.assertClientIsFavorite(clientId)
    equityAdmin.searchEngine.clearSearchBoxByXIcon()
    equityAdmin.homePage.assertClientIsFavorite(clientId)
    equityAdmin.homePage.assertSectionIsDisplayed('Favorites')

    // Unfavorite
    equityAdmin.homePage.favoriteUnfavoriteClient(clientId)
    equityAdmin.homePage.assertToastNotificationMessageIsDisplayed('Client removed from favorites')
    equityAdmin.homePage.assertClientIsFavorite(clientId, false)
    equityAdmin.homePage.assertSectionIsDisplayed('Favorites', false)
  })

  /**
   * @only_chrome Hover commands are strict to chrome, so since we are using RealHover commands, this test needs to be skipped in other browsers rather than Chrome based ones
   */
  it('C16587404 Check country badge hover behavior', { browser: '!firefox' }, () => {
    equityAdmin.homePage.assertClientCountryBadgeTollTipDisplaysCorrectText(256, 'Australia')
  })

  it('C16524716 Search a non existing client', () => {
    equityAdmin.searchEngine.search('Test123')
    equityAdmin.homePage.assertNoDataFoundDisplayed()
  })
})
