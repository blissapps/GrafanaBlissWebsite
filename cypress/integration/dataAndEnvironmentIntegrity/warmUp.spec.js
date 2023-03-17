import EquityAdmin from '../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

/**
 * Warmup tests to check if the environment is online
 * This spec file is supposed to run before all specs files in the pipeline.
 */
describe('Warm up tests for Equity Admin + Equity Gateway', () => {
  it('Assert EA env is online', () => {
    cy.screenshot('Screenshot - Login page - Before visiting page')
    cy.visit('/')
    cy.screenshot('Screenshot - Login page - After visiting page - Environment online')
    equityAdmin.loginPage.checkPageUrl()
    equityAdmin.loginPage.assertLoginElementsAreVisible()
  })
})
