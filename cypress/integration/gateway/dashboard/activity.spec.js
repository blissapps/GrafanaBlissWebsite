import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
describe('Dashboard page tests', () => {
    beforeEach(() => {
        equityGateway.LoginPage.login() //Workaround for now
        //cy.loginWithUI(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER_AUTH'), Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
        equityGateway.Activity.gotoActivity() //FIXME PROVISORY NAVIGATION TO ACTIVITY can't handle direct url navigation
        cy.url().should('include', '/activity')
    })

    context('General Validations', () => {
        it('EGVFOUR-113 - Go to Dashboard trough Activity', () => {
            equityGateway.Activity.breadcrumbNavi()
            cy.url().should('include', '/dashboard')
        })
    })

    context('In Progress Content', () => {
        it('Check Title', () => {
            //TODO
        })
    })

    context('Upcoming Content', () => {
        it('Go to activity trough Dashboard', () => {
            //TODO
        })
    })

    context('History Content', () => {
        it('Go to activity trough Dashboard', () => {
            //TODO
        })
    })
})