import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()

/**
 * https://globalshares.testrail.net/index.php?/suites/view/18820&group_by=cases:section_id&group_order=asc&display_deleted_cases=0&group_id=1006703
 * Dashboard Page Test Suite
 */
describe('Dashboard Page Tests', () => {
  beforeEach(() => {
    equityGateway.LoginPage.login()
  })

  context('General DashboardPage Validations', () => {
    /** Related to User Stories
     * EGVFOUR-49
     */
    it('C31801379 - Dashboard Page General Activity Elements Validation', () => {
      equityGateway.Portfolio.portfolioValidation()
    })

    it('C30092770 - Dashboard Page General Activity Elements Validation', () => {
      const activityElements = ['Activity', 'View all activity', 'Upcoming', 'Showing 3']
      equityGateway.DashboardPage.home(equityGateway.LoginPage.getLoggedUser(), activityElements)
    })
  })

  context('Component Header Share Details', () => {
    /** Related to User Stories
     * EGVFOUR-52, EGVFOUR-249
     */
    //TODO change to accData when implemented
    const shareLabels = {
      name: 'Big Yellow Group PLC',
      amount: '11.69',
      currency: 'GBP',
      date: 'Mar 31',
      share_status: 'positive'
    }

    it('C30092773/.789/.790/.791 - Shares Details', () => {
      equityGateway.dashboardSharesHeader.sharesName(shareLabels.name)
      equityGateway.dashboardSharesHeader.sharesAmount(shareLabels.amount)
      equityGateway.dashboardSharesHeader.currency(shareLabels.currency)
      equityGateway.dashboardSharesHeader.date(shareLabels.date)
      equityGateway.dashboardSharesHeader.sharesFluctuation()

      //Match sidebar shares info
      equityGateway.MainPageSideMenu.shareValidation('true', shareLabels.name, shareLabels.amount, shareLabels.currency, shareLabels.date)
    })
  })

  context('Portfolio Breakdown', () => {
    /** Related to User Stories
     * EGVFOUR-53, EGVFOUR-54, EGVFOUR-55
     */
    it('Portfolio - General view', () => {
      equityGateway.Portfolio.portfolioValue('1117') //label1 must be the amount of Units allocated to the Test ACC
    })

    it('C30092774 - Filter by Status', () => {
      equityGateway.Portfolio.filter(0) //Filter '0' stands for 'By Status'
      //equityGateway.Portfolio.filterContent('Available', 'Unavailable')
      equityGateway.Portfolio.filterContentStatus('4,442.20', '380', '8,615.53', '737')
    })

    it('C30092775 - Filter by Type', () => {
      equityGateway.Portfolio.filter(1) //Filter '1' stands for 'By Type'
      equityGateway.Portfolio.filterContentType('8,615.53', '380', '737', '000.00')
    })

    it('C30092776 - Filter by Plan', () => {
      const card1 = ['4,652.62', '398 Units', '0 Available', '398 Unavailable']
      const card2 = ['4,442.20', '380 Units', '380 Available', '0 Unavailable']
      const card3 = ['3,962.91', '339 Units', '0 Available', '339 Unavailable']

      equityGateway.Portfolio.filter(2) //Filter '2' stands for 'By Plan'
      equityGateway.Portfolio.filterContentPlan(3, [card1, card2, card3])
    })
  })
})

describe('Dashboard Page Tests ACC With Multiple Securities', () => {
  beforeEach(() => {
    equityGateway.LoginPage.login('Paulandera')
    equityGateway.LoginPage.getLoggedUser()
  })

  context('Multiple Securities - DashboardPage Validations', () => {
    /** Related to User Stories
     * EGVFOUR-252
     */

    it('C31576573 - ACC does not show any security if any is not selected', () => {
      equityGateway.MainPageSideMenu.shareValidation('false')
    })

    it('C30159577 - ACC with multiple securities must available them', () => {
      equityGateway.MainPageSideMenu.shareValidation('false')
      equityGateway.MainPageSideMenu.shareSelect('false', 'SSAP')
      equityGateway.MainPageSideMenu.shareSelect('true', 'Skanska B')
      equityGateway.MainPageSideMenu.shareSelect('true', 'SEC')
    })

    it('C31576630 - Selecting a security must show his info only', () => {
      equityGateway.MainPageSideMenu.shareValidation('false')
      equityGateway.MainPageSideMenu.shareSelect('false', 'SSAP')
      equityGateway.MainPageSideMenu.shareValidation('true', 'SSAP, SKA B', '158.55', 'SEK', 'Mar 31, 4:00 GMT+1')
      equityGateway.dashboardSharesHeader.sharesName('SSAP')
      equityGateway.dashboardSharesHeader.sharesAmount('158.55')
      equityGateway.dashboardSharesHeader.sharesFluctuation()

      equityGateway.MainPageSideMenu.shareSelect('true', 'Skanska B')
      equityGateway.MainPageSideMenu.shareValidation('true', 'Skanska B', '158.55 ', 'SEK', 'Mar 31, 4:00 GMT+1')
      equityGateway.dashboardSharesHeader.sharesName('Skanska B')
      equityGateway.dashboardSharesHeader.sharesAmount('158.55')
      equityGateway.dashboardSharesHeader.sharesFluctuation()
    })
  })
})