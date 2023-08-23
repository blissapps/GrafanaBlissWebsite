import EquityGateway from '../../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()

/**
 * https://globalshares.testrail.net/index.php?/suites/view/18820&group_by=cases:section_id&group_order=asc&display_deleted_cases=0&group_id=1026439
 * Dashboard Side Menu Test Suite
 */
describe('MainPage SideMenu Tests', () => {
  beforeEach(() => {
    equityGateway.LoginPage.login()
  })

  context('Side Navigation Bar', () => {
    /** Related to User Stories
     * EGVFOUR-43
     */

    it('C30092769 - MainPageSideMenu Content Validation', () => {
      equityGateway.MainPageSideMenu.pages('1', 'Dashboard')
      equityGateway.MainPageSideMenu.pages('2', 'Portfolio')
      equityGateway.MainPageSideMenu.pages('3', 'Plans')
      equityGateway.MainPageSideMenu.pages('4', 'Transactions')
      equityGateway.MainPageSideMenu.pages('5', 'Statements')
      equityGateway.MainPageSideMenu.pages('6', 'Resources')

      equityGateway.MainPageSideMenu.support('Help') //Help Page presence validation
    })

    it('C30092769 - MainPageSideMenu Shares Validation', () => {
      const shareVariables = {
        /**
         * Provisory Mocked Data
         */
        name: 'Big Yellow Group PLC',
        amount: '11.69',
        currency: 'GBP',
        date: 'Mar 31',
        share_status: 'positive'
      }

      equityGateway.MainPageSideMenu.shareValidation('true', shareVariables.name, shareVariables.amount, shareVariables.currency, shareVariables.date)
    })
  })
})
