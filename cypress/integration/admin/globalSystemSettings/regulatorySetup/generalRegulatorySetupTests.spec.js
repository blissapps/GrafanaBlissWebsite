import EquityAdmin from '../../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('General tests for Regulatory Setup', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
  })

  it('C21074318 Navigation over settings left menu bar', () => {
    equityAdmin.homePage.checkPageUrl()

    // Regulatory Management navigation
    equityAdmin.applicationLeftMenuBar.openSettingsMenuBar()
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('regulatory', 'framework Management')
    equityAdmin.frameworkManagementPage.checkPageUrl()

    // Framework by Client navigation
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('', 'Framework by Client')
    equityAdmin.frameworkByClientNotLinkedPage.checkPageUrl()
    equityAdmin.frameworkByClientNotLinkedPage.clickLinkedTab()
    equityAdmin.frameworkByClientLinkedPage.checkPageUrl()
    equityAdmin.frameworkByClientLinkedPage.clickNotLinkedTab()
    equityAdmin.frameworkByClientNotLinkedPage.checkPageUrl()

    // Regulatory Framework Setup navigation
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('', 'regulatory framework setup')
    equityAdmin.brokerDealersPage.checkPageUrl()
    equityAdmin.brokerDealersPage.clickRegulatoryAuthoritiesTab()
    equityAdmin.regulatoryAuthoritiesPage.checkPageUrl()
    equityAdmin.regulatoryAuthoritiesPage.clickCorporateFilingProgramsTab()
    equityAdmin.corporateFilingProgramsPage.checkPageUrl()
    equityAdmin.corporateFilingProgramsPage.clickBrokerDealersTab()
    equityAdmin.brokerDealersPage.checkPageUrl()
  })
})
