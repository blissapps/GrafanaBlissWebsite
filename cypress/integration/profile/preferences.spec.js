import EquityAdmin from '../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Preferences tests', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.applicationLeftMenuBar.openProfileMenuBar()
    equityAdmin.profileMenuNavBar.openProfilePreferencesPage()
  })

  /**
   * Test if the menu link sends to the correct page and it gets back to the home screen if closed
   */
  it('C1234567_Check_URL_Access_Over_The_Menu', () => {
    equityAdmin.preferencesPage.checkPageUrl()
    equityAdmin.profileMenuNavBar.closeProfileMenuNavBar()
    equityAdmin.preferencesPage.checkPageUrl()
  })

  /**
   * Change language to PORTUGUESE and verify some random texts around the system
   *
   */
  it('C1234567_Change_Language_Successfully_To_Portuguese', () => {
    equityAdmin.preferencesPage.changeLanguage('portuguese')
    equityAdmin.applicationLeftMenuBar.clickLogoToGoToHomePage()

    equityAdmin.applicationLeftMenuBar.openSettingsMenuBar()
    equityAdmin.applicationLeftMenuBar.getElementByText('Gestão de Utilizadores').should('be.visible')
    equityAdmin.applicationLeftMenuBar.getElementByText('Gestão de Declaração').should('be.visible')
    equityAdmin.settingsMenuNavBar.closeGlobalSettingsNavBar()

    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user')
    equityAdmin.applicationLeftMenuBar.getElementByText('Gestão de Utilizadores').should('be.visible')
    equityAdmin.applicationLeftMenuBar.getElementByText('Gestão de Grupos').should('be.visible')
    equityAdmin.applicationLeftMenuBar.getElementByText('Gestão de Funções').should('be.visible')
    equityAdmin.applicationLeftMenuBar.getElementByText('Filtros para Acesso de Dados').should('be.visible')
    equityAdmin.settingsMenuNavBar.closeGlobalSettingsNavBar()

    equityAdmin.applicationLeftMenuBar.openProfileMenuBar()
    equityAdmin.applicationLeftMenuBar.getElementByText('Informações pessoais').should('be.visible')
    equityAdmin.applicationLeftMenuBar.getElementByText('Segurança').should('be.visible')
    equityAdmin.applicationLeftMenuBar.getElementByText('Preferências').should('be.visible')
    equityAdmin.profileMenuNavBar.closeProfileMenuNavBar()

    // teardown
    equityAdmin.applicationLeftMenuBar.openProfileMenuBar()
    equityAdmin.profileMenuNavBar.openProfilePreferencesPage()
    equityAdmin.preferencesPage.changeLanguage()
    equityAdmin.profileMenuNavBar.closeProfileMenuNavBar()
  })
})
