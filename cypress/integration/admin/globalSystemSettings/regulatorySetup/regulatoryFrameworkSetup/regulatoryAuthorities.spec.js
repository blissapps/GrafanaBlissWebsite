import EquityAdmin from '../../../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Regulatory Authorities tests', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.homePage.navigateToUrl('/regulatory/framework-setup/authorities')
  })

  it('C20966362 Regulatory Authorities - Happy Path', () => {
    equityAdmin.regulatoryAuthoritiesPage.checkPageUrl()
    equityAdmin.regulatoryAuthoritiesPage.assertExpectedColumnsAreDisplayed()
    equityAdmin.regulatoryAuthoritiesPage.assertCodesAreUnique()
  })
})
