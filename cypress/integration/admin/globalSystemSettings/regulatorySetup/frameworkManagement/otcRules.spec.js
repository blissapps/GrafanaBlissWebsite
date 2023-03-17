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
     * @bug_raised SkIPPING DUE TO https://globalshares.atlassian.net/browse/PB-1338
     */
    it.skip('C21823507 Create new OTC rule - check mandatory fields', () => {
      const regulatoryFrameworkId = 6
      const ruleReference = 'OT001'
      const taxResidenciesList = ['EU']
      const securityListingLocation = ['US']
      const brokerDealerName = 'Wells Fargo'

      equityAdmin.frameworkManagementPage.clickToEditFramework(regulatoryFrameworkId)
      equityAdmin.editFrameworkPage.checkPageUrl()
      equityAdmin.editFrameworkPage.clickRegulatoryFrameworkTab('otc')
      equityAdmin.editFrameworkPage.assertExpectedFrameworkColumnsAreDisplayedOverTheTable()
      equityAdmin.editFrameworkPage.clickAddRuleButton()

      equityAdmin.newRuleL4Page.checkPageUrl('otc')

      cy.log('All fields in blank')
      equityAdmin.newRuleL4Page.assertCreateOrSaveButtonIsEnabled(false)

      cy.log('Rule Reference field in blank')
      equityAdmin.newRuleL4Page.selectTaxResidences(taxResidenciesList, false)
      equityAdmin.newRuleL4Page.selectSecurityListingLocation(securityListingLocation, false)
      equityAdmin.newRuleL4Page.selectBrokerDealer(brokerDealerName)
      equityAdmin.newRuleL4Page.assertCreateOrSaveButtonIsEnabled(false)
      equityAdmin.newRuleL4Page.clickToClearAllTaxResidencies() // Cleaning fields
      equityAdmin.newRuleL4Page.clickToClearAllSecurityListingLocations() // Cleaning up fields

      cy.log('Not select Tax Residencies')
      equityAdmin.newRuleL4Page.modifyRuleReference(ruleReference)
      equityAdmin.newRuleL4Page.selectSecurityListingLocation(securityListingLocation, false)
      equityAdmin.newRuleL4Page.selectBrokerDealer(brokerDealerName)
      equityAdmin.newRuleL4Page.assertCreateOrSaveButtonIsEnabled(false)
      equityAdmin.newRuleL4Page.clickToClearAllSecurityListingLocations() // Cleaning up fields

      cy.log('Not select Security Listing Location')
      equityAdmin.newRuleL4Page.modifyRuleReference(ruleReference)
      equityAdmin.newRuleL4Page.selectTaxResidences(taxResidenciesList, false)
      equityAdmin.newRuleL4Page.selectBrokerDealer(brokerDealerName)
      equityAdmin.newRuleL4Page.assertCreateOrSaveButtonIsEnabled(false)
      equityAdmin.newRuleL4Page.clickToClearAllTaxResidencies() // Cleaning up fields

      cy.log('Not select Broker-Dealer')
      equityAdmin.newRuleL4Page.modifyRuleReference(ruleReference)
      equityAdmin.newRuleL4Page.selectTaxResidences(taxResidenciesList, false)
      equityAdmin.newRuleL4Page.selectSecurityListingLocation(securityListingLocation, false)
      equityAdmin.newRuleL4Page.assertCreateOrSaveButtonIsEnabled(false)
    })
  })
})
