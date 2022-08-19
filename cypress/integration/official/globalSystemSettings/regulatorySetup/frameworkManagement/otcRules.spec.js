import EquityAdmin from '../../../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('OTC Rules', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.homePage.navigateToUrl('/regulatory/frameworks')
    equityAdmin.frameworkManagementPage.checkPageUrl()
    equityAdmin.frameworkManagementPage.assertExpectedFrameworkColumnsAreDisplayedOverTheTable()
  })

  context('Error Scenarios ', () => {
    /**
     * @missing_data Waiting for proper data
     */
    it('C21721828 Create new OTC rule - all fields in blank', () => {
      const regulatoryFrameworkId = 1

      equityAdmin.frameworkManagementPage.clickToEditFramework(regulatoryFrameworkId)
      equityAdmin.editFrameworkPage.checkPageUrl()
      equityAdmin.editFrameworkPage.clickRegulatoryFrameworkTab('otc')
      equityAdmin.editFrameworkPage.assertExpectedFrameworkColumnsAreDisplayedOverTheTable()
      equityAdmin.editFrameworkPage.clickAddRuleButton()

      equityAdmin.newRuleL4Page.checkPageUrl('otc')
      equityAdmin.newRuleL4Page.assertCreateOrSaveButtonIsEnabled(false)
    })
  })
})
