import PreferencesPage from '../../support/pages/profilePages/preferencesPage'
import HomePage from '../../support/pages/homePage'

import LeftMenuBar from '../../support/components/leftMenuBar'

describe('Security tests', () => {
  const leftMenuBar = new LeftMenuBar()
  const preferencesPage = new PreferencesPage()
  const homePage = new HomePage()

  beforeEach(() => {
    // @ts-ignore
    cy.login() && cy.loginSuccessfulXHRWaits()
    leftMenuBar.openProfilePreferencesPage()
  })

  /**
   * Test if the menu link sends to the correct page and it gets back to the home screen if closed
   */
  it('C1234567_Check_URL_Access_Over_The_Menu', () => {
    preferencesPage.checkProfilePreferencesUrl()
    leftMenuBar.closeProfileLeftBar()
    homePage.checkUrl('home')
  })

  /**
   * Change language to PORTUGUESE and verify some random texts around the system
   *
   */
  it('C1234567_Change_Language_Successfully_To_Portuguese', () => {
    preferencesPage.changeLanguage('portuguese')
    leftMenuBar.clickLogoToGoToHomePage()

    leftMenuBar.openSettingsMenuBar()
    leftMenuBar.getElementByText('Gestão de Utilizadores').should('be.visible')
    leftMenuBar.getElementByText('Gestão de Declaração').should('be.visible')
    leftMenuBar.closeGlobalSettingsLeftBar()

    leftMenuBar.accessGlobalSettingsMenu('Gestão de Utilizadores')
    leftMenuBar.getElementByText('Gestão de Utilizadores').should('be.visible')
    leftMenuBar.getElementByText('Gestão de Grupos').should('be.visible')
    leftMenuBar.getElementByText('Gestão de Funções').should('be.visible')
    leftMenuBar.getElementByText('Filtros para Acesso de Dados').should('be.visible')
    leftMenuBar.closeGlobalSettingsLeftBar()

    leftMenuBar.openProfileMenuBar()
    leftMenuBar.getElementByText('Informações pessoais').should('be.visible')
    leftMenuBar.getElementByText('Segurança').should('be.visible')
    leftMenuBar.getElementByText('Preferências').should('be.visible')
    leftMenuBar.closeProfileLeftBar()

    // teardown
    leftMenuBar.openProfilePreferencesPage()
    preferencesPage.changeLanguage()
    leftMenuBar.closeProfileLeftBar()
  })
})
