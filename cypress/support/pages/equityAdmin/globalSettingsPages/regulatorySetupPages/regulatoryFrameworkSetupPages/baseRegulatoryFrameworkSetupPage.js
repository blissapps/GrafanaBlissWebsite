import BasePage from '../../../../basePage'

const selectors = {
  brokerDealersTab: '#Broker-Dealers',
  regulatoryAuthoritiesTab: '*[id*="Regulatory Authorities"]',
  corporateFilingProgramsTab: '*[id*="Corporate Filing Programs"]'
}

class BaseRegulatoryFrameworkSetupPage extends BasePage {
  // ----------------------------------------------------------------- CLICKS -------------------------------------------------------------------- //

  /**
   * Click in the Broker-Dealers tab
   */
  clickBrokerDealersTab() {
    cy.get(selectors.brokerDealersTab).click()
  }

  /**
   * Click in the Regulatory Authorities tab
   */
  clickRegulatoryAuthoritiesTab() {
    cy.get(selectors.regulatoryAuthoritiesTab).click()
  }

  /**
   * Click in the Corporate Filing Programs tab
   */
  clickCorporateFilingProgramsTab() {
    cy.get(selectors.corporateFilingProgramsTab).click()
  }
}

export default BaseRegulatoryFrameworkSetupPage
