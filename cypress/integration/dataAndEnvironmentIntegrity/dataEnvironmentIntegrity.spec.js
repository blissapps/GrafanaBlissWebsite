import EquityAdmin from '../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

/**
 * The tests bellow are created to check data integrity.
 * This spec files is supposed to run right after the warmup spec in the pipeline.
 *
 * @bug_raised SKIPPING DUE TO https://globalshares.atlassian.net/browse/PB-1315 https://globalshares.atlassian.net/browse/PB-1316
 *
 */
describe.skip('[AT-10 Environment only] - These tests bellow are related to data integrity', () => {
  it('Check the amount of many parts of the system, so we make sure the data is as we expect', () => {
    // Check login
    equityAdmin.loginPage.login()

    // Home Page
    equityAdmin.homePage.checkPageUrl()
    equityAdmin.homePage.assertNumberOfClientsDisplayedOnThePageHeader(Cypress.env('TOTAL_NUMBER_OF_COMPANIES_AT10_ENV'))

    // User Management area
    equityAdmin.homePage.navigateToUrl('/tenant/1/settings/user-management')
    equityAdmin.userManagementPage.checkPageUrl()
    equityAdmin.userManagementPage.assertNumberOfRecordsDisplayedInTable(Cypress.env('TOTAL_NUMBER_OF_USERS_AT10_ENV'))

    // 1099 Statements
    equityAdmin.userManagementPage.navigateToUrl('/statement/1099/clients')
    equityAdmin.clientStatementsPage.checkPageUrl()
    equityAdmin.clientStatementsPage.assertNumberOfRecordsDisplayedTable(2)
    equityAdmin.clientStatementsPage.clickTab('participant regulatory linkage')
    equityAdmin.participantRegulatoryLinkagePage.assertNoDataMessageFoundDisplayed()

    // Regulatory Setup - Framework By Client
    equityAdmin.participantRegulatoryLinkagePage.navigateToUrl('/regulatory/clients/not-linked')
    equityAdmin.frameworkByClientNotLinkedPage.checkPageUrl()
    equityAdmin.frameworkByClientNotLinkedPage.assertTheNumberOfRecordsCountedInTheTab('not linked', 0)
    equityAdmin.frameworkByClientNotLinkedPage.assertTheNumberOfRecordsCountedInTheTab('linked', 0)
  })
})
