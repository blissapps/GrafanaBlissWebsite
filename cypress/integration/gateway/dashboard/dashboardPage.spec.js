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
      equityGateway.SharesHeader.sharesName(shareLabels.name)
      equityGateway.SharesHeader.sharesAmount(shareLabels.amount)
      equityGateway.SharesHeader.currency(shareLabels.currency)
      equityGateway.SharesHeader.date(shareLabels.date)
      equityGateway.SharesHeader.sharesFluctuation()

      //Match sidebar shares info
      equityGateway.MainPageSideMenu.shareInfo(
        shareLabels.name,
        shareLabels.amount,
        shareLabels.currency,
        shareLabels.date
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

describe('Dashboard Page Tests ACC With Multiple Securities', () => {
  beforeEach(() => {
    equityGateway.LoginPage.login('Paulandera')
    equityGateway.LoginPage.getLoggedUser()
  })

  context('General DashboardPage Validations', () => {
    /** Related to User Stories
     * EGVFOUR-252
     */

    it('C31576573 - ACC does not show any security if any is not selected', () => {
      //TODO
    })

    it('C30159577 - ACC with multiple securities must available them', () => {
      //TODO
    })

    it('C31576630 - Select a security must show his info only', () => {
      //TODO
    })

    it('C31576631 - User can change is security any time and the corresponded info must be shown only', () => {
      //TODO
    })
  })
})