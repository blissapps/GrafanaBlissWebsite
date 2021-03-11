import HomePage from '../support/pages/homePage'
import GlobalSettingsModalPage from '../support/modals/globalSettingsModalPage'

import LeftMunuBar from '../support/components/leftMenuBar'

describe('Home page tests', () => {
    const homePage = new HomePage
    const globalSettingsModalPage = new GlobalSettingsModalPage
    const leftMenuBar = new LeftMunuBar

    beforeEach(() => {
        cy.login()
    });

    it('Select a specific client from the list', () => {
        homePage.selectClientFromTheList('Allianz')
    });

    it('Test', () => {
        leftMenuBar.accessGlobalSettingsMenu("User Management", "Group Management")
        
        globalSettingsModalPage.checkModalHeaderTitle().should('have.text', 'Groups')
        globalSettingsModalPage.checkGroupManagementsUrl()
        globalSettingsModalPage.selectTab('Inactive')
        
        leftMenuBar.closeMenuLeftBar()
    });

});
