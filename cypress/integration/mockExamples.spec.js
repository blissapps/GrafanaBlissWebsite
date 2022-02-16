import EquityAdmin from '../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe.skip('Mock examples tests', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
  })

  context('Context 1 - Participants', () => {
    beforeEach(() => {
      cy.log('Context 1')
    })

    it('Mocking participants', () => {
      cy.intercept('GET', '/api/Clients**/Participants**count=true', { fixture: 'participantMockExample.json' }).as('PARTICIPANTS')

      equityAdmin.homePage.selectClientById(144)
      cy.contains('Cypress Framework')
    })
  })

  context('Context 2 - Users Management', () => {
    beforeEach(() => {
      cy.log('Context 2')
    })

    it('Mocking users', () => {
      cy.intercept('GET', '/api/Users?tenantId=**count=true', { fixture: 'usersMockExample.json' }).as('USERS')

      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'user')
      equityAdmin.userManagementPage.checkPageUrl()
      cy.contains('Mocked User for testing - 1')
      cy.contains('test2@globalshares.com')
    })
  })

  context('Turn EA developer mocks', () => {
    it('Turn EA toggle mocks on', () => {
      // @ts-ignore
      cy.window().then((win) => win.eaToggleMocks()) // this works
      cy.reload()
      equityAdmin.applicationLeftMenuBar.openProfileMenuBar()
      cy.get('#profileFullName > span').should('contain.text', 'Gui')
    })
  })
})
