import HomePage from '../support/pages/homePage'
import GlobalSettingsModalPage from '../support/modals/globalSettingsModalPage'
import EquityPeoplePage from '../support/pages/equityPeoplePage'

import LeftMunuBar from '../support/components/leftMenuBar'

describe('Home page tests', () => {
    const homePage = new HomePage
    const globalSettingsModalPage = new GlobalSettingsModalPage
    const equityPeoplePage = new EquityPeoplePage
    const leftMenuBar = new LeftMunuBar

    beforeEach(() => {
        cy.login()
    });

    it('Select a specific client from the list', () => {
        homePage.selectClientFromTheList('Allianz')
    });

    it('Test Settings menu', () => {
        leftMenuBar.accessGlobalSettingsMenu("User Management", "Group Management")
        
        globalSettingsModalPage.checkModalHeaderTitle().should('have.text', 'Groups')
        globalSettingsModalPage.checkGroupManagementsUrl()
        globalSettingsModalPage.selectTab('Inactive')
        
        leftMenuBar.closeMenuLeftBar()
        homePage.checkUrl('home')
    });

    it('Test People`s page', () => {
        homePage.selectClientFromTheList('Allianz')
        equityPeoplePage.checkPeopleUrl()
        equityPeoplePage.openEditParticipantDetails('39477')
    });

});
