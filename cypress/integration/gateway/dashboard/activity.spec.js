import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
describe('Dashboard page tests', () => {
    beforeEach(() => {
        equityGateway.LoginPage.login() //Workaround for now
        //cy.loginWithUI(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER_AUTH'), Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
    })

    context('General Activity Validations', () => {
        it('Go to activity trough Dashboard', () => {
            equityGateway.Activity.gotoHome()
            cy.url().should('include', '/activity')
        })

        it('EGVFOUR-113 - Breadcrumb Navigation', () => {
            equityGateway.Activity.breadcrumbNavi()
        })
    })

    context('In Progress Content', () => {
        it('Go to activity trough Dashboard', () => {
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