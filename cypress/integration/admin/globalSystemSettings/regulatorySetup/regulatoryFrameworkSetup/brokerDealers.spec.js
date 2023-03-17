import EquityAdmin from '../../../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Broker-Dealers tests', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.homePage.navigateToUrl('/regulatory/framework-setup/partners')
  })

  it('C20966360 Broker Dealers - Happy Path', () => {
    equityAdmin.brokerDealersPage.checkPageUrl()
    equityAdmin.brokerDealersPage.assertExpectedColumnsAreDisplayed()
    equityAdmin.brokerDealersPage.assertBrokerDealersAreOrdered()
    equityAdmin.brokerDealersPage.assertBrokerDealersIdsAreUnique()
    equityAdmin.brokerDealersPage.assertBrokerDealersNamesAreUnique()
  })
})
