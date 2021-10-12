import PreferencesPage from '../../support/pages/profilePages/preferencesPage'
import LeftMenuNavBar from '../../support/components/leftMenuNavBar'
import ProfileMenuNavBar from '../../support/components/profileMenuNavBar'
import SettingsMenuNavBar from '../../support/components/settingsMenuNavBar'

describe('Preferences tests', () => {
  const leftMenuNavBar = new LeftMenuNavBar()
  const profileMenuNavBar = new ProfileMenuNavBar()
  const settingsMenuNavBar = new SettingsMenuNavBar()
  const preferencesPage = new PreferencesPage()

  beforeEach(() => {
    cy.login()
    leftMenuNavBar.openProfileMenuBar()
    profileMenuNavBar.openProfilePreferencesPage()
  })

  /**
   * Test if the menu link sends to the correct page and it gets back to the home screen if closed
   */
  it('C1234567_Check_URL_Access_Over_The_Menu', () => {
    preferencesPage.checkProfilePreferencesUrl()
    profileMenuNavBar.closeProfileMenuNavBar()
    preferencesPage.checkProfilePreferencesUrl()
  })

  /**
   * Change language to PORTUGUESE and verify some random texts around the system
   *
   */
  it('C1234567_Change_Language_Successfully_To_Portuguese', () => {
    preferencesPage.changeLanguage('portuguese')
    leftMenuNavBar.clickLogoToGoToHomePage()

    leftMenuNavBar.openSettingsMenuBar()
    leftMenuNavBar.getElementByText('Gestão de Utilizadores').should('be.visible')
    leftMenuNavBar.getElementByText('Gestão de Declaração').should('be.visible')
    settingsMenuNavBar.closeGlobalSettingsNavBar()

    settingsMenuNavBar.accessGlobalSettingsMenu('user')
    leftMenuNavBar.getElementByText('Gestão de Utilizadores').should('be.visible')
    leftMenuNavBar.getElementByText('Gestão de Grupos').should('be.visible')
    leftMenuNavBar.getElementByText('Gestão de Funções').should('be.visible')
    leftMenuNavBar.getElementByText('Filtros para Acesso de Dados').should('be.visible')
    settingsMenuNavBar.closeGlobalSettingsNavBar()

    leftMenuNavBar.openProfileMenuBar()
    leftMenuNavBar.getElementByText('Informações pessoais').should('be.visible')
    leftMenuNavBar.getElementByText('Segurança').should('be.visible')
    leftMenuNavBar.getElementByText('Preferências').should('be.visible')
    profileMenuNavBar.closeProfileMenuNavBar()

    // teardown
    leftMenuNavBar.openProfileMenuBar()
    profileMenuNavBar.openProfilePreferencesPage()
    preferencesPage.changeLanguage()
    profileMenuNavBar.closeProfileMenuNavBar()
  })
})
