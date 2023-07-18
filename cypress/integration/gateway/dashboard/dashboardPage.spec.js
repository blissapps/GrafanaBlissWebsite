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

    it('C30092770 - Dashboard Page General Activity Elements Validation', () => {
      const activityElements = ['Activity', 'View all activity', 'Upcoming', 'Showing 3']
      equityGateway.DashboardPage.home(equityGateway.LoginPage.getLastUser(), activityElements)
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
      share_status: 'positive',
      sharesPositiveColor: 'rgb(0, 153, 0)',
      sharesNegativeColor: 'rgb(223, 7, 7)',
      sharesPositiveRgx: /\+[0-9]*\.[0-9]+ \(\+[0-9]*\.[0-9]+%\)/,
      sharesNegativeRgx: /-[0-9]*\.[0-9]+ \(-[0-9]*\.[0-9]+%\)/
    }

    it('C30092773/.789/.790/.791 - Shares Details', () => {
      equityGateway.SharesHeader.sharesName(shareLabels.name)
      equityGateway.SharesHeader.sharesAmount(shareLabels.amount)
      equityGateway.SharesHeader.currency(shareLabels.currency)
      equityGateway.SharesHeader.date(shareLabels.date)
      equityGateway.SharesHeader.sharesFluctuation(shareLabels.sharesPositiveColor, shareLabels.sharesNegativeColor, shareLabels.sharesPositiveRgx, shareLabels.sharesNegativeRgx)

      //Match sidebar shares info
      equityGateway.MainPageSideMenu.shareInfo(
        shareLabels.name,
        shareLabels.amount,
        shareLabels.currency,
        shareLabels.date,
        shareLabels.sharesPositiveColor,
        shareLabels.sharesNegativeColor,
        shareLabels.sharesPositiveRgx,
        shareLabels.sharesNegativeRgx
      )
    })
  })

  context('Portfolio Breakdown', () => {
    /** Related to User Stories
     * EGVFOUR-53, EGVFOUR-54, EGVFOUR-55
     */
    it('Portfolio - General view', () => {
      equityGateway.Portfolio.portfolioBasis('1117') //label1 must be the amount of Units allocated to the Test ACC
    })

    it('C30092774 - Filter by Status', () => {
      equityGateway.Portfolio.filter(0) //Filter '0' stands for 'By Status'
      equityGateway.Portfolio.filterContent('Available', 'Unavailable')
    })

    it('C30092775 - Filter by Type', () => {
      equityGateway.Portfolio.filter(1) //Filter '1' stands for 'By Type'
      equityGateway.Portfolio.filterContent('Options', 'Shares')
    })

    it('C30092776 - Filter by Plan', () => {
      equityGateway.Portfolio.filter(2) //Filter '2' stands for 'By Plan'
      equityGateway.Portfolio.filterContent('SAYE', 'Employee purchase plan')
    })
  })
})