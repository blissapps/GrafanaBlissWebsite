import EquityAdmin from '../../support/pages/equityAdmin'

describe('Preferences tests', () => {
  const equityAdmin = new EquityAdmin()

  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.leftMenuNavBar.openProfileMenuBar()
    equityAdmin.profileMenuNavBar.openProfilePreferencesPage()
  })

  /**
   * Test if the menu link sends to the correct page and it gets back to the home screen if closed
   */
  it('C1234567_Check_URL_Access_Over_The_Menu', () => {
    equityAdmin.preferencesPage.checkProfilePreferencesUrl()
    equityAdmin.profileMenuNavBar.closeProfileMenuNavBar()
    equityAdmin.preferencesPage.checkProfilePreferencesUrl()
  })

  /**
   * Change language to PORTUGUESE and verify some random texts around the system
   *
   */
  it('C1234567_Change_Language_Successfully_To_Portuguese', () => {
    equityAdmin.preferencesPage.changeLanguage('portuguese')
    equityAdmin.leftMenuNavBar.clickLogoToGoToHomePage()

    equityAdmin.leftMenuNavBar.openSettingsMenuBar()
    equityAdmin.leftMenuNavBar.getElementByText('Gestão de Utilizadores').should('be.visible')
    equityAdmin.leftMenuNavBar.getElementByText('Gestão de Declaração').should('be.visible')
    equityAdmin.settingsMenuNavBar.closeGlobalSettingsNavBar()

    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user')
    equityAdmin.leftMenuNavBar.getElementByText('Gestão de Utilizadores').should('be.visible')
    equityAdmin.leftMenuNavBar.getElementByText('Gestão de Grupos').should('be.visible')
    equityAdmin.leftMenuNavBar.getElementByText('Gestão de Funções').should('be.visible')
    equityAdmin.leftMenuNavBar.getElementByText('Filtros para Acesso de Dados').should('be.visible')
    equityAdmin.settingsMenuNavBar.closeGlobalSettingsNavBar()

    equityAdmin.leftMenuNavBar.openProfileMenuBar()
    equityAdmin.leftMenuNavBar.getElementByText('Informações pessoais').should('be.visible')
    equityAdmin.leftMenuNavBar.getElementByText('Segurança').should('be.visible')
    equityAdmin.leftMenuNavBar.getElementByText('Preferências').should('be.visible')
    equityAdmin.profileMenuNavBar.closeProfileMenuNavBar()

    // teardown
    equityAdmin.leftMenuNavBar.openProfileMenuBar()
    equityAdmin.profileMenuNavBar.openProfilePreferencesPage()
    equityAdmin.preferencesPage.changeLanguage()
    equityAdmin.profileMenuNavBar.closeProfileMenuNavBar()
  })
})
