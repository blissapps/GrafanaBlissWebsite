import EquityAdmin from '../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Personal profile tests for Participants', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
  })

  /**
   * * SkIPPING DUE TO https://globalshares.atlassian.net/browse/PB-1030
   */
  it.skip('C12466237_Translate_Error_Messages_From_API', () => {
    const clientId = 144
    const participantId = 113026

    // Change language first
    equityAdmin.applicationLeftMenuBar.openProfileMenuBar()
    equityAdmin.profileMenuNavBar.openProfilePreferencesPage()
    equityAdmin.preferencesPage.changeLanguage('portuguese')
    equityAdmin.applicationLeftMenuBar.clickLogoToGoToHomePage()

    // Test
    equityAdmin.homePage.selectClientById(clientId)
    equityAdmin.clientPeoplePage.clickToEditParticipant(participantId, false)
    equityAdmin.personalProfileOverviewPage.clickTab('address')
    equityAdmin.personalProfileAddressAndContactPage.fillOutAddressOfResidenceSection('', '', '', '', '', 'randomTextToGenerateError')
    equityAdmin.personalProfileAddressAndContactPage.clickToSaveChanges()
    equityAdmin.personalProfileAddressAndContactPage.assertNotificationErrorDisplayed('An error occurred when saving the form (PTPT)')

    // Teardown - turn language back to english
    equityAdmin.applicationLeftMenuBar.openProfileMenuBar()
    equityAdmin.profileMenuNavBar.openProfilePreferencesPage()
    equityAdmin.preferencesPage.changeLanguage()
  })
})
