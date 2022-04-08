import EquityAdmin from '../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Client search tests related with the search bar functionally in the home screen', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.homePage.checkPageUrl()
  })

  it('C16515489_Search client', () => {
    const clientName = 'label'

    equityAdmin.searchEngine.search(clientName)
    equityAdmin.homePage.assertNumberOfClientCardsCounted(6)
    equityAdmin.homePage.assertNumberOfClientsDisplayedOnThePageHeader(6)
    equityAdmin.homePage.assertNumberOfClientsByGroupSection('All Companies', 6)
    equityAdmin.homePage.assertClientCardSummaryInformation(463, 'Gateway Labels 1', 'GBR', 'Not Regulated', 'NOT SET')
    equityAdmin.homePage.assertClientCardSummaryInformation(410, 'Label Checks', 'IRL', 'Regulated', 'NOT SET')
    equityAdmin.homePage.assertClientCardSummaryInformation(287, 'Labels', 'GBR', 'Not Regulated', 'NOT SET')
    equityAdmin.homePage.assertClientCardSummaryInformation(495, 'White_Label', 'IRL', 'Regulated', 'NOT SET')
    equityAdmin.homePage.assertClientCardSummaryInformation(413, 'WhiteLabel', 'KHM', 'Not Regulated', 'NOT SET')
    equityAdmin.homePage.assertClientCardSummaryInformation(506, 'WhiteLabel1', 'ITA', 'Regulated', 'NOT SET')
  })

  it('CC16515490_Clear client search', () => {
    const clientName = 'label'
    const firstClientCardId = 472

    equityAdmin.homePage.assertClientCardSummaryInformation(firstClientCardId, 'ActivateLang')
    equityAdmin.searchEngine.search(clientName)
    equityAdmin.homePage.assertNumberOfClientsDisplayedOnThePageHeader(6)
    equityAdmin.searchEngine.clearSearchBoxByXIcon()
    equityAdmin.homePage.assertClientCardSummaryInformation(firstClientCardId, 'ActivateLang')
  })
})
