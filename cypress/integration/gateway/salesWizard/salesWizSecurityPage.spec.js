import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()

/**
 * https://globalshares.testrail.net/index.php?/suites/view/18820&group_by=cases:section_id&group_order=asc&display_deleted_cases=0&group_id=1026239
 * Sales Wizard Security Test Suite
 */

describe('Sales Wizard Security Page Tests', () => {
  beforeEach(() => {
    equityGateway.LoginPage.login(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER3_AUTH'))
    equityGateway.SalesWizBase.gotoSecurity()
  })
  context('General Page Validations', () => {
    /** Related to User Stories
     * EGVFOUR-140
     **/
    it('C30639260 - Verify Page Title and Info', () => {
      equityGateway.SalesWizSecurityPage.pageTitle('Security')
      equityGateway.SalesWizSecurityPage.pageInfo('Please select your security below.')
    })
  })

  context('Validate Security Cards Elements', () => {
    /** Related to User Stories
     * EGVFOUR-140
     **/
    it('C30639260 - Card 1 validation', () => {
      cy.fixture('gateway/salesWizard/securityCards').then((jsonObject) => {
        const { firstShare } = jsonObject
        const shareArray = Object.values(firstShare)
        const { currency } = firstShare
        const { amount } = firstShare
        equityGateway.SalesWizSecurityPage.cardValidation(1, shareArray, currency, amount, 'UP')
      })
    })

    it('C30639260 - Card 2 validation', () => {
      cy.fixture('gateway/salesWizard/securityCards').then((jsonObject) => {
        const { secondShare } = jsonObject
        const shareArray = Object.values(secondShare)
        const { currency } = secondShare
        const { amount } = secondShare
        equityGateway.SalesWizSecurityPage.cardValidation(2, shareArray, currency, amount, 'UP')
      })
    })

    it('C30639260 - Card 3 validation', () => {
      cy.fixture('gateway/salesWizard/securityCards').then((jsonObject) => {
        const { thirdShare } = jsonObject
        const shareArray = Object.values(thirdShare)
        const { currency } = thirdShare
        const { amount } = thirdShare
        equityGateway.SalesWizSecurityPage.cardValidation(3, shareArray, currency, amount, 'UP')
      })
    })
  })

  context('Verify if Security Cards are all clickable', () => {
    /** Related to User Stories
     * EGVFOUR-140
     **/
    /*
    const activityElements = [
        'Sage Group Plc',
        'St James Place'
     ] */
    it('C30639260 - Cards Click Verify', () => {
      //TODO when Utils are develop
    })
  })
})
