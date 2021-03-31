import HomePage from '../support/pages/homePage'
import GroupManagementPage from '../support/pages/settings/groupManagementPage'
import EquityPeoplePage from '../support/pages/equityPeoplePage'

import LeftMunuBar from '../support/components/leftMenuBar'

describe('Home page tests', () => {
  const homePage = new HomePage()
  const groupManagementPage = new GroupManagementPage()
  const equityPeoplePage = new EquityPeoplePage()
  const leftMenuBar = new LeftMunuBar()

  beforeEach(() => {
    // @ts-ignore
    cy.login()
  })

  it('Select a specific client from the list', () => {
    homePage.selectClientFromTheList('Allianz')
  })

  it('Test Settings menu', () => {
    leftMenuBar.accessGlobalSettingsMenu('User Management', 'Group Management')

    groupManagementPage.checkGroupManagementUrl()
    groupManagementPage.selectTab('Inactive')

    leftMenuBar.closeMenuLeftBar()
    homePage.checkUrl('home')
  })

  it('Test People`s page', () => {
    homePage.selectClientFromTheList('Allianz')
    equityPeoplePage.checkPeopleUrl()
    equityPeoplePage.openEditParticipantDetails('39477')
  })
})
