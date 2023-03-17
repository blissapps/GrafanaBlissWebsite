import EquityAdmin from '../../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Statement Management - Participant Regulatory Linkage tests', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.applicationLeftMenuBar.openSettingsMenuBar()
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('statement', '')
    equityAdmin.clientStatementsPage.clickTab('participant regulatory linkage')
    equityAdmin.participantRegulatoryLinkagePage.checkPageUrl()
  })

  it('C7394266_Filter_Behavior_of_Participant_Regulatory_Linkage', () => {
    const clientName = 'Acacia Pharma'
    const participantName = 'Serrano'
    const participantFirstName = 'Paisley'
    const participantExternalId = 'API-10001'
    const regulator = 'FINRA'
    const partner = 'Global Shares Execution Services Ltd.'

    equityAdmin.participantRegulatoryLinkagePage.assertNoDataMessageFoundDisplayed()

    // Not working yet for first name, so lets verify this until it is fixed
    cy.log('FILTER 0')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantFirstName)
    equityAdmin.participantRegulatoryLinkagePage.assertNoDataMessageFoundDisplayed()
    equityAdmin.participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 1')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName)
    equityAdmin.participantRegulatoryLinkagePage.assertNumberOfRecordsDisplayedTable(125)
    equityAdmin.participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 2')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName)
    equityAdmin.participantRegulatoryLinkagePage.assertNumberOfRecordsDisplayedTable(2)
    equityAdmin.participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 3')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, participantExternalId)
    equityAdmin.participantRegulatoryLinkagePage.assertNumberOfRecordsDisplayedTable(2)
    equityAdmin.participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 4')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, participantExternalId, regulator)
    equityAdmin.participantRegulatoryLinkagePage.assertNumberOfRecordsDisplayedTable(1)
    equityAdmin.participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 5')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, participantExternalId, regulator, partner)
    equityAdmin.participantRegulatoryLinkagePage.assertNumberOfRecordsDisplayedTable(1)
    equityAdmin.participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 6')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, '', participantExternalId, '', '')
    equityAdmin.participantRegulatoryLinkagePage.assertNumberOfRecordsDisplayedTable(2)
    equityAdmin.participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 7')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, '', 0, regulator, '')
    equityAdmin.participantRegulatoryLinkagePage.assertNumberOfRecordsDisplayedTable(42)
    equityAdmin.participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 8')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, '', 0, '', partner)
    equityAdmin.participantRegulatoryLinkagePage.assertNumberOfRecordsDisplayedTable(97)
    equityAdmin.participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 9')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, '', 0, regulator, partner)
    equityAdmin.participantRegulatoryLinkagePage.assertNumberOfRecordsDisplayedTable(42)
    equityAdmin.participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 10')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, 0, regulator, partner)
    equityAdmin.participantRegulatoryLinkagePage.assertNumberOfRecordsDisplayedTable(1)
    equityAdmin.participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 11')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, participantExternalId, '', partner)
    equityAdmin.participantRegulatoryLinkagePage.assertNumberOfRecordsDisplayedTable(2)
    equityAdmin.participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 12')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, participantName, participantExternalId, '', partner)
    equityAdmin.participantRegulatoryLinkagePage.assertNumberOfRecordsDisplayedTable(2)
    equityAdmin.participantRegulatoryLinkagePage.clearAllFilters()

    cy.log('FILTER 13 - Empty State')
    equityAdmin.participantRegulatoryLinkagePage.filterParticipantsStatements(clientName, 'emptyStateTest')
    equityAdmin.participantRegulatoryLinkagePage.assertNoDataMessageFoundDisplayed()
  })
})
