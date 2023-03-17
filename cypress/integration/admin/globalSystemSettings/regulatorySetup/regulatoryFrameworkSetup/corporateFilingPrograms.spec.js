import EquityAdmin from '../../../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Corporate Filing Programs tests', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.homePage.navigateToUrl('/regulatory/framework-setup/programs')
  })

  it('C20966363 Corporate filling programs - Happy path', () => {
    equityAdmin.corporateFilingProgramsPage.checkPageUrl()
    equityAdmin.corporateFilingProgramsPage.assertExpectedColumnsAreDisplayed()
    equityAdmin.corporateFilingProgramsPage.assertCodesAreUnique()
  })
})
